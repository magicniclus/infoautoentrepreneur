import {
  CursorArrowRippleIcon,
  DocumentCheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

const EtapesModification = () => {
  const stats = [
    {
      id: 1,
      name: "Remplissez notre formulaire simplifié de modification d'adresse ou d'activité de votre entreprise.",
      value: "1 - Modification",
      icon: "",
    },
    {
      id: 2,
      name: "Nous vérifions vos informations et nous occupons des démarches administratives pour vous.",
      value: "2 - Validation",
      icon: "",
    },
    {
      id: 3,
      name: "Après approbation de votre dossier par l'administration, vous recevrez votre nouveau K-bis ainsi qu'un avis de situation mis à jour.",
      value: "3 - Reception",
      icon: "",
    },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col mx-auto max-w-xs gap-y-4"
            >
              {stat.id === 1 ? (
                <dt className="p-3 bg-blue-700/10  rounded-full self-center">
                  <CursorArrowRippleIcon className="h-12 w-12 text-blue-700" />
                </dt>
              ) : stat.id === 2 ? (
                <dt className="p-3 bg-cyan-900/10 rounded-full self-center">
                  <DocumentMagnifyingGlassIcon className="h-12 w-12 text-cyan-900" />
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

export default EtapesModification;
