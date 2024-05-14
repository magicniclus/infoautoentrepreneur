/* eslint-disable @next/next/no-img-element */
const Atouts = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-700 sm:text-4xl">
                Pourquoi choisir <br />{" "}
                <span className="text-green-700">Info Auto-Entrepreneur</span>{" "}
                <br />
                pour votre Auto-Entreprise?
              </p>
              <p className="my-6 text-lg leading-8 text-slate-700">
                Avec Info Auto-Entrepreneur, lancer votre auto-entreprise en
                ligne devient un jeu d&apos;enfant. Rejoignez le régime de la
                micro-entreprise en tout juste 15 minutes et embarquez dans
                l&apos;aventure de l&apos;auto-entrepreneuriat sans attendre.
              </p>
              <a
                href="#form"
                className={`bg-green-700 p-5 text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut cursor-pointer`}
              >
                Devenir Auto-Entrepreneur
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
