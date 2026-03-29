import { useState } from "react";

export default function LogoSection() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="flex justify-center py-10 px-4">
      {!logoError ? (
        <img
          src="/assets/uploads/prints-charming-logo.png"
          alt="Prints Charming"
          className="w-auto max-w-[380px] h-auto"
          onError={() => setLogoError(true)}
        />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand tracking-tight">
            PRINTS CHARMING
          </h1>
          <p className="text-muted-foreground text-sm mt-1 tracking-wider uppercase">
            Screen Printing &amp; Embroidery
          </p>
        </div>
      )}
    </div>
  );
}
