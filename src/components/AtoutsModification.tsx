/* eslint-disable @next/next/no-img-element */
const AtoutsModification = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-700 sm:text-4xl">
                Pourquoi Choisir <br />{" "}
                <span className="text-cyan-900">Info-Autoentrepreneur.fr</span>{" "}
                <br />
                pour Votre Auto-Entreprise?
              </p>
              <p className="my-6 text-lg leading-8 text-slate-700">
                Avec votre Espace Auto-Entrepreneur, la modification des
                éléments de votre auto-entreprise se fait en toute simplicité.
                Adaptez votre statut de micro-entreprise aux évolutions de votre
                activité en moins de 15 minutes et continuez votre parcours
                d&apos;auto-entrepreneuriat sans interruption.
              </p>
              <a
                href="#form"
                className={`bg-cyan-900 p-5 text-white w-full py-2 rounded-md mt-5 hover:bg-cyan-900/70 transition duration-150 easeInOut cursor-pointer`}
              >
                Modifier ma situation
              </a>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="/background/dessin-modification.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl sm:w-[30rem]"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtoutsModification;
