import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const SERVICES = [
  "Custom Embroidery",
  "Screen Printing",
  "DTF (Direct to Film) Printing",
  "Engraving",
  "Signs & Banners",
  "Custom Mugs",
  "Nametags",
  "Stickers & Decals",
  "Other / Multiple Services",
];

export default function Quote() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteFile, setQuoteFile] = useState<File | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const messageBody = `QUOTE REQUEST\n\nCompany / Organization: ${company}\nContact Name: ${contactName}\nEmail: ${email}\nPhone: ${phone}\n\nServices Interested In:\n${selectedServices.map((s) => `  \u2022 ${s}`).join("\n")}\n\nQuantity / Order Size: ${quantity}\nPreferred Timeline: ${timeline}\n\nProject Description / Details:\n${details}\n\n---\nSent via PrintsCharming.com`;

    const formData: Record<string, string> = {
      access_key: "250cf6ca-f92a-401f-9a50-48c93a35b62b",
      subject: "Quote Request — Prints Charming",
      from_name: contactName,
      email,
      message: messageBody,
    };

    if (quoteFile) {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.readAsDataURL(quoteFile);
      });
      formData.attachment = JSON.stringify([
        { name: quoteFile.name, data: base64 },
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
              Larger Orders
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Get a Quote
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              For bulk orders, corporate accounts, or custom projects. Fill out
              the form below and we'll get back to you with pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Services List */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="font-display font-bold text-xl mb-4">
                  Our Services
                </h2>
                <ul className="space-y-2">
                  {SERVICES.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {service}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-sm text-muted-foreground italic">
                    <CheckCircle2 className="w-4 h-4 text-primary/50 shrink-0" />
                    And so much more!
                  </li>
                </ul>
                <div className="mt-6 pt-5 border-t border-border text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">
                    Prints Charming
                  </p>
                  <p>419 SE Main St, Roseburg, OR 97470</p>
                  <a
                    href="tel:5416733716"
                    className="block text-primary hover:underline"
                  >
                    (541) 673-3716
                  </a>
                  <a
                    href="mailto:pctonlieorders@gmail.com"
                    className="block text-primary hover:underline"
                  >
                    pctonlieorders@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div className="md:col-span-3">
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="font-display font-bold text-xl mb-6">
                  Request a Quote
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="quote.panel"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company / Organization</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        className="mt-1"
                        data-ocid="quote.input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-name">Contact Name *</Label>
                      <Input
                        id="contact-name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Jane Smith"
                        required
                        className="mt-1"
                        data-ocid="quote.input"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quote-email">Email *</Label>
                      <Input
                        id="quote-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        required
                        className="mt-1"
                        data-ocid="quote.input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quote-phone">Phone</Label>
                      <Input
                        id="quote-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(541) 555-0000"
                        className="mt-1"
                        data-ocid="quote.input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Services Interested In</Label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {SERVICES.map((service) => (
                        <div key={service} className="flex items-center gap-2">
                          <Checkbox
                            id={`service-${service}`}
                            checked={selectedServices.includes(service)}
                            onCheckedChange={() => toggleService(service)}
                            data-ocid="quote.checkbox"
                          />
                          <Label
                            htmlFor={`service-${service}`}
                            className="font-normal cursor-pointer text-sm"
                          >
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity / Order Size *</Label>
                      <Input
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 50 shirts"
                        required
                        className="mt-1"
                        data-ocid="quote.input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeline">Preferred Timeline</Label>
                      <Input
                        id="timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        placeholder="e.g. 3 weeks"
                        className="mt-1"
                        data-ocid="quote.input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="details">
                      Project Description / Details *
                    </Label>
                    <Textarea
                      id="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Describe your project, design ideas, colors, special requirements..."
                      rows={5}
                      required
                      className="mt-1 resize-none"
                      data-ocid="quote.textarea"
                    />
                  </div>

                  <div>
                    <Label htmlFor="quote-file">
                      Attach Files / Design References (optional)
                    </Label>
                    <Input
                      id="quote-file"
                      type="file"
                      accept="image/*,.pdf,.ai,.eps,.png,.jpg"
                      className="mt-1"
                      onChange={(e) =>
                        setQuoteFile(e.target.files?.[0] ?? null)
                      }
                      data-ocid="quote.upload_button"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Accepted: JPG, PNG, PDF, AI, EPS
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-6 text-center space-y-3">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground">
                        Quote Request Submitted!
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Thanks for reaching out, we will be in contact soon!
                      </p>
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                      data-ocid="quote.submit_button"
                    >
                      {submitting ? "Sending..." : "Submit Quote Request"}
                    </Button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
