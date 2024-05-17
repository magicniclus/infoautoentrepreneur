"use client";

import Banner from "@/components/Banner";
import MobilStepManager from "@/components/MobilStepManager";
import NavBarLanding from "@/components/NavBarLanding";
import Step from "@/components/Step";
import StepManager from "@/components/StepManager";
import FooterLanding from "@/components/footer/FooterLanding";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const page = () => {
  return (
    <>
      <NavBarLanding />
      <main className="min-h-[calc(100vh-100px)] md:bg-slate-100">
        <Banner value="Formulaire de déclaration d'activité auto-entrepreneur" />
        <MobilStepManager />
        <div className="w-screen">
          <div className="max-w-6xl mx-auto md:mt-10 bg-white rounded-xl flex justify-between md:flex-row flex-col p-5 lg:p-8 md:-translate-y-20">
            <div className="md:block hidden md:w-4/12 w-full">
              <Step />
            </div>
            <StepManager />
            <div className="md:hidden block">
              <Step />
            </div>
          </div>
          <div className="max-w-6xl mx-auto md:-translate-y-14  p-5 lg:p-8">
            <p className="text-slate-400 text-xs">
              <ExclamationCircleIcon className="h-5 w-5 inline-block mr-2" />
              Vos informations sont sécurisées conformément à la législation en
              vigueur. Les renseignements collectés sur cette page sont utilisés
              pour gérer votre commande, administrer vos paiements, et vous
              contacter concernant votre démarche. Si vous avez souscrit à des
              formules d&apos;abonnement, vos informations bancaires seront
              également utilisées pour le prélèvement de vos paiements mensuels,
              en fonction de votre date d&apos;adhésion. En accord avec le RGPD
              et notre politique de confidentialité, vous avez le droit de
              consulter, modifier et supprimer vos données personnelles.
            </p>
            <a
              href="https://www.info-autoentrepreneur.fr/cgv"
              className="text-[10px] text-slate-400 hover:underline mt-1"
            >
              *Conditions de remboursement
            </a>
          </div>
        </div>
      </main>
      <FooterLanding />
    </>
  );
};

export default page;
