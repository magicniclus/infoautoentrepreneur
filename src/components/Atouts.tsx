/* eslint-disable @next/next/no-img-element */
const Atouts = () => {
  return (
    <section className="py-24 overflow-hidden bg-slate-700">
      <div className="px-6 mx-auto max-w-6xl lg:px-8">
        <div className="flex flex-col">
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pourquoi choisir <span className="">Info Auto-Entrepreneur</span>
            pour votre Auto-Entreprise?
          </p>
          <p className="my-6 text-lg leading-8 text-white">
            Avec Info Auto-Entrepreneur, lancer votre auto-entreprise en ligne
            devient un jeu d&apos;enfant. Rejoignez le régime de la
            micro-entreprise en tout juste 15 minutes et embarquez dans
            l&apos;aventure de l&apos;auto-entrepreneuriat sans attendre.
          </p>
        </div>
        <div className="grid items-center max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="">
            <div className="lg:max-w-md">
              <ul className="my-6 text-lg leading-8 text-white list-inside">
                <li className="mt-2">
                  <span className="font-bold">1-Inscription rapide :</span> En
                  seulement 15 minutes, vous pouvez compléter votre inscription
                  et commencer votre activité.
                </li>
                <li className="mt-2">
                  <span className="font-bold">2-Simplicité :</span> Nous vous
                  guidons à chaque étape, rendant le processus facile et sans
                  tracas.
                </li>
                <li className="mt-2">
                  <span className="font-bold">3-Assistance dédiée :</span> Notre
                  équipe est là pour répondre à toutes vos questions et vous
                  aider en cas de besoin.
                </li>
                <li className="mt-2">
                  <span className="font-bold">4-Accès aux ressources :</span>{" "}
                  Profitez d&apos;un accès à une vaste gamme de ressources et de
                  guides pour vous aider à réussir.
                </li>
              </ul>
              <a
                href="#form"
                className={`p-5 text-white bg-green-700 w-full py-2 rounded-md mt-5 transition duration-150 ease-in-out cursor-pointer`}
              >
                DEVENIR AUTO-ENTREPRENEUR
              </a>
            </div>
          </div>
          <div className="flex items-start w-full md:7/12">
            <div className="rounded-lg overflow-hidden w-full md:mx-0 mx-auto">
              <iframe
                width={"100%"}
                height={"280"}
                src="https://www.youtube.com/embed/A0EdYBP1qw0?si=MiXofxndA8TpEIE8"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            {/* <img
              src="/background/dessin.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl sm:w-[30rem]"
              width={2432}
              height={1442}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Atouts;
