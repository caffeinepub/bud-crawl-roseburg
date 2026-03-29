import { useState } from "react";
import logoImg from "../../public/assets/prints_charming_main_logo-019d2e51-65cd-758c-b83d-1c982af12245.jpg";

export default function LogoSection() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="flex justify-center py-10 px-4">
      {!logoError ? (
        <img
          src={logoImg}
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
