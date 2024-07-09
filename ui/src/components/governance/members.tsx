import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Member = {
  address: string;
  role: "creator" | "staker" | "dev";
};

export default function Members() {

  //TODO: Replace this mock data with real data
  const members: Member[] = [
    {
      address: "0x1a2B3C4d5E6F789A",
      role: "creator",
    },
    {
      address: "0xBcDeF0123456789A",
      role: "staker",
    },
    {
      address: "0x9876543210FEDCBA",
      role: "dev",
    },
  ];

  return (
    <div className="pt-4 ps-4 border-l">
      <h1 className="text-2xl font-semibold">Members</h1>
      <TooltipProvider>
        {members.map((member) => (
          <div
            className="w-full flex items-center justify-between border rounded-md my-3 py-1 pr-2"
            key={member.address}
          >
            <Tooltip>
              <TooltipTrigger>
                <CopyAddress address={member.address} />
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-muted-foreground">{member.address}</p>
              </TooltipContent>
            </Tooltip>
            <MemberBadge role={member.role} />
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}

function CopyAddress({ address }: { address: string }) {
  const truncatedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
  const { toast } = useToast();
  return (
    <Button
      className="font-mono"
      size={"sm"}
      variant={"linkHover2"}
      onClick={() => {
        toast({
          description: "Address copied to clipboard",
        });
        navigator.clipboard.writeText(address);
      }}
    >
      {truncatedAddress}
    </Button>
  );
}

function MemberBadge({ role }: { role: Member["role"] }) {
  return (
    <div
      className={`${
        role === "creator"
          ? "bg-primary"
          : role === "staker"
          ? "bg-indigo-400"
          : "bg-emerald-400"
      } rounded-full px-2 w-20 text-center text-xs font-mono py-1 text-white`}
    >
      {role}
    </div>
  );
}