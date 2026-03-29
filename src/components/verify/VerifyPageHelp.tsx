export function VerifyPageHelp() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-950">QR Standard</div>
        <p className="mt-2 text-sm text-zinc-700">
          हर ID कार्ड पर QR code होगा जो <code>/verify/[id]</code> पर जाएगा।
        </p>
      </div>
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-950">Privacy</div>
        <p className="mt-2 text-sm text-zinc-700">
          Verification पेज पर केवल जरूरी जानकारी दिखाई जाएगी।
        </p>
      </div>
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-950">Tip</div>
        <p className="mt-2 text-sm text-zinc-700">
          Demo ke liye koi bhi uuid paste kijiye. Last character (a/b/c/d) ke basis par status
          change hota dikhega.
        </p>
      </div>
    </div>
  );
}

