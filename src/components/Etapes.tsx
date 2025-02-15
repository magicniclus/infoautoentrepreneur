import {
  CursorArrowRippleIcon,
  DocumentCheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

const Etapes = ({ titre }: { titre?: string }) => {
  const stats = [
    {
      id: 1,
      name: "Remplissez notre formulaire simplifié d'inscription au régime auto entrepreneur.",
      value: "1 - Inscription",
      icon: "",
    },
    {
      id: 2,
      name: "Nos formalistes vérifient et traitent votre dossier complet sous 24h pour une inscription simple et rapide",
      value: "2 - Vérification",
      icon: "",
    },
    {
      id: 3,
      name: "Statistiques, création de devis et factures, support illimité inclus dans votre espace client.",
      value: "3 - Gestion",
      icon: "",
    },
  ];
  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="absolute bottom-0 right-0 h-4 bg-slate-300 w-full" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {titre && (
          <h2 className="text-4xl font-bold leading-10 text-center text-slate-700 mb-20">
            {titre}
          </h2>
        )}
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col mx-auto max-w-xs gap-y-4"
            >
              {stat.id === 1 ? (
                <dt className="p-3 bg-cyan-600/10  rounded-full self-center">
                  <CursorArrowRippleIcon className="h-12 w-12 text-cyan-600" />
                </dt>
              ) : stat.id === 2 ? (
                <dt className="p-3 bg-green-700/10 rounded-full self-center">
                  <DocumentMagnifyingGlassIcon className="h-12 w-12 text-green-700" />
                </dt>
              ) : (
                <dt className="p-3 bg-yellow-500/10 rounded-full self-center">
                  <DocumentCheckIcon className="h-12 w-12 text-yellow-500" />
                </dt>
              )}
              <dd className="text-3xl font-semibold tracking-tight text-slate-700 sm:text-2xl">
                {stat.value}
              </dd>
              <dd className="text-base leading-7 text-slate-700">
                {stat.name}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Etapes;
