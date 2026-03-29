import { Button } from "@/components/ui/button";
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
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import ColorSelect from "../components/ColorSelect";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LogoSection from "../components/LogoSection";

type ModalType =
  | "hoodie"
  | "tee"
  | "hat"
  | "banners"
  | "engraving"
  | "stickers"
  | null;

const HOODIE_SIZES = [
  { label: "S", upcharge: 0 },
  { label: "M", upcharge: 0 },
  { label: "L", upcharge: 0 },
  { label: "XL", upcharge: 0 },
  { label: "2XL", upcharge: 3 },
  { label: "3XL", upcharge: 6 },
  { label: "4XL", upcharge: 9 },
  { label: "5XL", upcharge: 12 },
];

const TEE_SIZES = [
  { label: "S", upcharge: 0 },
  { label: "M", upcharge: 0 },
  { label: "L", upcharge: 0 },
  { label: "XL", upcharge: 0 },
  { label: "2XL", upcharge: 2 },
  { label: "3XL", upcharge: 4 },
  { label: "4XL", upcharge: 6 },
  { label: "5XL", upcharge: 8 },
];

const HOODIE_PLACEMENTS = [
  "Front Center",
  "Back Center",
  "Left Chest",
  "Right Chest",
  "Sleeve",
];
const TEE_PLACEMENTS = [
  "Front Center",
  "Back Center",
  "Left Chest",
  "Right Chest",
  "Sleeve",
];
const HAT_PLACEMENTS = [
  "Front Center",
  "Left Side",
  "Right Side",
  "Back Left",
  "Back Right",
];

const SHIPPING_COST = { hoodie: 9.95, tee: 5.95, hat: 6.95 };

const PRODUCTS = [
  {
    id: "hoodie" as const,
    label: "Custom Hoody",
    price: "$39.95",
    emoji: "🧥",
    img: "/assets/pc78h-019d2e51-66a3-71a9-b423-e7ab3c7013b9.png",
  },
  {
    id: "tee" as const,
    label: "Custom Tee Shirt",
    price: "$29.95",
    emoji: "👕",
    img: "/assets/pc61-019d2e51-661e-73e8-98de-5c24d4d1be6d.png",
  },
  {
    id: "hat" as const,
    label: "Custom Hat",
    price: "$29.95",
    emoji: "🧢",
    img: "/assets/richardson_112-019d2e51-65b5-741a-b844-fb389a12d831.png",
  },
  {
    id: "banners" as const,
    label: "Banners / Signs",
    price: "Quote",
    emoji: "🪧",
    img: null,
  },
  {
    id: "engraving" as const,
    label: "Engraving",
    price: "Quote",
    emoji: "✏️",
    img: null,
  },
  {
    id: "stickers" as const,
    label: "Stickers / Decals",
    price: "Quote",
    emoji: "🏷️",
    img: null,
  },
];

function calcTotal(
  type: "hoodie" | "tee" | "hat",
  size: string,
  qty: number,
  shipping: string,
): number {
  const base = type === "hoodie" ? 39.95 : 29.95;
  let upcharge = 0;
  if (type === "hoodie") {
    upcharge = HOODIE_SIZES.find((s) => s.label === size)?.upcharge ?? 0;
  } else if (type === "tee") {
    upcharge = TEE_SIZES.find((s) => s.label === size)?.upcharge ?? 0;
  }
  const shippingCost = shipping === "pickup" ? 0 : SHIPPING_COST[type];
  return (base + upcharge) * qty + shippingCost;
}

interface OrderFormProps {
  type: "hoodie" | "tee" | "hat";
  onClose: () => void;
}

function OrderForm({ type, onClose }: OrderFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("");
  const [placement, setPlacement] = useState("");
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [shipping, setShipping] = useState("standard");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [imgError, setImgError] = useState(false);

  const product = PRODUCTS.find((p) => p.id === type)!;
  const sizes =
    type === "hoodie" ? HOODIE_SIZES : type === "tee" ? TEE_SIZES : [];
  const placements =
    type === "hoodie"
      ? HOODIE_PLACEMENTS
      : type === "tee"
        ? TEE_PLACEMENTS
        : HAT_PLACEMENTS;
  const total =
    type === "hat"
      ? calcTotal(type, "", qty, shipping)
      : calcTotal(type, size, qty, shipping);
  const shippingLabel =
    shipping === "pickup"
      ? "Local Pickup - Free"
      : `Standard Shipping - $${SHIPPING_COST[type].toFixed(2)}`;

  const sizeUpcharge =
    type !== "hat"
      ? ((type === "hoodie" ? HOODIE_SIZES : TEE_SIZES).find(
          (s) => s.label === size,
        )?.upcharge ?? 0)
      : 0;
  const basePrice = type === "hoodie" ? 39.95 : 29.95;
  const unitPrice = basePrice + sizeUpcharge;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("access_key", "250cf6ca-f92a-401f-9a50-48c93a35b62b");
      formData.append(
        "subject",
        `New ${product.label} Order - Prints Charming`,
      );
      formData.append("from_name", name);
      formData.append("email", email);
      formData.append("product", product.label);
      formData.append("phone", phone);
      if (type !== "hat") formData.append("size", size);
      formData.append("color", color || "Not selected");
      formData.append("placement", placement || "Not selected");
      formData.append("quantity", String(qty));
      formData.append("shipping", shippingLabel);
      formData.append("order_total", `$${total.toFixed(2)}`);
      formData.append("special_instructions", notes || "None");
      if (file) formData.append("attachment", file, file.name);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Submission failed. Please try again or contact us directly.");
      }
    } catch {
      setError("Network error. Please call us at (541) 673-3716.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center py-10 gap-4"
        data-ocid={`${type}_order.success_state`}
      >
        <CheckCircle2 size={56} className="text-brand" />
        <h3 className="text-xl font-bold">Order Submitted!</h3>
        <p className="text-muted-foreground text-sm text-center max-w-xs">
          Thanks! We'll review your order and follow up at {email} within 1–2
          business days.
        </p>
        <Button
          onClick={onClose}
          className="mt-2"
          style={{ backgroundColor: "#1F3B2F", color: "white" }}
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product image */}
      {product.img && !imgError ? (
        <div className="flex justify-center">
          <img
            src={product.img}
            alt={product.label}
            className="h-36 object-contain rounded-md"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="flex justify-center h-20 items-center bg-muted rounded-md">
          <span className="text-4xl">{product.emoji}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-semibold">Name *</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="mt-1 h-9 text-sm"
            data-ocid={`${type}_order.input`}
          />
        </div>
        <div>
          <Label className="text-xs font-semibold">Email *</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="mt-1 h-9 text-sm"
            data-ocid={`${type}_order.input`}
          />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold">
          Phone <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(541) 555-0000"
          className="mt-1 h-9 text-sm"
          data-ocid={`${type}_order.input`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {type !== "hat" && (
          <div>
            <Label className="text-xs font-semibold">Size *</Label>
            <Select value={size} onValueChange={setSize} required>
              <SelectTrigger
                className="mt-1 h-9 text-sm"
                data-ocid={`${type}_order.select`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((s) => (
                  <SelectItem key={s.label} value={s.label}>
                    {s.label}
                    {s.upcharge > 0 ? ` (+$${s.upcharge})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div>
          <Label className="text-xs font-semibold">Quantity (1–4) *</Label>
          <Input
            type="number"
            min={1}
            max={4}
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Math.min(4, Number(e.target.value))))
            }
            required
            className="mt-1 h-9 text-sm"
            data-ocid={`${type}_order.input`}
          />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold">Garment Color</Label>
        <div className="mt-1">
          <ColorSelect value={color} onChange={setColor} id={`${type}-color`} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Colors are subject to availability. We will contact you if your color
          is not in stock.
        </p>
      </div>

      <div>
        <Label className="text-xs font-semibold">Art Placement</Label>
        <Select value={placement} onValueChange={setPlacement}>
          <SelectTrigger
            className="mt-1 h-9 text-sm"
            data-ocid={`${type}_order.select`}
          >
            <SelectValue placeholder="Select placement..." />
          </SelectTrigger>
          <SelectContent>
            {placements.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs font-semibold">Shipping</Label>
        <Select value={shipping} onValueChange={setShipping}>
          <SelectTrigger
            className="mt-1 h-9 text-sm"
            data-ocid={`${type}_order.select`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">
              Standard Shipping - ${SHIPPING_COST[type].toFixed(2)}
            </SelectItem>
            <SelectItem value="pickup">Local Pickup - Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs font-semibold">Special Instructions</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special details..."
          rows={2}
          className="mt-1 text-sm"
          data-ocid={`${type}_order.textarea`}
        />
      </div>

      <div>
        <Label className="text-xs font-semibold">Attach Artwork</Label>
        <button
          type="button"
          className="mt-1 w-full border border-dashed border-border rounded-md p-3 flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors text-left"
          onClick={() => fileRef.current?.click()}
          data-ocid={`${type}_order.upload_button`}
        >
          <Upload size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {file ? file.name : "Click to upload artwork file"}
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          accept="image/*,.pdf,.ai,.eps,.svg"
        />
      </div>

      {/* Live Total */}
      <div
        className="rounded-lg p-4 border-2"
        style={{ borderColor: "#1F3B2F", backgroundColor: "#F3F6F4" }}
      >
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">
            ${unitPrice.toFixed(2)} &times; {qty}
          </span>
          <span>${(unitPrice * qty).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shipping === "pickup"
              ? "Free"
              : `$${SHIPPING_COST[type].toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
          <span style={{ color: "#1F3B2F" }}>Order Total</span>
          <span style={{ color: "#1F3B2F" }} className="text-lg">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {type !== "hat" && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            *{" "}
            {type === "hoodie"
              ? "Sizes 2XL and above incur an upcharge of $3 per size above XL"
              : "Sizes 2XL and above incur an upcharge of $2 per size above XL"}
          </p>
          <p className="text-xs text-muted-foreground">
            * Price includes printing a full size image on one side only.
            Additional sides or placements are available at an extra charge.
          </p>
        </div>
      )}

      {error && (
        <p
          className="text-red-600 text-sm"
          data-ocid={`${type}_order.error_state`}
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full text-white font-semibold"
        style={{ backgroundColor: "#1F3B2F" }}
        data-ocid={`${type}_order.submit_button`}
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          `Submit ${product.label} Order`
        )}
      </Button>
    </form>
  );
}

export default function SmallOrders() {
  const [modal, setModal] = useState<ModalType>(null);

  const placeholderTypes = ["banners", "engraving", "stickers"] as const;
  const placeholderNames: Record<string, string> = {
    banners: "Banners/Signs",
    engraving: "Engraving",
    stickers: "Stickers/Decals",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-white border-b border-border">
          <LogoSection />
        </section>

        <section className="py-16 px-4" style={{ backgroundColor: "#F3F6F4" }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">
              1–4 PIECES
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Small Orders
            </h1>
            <p className="text-muted-foreground mb-10 max-w-xl">
              Perfect for small custom runs. Select a product below to place
              your order.
            </p>

            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-5"
              data-ocid="products.list"
            >
              {PRODUCTS.map((product, i) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setModal(product.id)}
                  className="group bg-white rounded-xl shadow-card hover:shadow-modal transition-all border border-border p-6 flex flex-col items-center text-center gap-3 cursor-pointer hover:border-brand"
                  data-ocid={`products.item.${i + 1}`}
                >
                  {product.img ? (
                    <img
                      src={product.img}
                      alt={product.label}
                      className="h-24 object-contain"
                    />
                  ) : (
                    <span className="text-4xl">{product.emoji}</span>
                  )}
                  <span className="font-semibold text-foreground">
                    {product.label}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#1F3B2F" }}
                  >
                    {product.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Order modals */}
      {(["hoodie", "tee", "hat"] as const).map((type) => (
        <Dialog
          key={type}
          open={modal === type}
          onOpenChange={(o) => !o && setModal(null)}
        >
          <DialogContent
            className="max-w-lg max-h-[90vh] overflow-y-auto"
            data-ocid={`${type}_order.modal`}
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {PRODUCTS.find((p) => p.id === type)?.label}
              </DialogTitle>
            </DialogHeader>
            <OrderForm type={type} onClose={() => setModal(null)} />
          </DialogContent>
        </Dialog>
      ))}

      {/* Placeholder modals */}
      {placeholderTypes.map((type) => (
        <Dialog
          key={type}
          open={modal === type}
          onOpenChange={(o) => !o && setModal(null)}
        >
          <DialogContent className="max-w-sm" data-ocid={`${type}_info.modal`}>
            <DialogHeader>
              <DialogTitle>{placeholderNames[type]}</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground text-sm py-2">
              For {placeholderNames[type]} orders, please contact us directly at{" "}
              <a
                href="mailto:pctonlieorders@gmail.com"
                className="text-brand font-medium"
              >
                pctonlieorders@gmail.com
              </a>{" "}
              or call{" "}
              <a href="tel:5416733716" className="text-brand font-medium">
                (541) 673-3716
              </a>
              . We'll be happy to help!
            </p>
            <Button
              onClick={() => setModal(null)}
              className="w-full text-white"
              style={{ backgroundColor: "#1F3B2F" }}
              data-ocid={`${type}_info.close_button`}
            >
              Got it
            </Button>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
