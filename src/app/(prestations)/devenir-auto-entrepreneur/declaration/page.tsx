"use client";

import Banner from "@/components/Banner";
import MobilStepManager from "@/components/MobilStepManager";
import NavBarLanding from "@/components/NavBarLanding";
import Step from "@/components/Step";
import StepManager from "@/components/StepManager";
import FooterLanding from "@/components/footer/FooterLanding";

const page = () => {
  return (
    <>
      <NavBarLanding />
      <main className="min-h-[calc(100vh-140px)]">
        <Banner value="Formulaire de déclaration d'activité auto-entrepreneur" />
        <MobilStepManager />
        <div className="w-screen">
          <div className="max-w-6xl mx-auto md:mt-10 flex justify-between md:flex-row flex-col lg:px-8">
            <div className="md:block hidden md:w-4/12 w-full">
              <Step />
            </div>
            <StepManager />
            <div className="md:hidden block">
              <Step />
            </div>
          </div>
        </div>
      </main>
      <FooterLanding />
    </>
  );
};

export default page;
