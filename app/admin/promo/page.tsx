"use client";

import { useCallback, useEffect, useState } from "react";

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

const APPS = ["muvees", "femcareplus", "subswatcher", "inmeasure", "indocedit"];

export default function PromoAdmin() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [appId, setAppId] = useState("muvees");
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

  // form
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [code, setCode] = useState("");
  const [count, setCount] = useState(50);
  const [prefix, setPrefix] = useState("MV");
  const [rewardType, setRewardType] = useState("lifetime");
  const [durationDays, setDurationDays] = useState(30);
  const [maxRedemptions, setMaxRedemptions] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    const s = localStorage.getItem("promo_admin_secret");
    if (s) { setSecret(s); setAuthed(true); }
  }, []);

  const headers = useCallback(
    () => ({ "Content-Type": "application/json", "x-admin-secret": secret }),
    [secret]
  );

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
      next.has(id) ? next.delete(id) : next.add(id);
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

  // ─────────────────────────────────────────────────────────────────────────

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

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Promo Admin</h1>
            <p className="text-gray-400 text-sm">Manage coupon codes across all apps.</p>
          </div>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-white">Log out</button>
        </header>

        {/* App selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {APPS.map((a) => (
            <button key={a} onClick={() => setAppId(a)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                appId === a ? "bg-red-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* ── Create panel ─────────────────────────────────────────────── */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-fit">
            <h2 className="text-lg font-bold mb-5">Create coupons · {appId}</h2>

            <div className="flex gap-2 mb-5">
              {(["single", "bulk"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-colors ${
                    mode === m ? "bg-red-600" : "bg-white/5 text-gray-400"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {mode === "single" ? (
              <div className="mb-4">
                <span className={label}>Code</span>
                <input className={input} placeholder="WELCOME50" value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())} />
              </div>
            ) : (
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

            <div className="mb-4">
              <span className={label}>Reward</span>
              <select className={input} value={rewardType} onChange={(e) => setRewardType(e.target.value)}>
                <option value="lifetime">Lifetime Pro</option>
                <option value="subscription">Subscription (days)</option>
                <option value="credits">Credits</option>
              </select>
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

            <button onClick={create} disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 font-bold py-3 rounded-xl transition-colors">
              {loading ? "Working…" : mode === "single" ? "Create coupon" : `Generate ${count} codes`}
            </button>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

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

          {/* ── List panel ───────────────────────────────────────────────── */}
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
                      <tr key={c.id}
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
                        </td>
                        <td className="py-2.5 pr-4 text-gray-300">
                          {c.redeemedCount}{c.maxRedemptions > 0 ? ` / ${c.maxRedemptions}` : " / ∞"}
                        </td>
                        <td className="py-2.5 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            c.active ? "bg-green-500/15 text-green-400" : "bg-gray-500/15 text-gray-400"
                          }`}>
                            {c.active ? "active" : "disabled"}
                          </span>
                        </td>
                        <td className="py-2.5 text-right whitespace-nowrap">
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
      </div>
    </div>
  );
}
