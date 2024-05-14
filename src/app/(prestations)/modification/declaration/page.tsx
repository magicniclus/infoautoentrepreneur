"use client";

import Banner from "@/components/Banner";
import FooterLanding from "@/components/footer/FooterLanding";
import MobilStepManagerModification from "@/components/form/MobilStepManagerModification";
import StepModification from "@/components/form/StepModification";
import NavBarLanding from "../../../../components/NavBarLanding";
import StepManagerModification from "../../../../components/form/StepManagerModification";

const page = () => {
  return (
    <>
      <NavBarLanding dossier={false} />
      <main className="min-h-[calc(100vh-140px)]">
        <Banner value="Formulaire de modification d'activité ou d'adresse auto-entrepreneur" />
        <MobilStepManagerModification />
        <div className="w-screen">
          <div className="max-w-6xl mx-auto md:mt-10 flex justify-between md:flex-row flex-col lg:px-8">
            <div className="md:block hidden md:w-4/12 w-full">
              <StepModification />
            </div>
            <StepManagerModification />
            <div className="md:hidden block">
              <StepModification />
            </div>
          </div>
        </div>
      </main>
      <FooterLanding />
    </>
  );
};

export default page;
