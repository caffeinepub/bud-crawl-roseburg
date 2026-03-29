import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const GARMENT_COLORS: { name: string; hex: string }[] = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#1F3060" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Red", hex: "#CC0000" },
  { name: "Forest Green", hex: "#228B22" },
  { name: "Kelly Green", hex: "#4CBB17" },
  { name: "Athletic Gold", hex: "#FFC200" },
  { name: "Purple", hex: "#800080" },
  { name: "Maroon", hex: "#800000" },
  { name: "Orange", hex: "#FF6600" },
  { name: "Carolina Blue", hex: "#56A0D3" },
  { name: "Sport Grey", hex: "#A8A9AD" },
  { name: "Dark Heather", hex: "#6A6A6A" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Brown", hex: "#6B3A2A" },
  { name: "Light Blue", hex: "#ADD8E6" },
  { name: "Pink", hex: "#FFB6C1" },
  { name: "Ash", hex: "#B2BEB5" },
  { name: "Military Green", hex: "#4B5320" },
  { name: "Cardinal", hex: "#C41E3A" },
  { name: "Antique Cherry Red", hex: "#9B1B30" },
  { name: "Irish Green", hex: "#009A44" },
  { name: "Violet Purple", hex: "#6A0DAD" },
  { name: "Texas Orange", hex: "#BF5700" },
  { name: "Safety Green", hex: "#00CC00" },
  { name: "Safety Orange", hex: "#FF6000" },
  { name: "Sand", hex: "#C2B280" },
  { name: "Stone", hex: "#928E85" },
  { name: "Smoke", hex: "#738276" },
  { name: "Heather Navy", hex: "#3B4B6B" },
  { name: "Heather Red", hex: "#B55A6C" },
  { name: "Heather Royal", hex: "#5C7CB3" },
  { name: "Heather Purple", hex: "#7B6B9C" },
];

interface ColorSelectProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export default function ColorSelect({ value, onChange, id }: ColorSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = GARMENT_COLORS.find((c) => c.name === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" id={id}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 h-10 px-3 rounded-md border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <span className="flex items-center gap-2">
          {selected ? (
            <>
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: selected.hex }}
              />
              <span>{selected.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground">Select color...</span>
          )}
        </span>
        <ChevronDown
          size={14}
          className="text-muted-foreground flex-shrink-0"
        />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-md shadow-modal max-h-64 overflow-y-auto">
          {GARMENT_COLORS.map((color) => (
            <button
              key={color.name}
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors text-left"
              onClick={() => {
                onChange(color.name);
                setOpen(false);
              }}
            >
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: color.hex }}
              />
              <span>{color.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
