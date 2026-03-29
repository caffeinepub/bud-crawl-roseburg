import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#1F3B2F" }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-white font-bold text-xl tracking-tight hover:text-white/90 transition-colors"
        >
          Prints Charming
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "HOME", to: "/" },
            { label: "SMALL ORDERS", to: "/small-orders" },
            { label: "GET A QUOTE", to: "/quote" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-white/80 hover:text-white text-sm font-semibold tracking-widest uppercase transition-colors"
              activeProps={{ className: "text-white" }}
              data-ocid={`nav.${item.label.toLowerCase().replace(/ /g, "_")}.link`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/#contact"
            className="text-white/80 hover:text-white text-sm font-semibold tracking-widest uppercase transition-colors"
          >
            CONTACT
          </a>
        </nav>
        {/* Mobile nav */}
        <div className="flex md:hidden gap-4">
          <Link
            to="/small-orders"
            className="text-white/80 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            ORDERS
          </Link>
          <Link
            to="/quote"
            className="text-white/80 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            QUOTE
          </Link>
        </div>
      </div>
    </header>
  );
}
