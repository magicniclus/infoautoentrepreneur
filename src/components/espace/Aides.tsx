/* eslint-disable @next/next/no-img-element */
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

const Aides = () => {
  return (
    <div className="w-full">
      <div className="bg-slate-100 p-4 rounded-md flex flex-col">
        <InformationCircleIcon className="h-12 w-12 text-slate-700" />
        <h1 className="text-lg font-bold text-slate-700 mt-4">
          Assistance et Ressources pour Auto-entrepreneurs
        </h1>
        <p className="mt-5 text-xl text-slate-500">
          Découvrez comment Info-Autoentrepreneur.fr facilite la création et la
          gestion de votre statut d&apos;autoentrepreneur grâce à des outils
          simplifiés et un accompagnement personnalisé.
        </p>
        <img
          src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Illustration d'assistance"
          className="mt-10 rounded-lg h-[250px] w-full object-cover"
        />

        <div className="mt-10 max-w-2xl text-left">
          <h2 className="text-2xl font-bold text-slate-700">
            Simplification des démarches administratives
          </h2>
          <p className="mt-5 text-slate-500">
            Nous automatisons les procédures et réduisons la complexité des
            formalités pour que vous puissiez vous lancer rapidement et en toute
            confiance.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center">
              <CheckCircleIcon className="h-7 w-7 text-cyan-900 mr-3" />
              <span>
                <strong>Création simplifiée :</strong> Complétez votre
                inscription en quelques clics à partir de notre plateforme.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="h-7 w-7 text-cyan-900 mr-3" />
              <span>
                <strong>Gestion des déclarations :</strong> Suivi et dépôt
                automatique de vos déclarations de revenus et cotisations
                sociales.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircleIcon className="h-7 w-7 text-cyan-900 mr-3" />
              <span>
                <strong>Accompagnement personnalisé :</strong> Notre équipe est
                là pour répondre à toutes vos questions et vous aider à naviguer
                dans vos obligations légales.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-16 max-w-2xl text-left">
          <h2 className="text-2xl font-bold text-slate-700">
            Partenariats et Outils Professionnels
          </h2>
          <p className="mt-5 text-slate-500">
            En partenariat avec des plateformes telles que Shopify et
            Avenue-Immo, nous vous offrons des solutions adaptées à votre
            activité professionnelle.
          </p>
        </div>

        <div className="mt-16 max-w-2xl text-left">
          <h2 className="text-2xl font-bold text-slate-700">
            Prochainement : Outil de Gestion et Création de Factures
          </h2>
          <p className="mt-5 text-slate-500">
            Nous développons un outil pour vous permettre de gérer vos factures
            et suivre vos paiements de manière efficace, optimisant ainsi votre
            gestion financière.
          </p>
        </div>

        <div className="mt-16">
          <a
            href="/"
            className="bg-cyan-900 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded-lg"
          >
            Découvrez nos services
          </a>
        </div>
      </div>
    </div>
  );
};

export default Aides;
