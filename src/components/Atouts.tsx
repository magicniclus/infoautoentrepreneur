/* eslint-disable @next/next/no-img-element */
const Atouts = () => {
  return (
    <section className="py-24 overflow-hidden bg-slate-700">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col md:items-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-center">
            Pourquoi choisir <br />{" "}
            <span className="">Info Auto-Entrepreneur</span> <br />
            pour votre Auto-Entreprise?
          </p>
          <p className="my-6 text-lg leading-8 text-white md:text-center">
            Avec Info Auto-Entrepreneur, lancer votre auto-entreprise en ligne
            devient un jeu d&apos;enfant. Rejoignez le régime de la
            micro-entreprise en tout juste 15 minutes et embarquez dans
            l&apos;aventure de l&apos;auto-entrepreneuriat sans attendre.
          </p>
        </div>
        <div className="grid items-center max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <ul className="my-6 text-lg leading-8 text-white list-disc list-inside">
                <li>
                  <span className="font-bold">Inscription rapide :</span> En
                  seulement 15 minutes, vous pouvez compléter votre inscription
                  et commencer votre activité.
                </li>
                <li>
                  <span className="font-bold">Simplicité :</span> Nous vous
                  guidons à chaque étape, rendant le processus facile et sans
                  tracas.
                </li>
                <li>
                  <span className="font-bold">Assistance dédiée :</span> Notre
                  équipe est là pour répondre à toutes vos questions et vous
                  aider en cas de besoin.
                </li>
                <li>
                  <span className="font-bold">Accès aux ressources :</span>{" "}
                  Profitez d&apos;un accès à une vaste gamme de ressources et de
                  guides pour vous aider à réussir.
                </li>
              </ul>
              <p className="my-6 text-lg leading-8 text-white">
                En choisissant Info Auto-Entrepreneur, vous optez pour une
                solution complète et efficace pour lancer et gérer votre
                auto-entreprise. Nous sommes dédiés à votre réussite et nous
                nous engageons à vous offrir le meilleur service possible.
              </p>
              <a
                href="#form"
                className={`p-5 text-white bg-green-700 w-full py-2 rounded-md mt-5 transition duration-150 ease-in-out cursor-pointer`}
              >
                DEVENIR AUTO-ENTREPRENEUR
              </a>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="/background/dessin.png"
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

export default Atouts;
