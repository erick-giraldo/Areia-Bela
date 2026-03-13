import { AdminHeader } from '@/components/admin/admin-header'

export default function ChannelsPage() {
  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Channel Manager"
        description="Manage OTA connections and sync settings."
      />
      <div className="flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-[50vh] text-center border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-medium text-muted-foreground mb-2">Channel Manager</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            This module is currently under construction. Please check back later for OTA channel management.
          </p>
        </div>
      </div>
    </div>
  )
}
