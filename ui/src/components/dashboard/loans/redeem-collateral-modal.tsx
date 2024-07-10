import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState , useEffect} from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { createEntryPayload } from "@thalalabs/surf";
import { VAULT_ABI } from "@/abi/vault";
import { useSubmitTransaction } from "@thalalabs/surf/hooks";

const EXCHANGE_RATE_API = import.meta.env.VITE_EXCHANGE_RATE_API
const dataFetch = async () => {
  const res = await axios.get(EXCHANGE_RATE_API)
  const data = await res.data
  return data
}
export default function RedeemCollateralModal() {


  const [repayAmount, setRepayAmount] = useState(0.0);
  const [collateralReimbursed, setCollateralReimbursed] = useState(0);
  // const {signAndSubmitTransaction,account} = useWallet()
  const {
    isIdle,
    reset,
    isLoading: submitIsLoading,
    error: submitError,
    submitTransaction,
    data: submitResult,
  } = useSubmitTransaction();


  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const data = await dataFetch()
      const price = data.data.price;
      if (price) {
        setCollateralReimbursed(repayAmount/ (price))
      }
    }, 750)

    return () => clearTimeout(delayDebounceFn)
  }, [repayAmount])


  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = createEntryPayload(VAULT_ABI, {
      /// @ts-ignore
      function: "withdraw",
      /// @ts-ignore
      typeArguments: [],
      /// @ts-ignore
      functionArguments: [Math.floor(repayAmount* 10 ** 6), Math.floor(collateralReimbursed * 10 ** 8)]
    });
    const tx = await submitTransaction(payload);
    console.log(tx)
  };


  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Redeem</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redeem Collateral</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSumbit}>
          <div>
            <Label>Amount $</Label>
            <Input
              type="number"
              placeholder="Repayment amount (in USD)"
              onChange={(e) => setRepayAmount(parseFloat(e.target.value))}
            />
          </div>
          <div className="bg-muted/40 border py-3 px-4 rounded-md flex justify-between">
            <h1 className="text-sm text-muted-foreground font-semibold">
              Collateral Reimbursed
            </h1>
            <div className="text-foreground inline-flex items-center gap-2 text-sm font-semibold">
              {collateralReimbursed} MOVE 
            </div>
          </div>
          <Button type="submit">Redeem</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
