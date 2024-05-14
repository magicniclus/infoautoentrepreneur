import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: "Inscription au régime",
    id: "tier-freelancer",
    href: "/devenir-auto-entrepreneur",
    price: "59€",
    description: "The essentials to provide your best work for clients.",
    bg: "green-700/5",
    features: [
      "Assistance par un conseiller dédié",
      "Inscription au Statut et suivi personnalisé",
      "Vérification du dossier et télétransmission",
      "Examen de la situation personnelle",
      "Obtention du numéro SIRET",
    ],
    mostPopular: true,
  },
  {
    name: "Modification de situation",
    id: "tier-startup",
    href: "/modification",
    price: "59€",
    description: "A plan that scales with your rapidly growing business.",
    bg: "blue-700/5",
    features: [
      "Assistance par un conseiller dédié",
      "Changement de situation",
      "Mise à jour des informations",
      "Vérification du dossier et télétransmission",
      "Examen de la situation personnelle",
    ],
    mostPopular: false,
  },
  {
    name: "Cessation d'activité",
    id: "tier-enterprise",
    href: "/cessation",
    price: "59€",
    description: "Dedicated support and infrastructure for your company.",
    bg: "red-700/5",
    features: [
      "Assistance par un conseiller dédié",
      "Cessation d'activité",
      "Transmission du dossier de cessation",
      "Confirmation lorsque la cessation est effective",
    ],
    mostPopular: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="py-16 relative">
      <div className="absolute top-0 right-0 w-[100vw] h-[500px] -z-10 bg-slate-100"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-green-700">
            Information
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-slate-700 sm:text-5xl">
            Nos offres
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-700">
          Notre Grille de tarification Auto-Entrepreneur 2024
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <>
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "ring-2 ring-green-700"
                    : "ring-1 ring-gray-200",
                  "rounded-3xl relative overflow-hidden p-8 xl:p-10 bg-white"
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className="text-lg font-semibold leading-8 text-slate-700"
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular && (
                    <p className="rounded-full bg-green-700/10 px-2.5 py-1 text-xs font-semibold leading-5 text-green-700">
                      Plus populaire
                    </p>
                  )}
                </div>
                {/* <p className="mt-4 text-sm leading-6 text-slate-700">
                  {tier.description}
                </p> */}
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-slate-700">
                    {tier.price}
                  </span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={
                    "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-slate-700 ring-1 ring-inset ring-slate-400 hover:ring-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                  }
                >
                  {tier.id === "tier-freelancer"
                    ? "Inscription"
                    : tier.id === "tier-startup"
                    ? "Modification"
                    : "Cessation"}
                </a>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-slate-700 xl:mt-10"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-green-700"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
