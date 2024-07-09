import DashboardHeader from "@/components/dashboard/header/dashboard-header";
import Proposals from "@/components/governance/proposals";
import Members from "@/components/governance/members";

export default function Governance() {
  return (
    <div
      className={`max-w-[64rem] w-80% h-screen space-y-8 mx-auto py-4 px-8 lg:px-4 sleek-scrollbar`}
    >
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Proposals />
        </div>
        <Members />
      </div>
    </div>
  );
}