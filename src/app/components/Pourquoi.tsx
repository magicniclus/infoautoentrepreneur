import {
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  HandRaisedIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import { FC } from "react";

type Raison = {
  id: number;
  title: string;
  description: string;
};

type PourquoiProps = {
  raisons?: Raison[];
  titre?: string;
};

const raisonsParDefaut: Raison[] = [
  {
    id: 1,
    title: "Flexibilité Maximale",
    description:
      "Profitez d'une autonomie sans égal pour gérer votre temps et choisir vos projets, idéal pour concilier vie professionnelle et personnelle à votre rythme.",
  },
  {
    id: 2,
    title: "Simplification Administrative",
    description:
      "Bénéficiez de démarches administratives allégées et d'un régime fiscal avantageux, permettant une gestion plus aisée et une concentration sur l'essentiel : votre activité.",
  },
  {
    id: 3,
    title: "Coûts de Lancement Réduits",
    description:
      "Lancez-vous sans nécessiter un capital important grâce à des frais de démarrage et des charges fixes minimisés, une aubaine pour tester une idée d’entreprise avec moins de risques.",
  },
  {
    id: 4,
    title: "Liberté d'Entreprendre",
    description:
      "Embrassez l'opportunité de réaliser votre vision en toute indépendance, d'innover et de créer de la valeur dans le domaine qui vous passionne.",
  },
];

const Pourquoi: FC<PourquoiProps> = ({
  raisons = raisonsParDefaut,
  titre = "Pourquoi choisir le statut d'auto-entrepreneur ?",
}) => {
  return (
    <section className="bg-slate-50 py-24 text-slate-700">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {" "}
        <div className="mx-auto max-w-4xl lg:text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {titre}
          </h2>
          <div className="flex flex-wrap mt-5">
            {raisons.map((reason) => (
              <div
                key={reason.title}
                className="flex flex-col bg-white mx-auto max-w-sm gap-y-4 mt-8 md:w-[70%] border border-slate-200 p-4 rounded-lg"
              >
                <dt className="p-3 rounded-full self-center">
                  {reason.id === 1 ? (
                    <HandRaisedIcon className="h-12 w-12 text-slate-500" />
                  ) : reason.id === 2 ? (
                    <IdentificationIcon className="h-12 w-12 text-slate-500" />
                  ) : reason.id === 3 ? (
                    <ArrowTrendingUpIcon className="h-12 w-12 text-slate-500" />
                  ) : (
                    <BriefcaseIcon className="h-12 w-12 text-slate-500" />
                  )}
                </dt>
                <dd className="text-3xl font-semibold tracking-tight sm:text-2xl">
                  {reason.title}
                </dd>
                <dd className="text-base leading-7">{reason.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pourquoi;
