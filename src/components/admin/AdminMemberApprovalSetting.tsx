import { updateMemberApprovalSettingAction } from "@/app/admin-portal/members/settings/actions";

export function AdminMemberApprovalSetting({ requireAdminApproval }: { requireAdminApproval: boolean }) {
  return (
    <form action={updateMemberApprovalSettingAction} className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-zinc-950">Member approval</div>
          <p className="mt-2 text-sm text-zinc-700">
            If enabled, new registrations stay <span className="font-mono">pending</span> until admin approves.
            If disabled, registrations become <span className="font-mono">approved</span> instantly.
          </p>
        </div>

        <label className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2">
          <input
            type="checkbox"
            name="requireAdminApproval"
            defaultChecked={requireAdminApproval}
            className="h-4 w-4 accent-[var(--color-green)]"
          />
          <span className="text-sm font-semibold text-zinc-950">Require admin approval</span>
        </label>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-xs font-semibold text-white"
        >
          Save setting
        </button>
      </div>
    </form>
  );
}

