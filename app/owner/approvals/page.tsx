import { ApprovalsList } from "@/components/owner/approvals-list"

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Pending Approvals</h2>
      <p className="text-muted-foreground max-w-2xl">
        Review and process approval requests from companies on the platform.
      </p>

      <ApprovalsList />
    </div>
  )
}

