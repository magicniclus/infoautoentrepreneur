import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RootState } from "@/redux/store";
import { CheckIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Step = () => {
  const route = useRouter();

  const dossierId = useSelector(
    (state: RootState) => state.createUser.userInfo.dossierId
  );

  const step = useSelector(
    (state: RootState) => state.createUser.stepCreationCompte
  );

  const userInfo = useSelector((state: RootState) => state.createUser.userInfo);

  const faqMananger = () => {
    switch (step) {
      case 1:
        return faqOne();
      case 2:
        return faqTwo();
      case 3:
        return faqThree();
      case 4:
        return faqFour();
      default:
        return faqOne();
    }
  };

  useEffect(() => {
    if (!dossierId) {
      route.push("/devenir-auto-entrepreneur");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dossierId]);

  const faqOne = () => {
    return (
      <Accordion type="single" collapsible className="w-full text-slate-700">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm text-start">
            Pourquoi renseigner toutes ces informations ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            Pour être en conformité avec les règles administratives en vigueur.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm text-start">
            Puis-je modifier mes informations plus tard ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            Vous pouvez modifier vos informations à n&apos;importe quel moment
            après votre inscription.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-sm text-start">
            Pourquoi ces démarches ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            Pour vous assister au cours de votre demande d’immatriculation.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  const faqTwo = () => {
    return (
      <Accordion type="single" collapsible className="w-full text-slate-700">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm text-start">
            Quelle date choisir pour le début de mon activité ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            Votre auto-entreprise sera officiellement enregistrée à partir de la
            date de début d’activité que vous aurez indiquée. Il est possible de
            choisir une date dans les 6 mois précédant la date
            d&apos;aujourd&apos;hui, et dans les 30 jours suivants.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm text-start">
            Quel type d&apos;activité choisir ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            Il est impératif de choisir l&apos;activité principale de votre
            auto-entreprise la plus adaptée à votre activité. Un code APE vous
            sera ensuite attribué selon l’activité choisie.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-sm text-start">
            Quel sera le nom de mon entreprise ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            Le nom commercial de votre auto-entreprise est obligatoirement votre
            nom et prénom. Vous pouvez cependant décider de lui donner un nom de
            marque personnalisé afin de protéger votre auto-entreprise et de
            mieux la définir auprès de vos clients.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-sm text-start">
            Puis-je modifier mes informations plus tard ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            Vous pouvez modifier vos informations à n&apos;importe quel moment
            après votre inscription.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  const faqThree = () => {
    return (
      <Accordion type="single" collapsible className="w-full text-slate-700">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm text-start">
            Quelle adresse je dois renseigner ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            L&apos;adresse du domicile sera votre adresse pour toute
            correspondance : il est indispensable de l’indiquer dans le
            formulaire d’inscription.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm text-start">
            Puis-je modifier mes informations plus tard ?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-start">
            Vous pouvez modifier vos informations à n&apos;importe quel moment
            après votre inscription.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  const faqFour = () => {
    return (
      <></>
      // <Accordion
      //   type="single"
      //   collapsible
      //   className="w-full mt-10 text-slate-700"
      // >
      //   <AccordionItem value="item-1">
      //     <AccordionTrigger className="text-sm text-start">
      //       Pourquoi renseigner toutes ces informations ?
      //     </AccordionTrigger>
      //     <AccordionContent className="text-sm text-start">
      //       Pour être en conformité avec les règles administratives en vigueur.
      //     </AccordionContent>
      //   </AccordionItem>
      // </Accordion>
    );
  };

  return (
    <section className="w-full mt-10 text-slate-700 md:mt-0">
      <div className="hidden w-full py-3 bg-blue-50 h-max rounded-t-md md:block">
        <div className="flex flex-col items-center justify-center px-6 lg:px-8">
          <h2 className="text-sm font-bold">Numero de dossier</h2>
          <h3 className="text-sm">{userInfo.dossierId.toLocaleUpperCase()}</h3>
        </div>
      </div>
      <div className="relative flex flex-col items-start justify-center hidden w-full px-6 lg:px-8 md:flex mt-7">
        <div
          className={`${
            step === 1
              ? ""
              : step === 2
              ? "h-[40px]"
              : step === 3
              ? "h-[85px]"
              : "h-[130px]"
          }  bg-green-700 w-[2.5px] absolute left-[42px] top-3 -z-10 transition-all lg:block hidden duration-300 ease-in-out`}
        />
        <div
          className={`flex items-center z-10 ${
            step < 2
              ? "font-bold text-slate-400 border-slate-400"
              : " text-green-700  border-green-700 font-bold"
          }`}
        >
          <div
            className={`w-6 h-6 flex justify-center items-center bg-slate-50 rounded-full border ${
              step > 1 && "border-green-700"
            }`}
          >
            {step > 1 ? <CheckIcon className="w-5 h-5 text-green-700" /> : null}
          </div>
          <p className="ml-3 text-sm">Déclarant</p>
        </div>
        <div
          className={`flex items-center mt-5 z-10 ${
            step === 2 || step < 3
              ? `${
                  step === 2 ? "font-bold text-slate-400" : "text-slate-300"
                } border-slate-300`
              : " text-green-700  border-green-700 font-bold"
          }`}
        >
          <div
            className={`w-6 h-6 flex justify-center items-center bg-slate-50 rounded-full border ${
              step > 2 && "border-green-700"
            }`}
          >
            {step > 2 ? <CheckIcon className="w-5 h-5 text-green-700" /> : null}
          </div>
          <p className="ml-3 text-sm">Activité</p>
        </div>
        <div
          className={`flex items-center mt-5 z-10 ${
            step === 3 || step < 4
              ? `${
                  step === 3 ? "font-bold text-slate-400" : "text-slate-300"
                } border-slate-300`
              : " text-green-700  border-green-700 font-bold"
          }`}
        >
          <div
            className={`w-6 h-6 flex justify-center items-center bg-slate-50 rounded-full border ${
              step > 3 && "border-green-700"
            }`}
          >
            {step > 3 ? <CheckIcon className="w-5 h-5 text-green-700" /> : null}
          </div>
          <p className="ml-3 text-sm">Adresse</p>
        </div>
        <div
          className={`flex items-center mt-5 z-10 ${
            step === 4 || step < 5
              ? `${
                  step === 4 ? "font-bold text-slate-400" : "text-slate-300"
                } border-slate-300`
              : " text-green-700  border-green-700 font-bold"
          }`}
        >
          <div
            className={`w-6 h-6 flex justify-center items-center bg-slate-50 rounded-full border ${
              step > 4 && "border-green-700"
            }`}
          >
            {step > 4 ? <CheckIcon className="w-5 h-5 text-green-700" /> : null}
          </div>
          <p className="ml-3 text-sm">Finalisation</p>
        </div>
      </div>
      <div className="flex justify-center w-full px-6 py-5 mt-10 bg-blue-50 h-max lg:px-8 rounded-t-md">
        <h2 className="text-sm font-bold">Assistance</h2>
      </div>
      <div className="w-full px-6 py-5 h-max lg:px-8 md:rounded-md rounded-b-md md:bg-white bg-slate-50">
        <div className="relative flex items-center lign">
          <PhoneIcon className="w-4 h-4 mr-4" />
          <div className="flex flex-col justify-between">
            <a href="tel:0917164963" className="text-sm font-semibold">
              09 72 16 49 63{" "}
            </a>
            <p className="text-xs">Du lundi au vendredi - de 9h à 19h</p>
          </div>
        </div>
        <div className="relative flex items-center mt-5 lign">
          <EnvelopeIcon className="w-4 h-4 mr-4" />
          <div className="flex flex-col justify-between">
            <a
              href="mailTo:contact@info-autoentrepreneur.com"
              className="text-sm font-semibold "
            >
              contact@info-autoentrepreneur.com
            </a>
            <p className="text-xs">Du lundi au vendredi - de 9h à 19h</p>
          </div>
        </div>
      </div>
      <div
        className={`w-full bg-blue-50 h-max rounded-t-md py-3 mt-10 justify-center ${
          step === 4 ? "hidden" : "flex"
        }`}
      >
        <div className="flex flex-col px-6 lg:px-8">
          <h2 className="text-sm font-bold">Vos questions</h2>
        </div>
      </div>
      <div className="px-6 lg:px-8">{faqMananger()}</div>
      <div className="w-full py-3 mt-10 rounded-md h-max">
        <div className="flex flex-col px-6 lg:px-8">
          <h2 className="text-sm">
            <span className="font-semibold text-slate-700 text-md">
              +1 051 000 <br />
            </span>{" "}
            auto-entreprises créées en 2023
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Step;
