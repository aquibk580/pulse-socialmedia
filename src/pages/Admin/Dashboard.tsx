import { DashboardOverview } from "@/components/Admin/dashboard-overview";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <DashboardOverview />
      {/* Add more dashboard components as needed */}
    </div>
  );
}