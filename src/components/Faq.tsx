import { FC } from "react";

type Faq = {
  id: number;
  question: JSX.Element;
  answer: string;
};

// Définition du type pour les props de votre composant.
type PourquoiProps = {
  faqs?: Faq[]; // Utilisez le type Faq ici.
  titre?: string;
};

// Les données pour les FAQs.
const faqsData: Faq[] = [
  {
    id: 1,
    question: (
      <>
        Comment devenir{" "}
        <span className="text-cyan-900 font-semibold">auto-entrepreneur</span> ?
      </>
    ),
    answer:
      "Toute personne majeure ou mineure émancipée, sans statut de TNS préexistant et avec une adresse en France, peut devenir auto-entrepreneur. Pour les non-UE, une carte de séjour adéquate est nécessaire. Les salariés, retraités, fonctionnaires, demandeurs d'emploi, et étudiants peuvent également s'inscrire.",
  },
  {
    id: 2,
    question: (
      <>
        Quelles sont les étapes pour s&apos;inscrire en tant qu&apos;
        <span className="text-cyan-900 font-semibold">auto-entrepreneur</span> ?
      </>
    ),
    answer:
      "L'inscription se fait via une déclaration de début d’activité en ligne, sur le site du guichet unique, depuis le 1er janvier 2023. Il faut fournir les justificatifs requis selon l'activité exercée. Les CFE compétents varient selon l’activité : Urssaf pour les libéraux, CCI pour le commerce, CMA pour l'artisanat, et le greffe du tribunal de commerce pour les agents commerciaux.",
  },
  {
    id: 3,
    question: (
      <>
        Les <span className="text-cyan-900 font-semibold">retraités</span>{" "}
        peuvent-ils ouvrir une auto-entreprise ?
      </>
    ),
    answer:
      "Oui, le statut d'auto-entrepreneur est accessible aux retraités, permettant de compléter leur pension sans impact sur son versement, sauf cas de plafonnement. Il est recommandé de consulter sa caisse de retraite pour plus de détails.",
  },
  {
    id: 4,
    question: (
      <>
        Les <span className="text-cyan-900 font-semibold">salariés</span>{" "}
        peuvent-ils créer une auto-entreprise ?
      </>
    ),
    answer:
      "Oui, en tant que salarié, vous pouvez lancer une auto-entreprise comme activité complémentaire. Cela vous permet de conserver votre couverture sociale principale. Vérifiez cependant les restrictions éventuelles dans votre contrat de travail.",
  },
  {
    id: 6,
    question: (
      <>
        Un <span className="text-cyan-900 font-semibold">mineur</span> peut-il
        devenir auto-entrepreneur ?
      </>
    ),
    answer:
      "Les mineurs émancipés peuvent créer leur auto-entreprise dès 16 ans. Les mineurs non émancipés, depuis la suppression de l'EIRL le 14 février 2022, ne peuvent plus le faire.",
  },
  {
    id: 7,
    question: (
      <>
        Pourquoi se faire accompagner pour déclarer son{" "}
        <span className="text-cyan-900 font-semibold">auto-entreprise</span> ?
      </>
    ),
    answer:
      "L'accompagnement simplifie les démarches souvent longues et complexifiées par la multitude d'options et de régulations. Il assure un dossier bien constitué, économise du temps et aide à choisir les meilleures options fiscales et sociales.",
  },
  {
    id: 8,
    question: (
      <>
        Quelle est la différence entre une{" "}
        <span className="text-cyan-900 font-semibold">auto-entreprise</span> et
        une entreprise individuelle ?
      </>
    ),
    answer:
      "L'auto-entreprise est un régime simplifié de l'entreprise individuelle, offrant des modalités fiscales et sociales différentes, notamment un calcul simplifié des cotisations et un abattement forfaitaire selon l'activité.",
  },
  {
    id: 9,
    question: (
      <>
        Quels justificatifs sont nécessaires pour s&apos;inscrire en tant
        qu&apos;
        <span className="text-cyan-900 font-semibold">auto-entrepreneur</span> ?
      </>
    ),
    answer:
      "La déclaration doit inclure une copie de pièce d'identité et, selon l'activité, d'autres justificatifs comme un justificatif de domicile ou de qualifications professionnelles, le tout dématérialisé via le guichet unique.",
  },
  {
    id: 10,
    question: (
      <>
        Dois-je effectuer un stage obligatoire pour devenir{" "}
        <span className="text-cyan-900 font-semibold">auto-entrepreneur</span> ?
      </>
    ),
    answer:
      "Non, le Stage de Préparation à l'Installation (SPI) est devenu facultatif depuis la loi PACTE du 22 mai 2019 pour les activités artisanales.",
  },
  {
    id: 11,
    question: (
      <>
        Les activités nécessitant un diplôme ou des qualifications spécifiques
        peuvent-elles être exercées en{" "}
        <span className="text-cyan-900 font-semibold">auto-entreprise</span> ?
      </>
    ),
    answer:
      "Oui, certaines professions réglementées exigent des qualifications spécifiques, comme des diplômes ou une expérience professionnelle de trois ans dans le domaine, pour être exercées en tant qu'auto-entrepreneur.",
  },
  {
    id: 12,
    question: (
      <>
        Quels sont les plafonds de chiffre d&apos;affaires pour un{" "}
        <span className="text-cyan-900 font-semibold">auto-entrepreneur</span> ?
      </>
    ),
    answer:
      "Les plafonds varient selon le type d'activité : 188 700 € pour l'achat/revente de marchandises et certaines prestations de service, et 77 700 € pour les services et activités libérales.",
  },
  {
    id: 13,
    question: (
      <>
        Quel est le coût pour créer une{" "}
        <span className="text-cyan-900 font-semibold">micro-entreprise</span>{" "}
        via le Portail Auto-Entrepreneur ?
      </>
    ),
    answer:
      "Le coût pour l'assistance à la création d'une micro-entreprise par le Portail Auto-Entrepreneur est de 59 €, incluant la vérification du dossier et un accompagnement personnalisé.",
  },
  {
    id: 14,
    question: (
      <>
        Quel plafond de chiffre d&apos;affaires s&apos;applique à mon{" "}
        <span className="text-cyan-900 font-semibold">auto-entreprise</span> si
        j&apos;exerce une activité mixte ?
      </>
    ),
    answer:
      "Pour une activité mixte, le plafond global est de 188 700 €, avec la condition que la part des prestations de services n'excède pas 77 700 €.",
  },
  {
    id: 15,
    question: (
      <>
        Existe-t-il des aides financières pour la création d&apos;une{" "}
        <span className="text-cyan-900 font-semibold">auto-entreprise</span> ?
      </>
    ),
    answer:
      "Oui, plusieurs aides sont disponibles, comme l'ACRE pour une exonération partielle de cotisations, le CAPE pour un soutien matériel et financier, et le NACRE pour un accompagnement à la création ou la reprise.",
  },
];
const Faq: FC<PourquoiProps> = ({
  faqs = faqsData, // Utilisez le bon nom de variable pour les données par défaut.
  titre = "Questions fréquentes sur la création d'une auto-entreprise:",
}) => {
  return (
    <section>
      {" "}
      <div className="mx-auto max-w-5xl divide-y divide-gray-900/10 px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl max-w-[70%] text-slate-700">
          {titre}
        </h2>
        <dl className="mt-10 space-y-8 divide-y divide-slate-700/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-lg font-semibold leading-7 text-slate-700 lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base leading-7 text-slate-500">
                  {faq.answer}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Faq;
