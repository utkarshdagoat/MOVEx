import DashboardHeader from "@/components/dashboard/header/dashboard-header";
import VacantState from "@/components/dashboard/vacant-state";
import OccupiedState from "@/components/dashboard/occupied-state";

import { useState } from "react";

export default function Dashboard() {
    const [vacant, setVacant] = useState(false);
  return (
    <div
      className={`max-w-[64rem] w-80% h-screen space-y-8 mx-auto py-4 px-8 lg:px-4 sleek-scrollbar`}
    >
      <DashboardHeader />
      {vacant ? <VacantState /> : <OccupiedState />}
    </div>
  );
}
