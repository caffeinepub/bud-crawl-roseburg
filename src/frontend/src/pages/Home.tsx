import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Facebook,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LogoSection from "../components/LogoSection";

const GALLERY_IMAGES = [
  {
    src: "/assets/uploads/be_wine-019d2e83-7697-73f9-83e4-4c27192f479d-1.jpg",
    alt: "Custom apparel - wine",
  },
  {
    src: "/assets/uploads/keep_laughing-019d2e83-7697-729c-a7da-cce9a28f36bc-2.jpg",
    alt: "Custom shirt - keep laughing",
  },
  {
    src: "/assets/uploads/horse_hat-019d2e83-769d-77d9-b81e-12d6ff3c09a7-3.jpg",
    alt: "Custom horse hat",
  },
  {
    src: "/assets/uploads/custom_hat-019d2e83-76aa-702b-a7d9-d8e3acca611f-4.jpg",
    alt: "Custom hat",
  },
  {
    src: "/assets/uploads/mug-019d2e83-76b8-7468-8e34-85f107887c4b-5.jpg",
    alt: "Custom mug",
  },
  {
    src: "/assets/uploads/grafitti_night-019d2e83-76b2-721e-9b29-191ae6837b90-6.jpg",
    alt: "Graffiti night",
  },
  {
    src: "/assets/uploads/mush-019d2e83-776f-7471-9025-eccda4e1c96c-7.jpg",
    alt: "Custom mushroom design",
  },
  {
    src: "/assets/uploads/bag-019d2ebf-eda2-7289-855f-7af620b615eb-1.jpg",
    alt: "Custom bag",
  },
];

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "250cf6ca-f92a-401f-9a50-48c93a35b62b",
          subject: "Website Contact Form - Prints Charming",
          from_name: name,
          email,
          phone,
          message,
          to_email: "pctonlieorders@gmail.com",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setError("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Logo */}
        <section className="bg-white border-b border-border">
          <LogoSection />
        </section>

        {/* About */}
        <section
          id="about"
          className="py-16 px-4"
          style={{ backgroundColor: "#F3F6F4" }}
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">
              WHO WE ARE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Us
            </h2>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <p className="text-muted-foreground leading-relaxed text-base">
                Prints Charming Screen Printing and Embroidery has been proudly
                serving Roseburg and the surrounding communities for over 50
                years. We specialize in custom screen printing, embroidery, and
                promotional products for businesses, schools, sports teams, and
                individuals.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
                Whether you need a single custom piece or a large order, our
                experienced team is here to bring your vision to life with
                quality craftsmanship and personal service.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Cards */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 text-center">
              READY TO ORDER?
            </p>
            <h2 className="text-3xl font-bold text-center mb-10">
              How Can We Help?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/small-orders" data-ocid="home.small_orders.link">
                <div
                  className="rounded-xl p-8 text-white text-center cursor-pointer hover:opacity-90 transition-all shadow-card hover:shadow-modal"
                  style={{ backgroundColor: "#1F3B2F" }}
                >
                  <div className="text-4xl mb-4">👕</div>
                  <h3 className="text-xl font-bold mb-2">Design on the Fly</h3>
                  <p className="text-white/80 text-sm">
                    Small Orders (1–4 pieces)
                  </p>
                  <p className="text-white/60 text-xs mt-3">
                    Hoodies, tees, hats &amp; more
                  </p>
                </div>
              </Link>
              <Link to="/quote" data-ocid="home.quote.link">
                <div
                  className="rounded-xl p-8 text-center cursor-pointer hover:opacity-90 transition-all shadow-card hover:shadow-modal border-2"
                  style={{ borderColor: "#1F3B2F", backgroundColor: "#F3F6F4" }}
                >
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-xl font-bold mb-2 text-brand">
                    Get a Quote
                  </h3>
                  <p className="text-muted-foreground text-sm">Larger Orders</p>
                  <p className="text-muted-foreground text-xs mt-3">
                    Screen printing, embroidery &amp; bulk orders
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section
          id="gallery"
          className="py-16 px-4"
          style={{ backgroundColor: "#F3F6F4" }}
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">
              PORTFOLIO
            </p>
            <h2 className="text-3xl font-bold mb-10">Our Work</h2>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              data-ocid="gallery.list"
            >
              {GALLERY_IMAGES.map((img, i) => (
                <div
                  key={img.src}
                  className="aspect-square overflow-hidden rounded-lg shadow-card hover:shadow-modal transition-shadow cursor-pointer group"
                  data-ocid={`gallery.item.${i + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const parent = t.parentElement;
                      if (parent) {
                        parent.style.backgroundColor = "#D7DED9";
                        parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#5D6A63;font-size:12px">${img.alt}</div>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl font-bold mb-10">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Info */}
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-brand mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Address
                    </p>
                    <p className="text-muted-foreground text-sm">
                      419 SE Main St, Roseburg, OR 97470
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone
                    size={18}
                    className="text-brand mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Phone
                    </p>
                    <a
                      href="tel:5416733716"
                      className="text-muted-foreground text-sm hover:text-brand transition-colors"
                    >
                      (541) 673-3716
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-brand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Email
                    </p>
                    <a
                      href="mailto:pctonlieorders@gmail.com"
                      className="text-muted-foreground text-sm hover:text-brand transition-colors"
                    >
                      pctonlieorders@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Facebook
                    size={18}
                    className="text-brand mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Facebook
                    </p>
                    <a
                      href="https://www.facebook.com/PrinceCharmingRSBG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm hover:text-brand transition-colors"
                    >
                      Find us on Facebook
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                {submitted ? (
                  <div
                    className="flex flex-col items-center justify-center py-12 gap-3"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle2 size={48} className="text-brand" />
                    <h3 className="text-xl font-bold">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm text-center">
                      Thanks for reaching out. We'll get back to you as soon as
                      possible.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="mt-2 border-brand text-brand hover:bg-brand hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleContactSubmit}
                    className="space-y-4"
                    data-ocid="contact.modal"
                  >
                    <div>
                      <Label
                        htmlFor="contact-name"
                        className="text-sm font-medium"
                      >
                        Name *
                      </Label>
                      <Input
                        id="contact-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                        className="mt-1"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="contact-email"
                        className="text-sm font-medium"
                      >
                        Email *
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="mt-1"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="contact-phone"
                        className="text-sm font-medium"
                      >
                        Phone{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(541) 555-0000"
                        className="mt-1"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="contact-message"
                        className="text-sm font-medium"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="contact-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="How can we help you?"
                        rows={4}
                        className="mt-1"
                        data-ocid="contact.textarea"
                      />
                    </div>
                    {error && (
                      <p
                        className="text-red-600 text-sm"
                        data-ocid="contact.error_state"
                      >
                        {error}
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full text-white font-semibold"
                      style={{ backgroundColor: "#1F3B2F" }}
                      data-ocid="contact.submit_button"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
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
