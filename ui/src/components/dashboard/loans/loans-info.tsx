import Heading from "@/components/dashboard/commons/heading";
import { LoansChart } from "./loans-chart";

export default function LoansInfo() {
  //TODO: Utkarsh ye sample data diya hai abhi, same schema, fetch from the backend aur global state bna de bas.
  //TODO: Mai uthke skeletons bna dunga (sabke).

  return (
    <div className="w-full pb-8">
      <Heading>Loans</Heading>
      <LoansChart />
    </div>
  );
}
