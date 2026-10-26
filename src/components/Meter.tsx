export default function Meter({ hold, shine, dark = true }: { hold: number; shine: number; dark?: boolean }) {
  const track = dark ? "bg-navy-line" : "bg-cream-deep";
  const Row = ({ label, v }: { label: string; v: number }) => (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-12 font-medium">{label}</span>
      <span className={`h-1 flex-1 rounded-full ${track}`}><span className="block h-full rounded-full bg-silver" style={{ width: `${v}%`, background: dark ? undefined : "#0d1b2e" }} /></span>
    </div>
  );
  return <div className="space-y-2"><Row label="Hold" v={hold} /><Row label="Shine" v={shine} /></div>;
}
