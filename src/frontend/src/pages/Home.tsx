import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Scissors,
  Shirt,
} from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const galleryImages = [
  {
    src: "/assets/uploads/be_wine-019d2e83-7697-73f9-83e4-4c27192f479d-1.jpg",
    alt: "Custom 'BE wine MINE' tee shirt",
  },
  {
    src: "/assets/uploads/keep_laughing-019d2e83-7697-729c-a7da-cce9a28f36bc-2.jpg",
    alt: "Custom 'Keep Laughing' tee shirt",
  },
  {
    src: "/assets/uploads/horse_hat-019d2e83-769d-77d9-b81e-12d6ff3c09a7-3.jpg",
    alt: "Custom embroidered horse hat",
  },
  {
    src: "/assets/uploads/custom_hat-019d2e83-76aa-702b-a7d9-d8e3acca611f-4.jpg",
    alt: "Custom camo snapback hat",
  },
  {
    src: "/assets/uploads/mug-019d2e83-76b8-7468-8e34-85f107887c4b-5.jpg",
    alt: "Custom sugar skull mug",
  },
  {
    src: "/assets/uploads/grafitti_night-019d2e83-76b2-721e-9b29-191ae6837b90-6.jpg",
    alt: "Graffiti Night 2024 event tee shirt",
  },
  {
    src: "/assets/uploads/mush-019d2e83-776f-7471-9025-eccda4e1c96c-7.jpg",
    alt: "Custom mushroom graphic tee shirt",
  },
  {
    src: "/assets/uploads/bag-019d2ebf-eda2-7289-855f-7af620b615eb-1.jpg",
    alt: "Custom printed tote bag",
  },
];

export default function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.querySelector("#contact-name") as HTMLInputElement)
      .value;
    const email = (form.querySelector("#contact-email") as HTMLInputElement)
      .value;
    const phone = (form.querySelector("#contact-phone") as HTMLInputElement)
      .value;
    const message = (
      form.querySelector("#contact-message") as HTMLTextAreaElement
    ).value;
    const fileInput = form.querySelector("#contact-file") as HTMLInputElement;

    setSubmitting(true);

    const formData: Record<string, string> = {
      access_key: "250cf6ca-f92a-401f-9a50-48c93a35b62b",
      subject: `Website Contact from ${name}`,
      from_name: name,
      email,
      message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    };

    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.readAsDataURL(file);
      });
      formData.attachment = JSON.stringify([{ name: file.name, data: base64 }]);
    }

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Large Logo Banner */}
        <div className="flex justify-center items-center py-10 px-4 bg-secondary/30">
          <img
            src="/assets/prints_charming_main_logo-019d2e51-65cd-758c-b83d-1c982af12245.jpg"
            alt="Prints Charming Screen Printing & Embroidery"
            className="h-48 md:h-64 w-auto object-contain"
          />
        </div>

        {/* About */}
        <section id="about" className="py-20 px-4 bg-background">
          <div className="container max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
                  About Us
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Family-owned, community-driven
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  We here at Prints Charming have been your local custom apparel
                  shop for over 50 years right here in Roseburg, OR. We
                  specialize in making the custom apparel that you want and
                  pride ourselves on our personal touch. We have built this site
                  to make ordering more convenient for you, however we would
                  love to have you stop in and see us face to face! We do custom
                  embroidery, screen printing, DTF, engraving, signs/banners,
                  mugs, nametags, and so much more!
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Custom Embroidery",
                    "Screen Printing",
                    "DTF",
                    "Engraving",
                    "Signs & Banners",
                    "Mugs",
                    "Nametags",
                  ].map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services / CTA Cards */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="container max-w-6xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-10">
              How Can We Help You?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shirt className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  Design on the Fly
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  Small orders of 1–4 pieces. Choose your garment, describe your
                  design, and submit your order online.
                </p>
                <Link to="/small-orders" data-ocid="services.primary_button">
                  <Button className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                    Small Orders (1–4 pcs){" "}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  Get a Quote
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  For larger orders, bulk purchases, or complex projects. Tell
                  us about your needs and we'll get back to you.
                </p>
                <Link to="/quote" data-ocid="services.secondary_button">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-primary text-primary font-semibold hover:bg-primary/5"
                  >
                    Larger Orders <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Scissors className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  Visit Us
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  We'd love to see you in person! Stop by our shop and we can
                  help you design the perfect custom apparel.
                </p>
                <a href="#contact" data-ocid="services.link">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-border font-semibold hover:bg-secondary/50"
                  >
                    Contact Us <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-20 px-4 bg-background">
          <div className="container max-w-6xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2 text-center">
              Our Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
              Featured Work Gallery
            </h2>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="gallery.section"
            >
              {galleryImages.map((img) => (
                <div
                  key={img.src}
                  className="aspect-square overflow-hidden rounded-lg border border-border"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 px-4 bg-secondary/40">
          <div className="container max-w-6xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2 text-center">
              Get In Touch
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
              Contact Us
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-card rounded-xl border border-border p-8">
                <h3 className="font-display font-bold text-xl mb-6">
                  Send Us a Message
                </h3>
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-4"
                  data-ocid="contact.panel"
                >
                  <div>
                    <Label htmlFor="contact-name">Your Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Jane Smith"
                      required
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">
                      Phone Number (optional)
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="(541) 555-1234"
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                      className="mt-1 resize-none"
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-file">
                      Attach Image (optional)
                    </Label>
                    <Input
                      id="contact-file"
                      type="file"
                      accept="image/*,.pdf,.ai,.eps"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                    data-ocid="contact.submit_button"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
                {submitted && (
                  <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30 text-center text-sm font-medium text-foreground">
                    Thanks for your message, we will be in contact soon!
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <h3 className="font-display font-bold text-xl">
                  Prints Charming
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Address</p>
                      <p className="text-muted-foreground text-sm">
                        419 SE Main St
                        <br />
                        Roseburg, OR 97470
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Phone</p>
                      <a
                        href="tel:5416733716"
                        className="text-primary text-sm hover:underline"
                      >
                        (541) 673-3716
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Email</p>
                      <a
                        href="mailto:pctonlieorders@gmail.com"
                        className="text-primary text-sm hover:underline"
                      >
                        pctonlieorders@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Facebook className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Facebook</p>
                      <a
                        href="https://www.facebook.com/PrinceCharmingRSBG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        Prints Charming on Facebook
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-sm text-foreground">
                  <strong>Stop by and see us!</strong> We pride ourselves on
                  personal service and would love to help you in person.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
