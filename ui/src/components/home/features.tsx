import mosaicToken from "@/assets/tokens/reward-token.svg";
import mUSDC from "@/assets/tokens/musdc-token.svg";
import dao from "@/assets/tokens/dao.svg";

import AnimatedTextGradient from "@/components/ui/animated-text-gradient";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type Feature = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export default function Features() {
  const features: Feature[] = [
    {
      title: "Algorithmic Stablecoin",
      description:
        "MOVEx is an algorithmic stablecoin protocol that aims to provide a decentralized, scalable, and secure stablecoin.",
      image: mosaicToken,
      alt: "Algorithmic Stablecoin",
    },
    {
      title: "Collaterized Debt Positions",
      description:
        "Users can mint MOVEx's stablecoin, MOVEx USD (mUSD), by depositing collateral in the form of various crypto assets.",
      image: mUSDC,
      alt: "collaterized debt",
    },
    {
      title: "Truly decentralized via DAO",
      description:
        "MOVEx is governed by a DAO, which allows token holders to vote on proposals and changes to the protocol.",
      image: dao,
      alt: "DAO",
    },
  ];
  return (
    <section className="relative max-w-full mb-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <h1 className="text-6xl text-center tracking-tight md:text-5xl">
          Discover the{" "}
          <AnimatedTextGradient
            className="font-bold"
            text="MOVEx"
            from="from-primary"
            via="via-orange-500"
            to="to-red-600"
          />{" "}
          Experience
        </h1>
        <div className="grid grid-cols-1 gap-4  max-w-6xl mt-8 mx-auto md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  image,
  alt,
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
}) {
  return (
    <Card className="bg-primary/10 p-2 border-none">
      <div className="bg-background rounded-md">
        <CardHeader>
          <CardTitle className="leading-6">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={image} alt={alt} className="w-24 h-24 mx-auto" />
        </CardContent>
      </div>
    </Card>
  );
}
