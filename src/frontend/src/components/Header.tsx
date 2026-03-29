import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-xs">
      <div className="container flex h-20 items-center justify-between px-4 max-w-6xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center" data-ocid="nav.link">
          <img
            src="/assets/prints_charming_main_logo-019d2e51-65cd-758c-b83d-1c982af12245.jpg"
            alt="Prints Charming Screen Printing & Embroidery"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {isHome ? (
            <>
              <a
                href="#about"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#gallery"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </>
          ) : (
            <Link
              to="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
          )}
          <Link
            to="/small-orders"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Small Orders
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/quote" data-ocid="nav.primary_button">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-5">
              Get A Quote
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-2">
          {isHome && (
            <>
              <button
                type="button"
                className="block w-full text-left text-sm font-medium hover:text-primary py-1"
                onClick={() => scrollTo("about")}
              >
                About
              </button>
              <button
                type="button"
                className="block w-full text-left text-sm font-medium hover:text-primary py-1"
                onClick={() => scrollTo("gallery")}
              >
                Gallery
              </button>
              <button
                type="button"
                className="block w-full text-left text-sm font-medium hover:text-primary py-1"
                onClick={() => scrollTo("contact")}
              >
                Contact
              </button>
            </>
          )}
          <Link
            to="/"
            className="block text-sm font-medium hover:text-primary py-1"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/small-orders"
            className="block text-sm font-medium hover:text-primary py-1"
            onClick={() => setMobileOpen(false)}
          >
            Small Orders
          </Link>
          <Link to="/quote" onClick={() => setMobileOpen(false)}>
            <Button className="w-full rounded-full bg-primary text-primary-foreground font-semibold mt-2">
              Get A Quote
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
