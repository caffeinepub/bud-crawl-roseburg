import { Button } from "@/components/ui/button";
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
import Footer from "../components/Footer";
import Header from "../components/Header";
import LogoSection from "../components/LogoSection";

const SERVICES = [
  "Screen Printing",
  "Embroidery",
  "Custom Hoodies & Sweatshirts",
  "Custom T-Shirts",
  "Custom Hats & Caps",
  "Banners & Signs",
  "Stickers & Decals",
  "Engraving & Awards",
  "Promotional Products",
];

export default function Quote() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("access_key", "250cf6ca-f92a-401f-9a50-48c93a35b62b");
      formData.append(
        "subject",
        `Quote Request${service ? ` - ${service}` : ""} - Prints Charming`,
      );
      formData.append("from_name", name);
      formData.append("email", email);
      formData.append("phone", phone || "Not provided");
      formData.append("company", company || "Not provided");
      formData.append("service_needed", service || "Not specified");
      formData.append("estimated_quantity", quantity || "Not specified");
      formData.append("description", details);
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
              LARGER ORDERS
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Get a Quote</h1>
            <p className="text-muted-foreground mb-10 max-w-xl">
              For orders of 5 or more pieces, bulk orders, or specialized
              services, request a custom quote below.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Services list */}
              <div>
                <h2
                  className="font-bold text-xl mb-5"
                  style={{ color: "#1F3B2F" }}
                >
                  Our Services
                </h2>
                <ul className="space-y-3">
                  {SERVICES.map((svc) => (
                    <li key={svc} className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#1F3B2F" }}
                      />
                      <span className="text-foreground">{svc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-5 rounded-xl bg-white shadow-card">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#1F3B2F" }}
                  >
                    Questions?
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Call us at{" "}
                    <a href="tel:5416733716" className="text-brand font-medium">
                      (541) 673-3716
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    or email{" "}
                    <a
                      href="mailto:pctonlieorders@gmail.com"
                      className="text-brand font-medium"
                    >
                      pctonlieorders@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-xl shadow-card p-6">
                {submitted ? (
                  <div
                    className="flex flex-col items-center py-10 gap-4"
                    data-ocid="quote.success_state"
                  >
                    <CheckCircle2 size={56} className="text-brand" />
                    <h3 className="text-xl font-bold">Quote Request Sent!</h3>
                    <p className="text-muted-foreground text-sm text-center">
                      We'll review your request and follow up at {email} within
                      1–2 business days.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-2 border-brand text-brand hover:bg-brand hover:text-white"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    data-ocid="quote.modal"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium">Name *</Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Your name"
                          className="mt-1"
                          data-ocid="quote.input"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email *</Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="your@email.com"
                          className="mt-1"
                          data-ocid="quote.input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium">
                          Phone{" "}
                          <span className="text-muted-foreground text-xs">
                            (optional)
                          </span>
                        </Label>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(541) 555-0000"
                          className="mt-1"
                          data-ocid="quote.input"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Company/Org{" "}
                          <span className="text-muted-foreground text-xs">
                            (optional)
                          </span>
                        </Label>
                        <Input
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company name"
                          className="mt-1"
                          data-ocid="quote.input"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Service Needed
                      </Label>
                      <Select value={service} onValueChange={setService}>
                        <SelectTrigger
                          className="mt-1"
                          data-ocid="quote.select"
                        >
                          <SelectValue placeholder="Select a service..." />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICES.map((svc) => (
                            <SelectItem key={svc} value={svc}>
                              {svc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Estimated Quantity
                      </Label>
                      <Input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 50 shirts"
                        className="mt-1"
                        data-ocid="quote.input"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Description / Details *
                      </Label>
                      <Textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                        placeholder="Describe what you need — colors, logos, any special requirements..."
                        rows={4}
                        className="mt-1"
                        data-ocid="quote.textarea"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Attach Artwork / Reference Images
                      </Label>
                      <button
                        type="button"
                        className="mt-1 w-full border border-dashed border-border rounded-md p-3 flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors text-left"
                        onClick={() => fileRef.current?.click()}
                        data-ocid="quote.upload_button"
                      >
                        <Upload size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {file
                            ? file.name
                            : "Click to upload artwork or reference"}
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

                    {error && (
                      <p
                        className="text-red-600 text-sm"
                        data-ocid="quote.error_state"
                      >
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full text-white font-semibold"
                      style={{ backgroundColor: "#1F3B2F" }}
                      data-ocid="quote.submit_button"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request a Quote"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
