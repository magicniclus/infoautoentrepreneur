import Avis from "@/components/Avis";
import CTA from "@/components/CTA";
import EtapesCessation from "@/components/EtapesCessation";
import Faq from "@/components/Faq";
import Notes from "@/components/Notes";
import NavBar from "@/components/TailwindUi/NavBar";
import BigFooter from "@/components/footer/BigFooter";
import HeroCession from "../../../components/hero/HeroSession";

const faqsCessationAutoEntreprise = [
  {
    id: 1,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Cessation, radiation et suspension : quelles différences ?
        </span>
      </>
    ),
    answer:
      "La cessation d'activité est une démarche volontaire pour arrêter votre activité d'auto-entrepreneur. La radiation est initiée par l'administration, souvent en cas d'inactivité prolongée. La suspension permet de mettre temporairement en pause votre activité en déclarant un chiffre d'affaires nul.",
  },
  {
    id: 2,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Faut-il fermer son auto-entreprise en cas de déménagement ?
        </span>
      </>
    ),
    answer:
      "Non, un déménagement ne nécessite pas de fermer votre auto-entreprise. Vous devez simplement mettre à jour votre adresse auprès de l'administration et votre CFE.",
  },
  {
    id: 3,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Cessation d’activité : d’autres formalités sont-elles nécessaires ?
        </span>
      </>
    ),
    answer:
      "Oui, après la cessation, vous devez déclarer votre dernier chiffre d'affaires, régler les dernières cotisations sociales, effectuer votre déclaration d'impôt sur le revenu, et potentiellement déclarer et payer la TVA une dernière fois ainsi que la CFE en fin d'année.",
  },
  {
    id: 4,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Quel est le prix d’une fermeture d’auto-entreprise ?
        </span>
      </>
    ),
    answer:
      "Chez Info-Autoentrepreneur, la déclaration de cessation d’activité coûte 59 €, incluant la gestion du dossier et l'accompagnement personnalisé.",
  },
  {
    id: 5,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Fin de l’activité d’auto-entrepreneur : est-ce que j’ai le droit au
          chômage ?
        </span>
      </>
    ),
    answer:
      "En général, vous n'avez pas droit au chômage suite à la fermeture volontaire de votre auto-entreprise, sauf en cas de liquidation ou redressement judiciaire où l'Allocation des travailleurs indépendants (ATI) peut être accordée.",
  },
  {
    id: 6,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Est-il possible de rouvrir son auto-entreprise plus tard ?
        </span>
      </>
    ),
    answer:
      "Oui, vous pouvez relancer votre activité d'auto-entrepreneur sans délai, que vous repreniez la même activité ou en démarriez une nouvelle.",
  },
  {
    id: 7,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Quel formulaire pour fermer sa micro-entreprise ?
        </span>
      </>
    ),
    answer:
      "Hors démarches en ligne, utilisez le formulaire Cerfa n° 13905, ou « P2-P4 micro-entrepreneur », pour déclarer la cessation de votre activité.",
  },
  {
    id: 8,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Cessation d’activité : quel impact sur la déclaration de revenus ?
        </span>
      </>
    ),
    answer:
      "Vous devez informer l'administration fiscale dans les 45 jours suivant la cessation et déclarer les revenus réalisés depuis le début de l'année jusqu'à la date de cessation.",
  },
  {
    id: 9,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Suis-je obligé de fermer mon auto-entreprise si mon chiffre d’affaires
          est nul ?
        </span>
      </>
    ),
    answer:
      "Non, il n'est pas obligatoire de fermer votre auto-entreprise en cas de chiffre d'affaires nul, mais une déclaration est requise, et une inactivité prolongée peut mener à la radiation.",
  },
  {
    id: 10,
    question: (
      <>
        <span className="text-green-700 font-semibold">
          Dois-je fermer ma micro-entreprise si je dépasse les plafonds de
          chiffre d’affaires ?
        </span>
      </>
    ),
    answer:
      "Non, dépasser les plafonds une année ne vous oblige pas à fermer votre auto-entreprise ou à changer de régime. Cependant, dépasser ces plafonds pendant deux années consécutives entraîne un changement automatique de statut.",
  },
];

const page = () => {
  return (
    <>
      <NavBar />
      <main>
        <HeroCession />
        <Notes />
        <EtapesCessation />
        <Faq faqs={faqsCessationAutoEntreprise} />
        <CTA
          titre="Vous souhaitez fermer votre Auto-Entreprise ?"
          texteBouton="Fermer"
          paragraphe="Fermez votre auto-entreprise en toute simplicité."
        />
        <Avis />
      </main>
      <BigFooter />
    </>
  );
};

export default page;
