export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-foreground mb-2">{children}</h2>
  );
}
