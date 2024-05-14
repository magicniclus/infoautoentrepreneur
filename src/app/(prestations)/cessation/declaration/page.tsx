"use client";

import Banner from "@/components/Banner";
import FooterLanding from "@/components/footer/FooterLanding";
import MobilStepManagerCessation from "@/components/form/MobilStepManagerCessation";
import StepManagerCessation from "@/components/form/StepManagerCessation";
import StepSessation from "@/components/form/StepSessation";
import NavBarLanding from "../../../../components/NavBarLanding";

const page = () => {
  return (
    <>
      <NavBarLanding dossier={false} />
      <main className="min-h-[calc(100vh-140px)]">
        <Banner value="Formulaire de cessation d'activité d'auto-entrepreneur" />
        <MobilStepManagerCessation />
        <div className="w-screen">
          <div className="max-w-6xl mx-auto md:mt-10 flex justify-between md:flex-row flex-col lg:px-8">
            <div className="md:block hidden md:w-4/12 w-full">
              <StepSessation />
            </div>
            <StepManagerCessation />
            <div className="md:hidden block">
              <StepSessation />
            </div>
          </div>
        </div>
      </main>
      <FooterLanding />
    </>
  );
};

export default page;
