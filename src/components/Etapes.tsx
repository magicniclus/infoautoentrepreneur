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
      name: "Nous vérifions vos informations et nous nous occupons des démarches administratives pour vous.",
      value: "2 - Validation",
      icon: "",
    },
    {
      id: 3,
      name: "Recevez votre numéro SIRET et accédez à nos outils de gestion. Vous êtes prêt à démarrer !",
      value: "3 - Lancement",
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

export default Etapes;
