"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { APPS, DEFAULT_APP, findApp, type AppEntry, type OfferItem } from "@/lib/apps";
import { Select } from "@/components/ui/select";

/* ───────────────────────────────────────────────────────────────────────────
   Promo admin dashboard — manage coupons for every app from one place.
   Auth is the PROMO_ADMIN_SECRET sent as the `x-admin-secret` header; it is
   kept only in this browser's localStorage.
   ────────────────────────────────────────────────────────────────────────── */

type Coupon = {
  id: string;
  appId: string;
  code: string;
  rewardType: string;
  durationDays: number | null;
  creditAmount: number | null;
  maxRedemptions: number;
  redeemedCount: number;
  active: boolean;
  expiresAt: string | null;
  note: string;
  createdAt: string;
  _count?: { redemptions: number };
};

type CsvRow = {
  code: string;
  rewardType?: string;
  durationDays?: number;
  creditAmount?: number;
  maxRedemptions?: number;
  note?: string;
};

const REWARD_OPTIONS = [
  { value: "lifetime", label: "Lifetime Pro" },
  { value: "subscription", label: "Subscription (days)" },
  { value: "credits", label: "Credits" },
];

export default function PromoAdmin() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [appId, setAppId] = useState(DEFAULT_APP.id);
  const [section, setSection] = useState<"coupons" | "offers" | "broadcast">("coupons");

  // Custom apps added via UI — persisted in localStorage
  const [customApps, setCustomApps] = useState<AppEntry[]>([]);
  const allApps = [...APPS, ...customApps];

  // Add-app form
  const [addingApp, setAddingApp] = useState(false);
  const [newAppId, setNewAppId]       = useState("");
  const [newAppName, setNewAppName]   = useState("");
  const [newAppPrefix, setNewAppPrefix] = useState("");
  const [newAppTopic, setNewAppTopic] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  // bulk selection
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkWorking, setBulkWorking] = useState(false);

  // broadcast notification
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");
  const [notifImage, setNotifImage] = useState("");
  const [notifTopic, setNotifTopic] = useState(DEFAULT_APP.fcmTopic);
  const [notifSending, setNotifSending] = useState(false);
  const [notifStatus, setNotifStatus] = useState<string | null>(null);

  // form
  const [mode, setMode] = useState<"single" | "bulk" | "csv">("single");
  const [code, setCode] = useState("");
  const [count, setCount] = useState(50);
  const [prefix, setPrefix] = useState(DEFAULT_APP.prefix);
  const [rewardType, setRewardType] = useState("lifetime");
  const [durationDays, setDurationDays] = useState(30);
  const [maxRedemptions, setMaxRedemptions] = useState(1);
  const [note, setNote] = useState("");

  // CSV import
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvRows, setCsvRows] = useState<CsvRow[]>([]);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvText, setCsvText] = useState("");
  const [csvError, setCsvError] = useState<string | null>(null);
  const [replaceExisting, setReplaceExisting] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);

  // Inline row editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    code: string; rewardType: string; durationDays: number; creditAmount: number;
    maxRedemptions: number; note: string;
  } | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("promo_admin_secret");
    if (s) { setSecret(s); setAuthed(true); }
  }, []);

  const headers = useCallback(
    () => ({ "Content-Type": "application/json", "x-admin-secret": secret }),
    [secret]
  );

  const loadApps = useCallback(async () => {
    const res = await fetch("/api/promo/admin/apps", { headers: headers() });
    if (!res.ok) return;
    const data = await res.json();
    setCustomApps(data.apps ?? []);
  }, [headers]);

  // Apps used to live only in this browser's localStorage. On first load
  // after unlocking, migrate anything still sitting there into the database
  // (upsert, so it's safe to run repeatedly) then rely on the server.
  useEffect(() => {
    if (!authed) return;
    (async () => {
      const saved = localStorage.getItem("custom_apps");
      if (saved) {
        try {
          const legacy: AppEntry[] = JSON.parse(saved);
          await Promise.all(
            legacy.map((a) =>
              fetch("/api/promo/admin/apps", {
                method: "POST", headers: headers(), body: JSON.stringify(a),
              })
            )
          );
        } catch { /* ignore malformed legacy data */ }
        localStorage.removeItem("custom_apps");
      }
      await loadApps();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  async function saveCustomApp() {
    const id = newAppId.trim().toLowerCase().replace(/\s+/g, "-");
    const name = newAppName.trim();
    const prefix = newAppPrefix.trim().toUpperCase();
    const fcmTopic = newAppTopic.trim() || `${id}_all`;
    if (!id || !name || !prefix) return;
    if (allApps.some((a) => a.id === id)) return; // duplicate
    const res = await fetch("/api/promo/admin/apps", {
      method: "POST", headers: headers(), body: JSON.stringify({ id, name, prefix, fcmTopic }),
    });
    if (!res.ok) { setError("Failed to save app."); return; }
    await loadApps();
    setNewAppId(""); setNewAppName(""); setNewAppPrefix(""); setNewAppTopic("");
    setAddingApp(false);
    setAppId(id);
    setPrefix(prefix);
    setNotifTopic(fcmTopic);
  }

  const load = useCallback(async (p = page, q = search) => {
    setLoading(true);
    setError(null);
    setSelected(new Set());
    try {
      const url = `/api/promo/admin/coupons?appId=${appId}&page=${p}&limit=50${q ? `&q=${encodeURIComponent(q)}` : ""}`;
      const res = await fetch(url, { headers: headers() });
      if (res.status === 401) {
        setError("Unauthorized — check the admin secret.");
        setAuthed(false);
        localStorage.removeItem("promo_admin_secret");
        return;
      }
      const data = await res.json();
      setCoupons(data.coupons ?? []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
    } catch {
      setError("Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  }, [appId, headers, page, search]);

  useEffect(() => {
    if (authed) { setPage(1); load(1, search); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, appId]);

  function saveSecret() {
    if (!secret.trim()) return;
    localStorage.setItem("promo_admin_secret", secret.trim());
    setAuthed(true);
  }

  function logout() {
    localStorage.removeItem("promo_admin_secret");
    setSecret(""); setAuthed(false); setCoupons([]);
  }

  async function create() {
    setError(null); setGenerated([]);
    const body: Record<string, unknown> = {
      appId, rewardType, maxRedemptions, note,
      ...(rewardType === "subscription" ? { durationDays } : {}),
    };
    if (mode === "single") {
      if (!code.trim()) return setError("Enter a code.");
      body.code = code.trim();
    } else {
      body.count = count; body.prefix = prefix;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/promo/admin/coupons", {
        method: "POST", headers: headers(), body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message ?? "Create failed."); }
      else { setGenerated(data.created ?? []); setCode(""); await load(); }
    } catch { setError("Create failed."); }
    finally { setLoading(false); }
  }

  async function patch(id: string, patchBody: Record<string, unknown>) {
    await fetch("/api/promo/admin/coupons", {
      method: "PATCH", headers: headers(), body: JSON.stringify({ id, ...patchBody }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this coupon and all its redemptions?")) return;
    await fetch(`/api/promo/admin/coupons?id=${id}`, { method: "DELETE", headers: headers() });
    load();
  }

  // ── Bulk actions ──────────────────────────────────────────────────────────

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === coupons.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(coupons.map((c) => c.id)));
    }
  }

  function copySelectedCodes() {
    const codes = coupons.filter((c) => selected.has(c.id)).map((c) => c.code);
    navigator.clipboard.writeText(codes.join("\n"));
  }

  function copyAllCodes() {
    navigator.clipboard.writeText(coupons.map((c) => c.code).join("\n"));
  }

  async function deleteSelected() {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} coupon(s) and all their redemptions?`)) return;
    setBulkWorking(true);
    try {
      const ids = [...selected].join(",");
      await fetch(`/api/promo/admin/coupons?ids=${encodeURIComponent(ids)}`, {
        method: "DELETE", headers: headers(),
      });
      await load();
    } finally {
      setBulkWorking(false);
    }
  }

  // ── CSV import ───────────────────────────────────────────────────────────

  function parseCsv(text: string): CsvRow[] {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return [];
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const codeIdx = header.indexOf("code");
    if (codeIdx === -1) throw new Error('CSV must have a "code" column.');
    const col = (name: string) => header.indexOf(name);
    const rewardIdx = col("rewardtype");
    const durationIdx = col("durationdays");
    const creditIdx = col("creditamount");
    const maxIdx = col("maxredemptions");
    const noteIdx = col("note");

    return lines.slice(1).map((line) => {
      const cells = line.split(",").map((c) => c.trim());
      const row: CsvRow = { code: (cells[codeIdx] ?? "").toUpperCase() };
      if (rewardIdx !== -1 && cells[rewardIdx]) row.rewardType = cells[rewardIdx].toLowerCase();
      if (durationIdx !== -1 && cells[durationIdx]) row.durationDays = parseInt(cells[durationIdx]) || undefined;
      if (creditIdx !== -1 && cells[creditIdx]) row.creditAmount = parseInt(cells[creditIdx]) || undefined;
      if (maxIdx !== -1 && cells[maxIdx]) row.maxRedemptions = parseInt(cells[maxIdx]) || undefined;
      if (noteIdx !== -1 && cells[noteIdx]) row.note = cells[noteIdx];
      return row;
    }).filter((r) => r.code);
  }

  function onCsvSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvError(null);
    setImportResult(null);
    setCsvFileName(file.name);
    setCsvText("");
    file.text().then((text) => {
      try {
        const rows = parseCsv(text);
        if (rows.length === 0) throw new Error("No valid rows found.");
        setCsvRows(rows);
      } catch (err) {
        setCsvRows([]);
        setCsvError(err instanceof Error ? err.message : "Failed to parse CSV.");
      }
    });
  }

  function onCsvTextChange(text: string) {
    setCsvText(text);
    setCsvFileName("");
    setImportResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!text.trim()) { setCsvRows([]); setCsvError(null); return; }
    try {
      const rows = parseCsv(text);
      if (rows.length === 0) throw new Error("No valid rows found.");
      setCsvRows(rows);
      setCsvError(null);
    } catch (err) {
      setCsvRows([]);
      setCsvError(err instanceof Error ? err.message : "Failed to parse CSV.");
    }
  }

  function clearCsv() {
    setCsvRows([]); setCsvFileName(""); setCsvText(""); setCsvError(null); setImportResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function importCsv() {
    if (csvRows.length === 0) return;
    setImporting(true);
    setImportResult(null);
    setError(null);
    try {
      const body = {
        appId, replaceExisting,
        rewardType, maxRedemptions, note,
        ...(rewardType === "subscription" ? { durationDays } : {}),
        rows: csvRows,
      };
      const res = await fetch("/api/promo/admin/coupons", {
        method: "POST", headers: headers(), body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message ?? "Import failed."); }
      else {
        const createdCount = data.created?.length ?? 0;
        const replacedCount = data.replaced?.length ?? 0;
        const skippedCount = data.skipped?.length ?? 0;
        setImportResult(
          `Imported ${createdCount} new${replacedCount ? `, replaced ${replacedCount}` : ""}${skippedCount ? `, skipped ${skippedCount} existing` : ""}.`
        );
        clearCsv();
        await load();
      }
    } catch { setError("Import failed."); }
    finally { setImporting(false); }
  }

  // ── Inline edit ──────────────────────────────────────────────────────────

  function startEdit(c: Coupon) {
    setEditingId(c.id);
    setEditForm({
      code: c.code,
      rewardType: c.rewardType,
      durationDays: c.durationDays ?? 30,
      creditAmount: c.creditAmount ?? 0,
      maxRedemptions: c.maxRedemptions,
      note: c.note,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  async function saveEdit() {
    if (!editingId || !editForm) return;
    setSavingEdit(true);
    try {
      await fetch("/api/promo/admin/coupons", {
        method: "PATCH", headers: headers(),
        body: JSON.stringify({
          id: editingId,
          code: editForm.code,
          rewardType: editForm.rewardType,
          durationDays: editForm.rewardType === "subscription" ? editForm.durationDays : null,
          creditAmount: editForm.rewardType === "credits" ? editForm.creditAmount : null,
          maxRedemptions: editForm.maxRedemptions,
          note: editForm.note,
        }),
      });
      cancelEdit();
      await load();
    } finally {
      setSavingEdit(false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────

  async function sendNotification() {
    if (!notifTitle.trim() || !notifBody.trim()) return;
    setNotifSending(true);
    setNotifStatus(null);
    try {
      const res = await fetch("/api/promo/admin/notify", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          title: notifTitle.trim(),
          body: notifBody.trim(),
          imageUrl: notifImage.trim() || undefined,
          topic: notifTopic.trim() || "all",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotifStatus("✓ Broadcast sent to all users!");
        setNotifTitle(""); setNotifBody(""); setNotifImage("");
      } else {
        setNotifStatus(`✗ Failed: ${data.error ?? data.message ?? "Unknown error"}`);
      }
    } catch {
      setNotifStatus("✗ Network error sending broadcast.");
    } finally {
      setNotifSending(false);
    }
  }

  function copyCodes() { navigator.clipboard.writeText(generated.join("\n")); }

  function downloadCsv() {
    const blob = new Blob(["code\n" + generated.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${appId}-coupons-${Date.now()}.csv`;
    a.click();
  }

  const input =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none";
  const inputSm =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none";
  const label = "text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block";

  /* ── Auth gate ─────────────────────────────────────────────────────────── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white grid place-items-center px-6">
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8">
          <h1 className="text-2xl font-extrabold mb-2">Promo Admin</h1>
          <p className="text-gray-400 text-sm mb-6">Enter the admin secret to manage coupons.</p>
          <input
            type="password" className={input} placeholder="PROMO_ADMIN_SECRET"
            value={secret} onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveSecret()}
          />
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          <button onClick={saveSecret} className="mt-5 w-full bg-red-600 hover:bg-red-500 font-bold py-3 rounded-xl transition-colors">
            Unlock
          </button>
        </div>
      </div>
    );
  }

  /* ── Dashboard ─────────────────────────────────────────────────────────── */
  const allSelected = coupons.length > 0 && selected.size === coupons.length;
  const someSelected = selected.size > 0;
  const activeOnPage = coupons.filter((c) => c.active).length;
  const currentApp = findApp(appId);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10 bg-white/[0.02] px-4 py-6">
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-red-600 grid place-items-center font-black text-sm">P</div>
          <div className="min-w-0">
            <p className="font-extrabold leading-tight truncate">Promo Admin</p>
            <p className="text-[11px] text-gray-500">Coupon management</p>
          </div>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 px-2">Apps</p>
        <nav className="space-y-1">
          {allApps.map((a) => (
            <button
              key={a.id}
              onClick={() => { setAppId(a.id); setPrefix(a.prefix); setNotifTopic(a.fcmTopic); }}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                appId === a.id ? "bg-red-600 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="truncate">{a.name}</span>
              {customApps.some((c) => c.id === a.id) && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full shrink-0 ${appId === a.id ? "bg-white/20" : "bg-white/10 text-gray-500"}`}>
                  custom
                </span>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setAddingApp((v) => !v)}
          className="mt-2 px-3 py-2.5 rounded-xl text-sm font-bold border border-dashed border-white/15 text-gray-500 hover:text-white hover:border-white/40 transition-colors text-left"
        >
          {addingApp ? "Cancel" : "+ Add app"}
        </button>

        {addingApp && (
          <div className="mt-3 p-3.5 bg-white/5 border border-white/10 rounded-2xl space-y-2.5">
            <input className={inputSm} placeholder="App ID (slug)" value={newAppId}
              onChange={(e) => setNewAppId(e.target.value.toLowerCase().replace(/\s+/g, "-"))} />
            <input className={inputSm} placeholder="Display name" value={newAppName}
              onChange={(e) => setNewAppName(e.target.value)} />
            <input className={inputSm} placeholder="Code prefix" maxLength={4} value={newAppPrefix}
              onChange={(e) => setNewAppPrefix(e.target.value.toUpperCase())} />
            <input className={inputSm} placeholder="FCM topic (auto)" value={newAppTopic}
              onChange={(e) => setNewAppTopic(e.target.value)} />
            <button onClick={saveCustomApp}
              disabled={!newAppId.trim() || !newAppName.trim() || !newAppPrefix.trim()}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-30 font-bold rounded-lg text-xs transition-colors">
              Add app
            </button>
          </div>
        )}

        <div className="mt-auto pt-6">
          <button onClick={logout}
            className="w-full text-left text-sm text-gray-400 hover:text-white px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
            Log out
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Mobile app switcher (sidebar hidden below lg) */}
        <div className="lg:hidden sticky top-0 z-10 backdrop-blur bg-[#0A0A0A]/90 border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-extrabold">Promo Admin</h1>
            <button onClick={logout} className="text-xs text-gray-400 hover:text-white">Log out</button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allApps.map((a) => (
              <button key={a.id} onClick={() => { setAppId(a.id); setPrefix(a.prefix); setNotifTopic(a.fcmTopic); }}
                className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  appId === a.id ? "bg-red-600 text-white" : "bg-white/5 text-gray-400"
                }`}>
                {a.name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <header className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-extrabold">{currentApp?.name ?? appId}</h1>
              <p className="text-gray-400 text-sm">Manage coupon codes for this app.</p>
            </div>
          </header>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total coupons" value={total} />
            <StatCard label="Active on page" value={activeOnPage} />
            <StatCard label="Registered apps" value={allApps.length} />
            <StatCard label="Created this session" value={generated.length} />
          </div>

          {/* Section tabs */}
          <div className="flex gap-1.5 mb-8 border-b border-white/10">
            {([
              { key: "coupons", label: "Coupons" },
              { key: "offers", label: "Offers" },
              { key: "broadcast", label: "Push Notification" },
            ] as const).map((t) => (
              <button
                key={t.key}
                onClick={() => setSection(t.key)}
                className={`px-4 py-2.5 text-sm font-bold rounded-t-lg transition-colors border-b-2 -mb-px ${
                  section === t.key
                    ? "border-red-500 text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {section === "coupons" && (
          <div className="grid lg:grid-cols-[380px_1fr] gap-8">
            {/* ── Create panel ─────────────────────────────────────────── */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-fit">
              <h2 className="text-lg font-bold mb-5">Create coupons</h2>

              <div className="flex gap-2 mb-5">
                {(["single", "bulk", "csv"] as const).map((m) => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-colors ${
                      mode === m ? "bg-red-600" : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {m === "csv" ? "CSV" : m}
                  </button>
                ))}
              </div>

              {mode === "single" && (
                <div className="mb-4">
                  <span className={label}>Code</span>
                  <input className={input} placeholder="WELCOME50" value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())} />
                </div>
              )}

              {mode === "bulk" && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <span className={label}>How many</span>
                    <input type="number" className={input} value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 0)} />
                  </div>
                  <div>
                    <span className={label}>Prefix</span>
                    <input className={input} value={prefix}
                      onChange={(e) => setPrefix(e.target.value.toUpperCase())} />
                  </div>
                </div>
              )}

              {mode === "csv" && (
                <div className="mb-4 space-y-3">
                  <div>
                    <span className={label}>CSV file</span>
                    <p className="text-xs text-gray-500 mb-2">
                      Header row with a <span className="text-gray-300 font-mono">code</span> column (required) and optional{" "}
                      <span className="text-gray-300 font-mono">rewardType, durationDays, creditAmount, maxRedemptions, note</span> columns.
                    </p>
                    <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={onCsvSelected}
                      className="w-full text-xs text-gray-400 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-xs file:font-bold file:cursor-pointer hover:file:bg-white/20" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex-1 h-px bg-white/10" />
                    or paste
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <div>
                    <textarea
                      value={csvText}
                      onChange={(e) => onCsvTextChange(e.target.value)}
                      placeholder={"code,rewardType,durationDays\nWELCOME50,lifetime,\nSUB30,subscription,30"}
                      rows={5}
                      className={`${input} font-mono text-xs resize-y`}
                    />
                  </div>

                  {csvError && <p className="text-red-400 text-xs">{csvError}</p>}

                  {csvRows.length > 0 && (
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-green-400">{csvFileName || "Pasted CSV"} · {csvRows.length} rows</span>
                        <button onClick={clearCsv} className="text-xs text-gray-400 hover:text-white">Clear</button>
                      </div>
                      <div className="max-h-28 overflow-auto font-mono text-[11px] text-gray-400 space-y-0.5">
                        {csvRows.slice(0, 20).map((r, i) => <div key={i}>{r.code}</div>)}
                        {csvRows.length > 20 && <div className="text-gray-600">…and {csvRows.length - 20} more</div>}
                      </div>
                    </div>
                  )}

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-red-500 w-4 h-4"
                      checked={replaceExisting} onChange={(e) => setReplaceExisting(e.target.checked)} />
                    <span className="text-sm text-gray-300">Replace existing codes (upsert)</span>
                  </label>
                </div>
              )}

              {mode !== "csv" && (
                <>
                  <div className="mb-4">
                    <span className={label}>Reward</span>
                    <Select value={rewardType} onChange={setRewardType} options={REWARD_OPTIONS} className={input + " pl-4 pr-10 text-left"} />
                  </div>

                  {rewardType === "subscription" && (
                    <div className="mb-4">
                      <span className={label}>Duration (days)</span>
                      <input type="number" className={input} value={durationDays}
                        onChange={(e) => setDurationDays(parseInt(e.target.value) || 0)} />
                    </div>
                  )}

                  <div className="mb-4">
                    <span className={label}>Max redemptions (0 = unlimited)</span>
                    <input type="number" className={input} value={maxRedemptions}
                      onChange={(e) => setMaxRedemptions(parseInt(e.target.value) || 0)} />
                  </div>

                  <div className="mb-5">
                    <span className={label}>Note (optional)</span>
                    <input className={input} placeholder="Launch campaign" value={note}
                      onChange={(e) => setNote(e.target.value)} />
                  </div>
                </>
              )}

              {mode === "csv" ? (
                <button onClick={importCsv} disabled={importing || csvRows.length === 0}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 font-bold py-3 rounded-xl transition-colors">
                  {importing ? "Importing…" : csvRows.length > 0 ? `Import ${csvRows.length} codes` : "Choose a CSV file"}
                </button>
              ) : (
                <button onClick={create} disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 font-bold py-3 rounded-xl transition-colors">
                  {loading ? "Working…" : mode === "single" ? "Create coupon" : `Generate ${count} codes`}
                </button>
              )}

              {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
              {importResult && <p className="text-green-400 text-sm mt-3">{importResult}</p>}

              {generated.length > 0 && (
                <div className="mt-5 bg-black/40 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-green-400">{generated.length} created</span>
                    <div className="flex gap-2">
                      <button onClick={copyCodes} className="text-xs text-gray-300 hover:text-white">Copy</button>
                      <button onClick={downloadCsv} className="text-xs text-gray-300 hover:text-white">CSV</button>
                    </div>
                  </div>
                  <div className="max-h-40 overflow-auto font-mono text-xs text-gray-300 space-y-0.5">
                    {generated.map((c) => <div key={c}>{c}</div>)}
                  </div>
                </div>
              )}
            </div>

            {/* ── List panel ───────────────────────────────────────────── */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden">
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">
                  Coupons{total > 0 ? ` (${total})` : ""}
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={copyAllCodes}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10">
                    Copy all codes
                  </button>
                  <button onClick={() => load(page, search)}
                    className="text-sm text-gray-400 hover:text-white">
                    Refresh
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="mb-4">
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none"
                  placeholder="Search code…" value={search}
                  onChange={(e) => {
                    const q = e.target.value.toUpperCase();
                    setSearch(q); setPage(1); load(1, q);
                  }}
                />
              </div>

              {/* Bulk action bar */}
              {someSelected && (
                <div className="flex items-center gap-3 mb-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm text-gray-300 font-semibold">{selected.size} selected</span>
                  <div className="flex-1" />
                  <button onClick={copySelectedCodes}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-gray-200 hover:bg-white/20">
                    Copy codes
                  </button>
                  <button onClick={deleteSelected} disabled={bulkWorking}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 disabled:opacity-40">
                    {bulkWorking ? "Deleting…" : "Delete selected"}
                  </button>
                </div>
              )}

              {loading && coupons.length === 0 ? (
                <p className="text-gray-500 text-sm">Loading…</p>
              ) : coupons.length === 0 ? (
                <p className="text-gray-500 text-sm">No coupons for {appId} yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-white/10">
                        <th className="py-2 pr-3">
                          <input type="checkbox" checked={allSelected} onChange={toggleSelectAll}
                            className="accent-red-500 cursor-pointer" />
                        </th>
                        <th className="py-2 pr-4 font-semibold">Code</th>
                        <th className="py-2 pr-4 font-semibold">Reward</th>
                        <th className="py-2 pr-4 font-semibold">Used</th>
                        <th className="py-2 pr-4 font-semibold">Status</th>
                        <th className="py-2 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((c) => (
                        <FragmentRow key={c.id}>
                          <tr
                            className={`border-b border-white/5 transition-colors ${selected.has(c.id) ? "bg-white/5" : ""}`}>
                            <td className="py-2.5 pr-3">
                              <input type="checkbox" checked={selected.has(c.id)}
                                onChange={() => toggleSelect(c.id)}
                                className="accent-red-500 cursor-pointer" />
                            </td>
                            <td className="py-2.5 pr-4 font-mono">{c.code}</td>
                            <td className="py-2.5 pr-4 text-gray-300">
                              {c.rewardType}
                              {c.rewardType === "subscription" && c.durationDays ? ` (${c.durationDays}d)` : ""}
                              {c.rewardType === "credits" && c.creditAmount ? ` (${c.creditAmount})` : ""}
                            </td>
                            <td className="py-2.5 pr-4 text-gray-300">
                              {c.redeemedCount}{c.maxRedemptions > 0 ? ` / ${c.maxRedemptions}` : " / ∞"}
                            </td>
                            <td className="py-2.5 pr-4">
                              {(() => {
                                const fullyRedeemed = c.maxRedemptions > 0 && c.redeemedCount >= c.maxRedemptions;
                                const statusLabel = !c.active && fullyRedeemed ? "redeemed" : !c.active ? "disabled" : "active";
                                const cls = statusLabel === "redeemed"
                                  ? "bg-amber-500/15 text-amber-400"
                                  : statusLabel === "disabled"
                                  ? "bg-gray-500/15 text-gray-400"
                                  : "bg-green-500/15 text-green-400";
                                return <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${cls}`}>{statusLabel}</span>;
                              })()}
                            </td>
                            <td className="py-2.5 text-right whitespace-nowrap">
                              <button onClick={() => startEdit(c)}
                                className="text-xs text-gray-300 hover:text-white mr-3">
                                Edit
                              </button>
                              <button onClick={() => patch(c.id, { active: !c.active })}
                                className="text-xs text-gray-300 hover:text-white mr-3">
                                {c.active ? "Disable" : "Enable"}
                              </button>
                              <button onClick={() => patch(c.id, { active: false, revokeGrants: true })}
                                className="text-xs text-amber-400 hover:text-amber-300 mr-3">
                                Revoke
                              </button>
                              <button onClick={() => remove(c.id)}
                                className="text-xs text-red-400 hover:text-red-300">
                                Delete
                              </button>
                            </td>
                          </tr>

                          {editingId === c.id && editForm && (
                            <tr className="bg-black/30 border-b border-white/10">
                              <td colSpan={6} className="p-4">
                                <div className="grid sm:grid-cols-5 gap-3 items-end">
                                  <div>
                                    <span className={label}>Code</span>
                                    <input className={inputSm} value={editForm.code}
                                      onChange={(e) => setEditForm({ ...editForm, code: e.target.value.toUpperCase() })} />
                                  </div>
                                  <div>
                                    <span className={label}>Reward</span>
                                    <Select value={editForm.rewardType}
                                      onChange={(v) => setEditForm({ ...editForm, rewardType: v })}
                                      options={REWARD_OPTIONS}
                                      className={inputSm + " pl-3 pr-9 text-left"} />
                                  </div>
                                  {editForm.rewardType === "subscription" && (
                                    <div>
                                      <span className={label}>Duration (days)</span>
                                      <input type="number" className={inputSm} value={editForm.durationDays}
                                        onChange={(e) => setEditForm({ ...editForm, durationDays: parseInt(e.target.value) || 0 })} />
                                    </div>
                                  )}
                                  {editForm.rewardType === "credits" && (
                                    <div>
                                      <span className={label}>Credits</span>
                                      <input type="number" className={inputSm} value={editForm.creditAmount}
                                        onChange={(e) => setEditForm({ ...editForm, creditAmount: parseInt(e.target.value) || 0 })} />
                                    </div>
                                  )}
                                  <div>
                                    <span className={label}>Max redemptions</span>
                                    <input type="number" className={inputSm} value={editForm.maxRedemptions}
                                      onChange={(e) => setEditForm({ ...editForm, maxRedemptions: parseInt(e.target.value) || 0 })} />
                                  </div>
                                  <div>
                                    <span className={label}>Note</span>
                                    <input className={inputSm} value={editForm.note}
                                      onChange={(e) => setEditForm({ ...editForm, note: e.target.value })} />
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <button onClick={saveEdit} disabled={savingEdit}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 font-bold">
                                    {savingEdit ? "Saving…" : "Save"}
                                  </button>
                                  <button onClick={cancelEdit}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-bold">
                                    Cancel
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </FragmentRow>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination — always visible when there are results */}
              {total > 0 && (
                <div className="flex items-center justify-between mt-5 text-sm">
                  <span className="text-gray-500">
                    Page {page} of {pages} · {total} total
                  </span>
                  <div className="flex gap-2">
                    <button disabled={page <= 1 || loading}
                      onClick={() => { const p = page - 1; setPage(p); load(p, search); }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30">
                      ← Prev
                    </button>
                    <button disabled={page >= pages || loading}
                      onClick={() => { const p = page + 1; setPage(p); load(p, search); }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30">
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          )}

          {section === "offers" && (
            /* ── App Offers ───────────────────────────────────────────── */
            <OffersPanel appId={appId} label={label} input={input} />
          )}

          {section === "broadcast" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-lg font-bold mb-1">Broadcast Notification</h2>
            <p className="text-gray-400 text-sm mb-5">
              Sends a push notification to any FCM topic. Devices must be subscribed to that topic to receive it.
              Requires <span className="text-white font-mono">FIREBASE_SERVICE_ACCOUNT_JSON</span> to be set in the server environment.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <span className={label}>Topic</span>
                <input className={input} placeholder="all" value={notifTopic}
                  onChange={(e) => setNotifTopic(e.target.value)} />
              </div>
              <div>
                <span className={label}>Title</span>
                <input className={input} placeholder="e.g. New movies this week!" value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)} />
              </div>
              <div>
                <span className={label}>Image URL (optional)</span>
                <input className={input} placeholder="https://…/banner.jpg" value={notifImage}
                  onChange={(e) => setNotifImage(e.target.value)} />
              </div>
            </div>

            <div className="mt-4">
              <span className={label}>Message body</span>
              <textarea className={`${input} resize-none`} rows={3}
                placeholder="e.g. Check out this week's latest arrivals…"
                value={notifBody} onChange={(e) => setNotifBody(e.target.value)} />
            </div>

            <div className="mt-4 flex items-center gap-4">
              <button onClick={sendNotification}
                disabled={notifSending || !notifTitle.trim() || !notifBody.trim()}
                className="bg-red-600 hover:bg-red-500 disabled:opacity-40 font-bold px-6 py-3 rounded-xl transition-colors">
                {notifSending ? "Sending…" : "Send to All Users"}
              </button>

              {notifStatus && (
                <p className={`text-sm font-medium ${notifStatus.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                  {notifStatus}
                </p>
              )}
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ── Small helpers ────────────────────────────────────────────────────────── */

function FragmentRow({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-extrabold truncate">{value}</p>
    </div>
  );
}

/* ── Offers panel ──────────────────────────────────────────────────────────── */

const REWARD_LABELS: Record<string, string> = {
  lifetime: "Lifetime Pro",
  subscription: "Subscription",
  credits: "Credits",
};

function OffersPanel({
  appId,
  label,
  input,
}: {
  appId: string;
  label: string;
  input: string;
}) {
  const app = findApp(appId);
  const existing: OfferItem[] = app?.offers ?? [];

  const blank = (): Partial<OfferItem> => ({
    id: "", title: "", description: "", type: "lifetime",
    price: 0, currency: "USD", isFree: true, badge: "", actionUrl: "",
  });

  const [form, setForm] = useState<Partial<OfferItem>>(blank());
  const [offers, setOffers] = useState<OfferItem[]>(existing);
  const [copied, setCopied] = useState(false);

  // Reset list when app tab changes.
  useEffect(() => {
    setOffers(findApp(appId)?.offers ?? []);
    setForm(blank());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  function set(k: keyof OfferItem, v: unknown) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function add() {
    if (!form.id?.trim() || !form.title?.trim()) return;
    const offer: OfferItem = {
      id: form.id!.trim(),
      title: form.title!.trim(),
      description: (form.description ?? "").trim(),
      type: (form.type ?? "lifetime") as OfferItem["type"],
      durationDays: form.type === "subscription" ? (form.durationDays ?? 30) : undefined,
      price: form.price ?? 0,
      currency: form.currency ?? "USD",
      isFree: form.isFree ?? true,
      badge: form.badge?.trim() || undefined,
      actionUrl: form.actionUrl?.trim() || undefined,
    };
    setOffers((prev) => [...prev, offer]);
    setForm(blank());
  }

  function remove(id: string) {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  }

  function copyConfig() {
    const out = JSON.stringify(offers, null, 2);
    navigator.clipboard.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold">App Offers · {app?.name ?? appId}</h2>
        {offers.length > 0 && (
          <button onClick={copyConfig}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10">
            {copied ? "✓ Copied!" : "Copy JSON"}
          </button>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-5">
        Define promotional offer cards shown inside the app&apos;s Offers screen.
        Add entries here, then paste the generated JSON into the{" "}
        <span className="text-white font-mono">offers</span> field for{" "}
        <span className="text-white font-mono">{appId}</span> in{" "}
        <span className="text-white font-mono">lib/apps.ts</span>.
      </p>

      {/* Existing offers */}
      {offers.length > 0 && (
        <div className="mb-6 space-y-2">
          {offers.map((o) => (
            <div key={o.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-black/30 border border-white/10">
              <div>
                <span className="font-semibold text-sm text-white">{o.title}</span>
                <span className="ml-2 text-xs text-gray-400">{REWARD_LABELS[o.type] ?? o.type}</span>
                {o.badge && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                    {o.badge}
                  </span>
                )}
                {o.isFree && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-bold">
                    FREE
                  </span>
                )}
              </div>
              <button onClick={() => remove(o.id)}
                className="text-xs text-red-400 hover:text-red-300">Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      <div className="border border-white/10 rounded-2xl p-4 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Add offer</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <span className={label}>ID (unique slug)</span>
            <input className={input} placeholder="muvees-launch-2025"
              value={form.id ?? ""} onChange={(e) => set("id", e.target.value)} />
          </div>
          <div>
            <span className={label}>Title</span>
            <input className={input} placeholder="Launch Special"
              value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} />
          </div>
        </div>

        <div>
          <span className={label}>Description</span>
          <input className={input} placeholder="Redeem a promo code for free lifetime Pro access."
            value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <span className={label}>Reward type</span>
            <Select value={form.type ?? "lifetime"}
              onChange={(v) => set("type", v as OfferItem["type"])}
              options={REWARD_OPTIONS}
              className={input + " pl-4 pr-10 text-left"} />
          </div>
          {form.type === "subscription" && (
            <div>
              <span className={label}>Duration (days)</span>
              <input type="number" className={input} value={form.durationDays ?? 30}
                onChange={(e) => set("durationDays", parseInt(e.target.value) || 0)} />
            </div>
          )}
          <div>
            <span className={label}>Badge (optional)</span>
            <input className={input} placeholder="LIMITED"
              value={form.badge ?? ""} onChange={(e) => set("badge", e.target.value.toUpperCase())} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 items-end">
          <div>
            <span className={label}>Price</span>
            <input type="number" className={input} value={form.price ?? 0}
              onChange={(e) => set("price", parseFloat(e.target.value) || 0)} />
          </div>
          <div>
            <span className={label}>Currency</span>
            <input className={input} placeholder="USD" value={form.currency ?? "USD"}
              onChange={(e) => set("currency", e.target.value.toUpperCase())} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer pb-2.5">
            <input type="checkbox" className="accent-red-500 w-4 h-4"
              checked={form.isFree ?? true}
              onChange={(e) => set("isFree", e.target.checked)} />
            <span className="text-sm text-gray-300">Mark as free</span>
          </label>
        </div>

        <div>
          <span className={label}>Action URL (optional)</span>
          <input className={input} placeholder="https://…"
            value={form.actionUrl ?? ""} onChange={(e) => set("actionUrl", e.target.value)} />
        </div>

        <button onClick={add}
          disabled={!form.id?.trim() || !form.title?.trim()}
          className="w-full bg-white/10 hover:bg-white/20 disabled:opacity-30 font-bold py-2.5 rounded-xl transition-colors text-sm">
          + Add offer
        </button>
      </div>
    </div>
  );
}
