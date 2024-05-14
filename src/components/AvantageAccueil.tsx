import { CheckCircleIcon } from "@heroicons/react/24/outline";

const AvantageAccueil = () => {
  const stats = [
    {
      id: 1,
      name: "Remplissez notre formulaire simplifié d'inscription au régime auto entrepreneur.",
      value: "+ 1 000 000 d'entreprises créées en 2023",
      icon: "",
    },
    {
      id: 2,
      name: "Nous vérifions vos informations et nous occupons des démarches administratives pour vous.",
      value: "Dossier traité sous 24h",
      icon: "",
    },
    {
      id: 3,
      name: "Recevez votre numéro SIRET et accédez à nos outils de gestion. Vous êtes prêt à démarrer !",
      value: "Conseiller dédié à votre écoute",
      icon: "",
    },
  ];

  return (
    <section className="py-10 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col mx-auto max-w-xs gap-y-4"
            >
              <dt className="rounded-full self-center">
                <CheckCircleIcon className="h-9 w-9 text-green-700" />
              </dt>
              <dd className=" font-semibold tracking-tight text-slate-700 max-w-[150px]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default AvantageAccueil;
