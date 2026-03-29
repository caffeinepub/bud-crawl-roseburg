import { Facebook } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer style={{ backgroundColor: "#1F3B2F" }} className="text-white/80">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">
              Prints Charming Screen Printing &amp; Embroidery
            </p>
            <p className="text-sm mt-1">
              419 SE Main St, Roseburg, OR 97470 &nbsp;|&nbsp; (541) 673-3716
            </p>
            <p className="text-sm">
              <a
                href="mailto:pctonlieorders@gmail.com"
                className="hover:text-white transition-colors"
              >
                pctonlieorders@gmail.com
              </a>
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <a
              href="https://www.facebook.com/PrinceCharmingRSBG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Facebook size={20} />
              <span className="text-sm font-medium">Find us on Facebook</span>
            </a>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-white/50">
          <p>
            &copy; {year} Prints Charming Screen Printing &amp; Embroidery.
            Built with <span className="text-white/70">&hearts;</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
