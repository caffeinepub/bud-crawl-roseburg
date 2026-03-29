import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-navy text-navy-foreground pt-12 pb-6">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <span className="font-display text-xl font-bold text-primary">
                Prints Charming
              </span>
              <div className="text-xs tracking-widest uppercase text-navy-foreground/60 mt-0.5">
                Screen Printing &amp; Embroidery
              </div>
            </div>
            <p className="text-sm text-navy-foreground/70 leading-relaxed">
              Your local custom apparel shop for over 50 years in Roseburg, OR.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-navy-foreground">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-navy-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>
                  419 SE Main St
                  <br />
                  Roseburg, OR 97470
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:5416733716"
                  className="hover:text-primary transition-colors"
                >
                  (541) 673-3716
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:pctonlieorders@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  pctonlieorders@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="https://www.facebook.com/PrinceCharmingRSBG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-navy-foreground">
              Quick Links
            </h4>
            <div className="space-y-2 text-sm">
              <Link
                to="/"
                className="block text-navy-foreground/70 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/small-orders"
                className="block text-navy-foreground/70 hover:text-primary transition-colors"
              >
                Design on the Fly
              </Link>
              <Link
                to="/quote"
                className="block text-navy-foreground/70 hover:text-primary transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-navy-foreground/50">
          © {year} Prints Charming. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
