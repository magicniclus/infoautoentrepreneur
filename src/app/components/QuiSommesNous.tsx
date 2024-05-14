/* eslint-disable @next/next/no-img-element */

const QuiSommesNous = () => {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <p className="text-base font-semibold leading-7 text-green-700">
            Qui sommes-nous ?
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Info Auto-Entrepreneur
          </h1>
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-slate-500 lg:max-w-none lg:grid-cols-2">
            <div>
              <p>
                Info-AutoEntrepreneur.fr accompagne les entrepreneurs dans la
                création, la modification ou la cessation d&apos;activité en
                tant qu&apos;auto-entrepreneur. Nous simplifions
                l&apos;administratif pour vous permettre de vous concentrer sur
                ce qui compte vraiment : votre activité.
              </p>
              <p className="mt-8">
                Notre mission est de rendre l&apos;administratif transparent et
                accessible, éliminant ainsi les barrières qui peuvent freiner
                l&apos;entrepreneuriat. Nous offrons des guides, des conseils
                personnalisés et un soutien constant pour toutes vos démarches.
              </p>
            </div>
            <div>
              <p>
                Grâce à notre plateforme, gérez facilement tous les aspects
                administratifs de votre statut d&apos;auto-entrepreneur sans
                tracas. De la déclaration de début d&apos;activité jusqu&apos;à
                la gestion quotidienne, nous sommes à vos côtés.
              </p>
              <p className="mt-8">
                Notre équipe d&apos;experts est dédiée à votre réussite. Que
                vous débutiez dans le monde de l&apos;entrepreneuriat ou que
                vous soyez déjà bien établi, nous avons les outils et les
                connaissances pour vous aider à prospérer.
              </p>
            </div>
          </div>
          <div className="mt-10 flex">
            <a
              href="#"
              className="rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Devenir Auto-entrepreneur
            </a>
          </div>
        </div>
      </div>
      {/* <div className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <img
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            src="/background/background-accueil.jpg"
            alt=""
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default QuiSommesNous;
