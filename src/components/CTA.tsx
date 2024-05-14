import { FC } from "react";

type CTAProps = {
  titre?: string;
  paragraphe?: string;
  texteBouton?: string;
  lienBouton?: string;
};

const CTA: FC<CTAProps> = ({
  titre = "Devenez Auto-Entrepreneur",
  paragraphe = "Inscrivez-vous comme des milliers de personnes chaque année au régime de l'auto-entrepreneur et lancez votre activité en toute simplicité.",
  texteBouton = "Je m'inscris",
  lienBouton = "#form",
}) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden px-6 py-16 bg-green-700 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {titre}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
            {paragraphe}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={lienBouton}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {texteBouton}
            </a>
          </div>
          {/* SVG et autres éléments décoratifs restent inchangés */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827691b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827691b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#dcfce7" />
                <stop offset={1} stopColor="#86efac" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CTA;
