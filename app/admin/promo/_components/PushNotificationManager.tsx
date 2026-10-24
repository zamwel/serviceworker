"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { type AppEntry, findApp } from "@/lib/apps";
import {
  Send,
  Save,
  RefreshCw,
  Edit3,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart3,
  Eye,
  MousePointerClick,
  Lock,
  X,
  Info,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export interface PushNotificationRecord {
  id: string;
  appId: string;
  appName: string | null;
  packageName: string | null;
  topic: string;
  channelId: string | null;
  title: string;
  body: string;
  imageUrl: string | null;
  actionUrl: string | null;
  analyticsLabel: string | null;
  status: "sent" | "draft" | "failed";
  fcmMessageId: string | null;
  error: string | null;
  sentAt: string | null;
  receivedCount: number;
  tappedCount: number;
  lastSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface StatsData {
  projectId: string;
  firebaseConsoleUrl: string;
  totals: {
    totalSent: number;
    totalReceived: number;
    totalTapped: number;
    overallTapRate: number;
  };
  fcmDataApiStatus?: {
    checked: boolean;
    enabled: boolean;
    activationUrl?: string;
    note?: string;
  };
}

interface Props {
  appId: string;
  currentApp?: AppEntry;
  allApps: AppEntry[];
  headers: () => Record<string, string>;
}

export function PushNotificationManager({
  appId,
  currentApp,
  allApps,
  headers,
}: Props) {
  // ── Composer State ────────────────────────────────────────────────────────
  const [selectedAppId, setSelectedAppId] = useState(appId);
  const targetApp = useMemo(
    () => allApps.find((a) => a.id === selectedAppId) || currentApp,
    [allApps, selectedAppId, currentApp]
  );

  const [title, setTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [actionUrl, setActionUrl] = useState("");
  const [useTapTracking, setUseTapTracking] = useState(true);
  const [topic, setTopic] = useState(targetApp?.fcmTopic || "all");
  const [packageName, setPackageName] = useState(targetApp?.packageName || "");
  const [channelId, setChannelId] = useState(
    targetApp?.channelId || `${selectedAppId}_broadcasts`
  );
  const [analyticsLabel, setAnalyticsLabel] = useState("");
  const [sending, setSending] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Sync composer when app tab changes
  useEffect(() => {
    setSelectedAppId(appId);
  }, [appId]);

  useEffect(() => {
    if (targetApp) {
      setTopic(targetApp.fcmTopic || "all");
      setPackageName(targetApp.packageName || "");
      setChannelId(targetApp.channelId || `${targetApp.id}_broadcasts`);
      const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const randPart = Math.random().toString(36).substring(2, 6);
      setAnalyticsLabel(`${targetApp.id.slice(0, 10)}_${datePart}_${randPart}`);
    }
  }, [targetApp]);

  // ── History & Stats State ─────────────────────────────────────────────────
  const [history, setHistory] = useState<PushNotificationRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyAppFilter, setHistoryAppFilter] = useState<string>(appId);
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>("all");
  const [historySearch, setHistorySearch] = useState("");
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historyPages, setHistoryPages] = useState(1);

  const [stats, setStats] = useState<StatsData | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // ── Modal State ───────────────────────────────────────────────────────────
  const [activeModal, setActiveModal] = useState<{
    mode: "edit" | "resend" | "metrics";
    notification: PushNotificationRecord;
  } | null>(null);

  const [modalForm, setModalForm] = useState<{
    title: string;
    body: string;
    topic: string;
    packageName: string;
    channelId: string;
    imageUrl: string;
    actionUrl: string;
    receivedCount: number;
    tappedCount: number;
    status: string;
    createNewRecord: boolean;
  }>({
    title: "",
    body: "",
    topic: "",
    packageName: "",
    channelId: "",
    imageUrl: "",
    actionUrl: "",
    receivedCount: 0,
    tappedCount: 0,
    status: "sent",
    createNewRecord: true,
  });
  const [modalWorking, setModalWorking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ── Load History ──────────────────────────────────────────────────────────
  const loadHistory = useCallback(
    async (page = historyPage, q = historySearch, appF = historyAppFilter, statusF = historyStatusFilter) => {
      setLoadingHistory(true);
      try {
        const queryParams = new URLSearchParams({
          page: String(page),
          limit: "15",
          ...(appF && appF !== "all" ? { appId: appF } : {}),
          ...(statusF && statusF !== "all" ? { status: statusF } : {}),
          ...(q.trim() ? { q: q.trim() } : {}),
        });

        const res = await fetch(`/api/promo/admin/notify?${queryParams.toString()}`, {
          headers: headers(),
        });

        if (res.ok) {
          const data = await res.json();
          setHistory(data.notifications || []);
          setHistoryTotal(data.total || 0);
          setHistoryPages(data.pages || 1);
        }
      } catch {
        // network error handled silently in table
      } finally {
        setLoadingHistory(false);
      }
    },
    [headers, historyPage, historySearch, historyAppFilter, historyStatusFilter]
  );

  // ── Load Stats ────────────────────────────────────────────────────────────
  const loadStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const filterApp = historyAppFilter && historyAppFilter !== "all" ? historyAppFilter : selectedAppId;
      const res = await fetch(`/api/promo/admin/notify/stats?appId=${filterApp}`, {
        headers: headers(),
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // ignore
    } finally {
      setLoadingStats(false);
    }
  }, [headers, historyAppFilter, selectedAppId]);

  useEffect(() => {
    loadHistory(1, historySearch, historyAppFilter, historyStatusFilter);
    loadStats();
  }, [historyAppFilter, historyStatusFilter, loadHistory, loadStats]);

  // ── Composer Actions ──────────────────────────────────────────────────────
  function generateNewLabel() {
    const cleanApp = selectedAppId.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10);
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const randPart = Math.random().toString(36).substring(2, 6);
    setAnalyticsLabel(`${cleanApp}_${datePart}_${randPart}`);
  }

  async function handleSendOrDraft(action: "send" | "draft") {
    if (!title.trim() || !messageBody.trim()) {
      setStatusMsg({ type: "error", text: "Title and message body are required." });
      return;
    }

    if (action === "send") setSending(true);
    else setSavingDraft(true);
    setStatusMsg(null);

    try {
      const payload = {
        action,
        appId: selectedAppId,
        appName: targetApp?.name || selectedAppId,
        title: title.trim(),
        body: messageBody.trim(),
        imageUrl: imageUrl.trim() || undefined,
        actionUrl: actionUrl.trim() || undefined,
        topic: topic.trim() || targetApp?.fcmTopic || "all",
        packageName: packageName.trim() || targetApp?.packageName || undefined,
        channelId: channelId.trim() || undefined,
        analyticsLabel: analyticsLabel.trim() || undefined,
      };

      const res = await fetch("/api/promo/admin/notify", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({
          type: "success",
          text:
            action === "send"
              ? `✓ Push broadcast successfully sent to ${targetApp?.name || selectedAppId} (Locked to package: ${data.notification?.packageName || "Enforced"})!`
              : "✓ Draft notification saved successfully!",
        });
        if (action === "send") {
          setTitle("");
          setMessageBody("");
          setImageUrl("");
          setActionUrl("");
          generateNewLabel();
        }
        await Promise.all([loadHistory(1), loadStats()]);
      } else {
        setStatusMsg({
          type: "error",
          text: `✗ Failed: ${data.error || data.message || "Unknown error occurred"}`,
        });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Network error sending notification." });
    } finally {
      setSending(false);
      setSavingDraft(false);
    }
  }

  // ── Modal Actions ─────────────────────────────────────────────────────────
  function openEditModal(notif: PushNotificationRecord) {
    setActiveModal({ mode: "edit", notification: notif });
    setModalForm({
      title: notif.title,
      body: notif.body,
      topic: notif.topic,
      packageName: notif.packageName || "",
      channelId: notif.channelId || "",
      imageUrl: notif.imageUrl || "",
      actionUrl: notif.actionUrl || "",
      receivedCount: notif.receivedCount || 0,
      tappedCount: notif.tappedCount || 0,
      status: notif.status,
      createNewRecord: false,
    });
  }

  function openResendModal(notif: PushNotificationRecord) {
    setActiveModal({ mode: "resend", notification: notif });
    setModalForm({
      title: notif.title,
      body: notif.body,
      topic: notif.topic,
      packageName: notif.packageName || targetApp?.packageName || "",
      channelId: notif.channelId || targetApp?.channelId || "",
      imageUrl: notif.imageUrl || "",
      actionUrl: notif.actionUrl || "",
      receivedCount: notif.receivedCount || 0,
      tappedCount: notif.tappedCount || 0,
      status: "sent",
      createNewRecord: true,
    });
  }

  function openMetricsModal(notif: PushNotificationRecord) {
    setActiveModal({ mode: "metrics", notification: notif });
    setModalForm({
      title: notif.title,
      body: notif.body,
      topic: notif.topic,
      packageName: notif.packageName || "",
      channelId: notif.channelId || "",
      imageUrl: notif.imageUrl || "",
      actionUrl: notif.actionUrl || "",
      receivedCount: notif.receivedCount || 0,
      tappedCount: notif.tappedCount || 0,
      status: notif.status,
      createNewRecord: false,
    });
  }

  async function handleModalSubmit() {
    if (!activeModal) return;
    setModalWorking(true);

    try {
      if (activeModal.mode === "edit" || activeModal.mode === "metrics") {
        const res = await fetch("/api/promo/admin/notify", {
          method: "PATCH",
          headers: headers(),
          body: JSON.stringify({
            id: activeModal.notification.id,
            title: modalForm.title.trim(),
            body: modalForm.body.trim(),
            topic: modalForm.topic.trim(),
            packageName: modalForm.packageName.trim() || null,
            channelId: modalForm.channelId.trim() || null,
            imageUrl: modalForm.imageUrl.trim() || null,
            actionUrl: modalForm.actionUrl.trim() || null,
            status: modalForm.status,
            receivedCount: modalForm.receivedCount,
            tappedCount: modalForm.tappedCount,
          }),
        });

        if (res.ok) {
          setActiveModal(null);
          await Promise.all([loadHistory(), loadStats()]);
        }
      } else if (activeModal.mode === "resend") {
        const res = await fetch("/api/promo/admin/notify/resend", {
          method: "POST",
          headers: headers(),
          body: JSON.stringify({
            id: activeModal.notification.id,
            createNewRecord: modalForm.createNewRecord,
            title: modalForm.title.trim(),
            body: modalForm.body.trim(),
            topic: modalForm.topic.trim(),
            packageName: modalForm.packageName.trim() || undefined,
            channelId: modalForm.channelId.trim() || undefined,
            imageUrl: modalForm.imageUrl.trim() || undefined,
            actionUrl: modalForm.actionUrl.trim() || undefined,
          }),
        });

        if (res.ok) {
          setActiveModal(null);
          await Promise.all([loadHistory(), loadStats()]);
        }
      }
    } finally {
      setModalWorking(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this notification from history?")) return;
    try {
      await fetch(`/api/promo/admin/notify?id=${id}`, {
        method: "DELETE",
        headers: headers(),
      });
      await Promise.all([loadHistory(), loadStats()]);
    } catch {
      alert("Failed to delete notification.");
    }
  }

  function cloneToComposer(notif: PushNotificationRecord) {
    setSelectedAppId(notif.appId);
    setTitle(notif.title);
    setMessageBody(notif.body);
    setImageUrl(notif.imageUrl || "");
    setActionUrl(notif.actionUrl || "");
    setTopic(notif.topic);
    setPackageName(notif.packageName || "");
    setChannelId(notif.channelId || "");
    generateNewLabel();
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  function copyLabel(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // Styles
  const inputStyle =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none transition-colors text-sm";
  const labelStyle =
    "text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5";

  return (
    <div className="space-y-8">
      {/* ── Top Header & Isolation Banner ──────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950/40 via-white/[0.03] to-black border border-red-500/20 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-App Push Isolation Engine Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Push Notification Command Center
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-2xl">
              Target specific apps with strict package isolation. Even when broadcasting to the shared{" "}
              <code className="text-red-400 font-mono bg-red-500/10 px-1.5 py-0.5 rounded text-xs">&quot;all&quot;</code> topic,
              hardware-enforced <code className="text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs">restricted_package_name</code> and{" "}
              <code className="text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs">apns-topic</code> prevent any other app in your Firebase project from receiving it.
            </p>
          </div>

          {/* Quick App Switcher for Broadcast */}
          <div className="flex flex-col gap-2 shrink-0 bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Active Target App
            </span>
            <div className="flex items-center gap-2">
              <select
                value={selectedAppId}
                onChange={(e) => setSelectedAppId(e.target.value)}
                className="bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-red-500"
              >
                {allApps.map((a) => (
                  <option key={a.id} value={a.id} className="bg-[#121212] text-white">
                    {a.name} ({a.id})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Current Constraint Status Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 rounded-xl p-3">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Package Lock</span>
              <span className="font-mono text-emerald-300 font-semibold truncate block">
                {packageName || targetApp?.packageName || "Locked to app ID"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 rounded-xl p-3">
            <Layers className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Target Topic</span>
              <span className="font-mono text-blue-300 font-semibold truncate block">
                {topic || targetApp?.fcmTopic || "all"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 rounded-xl p-3">
            <Smartphone className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">System Channel</span>
              <span className="font-mono text-purple-300 font-semibold truncate block">
                {channelId}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key Performance Metrics Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Broadcasts Sent</span>
            <Send className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">
            {stats?.totals.totalSent ?? history.filter((h) => h.status === "sent").length}
          </p>
          <span className="text-[11px] text-gray-500 mt-1 block">Live across all campaigns</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Devices Received</span>
            <Smartphone className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">
            {stats?.totals.totalReceived ?? history.reduce((a, b) => a + (b.receivedCount || 0), 0)}
          </p>
          <span className="text-[11px] text-gray-500 mt-1 block">Zero-touch FCM delivery</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tapped / Opened</span>
            <MousePointerClick className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-cyan-400">
            {stats?.totals.totalTapped ?? history.reduce((a, b) => a + (b.tappedCount || 0), 0)}
          </p>
          <span className="text-[11px] text-gray-500 mt-1 block">Notification clicks recorded</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tap-Through Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400">
            {stats?.totals.overallTapRate ?? 0}%
          </p>
          <span className="text-[11px] text-gray-500 mt-1 block">Overall open engagement</span>
        </div>
      </div>

      {/* ── Firebase / Google Cloud Attribution Callout ───────────────────── */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 grid place-items-center text-amber-400 shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">
              Zero-App-Touch Tracking &amp; Analytics
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Every broadcast includes an <code className="text-gray-300 font-mono">analytics_label</code>. Google Play Services and iOS Firebase SDK automatically attribute receives and opens to this label without requiring mobile app updates.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {stats?.firebaseConsoleUrl && (
            <a
              href={stats.firebaseConsoleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              <span>Firebase Reports</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
          )}
          {stats?.fcmDataApiStatus?.activationUrl && !stats.fcmDataApiStatus.enabled && (
            <a
              href={stats.fcmDataApiStatus.activationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 text-red-300 text-xs font-bold transition-colors"
              title="Activate Google Cloud FCM Data API to fetch delivery metrics directly into this dashboard"
            >
              <span>Enable GCP FCM API</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* ── Notification Composer & Live Preview ──────────────────────────── */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Form Panel */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-red-500" />
              <span>Compose Broadcast Notification</span>
            </h3>
            <span className="text-xs text-gray-400 font-mono">
              Target: <strong className="text-white">{targetApp?.name}</strong>
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>
                <span>App / Package Constraint</span>
                <span className="text-emerald-400 text-[10px] font-mono lowercase">(restricts delivery)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`${inputStyle} pr-8 font-mono text-xs text-emerald-300 border-emerald-500/30`}
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="e.g. com.codeink.stsl.muvees"
                />
                <Lock className="w-3.5 h-3.5 text-emerald-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className={labelStyle}>
                <span>FCM Topic</span>
                <span className="text-blue-400 text-[10px] font-mono lowercase">(e.g. all)</span>
              </label>
              <input
                type="text"
                className={`${inputStyle} font-mono text-xs`}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="all"
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>
              <span>Notification Title</span>
              <span className="text-gray-500 text-[10px]">({title.length}/60 chars)</span>
            </label>
            <input
              type="text"
              className={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 🔥 Weekend Special: Free Pro Access Unlocked!"
              maxLength={100}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <span>Message Body</span>
              <span className="text-gray-500 text-[10px]">({messageBody.length}/240 chars)</span>
            </label>
            <textarea
              className={`${inputStyle} resize-y min-h-[90px]`}
              rows={3}
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              placeholder="e.g. Tap here to discover this week's exclusive rewards and premium features tailored for you…"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Image URL (optional banner)</label>
              <input
                type="url"
                className={inputStyle}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/…"
              />
            </div>

            <div>
              <label className={labelStyle}>Action / Tap URL (optional)</label>
              <input
                type="url"
                className={inputStyle}
                value={actionUrl}
                onChange={(e) => setActionUrl(e.target.value)}
                placeholder="https://… or app://offer"
              />
            </div>
          </div>

          {/* Advanced Constraints Fold-down */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className={labelStyle}>
                <span>Notification Channel ID</span>
              </label>
              <input
                type="text"
                className={`${inputStyle} font-mono text-xs`}
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                placeholder="e.g. muvees_broadcasts"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelStyle}>Analytics Campaign Label</label>
                <button
                  type="button"
                  onClick={generateNewLabel}
                  className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-2.5 h-2.5" /> Auto-gen
                </button>
              </div>
              <input
                type="text"
                className={`${inputStyle} font-mono text-xs`}
                value={analyticsLabel}
                onChange={(e) => setAnalyticsLabel(e.target.value)}
                placeholder="e.g. muvees_261024_launch"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleSendOrDraft("send")}
              disabled={sending || savingDraft || !title.trim() || !messageBody.trim()}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 text-sm"
            >
              {sending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Broadcasting…</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Broadcast to {targetApp?.name}</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSendOrDraft("draft")}
              disabled={sending || savingDraft || !title.trim() || !messageBody.trim()}
              className="bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4 text-gray-400" />
              <span>Save as Draft</span>
            </button>

            {statusMsg && (
              <div
                className={`text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-2 ${
                  statusMsg.type === "success"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : statusMsg.type === "error"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Device Notification Preview Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 px-1">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Mobile Push Preview</span>
            </span>
            <span className="text-gray-500">Android / iOS</span>
          </div>

          <div className="bg-gradient-to-b from-[#18181b] to-[#09090b] border border-white/15 rounded-3xl p-5 shadow-2xl space-y-4">
            {/* Phone notification card */}
            <div className="bg-[#27272a]/80 backdrop-blur border border-white/10 rounded-2xl p-4 shadow-lg space-y-2.5">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-red-600 grid place-items-center text-[10px] font-black text-white">
                    {targetApp?.name?.charAt(0) || "P"}
                  </div>
                  <span className="font-semibold text-white text-xs">{targetApp?.name || "Muvees"}</span>
                  <span className="text-[10px] text-gray-500">• now</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400">
                  {topic || "all"}
                </span>
              </div>

              <div>
                <p className="font-bold text-sm text-white leading-tight">
                  {title || "Weekend Special: Exclusive Pro Rewards"}
                </p>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  {messageBody ||
                    "Tap to explore your latest movies, customized recommendations, and unlimited offline streaming…"}
                </p>
              </div>

              {imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden border border-white/10 max-h-36 bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Constraint Details in Preview */}
            <div className="bg-black/40 rounded-xl p-3 text-[11px] text-gray-400 space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-gray-500">Constraint:</span>
                <span className="text-emerald-400 truncate max-w-[180px]">
                  {packageName || targetApp?.packageName || "Any (warning: unconstrained)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Channel:</span>
                <span className="text-purple-300">{channelId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Analytics:</span>
                <span className="text-cyan-300 truncate max-w-[180px]">{analyticsLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Notification History & Management ─────────────────────────────── */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              <span>Notification History &amp; Management</span>
              {historyTotal > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                  {historyTotal}
                </span>
              )}
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              Edit, resend, manage, and track received/tapped counts for every push notification sent from this server.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter by App */}
            <select
              value={historyAppFilter}
              onChange={(e) => {
                setHistoryAppFilter(e.target.value);
                setHistoryPage(1);
              }}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
            >
              <option value="all">All Apps</option>
              {allApps.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            {/* Filter by Status */}
            <select
              value={historyStatusFilter}
              onChange={(e) => {
                setHistoryStatusFilter(e.target.value);
                setHistoryPage(1);
              }}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="draft">Drafts</option>
              <option value="failed">Failed</option>
            </select>

            <button
              onClick={() => {
                loadHistory();
                loadStats();
              }}
              disabled={loadingHistory}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Refresh History"
            >
              <RefreshCw className={`w-4 h-4 ${loadingHistory ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            className={inputStyle}
            placeholder="Search notifications by title, body, topic, or analytics label…"
            value={historySearch}
            onChange={(e) => {
              setHistorySearch(e.target.value);
              setHistoryPage(1);
              loadHistory(1, e.target.value);
            }}
          />
        </div>

        {/* History Table */}
        {loadingHistory ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-red-500" />
            Loading notification records…
          </div>
        ) : history.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm border border-dashed border-white/10 rounded-2xl">
            No notifications found for this filter. Compose and send a broadcast above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 pl-2">Status</th>
                  <th className="pb-3">App &amp; Isolation Constraint</th>
                  <th className="pb-3">Notification Content</th>
                  <th className="pb-3">Analytics Label</th>
                  <th className="pb-3 text-center">📱 Received</th>
                  <th className="pb-3 text-center">👆 Tapped</th>
                  <th className="pb-3">Sent / Date</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.map((item) => {
                  const tapRate =
                    item.receivedCount > 0
                      ? Math.round((item.tappedCount / item.receivedCount) * 100)
                      : null;

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* Status */}
                      <td className="py-3 pl-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.status === "sent"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : item.status === "draft"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {item.status === "sent" ? "Sent" : item.status === "draft" ? "Draft" : "Failed"}
                        </span>
                      </td>

                      {/* App & Constraint */}
                      <td className="py-3 whitespace-nowrap">
                        <span className="font-bold text-white block">
                          {item.appName || item.appId}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5 font-mono text-[10px]">
                          {item.packageName ? (
                            <span
                              className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded flex items-center gap-0.5 truncate max-w-[130px]"
                              title={`Restricted to package: ${item.packageName}`}
                            >
                              <Lock className="w-2.5 h-2.5 shrink-0" />
                              {item.packageName}
                            </span>
                          ) : (
                            <span className="text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded">
                              no-package-lock
                            </span>
                          )}
                          <span className="text-gray-500">#{item.topic}</span>
                        </div>
                      </td>

                      {/* Content */}
                      <td className="py-3 max-w-xs">
                        <div className="flex items-start gap-2">
                          {item.imageUrl && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={item.imageUrl}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover shrink-0 border border-white/10"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-white truncate">{item.title}</p>
                            <p className="text-gray-400 line-clamp-1 text-[11px] mt-0.5">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Analytics Label */}
                      <td className="py-3 whitespace-nowrap">
                        {item.analyticsLabel ? (
                          <button
                            onClick={() => copyLabel(item.analyticsLabel!)}
                            className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded transition-colors"
                            title="Click to copy label"
                          >
                            <span>{item.analyticsLabel}</span>
                            {copiedId === item.analyticsLabel ? (
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                          </button>
                        ) : (
                          <span className="text-gray-600 font-mono">—</span>
                        )}
                      </td>

                      {/* Received Count */}
                      <td className="py-3 text-center whitespace-nowrap font-mono text-xs">
                        <span className="font-bold text-emerald-400">{item.receivedCount}</span>
                      </td>

                      {/* Tapped Count */}
                      <td className="py-3 text-center whitespace-nowrap font-mono text-xs">
                        <span className="font-bold text-cyan-400">{item.tappedCount}</span>
                        {tapRate !== null && (
                          <span className="text-[10px] text-gray-500 block">
                            {tapRate}%
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3 whitespace-nowrap text-gray-400 text-[11px]">
                        {item.sentAt ? (
                          <>
                            <span className="block text-white">
                              {new Date(item.sentAt).toLocaleDateString()}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              {new Date(item.sentAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-500 italic">Draft</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 pr-2 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openResendModal(item)}
                            className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-300 transition-colors"
                            title="Resend notification"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Edit notification"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => cloneToComposer(item)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 transition-colors"
                            title="Clone to composer"
                          >
                            <Layers className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openMetricsModal(item)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-cyan-300 transition-colors"
                            title="Adjust metrics"
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {historyPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-gray-400">
            <span>
              Page {historyPage} of {historyPages} ({historyTotal} notifications)
            </span>
            <div className="flex gap-2">
              <button
                disabled={historyPage <= 1}
                onClick={() => {
                  const p = historyPage - 1;
                  setHistoryPage(p);
                  loadHistory(p);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                disabled={historyPage >= historyPages}
                onClick={() => {
                  const p = historyPage + 1;
                  setHistoryPage(p);
                  loadHistory(p);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Edit / Resend / Metrics Modal ─────────────────────────────────── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center p-4">
          <div className="bg-[#121214] border border-white/15 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                {activeModal.mode === "edit" ? (
                  <>
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Edit Push Notification</span>
                  </>
                ) : activeModal.mode === "resend" ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-red-500" />
                    <span>Resend Push Notification</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span>Adjust Delivery &amp; Tap Metrics</span>
                  </>
                )}
              </h4>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs">
              {activeModal.mode === "resend" && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-emerald-300">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    App Isolation Guard Active
                  </p>
                  <p className="text-[11px] text-emerald-400/80 mt-1">
                    Resending will broadcast specifically to{" "}
                    <strong>{activeModal.notification.appName || activeModal.notification.appId}</strong>, enforcing package constraint{" "}
                    <code>{modalForm.packageName || activeModal.notification.packageName || "Locked"}</code>.
                  </p>
                </div>
              )}

              {activeModal.mode !== "metrics" && (
                <>
                  <div>
                    <label className={labelStyle}>Title</label>
                    <input
                      className={inputStyle}
                      value={modalForm.title}
                      onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Message Body</label>
                    <textarea
                      className={`${inputStyle} resize-y`}
                      rows={3}
                      value={modalForm.body}
                      onChange={(e) => setModalForm({ ...modalForm, body: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelStyle}>Topic</label>
                      <input
                        className={inputStyle}
                        value={modalForm.topic}
                        onChange={(e) => setModalForm({ ...modalForm, topic: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>Package Lock</label>
                      <input
                        className={`${inputStyle} font-mono text-emerald-300`}
                        value={modalForm.packageName}
                        onChange={(e) =>
                          setModalForm({ ...modalForm, packageName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelStyle}>Image URL</label>
                      <input
                        className={inputStyle}
                        value={modalForm.imageUrl}
                        onChange={(e) => setModalForm({ ...modalForm, imageUrl: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelStyle}>Action URL</label>
                      <input
                        className={inputStyle}
                        value={modalForm.actionUrl}
                        onChange={(e) => setModalForm({ ...modalForm, actionUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Metrics adjustment fields */}
              {(activeModal.mode === "metrics" || activeModal.mode === "edit") && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <div>
                    <label className={labelStyle}>Received Devices Count</label>
                    <input
                      type="number"
                      className={inputStyle}
                      value={modalForm.receivedCount}
                      onChange={(e) =>
                        setModalForm({
                          ...modalForm,
                          receivedCount: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Tapped / Opened Count</label>
                    <input
                      type="number"
                      className={inputStyle}
                      value={modalForm.tappedCount}
                      onChange={(e) =>
                        setModalForm({
                          ...modalForm,
                          tappedCount: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {activeModal.mode === "resend" && (
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    className="accent-red-500 w-4 h-4"
                    checked={modalForm.createNewRecord}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, createNewRecord: e.target.checked })
                    }
                  />
                  <span className="text-gray-300 text-xs">
                    Create as new entry in history log (recommended)
                  </span>
                </label>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                disabled={modalWorking}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5"
              >
                {modalWorking && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>
                  {activeModal.mode === "resend"
                    ? "Confirm & Resend"
                    : activeModal.mode === "edit"
                    ? "Save Changes"
                    : "Update Metrics"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
