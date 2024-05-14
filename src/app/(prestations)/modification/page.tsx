import AtoutsModification from "@/components/AtoutsModification";
import Avis from "@/components/Avis";
import CTA from "@/components/CTA";
import EtapesModification from "@/components/EtapesModification";
import Faq from "@/components/Faq";
import BigFooter from "@/components/footer/BigFooter";
import Hero from "@/components/hero/HeroModification";
import Notes from "@/components/Notes";
import Pourquoi from "@/components/Pourquoi";
import NavBar from "@/components/TailwindUi/NavBar";

const pourquoi = [
  {
    id: 1,
    title: "Déclaration Obligatoire de Changements",
    description:
      "Changer d'adresse, d'activité, de nom commercial ou ajuster les informations concernant un conjoint collaborateur nécessite une notification immédiate auprès de votre Centre de Formalités des Entreprises (CFE). Chaque modification, quel qu'en soit la raison, doit être communiquée sans délai.",
  },
  {
    id: 2,
    title: "Conséquences des Modifications",
    description:
      "Toute modification entraîne des ajustements importants pour votre entreprise individuelle. Par exemple, un déménagement change votre SIRET, même si le SIREN reste inchangé. Il est crucial de mettre à jour ces informations sur tous les documents professionnels pour rester conforme. De plus, cela peut influencer votre Cotisation Foncière des Entreprises (CFE) et le centre des impôts dont vous dépendez.",
  },
  {
    id: 3,
    title: "Maintenir sa Conformité Administrative",
    description:
      "Mettre à jour les informations de votre micro-entreprise est essentiel pour rester en règle avec l'administration. Cela inclut la mise à jour de votre adresse pour garantir que l'URSSAF, le Service des Impôts des Entreprises (SIE) et autres organismes puissent vous contacter. C'est également vital lors de l'ajout ou du changement d'activités, ce qui peut modifier votre code APE.",
  },
  {
    id: 4,
    title: "Accompagnement Personnalisé",
    description:
      "Nous comprenons que les formalités administratives peuvent être complexes. C'est pourquoi Espace Auto Entrepreneur vous offre un accompagnement sur mesure. Grâce à nos formulaires simplifiés, à la possibilité de déclarer en ligne et à l'accessibilité de nos conseillers, actualiser votre situation et apporter les changements nécessaires devient un processus fluide et sans erreur.",
  },
];

const faqsModificationAutoEntreprise = [
  {
    id: 1,
    question: (
      <>
        Quand est-il impératif de notifier une{" "}
        <span className="text-green-700 font-semibold">
          modification de mon auto-entreprise
        </span>{" "}
        ?
      </>
    ),
    answer:
      "Il est crucial d'informer votre Centre de formalités des entreprises (CFE) dès que survient tout changement impactant votre auto-entreprise, tel qu'un transfert d'adresse, une évolution dans votre secteur d'activité, ou une modification de nom suite à un événement personnel. Cette démarche garantit que votre dossier reste à jour auprès des autorités compétentes.",
  },
  {
    id: 2,
    question: (
      <>
        Quel est le coût associé à la{" "}
        <span className="text-green-700 font-semibold">
          modification de l&apos;adresse
        </span>{" "}
        de mon auto-entreprise ?
      </>
    ),
    answer:
      "Effectuer une déclaration de changement d'adresse pour votre auto-entreprise via Info Auto-entreprise est facturé 59 €. Ce tarif inclut la gestion complète de votre dossier, depuis sa création jusqu'à sa transmission, en passant par sa validation, ainsi que le soutien d'un conseiller spécialisé.",
  },
  {
    id: 3,
    question: (
      <>
        À partir de quand puis-je utiliser ma{" "}
        <span className="text-green-700 font-semibold">nouvelle adresse</span> ?
      </>
    ),
    answer:
      "La mise à jour de votre adresse auprès de l'INSEE et des services fiscaux prend généralement entre une et quatre semaines après la déclaration. Durant cette période de transition, vous pouvez continuer d'utiliser votre ancienne adresse et SIRET sur vos documents professionnels.",
  },
  {
    id: 4,
    question: (
      <>
        Quels sont les{" "}
        <span className="text-green-700 font-semibold">documents requis</span>{" "}
        pour modifier les détails de mon auto-entreprise ?
      </>
    ),
    answer:
      "Pour un changement d'adresse, il vous suffit de fournir une copie de votre pièce d'identité et un justificatif de domicile récent en format numérique, en veillant à ce que chaque fichier ne dépasse pas 2 Mo.",
  },
  {
    id: 5,
    question: (
      <>
        Quels changements nécessitent une{" "}
        <span className="text-green-700 font-semibold">
          notification à mon CFE
        </span>{" "}
        ?
      </>
    ),
    answer:
      "Deux catégories de modifications exigent que vous contactiez votre CFE : les changements d'identité personnelle (comme un changement de nom d'usage ou d'adresse personnelle) et les modifications liées à l'activité de votre auto-entreprise (changement de domiciliation, d'activité principale, ou ajustement concernant votre conjoint collaborateur).",
  },
  {
    id: 6,
    question: (
      <>
        Pourquoi est-il nécessaire de{" "}
        <span className="text-green-700 font-semibold">
          déclarer un changement d’adresse
        </span>{" "}
        ?
      </>
    ),
    answer:
      "Notifier votre CFE d'un changement d'adresse assure que vous restez joignable par l'administration et influence directement le calcul de votre Cotisation foncière des entreprises (CFE), en plus de permettre une mise à jour des registres de l'INSEE.",
  },
  {
    id: 7,
    question: (
      <>
        Quelle incidence a un{" "}
        <span className="text-green-700 font-semibold">
          changement d’adresse
        </span>{" "}
        sur mon auto-entreprise ?
      </>
    ),
    answer:
      "Modifier l'adresse de domiciliation de votre micro-entreprise entraine l'attribution d'un nouveau SIRET tout en conservant le même SIREN. Ce changement peut également impliquer un transfert vers un autre CFE et une possible variation du montant de votre CFE.",
  },
];

const page = () => {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Notes />
        <EtapesModification />
        <AtoutsModification />
        <Pourquoi
          raisons={pourquoi}
          titre="Modifier les informations de votre Auto-Entreprise est obligatoire"
        />
        <Faq
          faqs={faqsModificationAutoEntreprise}
          titre="Questions fréquentes"
        />
        <CTA
          titre="Vous souhaitez modifier votre Auto-Entreprise ?"
          texteBouton="Modifier"
          paragraphe="Mettez à jour les informations de votre auto-entreprise en toute simplicité."
        />
        <Avis />
      </main>
      <BigFooter />
    </>
  );
};

export default page;
