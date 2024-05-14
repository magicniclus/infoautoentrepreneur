// import NavBar from "../../../components/NavBar";
import Atouts from "@/components/Atouts";
import Avis from "@/components/Avis";
import CTA from "@/components/CTA";
import Etapes from "@/components/Etapes";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Notes from "@/components/Notes";
import Pourquoi from "@/components/Pourquoi";
import BigFooter from "@/components/footer/BigFooter";
import NavBar from "../../../components/TailwindUi/NavBar";

const page = () => {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Notes />
        <Etapes titre="Création de votre entreprise en 3 étapes:" />
        <Atouts />
        <Pourquoi />
        <Faq />
        <CTA />
        <Avis />
      </main>
      <BigFooter />
    </>
  );
};

export default page;
