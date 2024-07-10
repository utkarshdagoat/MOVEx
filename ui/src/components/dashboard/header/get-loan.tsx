import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useState, useEffect } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { VAULT_CONTRACT } from "@/lib/contracts";
import { useToast } from "@/components/ui/use-toast";

const EXCHANGE_RATE_API = import.meta.env.VITE_EXCHANGE_RATE_API
const dataFetch = async () => {
  const res = await axios.get(EXCHANGE_RATE_API)
  const data = await res.data
  return data
}

import { useSubmitTransaction } from "@thalalabs/surf/hooks";
import { createSurfClient, createEntryPayload, EntryPayload } from "@thalalabs/surf";
import { VAULT_ABI } from "@/abi/vault";
import { useMUSDAmountStore } from "@/hooks/useStore";

const aptosConfig = new AptosConfig({
  fullnode: "https://aptos.devnet.m1.movementlabs.xyz"
});
const aptos = new Aptos(aptosConfig);
const client = createSurfClient(aptos);

export default function GetLoan() {
  const [USDAmount, setUSDAmount] = useState(0)
  const [MOVEAmount, setMoveAmount] = useState(0)
  const { signAndSubmitTransaction, account } = useWallet();
  const { toast } = useToast()
  const { setMUSDAmount } = useMUSDAmountStore()

  const {
    isIdle,
    reset,
    isLoading: submitIsLoading,
    error: submitError,
    submitTransaction,
    data: submitResult,
  } = useSubmitTransaction();



  const dynamic_collaterizatoin_value = async () => {
    if (account?.address) {
      console.log(account.address, USDAmount * 10 ** 6)
      const tx = await axios.post("https://aptos.devnet.m1.movementlabs.xyz/v1/view", {
        "arguments": [
          account.address,
          (USDAmount * 10 ** 6).toString()
        ],
        "function": `${VAULT_CONTRACT}::Vault::get_dynamic_interest_rate`,
        "type_arguments": []
      })
      console.log(tx.data[0])
      if (Number(tx.data[0]) == 0) {
        setMoveAmount(USDAmount * 1.5)
      } else {
        let k = (Math.E) ** ((USDAmount) * tx.data[0] / 10)
        setUSDAmount(k * 1.5 * USDAmount)

      }
    }

    async function getMUSDBalance() {
      if (!account) setMUSDAmount(0)
      console.log("here")
      if (account?.address) {
        console.log("here")
        const resource = await aptos.getAccountResource({
          accountAddress: account?.address,
          resourceType: `0x1::coin::CoinStore<${VAULT_CONTRACT}::Vault::MUSD>`,
        });
        console.log(resource)
        setMUSDAmount(resource.coin.value / 10 ** 6)
      }
    }
    useEffect(() => {
      getMUSDBalance()
    }, [account?.address])
    async function deposit() {

      const payload = createEntryPayload(VAULT_ABI, {
        /// @ts-ignore
        function: "deposit",
        /// @ts-ignore
        typeArguments: [],
        /// @ts-ignore
        functionArguments: [Math.floor(MOVEAmount * 10 ** 8), Math.floor(USDAmount * 10 ** 6)]
      });
      const tx = await submitTransaction(payload);
      console.log(tx)
    }

    useEffect(() => {
      const delayDebounceFn = setTimeout(async () => {
        const data = await dataFetch()
        const price = data.data.price;
        if (price) {
          setMoveAmount(USDAmount / (price))
        }
      }, 750)

      return () => clearTimeout(delayDebounceFn)
    }, [USDAmount])


    return (
      <>
        <Dialog>
          <DialogTrigger>
            <Button>Get Loan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Get a Loan</DialogTitle>
            </DialogHeader>
            <Label className="text-muted-foreground" htmlFor="amount" />
            <Input
              id="amount"
              name="amount"
              placeholder="Enter Loan Amount USD"
              value={USDAmount}
              onChange={(e) => setUSDAmount(Number(e.target.value))}
              type="number"
            />
            <Input
              id="amount"
              name="amount"
              placeholder="Your Arch Amount"
              value={MOVEAmount}
              disabled
            />
            <p className="text-xs mt-2 text-muted-foreground">Select the loan type</p>
            <div className="flex flex-row gap-2">
              <Button variant="secondary" className="flex-1">Fixed</Button>
              <Button variant="secondary" className="flex-1" onClick={dynamic_collaterizatoin_value}>Dynamic</Button>
            </div>

            <div className="flex flex-row gap-2">
              <Input className="flex-1" placeholder="Your wallet Address"></Input>
            </div>

            <Button onClick={deposit}>Apply</Button>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
