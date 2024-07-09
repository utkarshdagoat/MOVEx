type AnimatedGradientTextProps = {
  text: string;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
};

export default function AnimatedTextGradient(props: AnimatedGradientTextProps) {
  const from = props.from || "from-primary";
  const via = props.via || "via-orange-500";
  const to = props.to || "to-red-400";
  return (
    <span
      className={`animate-text-gradient bg-gradient-to-r ${props.className} ${from} ${via} ${to} bg-[200%_auto] bg-clip-text text-transparent`}
    >
      {props.text}
    </span>
  );
}
