import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  MapPin,
  Package,
} from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type ModalType = "hoodie" | "tee" | "hat" | null;

const BASE_PRICE: Record<"hoodie" | "tee" | "hat", number> = {
  hoodie: 39.95,
  tee: 29.95,
  hat: 29.95,
};

const SIZE_UPCHARGE: Record<
  "hoodie" | "tee" | "hat",
  Record<string, number>
> = {
  hoodie: { "2XL": 3, "3XL": 6, "4XL": 9, "5XL": 12 },
  tee: { "2XL": 2, "3XL": 4, "4XL": 6, "5XL": 8 },
  hat: {},
};

const SHIPPING_COST: Record<"hoodie" | "tee" | "hat", number> = {
  hoodie: 9.95,
  tee: 5.95,
  hat: 6.95,
};

const COLOR_HEX: Record<string, string> = {
  Black: "#1a1a1a",
  "Jet Black": "#1a1a1a",
  White: "#FFFFFF",
  Navy: "#001F5B",
  "True Navy": "#001F5B",
  "Deep Navy": "#001733",
  "Heather Navy": "#2B3A6B",
  Red: "#CC0000",
  "Fiery Red": "#CC0000",
  "Rich Red": "#A80000",
  Royal: "#2752C9",
  "True Royal": "#2752C9",
  "Heather Royal": "#3D66CC",
  "Forest Green": "#228B22",
  "Dark Green": "#1A5C1A",
  "Clover Green": "#3A7D3A",
  Charcoal: "#4A4A4A",
  "Coal Grey": "#3D3D3D",
  "Medium Grey": "#888888",
  Silver: "#C0C0C0",
  Ash: "#D3D3D3",
  "Light Grey": "#D3D3D3",
  Gold: "#FFD700",
  "Athletic Heather": "#BFBFBF",
  Cardinal: "#8B0000",
  Maroon: "#800000",
  "Heather Athletic Maroon": "#7A3030",
  Purple: "#6A0DAD",
  "Heather Purple": "#7B52AB",
  "Team Purple": "#5B2D8E",
  Orange: "#FF6600",
  "Tennessee Orange": "#FF8200",
  "Neon Orange": "#FF4500",
  "Carolina Blue": "#4B9CD3",
  "Light Blue": "#ADD8E6",
  "Steel Blue": "#4682B4",
  Teal: "#008080",
  Sapphire: "#0F52BA",
  "True Celadon": "#ACE1AF",
  Lime: "#32CD32",
  "Neon Green": "#39FF14",
  "Neon Yellow": "#FFFF00",
  "Neon Pink": "#FF6EB4",
  "Neon Blue": "#1B03A3",
  Lavender: "#E6E6FA",
  Pink: "#FFC0CB",
  "Candy Pink": "#FF8FAB",
  Ivory: "#FFFFF0",
  Natural: "#F5F0E1",
  Sand: "#F4A460",
  Creme: "#FFFDD0",
  Olive: "#808000",
  "Olive Drab Green": "#6B8E23",
  Brown: "#A52A2A",
  "Dark Chocolate Brown": "#3D1C02",
  "Coyote Brown": "#81613C",
  Sangria: "#92000A",
  "Heather Sangria": "#7A2040",
  Kelly: "#4CBB17",
  "Kelly Green": "#4CBB17",
  "Graphite Heather": "#4A4A4A",
  "Dark Heather Grey": "#555555",
  Yellow: "#FFFF00",
  "Daffodil Yellow": "#FFFF31",
  Turquoise: "#40E0D0",
  "Aquatic Blue": "#00BFFF",
  "Neptune Blue": "#1B4F72",
  Khaki: "#C3B091",
  Loden: "#534B2D",
  "Khaki/ Coffee": "#C3B091",
  "Brown/ Khaki": "#A52A2A",
  "Columbia Blue": "#9BDDFF",
  "Columbia Blue/ White": "#9BDDFF",
  Cream: "#FFFDD0",
  Coffee: "#6F4E37",
  "Heather Grey/ Black": "#888888",
  "Heather Grey/ Navy": "#888888",
  "Black/ White": "#1a1a1a",
  "Navy/ White": "#001F5B",
  "Red/ Black": "#CC0000",
  "Red/ White": "#CC0000",
  "Royal/ White": "#2752C9",
  "Royal/ Black": "#2752C9",
  "Orange/ Black": "#FF6600",
  "Orange/ White": "#FF6600",
  "Athletic Maroon": "#7A3030",
  "Forest Green Heather": "#228B22",
  "Heather Red": "#CC3333",
  "Olive Drab Green Heather": "#6B8E23",
};

function PlaceholderImage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-muted flex flex-col items-center justify-center gap-2 rounded-t-lg border-b border-border ${className}`}
    >
      <Camera className="w-10 h-10 text-muted-foreground/40" />
      <span className="text-xs text-muted-foreground/50">
        Photo Coming Soon
      </span>
    </div>
  );
}

function DisclaimerBox({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 bg-primary/10 border border-primary/30 rounded-lg p-3 text-sm text-foreground">
      <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
      <span>{text}</span>
    </div>
  );
}

const HOODIE_SIZES = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "2XL", label: "2XL (+$3.00)" },
  { value: "3XL", label: "3XL (+$6.00)" },
  { value: "4XL", label: "4XL (+$9.00)" },
  { value: "5XL", label: "5XL (+$12.00)" },
];

const TEE_SIZES = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "2XL", label: "2XL (+$2.00)" },
  { value: "3XL", label: "3XL (+$4.00)" },
  { value: "4XL", label: "4XL (+$6.00)" },
  { value: "5XL", label: "5XL (+$8.00)" },
];

const GARMENT_PLACEMENTS = [
  { id: "left-chest", label: "Left Chest" },
  { id: "right-chest", label: "Right Chest" },
  { id: "left-sleeve", label: "Left Sleeve" },
  { id: "right-sleeve", label: "Right Sleeve" },
  { id: "full-front", label: "Full Front" },
  { id: "full-back", label: "Full Back" },
];

const HAT_PLACEMENTS = [
  { id: "left-side", label: "Left Side" },
  { id: "right-side", label: "Right Side" },
  { id: "front-center", label: "Front Center" },
];

const HOODIE_COLORS = [
  "Aquatic Blue",
  "Ash",
  "Athletic Heather",
  "Black Heather",
  "Bright Aqua",
  "Candy Pink",
  "Cardinal",
  "Carolina Blue",
  "Charcoal",
  "Cherry Blossom",
  "Clover Green",
  "Coal Grey",
  "Coyote Brown",
  "Creme",
  "Dark Chocolate Brown",
  "Dark Green",
  "Dark Heather Grey",
  "Duck Brown",
  "Flush Pink",
  "Forest Green Heather",
  "Gold",
  "Graphite Heather",
  "Heather Athletic Maroon",
  "Heather Dark Chocolate Brown",
  "Heather Navy",
  "Heather Purple",
  "Heather Red",
  "Heather Royal",
  "Heather Sangria",
  "Ivory",
  "Jet Black",
  "Kelly",
  "Laurel Green",
  "Lavender",
  "Light Blue",
  "Light Sand",
  "Lime",
  "Maroon",
  "Medium Grey",
  "Natural",
  "Navy",
  "Neon Blue",
  "Neon Green",
  "Neon Orange",
  "Neon Pink",
  "Neon Yellow",
  "Neptune Blue",
  "Oatmeal Heather",
  "Olive",
  "Olive Drab Green",
  "Olive Drab Green Heather",
  "Orange",
  "Pale Blush",
  "Purple",
  "Red",
  "Royal",
  "S. Green",
  "S. Orange",
  "Sand",
  "Sangria",
  "Sapphire",
  "Silver",
  "Steel Blue",
  "Stonewashed Blue",
  "Teal",
  "Team Purple",
  "Tennessee Orange",
  "True Celadon",
  "True Navy",
  "True Royal",
  "Tundra Blue",
  "White",
  "Woodland Brown",
  "Yellow",
];

const TEE_COLORS = [
  "Aquatic Blue",
  "Ash",
  "Athletic Heather",
  "Athletic Maroon",
  "Brown",
  "Candy Pink",
  "Cardinal",
  "Carolina Blue",
  "Charcoal",
  "Colonial Blue",
  "Coyote Brown",
  "Daffodil Yellow",
  "Dark Chocolate Brown",
  "Dark Green",
  "Dark Heather Grey",
  "Deep Marine",
  "Deep Navy",
  "Dill Green",
  "Dusty Brown",
  "Eggplant",
  "Fiery Red",
  "Flush Pink",
  "Forest Green",
  "Gold",
  "Jade Green",
  "Jet Black",
  "Kelly",
  "Lavender",
  "Lemon Yellow",
  "Light Blue",
  "Light Sand",
  "Lime",
  "Medium Grey",
  "Natural",
  "Navy",
  "Olive",
  "Orange",
  "Orange Sherbet",
  "Pale Pink",
  "Pistachio",
  "Purple",
  "Red",
  "Rich Red",
  "Royal",
  "S. Green",
  "S. Orange",
  "Sand",
  "Sangria",
  "Sapphire",
  "Silver",
  "Steel Blue",
  "Stonewashed Blue",
  "Stonewashed Green",
  "Teal",
  "Texas Orange",
  "True Celadon",
  "Tundra Blue",
  "Turquoise",
  "Ultramarine Blue",
  "Violet",
  "White",
  "Yellow",
];

const HAT_COLORS = [
  "Amber Gold",
  "Biscuit/ True Blue",
  "Black",
  "Black/ Black/ Light Grey",
  "Black/ Charcoal",
  "Black/ Gold",
  "Black/ Vegas Gold",
  "Black/ White",
  "Black/ White/ Heather Grey",
  "Black/ White/ Red",
  "Blue Teal/ Birch/ Navy",
  "Brown/ Brown/ Khaki",
  "Brown/ Khaki",
  "Caramel/ Black",
  "Cardinal/ White",
  "Charcoal",
  "Charcoal/ Black",
  "Charcoal/ Columbia Blue",
  "Charcoal/ Kelly",
  "Charcoal/ Navy",
  "Charcoal/ Neon Blue",
  "Charcoal/ Neon Green",
  "Charcoal/ Neon Orange",
  "Charcoal/ Neon Pink",
  "Charcoal/ Neon Yellow",
  "Charcoal/ Orange",
  "Charcoal/ Red",
  "Charcoal/ Royal",
  "Charcoal/ White",
  "Chocolate Chip/ Birch",
  "Coffee",
  "Columbia Blue",
  "Columbia Blue/ White",
  "Columbia Blue/ White/ Navy",
  "Cream",
  "Cream/ Black/ Loden",
  "Cream/ Grey Brown/ Brown",
  "Cream/ Navy/ Amber Gold",
  "Dark Green",
  "Dark Green/ White",
  "Grey/ Charcoal/ Black",
  "Grey/ Charcoal/ Navy",
  "Gunmetal/ Gunmetal/ Chocolate Chip",
  "Heather Grey/ Birch/ Amber Gold",
  "Heather Grey/ Birch/ Army Olive",
  "Heather Grey/ Black",
  "Heather Grey/ Cardinal/ Navy",
  "Heather Grey/ Charcoal/ Dark Orange",
  "Heather Grey/ Charcoal/ Maroon",
  "Heather Grey/ Dark Green",
  "Heather Grey/ Light Grey",
  "Heather Grey/ Navy",
  "Heather Grey/ Red/ Black",
  "Heather Grey/ Royal",
  "Heather Grey/ White",
  "Hot Pink/ White",
  "Kelly",
  "Kelly/ White",
  "Khaki/ Coffee",
  "Khaki/ Khaki/ Black",
  "Khaki/ Khaki/ Chocolate Chip",
  "Khaki/ Khaki/ Legion Blue",
  "Khaki/ Khaki/ Loden",
  "Khaki/ Khaki/ Navy",
  "Khaki/ White",
  "Light Blue",
  "Light Blue/ Light Blue/ Light Grey",
  "Light Grey",
  "Light Grey/ Light Grey/ Gunmetal",
  "Loden",
  "Loden/ Black",
  "Maroon/ White",
  "Mink Beige/ Charcoal/ Amber Gold",
  "Navy",
  "Navy/ Caramel",
  "Navy/ Charcoal",
  "Navy/ Khaki",
  "Navy/ Navy/ Khaki",
  "Navy/ White",
  "Navy/ White/ Heather Grey",
  "Navy/ White/ Red",
  "Orange",
  "Orange/ Black",
  "Orange/ White",
  "Orange/ White/ Black",
  "Purple/ White",
  "Quarry",
  "Red",
  "Red/ Black",
  "Red/ White",
  "Red/ White/ Black",
  "Red/ White/ Heather Grey",
  "Red/ White/ Navy",
  "Royal",
  "Royal/ Black",
  "Royal/ White",
  "Royal/ White/ Heather Grey",
  "Royal/ White/ Red",
  "Smoke Blue",
  "White",
  "White/ Aluminum/ Black",
  "White/ Aluminum/ Navy",
  "White/ Black/ Black",
  "White/ Columbia Blue/ Yellow",
  "White/ Navy/ Navy",
  "White/ White/ Black",
  "White/ White/ Charcoal",
  "White/ White/ Columbia Blue",
  "White/ White/ Kelly",
  "White/ White/ Navy",
  "White/ White/ Red",
  "White/ White/ Royal",
];

const COLORS_BY_TYPE: Record<"hoodie" | "tee" | "hat", string[]> = {
  hoodie: HOODIE_COLORS,
  tee: TEE_COLORS,
  hat: HAT_COLORS,
};

function OrderForm({
  type,
  defaultImage,
  onSubmit,
}: {
  type: "hoodie" | "tee" | "hat";
  defaultImage: string;
  onSubmit: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [placements, setPlacements] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [shippingMethod, setShippingMethod] = useState<"pickup" | "shipping">(
    "pickup",
  );

  const isGarment = type !== "hat";
  const sizes = type === "hoodie" ? HOODIE_SIZES : TEE_SIZES;
  const placementOptions = type === "hat" ? HAT_PLACEMENTS : GARMENT_PLACEMENTS;
  const colorOptions = COLORS_BY_TYPE[type];

  const upcharge = SIZE_UPCHARGE[type]?.[size] ?? 0;
  const shippingCost = shippingMethod === "shipping" ? SHIPPING_COST[type] : 0;
  const totalPrice = BASE_PRICE[type] + upcharge + shippingCost;

  const togglePlacement = (id: string) => {
    setPlacements((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const title =
      type === "hoodie"
        ? `Custom Hoodie Order - $${totalPrice.toFixed(2)}`
        : type === "tee"
          ? `Custom Tee Shirt Order - $${totalPrice.toFixed(2)}`
          : `Custom Hat Order - $${totalPrice.toFixed(2)}`;

    const sizeInfo = isGarment ? `\nSize: ${size}` : "";
    const shippingInfo =
      shippingMethod === "shipping"
        ? `Standard Shipping ($${SHIPPING_COST[type].toFixed(2)})`
        : "Local Pickup (Free)";
    const messageBody = `Order Type: ${title}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Color: ${color}${sizeInfo}\nShipping Method: ${shippingInfo}\nArt Placement: ${placements.join(", ")}\n\nArt Description / Instructions:\n${description}\n\n--- Order Summary ---\nBase Price: $${BASE_PRICE[type].toFixed(2)}${upcharge > 0 ? `\nSize Upcharge: +$${upcharge.toFixed(2)}` : ""}\nShipping: ${shippingMethod === "shipping" ? `$${SHIPPING_COST[type].toFixed(2)}` : "Free (Local Pickup)"}\nTotal: $${totalPrice.toFixed(2)}`;

    const formData: Record<string, string> = {
      access_key: "250cf6ca-f92a-401f-9a50-48c93a35b62b",
      subject: title,
      from_name: name,
      email,
      message: messageBody,
    };

    if (imageFile) {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.readAsDataURL(imageFile);
      });
      formData.attachment = JSON.stringify([
        { name: imageFile.name, data: base64 },
      ]);
    }

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display font-bold text-xl">Order Submitted!</h3>
        <p className="text-muted-foreground">
          Thanks for your order, we will be in contact soon!
        </p>
        <Button
          onClick={onSubmit}
          className="rounded-full bg-primary text-primary-foreground font-semibold"
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product image preview */}
      <div className="flex justify-center items-center bg-muted/40 rounded-xl border border-border p-3">
        <img
          src={defaultImage}
          alt="Product preview"
          className="max-h-[220px] w-auto object-contain rounded-lg"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          data-ocid={`${type}_order.card`}
        />
      </div>

      {type === "hoodie" && (
        <DisclaimerBox text="Sizes above XL will incur an additional $3.00 per size up (2XL = +$3, 3XL = +$6, 4XL = +$9, 5XL = +$12)." />
      )}
      {type === "tee" && (
        <DisclaimerBox text="Sizes above XL will incur an additional $2.00 per size up (2XL = +$2, 3XL = +$4, 4XL = +$6, 5XL = +$8)." />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`${type}-name`}>Full Name *</Label>
          <Input
            id={`${type}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            required
            className="mt-1"
            data-ocid={`${type}_order.input`}
          />
        </div>
        <div>
          <Label htmlFor={`${type}-email`}>Email *</Label>
          <Input
            id={`${type}-email`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            required
            className="mt-1"
            data-ocid={`${type}_order.input`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`${type}-phone`}>Phone Number</Label>
          <Input
            id={`${type}-phone`}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(541) 555-0000"
            className="mt-1"
            data-ocid={`${type}_order.input`}
          />
        </div>
        <div>
          <Label htmlFor={`${type}-color`}>Preferred Color *</Label>
          <Select value={color} onValueChange={setColor} required>
            <SelectTrigger className="mt-1" data-ocid={`${type}_order.select`}>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {colorOptions.map((c) => (
                <SelectItem key={c} value={c}>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-border flex-shrink-0"
                      style={{ backgroundColor: COLOR_HEX[c] ?? "#9CA3AF" }}
                    />
                    {c}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1 italic">
            * Colors are subject to availability.
          </p>
        </div>
      </div>

      {isGarment && (
        <div>
          <Label htmlFor={`${type}-size`}>Size *</Label>
          <Select value={size} onValueChange={setSize} required>
            <SelectTrigger className="mt-1" data-ocid={`${type}_order.select`}>
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Shipping Method Selection */}
      <div>
        <Label className="mb-2 block">Shipping Method *</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setShippingMethod("pickup")}
            className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
              shippingMethod === "pickup"
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-background hover:border-primary/50"
            }`}
            data-ocid={`${type}_order.toggle`}
          >
            <MapPin
              className={`w-5 h-5 shrink-0 ${shippingMethod === "pickup" ? "text-primary" : "text-muted-foreground"}`}
            />
            <div>
              <p className="font-semibold text-sm">Local Pickup</p>
              <p className="text-xs text-muted-foreground">
                419 SE Main St, Roseburg
              </p>
              <p className="text-sm font-bold text-primary">Free</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setShippingMethod("shipping")}
            className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
              shippingMethod === "shipping"
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-background hover:border-primary/50"
            }`}
            data-ocid={`${type}_order.toggle`}
          >
            <Package
              className={`w-5 h-5 shrink-0 ${shippingMethod === "shipping" ? "text-primary" : "text-muted-foreground"}`}
            />
            <div>
              <p className="font-semibold text-sm">Standard Shipping</p>
              <p className="text-xs text-muted-foreground">
                Delivered to your door
              </p>
              <p className="text-sm font-bold text-primary">
                ${SHIPPING_COST[type].toFixed(2)}
              </p>
            </div>
          </button>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">
          Art Placement (select all that apply)
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {placementOptions.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <Checkbox
                id={`${type}-${p.id}`}
                checked={placements.includes(p.id)}
                onCheckedChange={() => togglePlacement(p.id)}
                data-ocid={`${type}_order.checkbox`}
              />
              <Label
                htmlFor={`${type}-${p.id}`}
                className="font-normal cursor-pointer"
              >
                {p.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor={`${type}-desc`}>Art Description / Instructions</Label>
        <Textarea
          id={`${type}-desc`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your design, colors, text, or any special instructions for the artist..."
          rows={4}
          className="mt-1 resize-none"
          data-ocid={`${type}_order.textarea`}
        />
      </div>

      <div>
        <Label htmlFor={`${type}-file`}>
          Attach Artwork / Design File (optional)
        </Label>
        <Input
          id={`${type}-file`}
          type="file"
          accept="image/*,.pdf,.ai,.eps,.png,.jpg"
          className="mt-1"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          data-ocid={`${type}_order.upload_button`}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Accepted: JPG, PNG, PDF, AI, EPS
        </p>
      </div>

      {/* Dynamic order total */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Base price</span>
          <span>${BASE_PRICE[type].toFixed(2)}</span>
        </div>
        {upcharge > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Size upcharge</span>
            <span>+${upcharge.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shippingMethod === "pickup" ? (
              <span className="text-primary font-medium">Free</span>
            ) : (
              `$${SHIPPING_COST[type].toFixed(2)}`
            )}
          </span>
        </div>
        <div className="border-t border-primary/20 pt-1.5 flex items-center justify-between">
          <span className="font-semibold text-sm">Order Total</span>
          <span className="font-bold text-lg text-primary">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
        data-ocid={`${type}_order.submit_button`}
      >
        {submitting ? "Sending Order..." : "Submit Order"}
      </Button>
    </form>
  );
}

const products = [
  {
    id: "hoodie" as const,
    name: "Custom Hoodie",
    price: "$39.95",
    note: "Sizes above XL: +$3/size",
    available: true,
    image: "/assets/pc78h-019d2e51-66a3-71a9-b423-e7ab3c7013b9.png",
  },
  {
    id: "tee" as const,
    name: "Custom Tee Shirt",
    price: "$29.95",
    note: "Sizes above XL: +$2/size",
    available: true,
    image: "/assets/pc61-019d2e51-661e-73e8-98de-5c24d4d1be6d.png",
  },
  {
    id: "hat" as const,
    name: "Custom Hat",
    price: "$29.95",
    note: "One size fits most",
    available: true,
    image: "/assets/richardson_112-019d2e51-65b5-741a-b844-fb389a12d831.png",
  },
  {
    id: null,
    name: "Banners / Signs",
    price: "Coming Soon",
    note: "Contact us for pricing",
    available: false,
    image: null,
  },
  {
    id: null,
    name: "Engraving",
    price: "Coming Soon",
    note: "Contact us for pricing",
    available: false,
    image: null,
  },
  {
    id: null,
    name: "Stickers / Decals",
    price: "Coming Soon",
    note: "Contact us for pricing",
    available: false,
    image: null,
  },
];

const PRODUCT_SANMAR: Record<
  "hoodie" | "tee" | "hat",
  { defaultImage: string }
> = {
  hoodie: {
    defaultImage: "/assets/pc78h-019d2e51-66a3-71a9-b423-e7ab3c7013b9.png",
  },
  tee: {
    defaultImage: "/assets/pc61-019d2e51-661e-73e8-98de-5c24d4d1be6d.png",
  },
  hat: {
    defaultImage:
      "/assets/richardson_112-019d2e51-65b5-741a-b844-fb389a12d831.png",
  },
};

export default function SmallOrders() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
              Small Orders
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Design on the Fly
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Perfect for orders of 1–4 pieces. Select your item, tell us your
              design, and we'll take care of the rest!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <div
                key={product.name}
                className="bg-card border border-border rounded-xl overflow-hidden flex flex-col"
                data-ocid={`products.item.${idx + 1}`}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-44 w-full object-cover rounded-t-lg"
                  />
                ) : (
                  <PlaceholderImage className="h-44" />
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-primary font-semibold text-base mb-1">
                    {product.price}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 flex-1">
                    {product.note}
                  </p>
                  {product.available && product.id ? (
                    <Button
                      className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                      onClick={() => setActiveModal(product.id as ModalType)}
                      data-ocid={`products.primary_button.${idx + 1}`}
                    >
                      Order Now
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="outline"
                      className="w-full rounded-full opacity-50 cursor-not-allowed"
                      data-ocid={`products.secondary_button.${idx + 1}`}
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Hoodie Modal */}
      <Dialog
        open={activeModal === "hoodie"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="hoodie_order.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Custom Hoodie Order — $39.95
            </DialogTitle>
          </DialogHeader>
          <OrderForm
            type="hoodie"
            defaultImage={PRODUCT_SANMAR.hoodie.defaultImage}
            onSubmit={() => setActiveModal(null)}
          />
        </DialogContent>
      </Dialog>

      {/* Tee Modal */}
      <Dialog
        open={activeModal === "tee"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="tee_order.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Custom Tee Shirt Order — $29.95
            </DialogTitle>
          </DialogHeader>
          <OrderForm
            type="tee"
            defaultImage={PRODUCT_SANMAR.tee.defaultImage}
            onSubmit={() => setActiveModal(null)}
          />
        </DialogContent>
      </Dialog>

      {/* Hat Modal */}
      <Dialog
        open={activeModal === "hat"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="hat_order.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Custom Hat Order — $29.95
            </DialogTitle>
          </DialogHeader>
          <OrderForm
            type="hat"
            defaultImage={PRODUCT_SANMAR.hat.defaultImage}
            onSubmit={() => setActiveModal(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
