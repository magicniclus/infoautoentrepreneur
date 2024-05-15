import { ajouterOuMettreAJourUtilisateur } from "@/firebase/database/database";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Progress } from "../ui/progress";
import AdressProfessionnelle from "./AdressProfessionnelle";
import DocumentComplementaire from "./DocumentComplementaire";
import FormStepView from "./FormStepView";
import Informations from "./Informations";
import InformationsSociales from "./InformationsSociales";

interface Information {
  situationMatrimonial?: string;
  securiteSociale?: string;
  adresse?: string;
  entrepriseEtInformation?: string;
  dossierId?: string;
  checked?: boolean;
  typeAdresse?: string;
  activiteComplemantaire?: string;
  periodeDeDeclaration?: string;
  optionVersement?: string;
  numeroDossier?: string;
}

interface UserInfo {
  nom: string;
  prenom: string;
  email: string;
  dossierId: string;
  telephone: string;
  sexe: string;
  dateDeNaissance: string;
  nationnalite: string;
  departement: string;
  paysDeNaissance: string;
  paysDeNaissanceEtranger: string;
  villeDeNaissance: string;
  filesId?: string;
  filesPasseport?: string;
  filesAdresse?: string;
  filesDeclaration?: string;
  information: {
    situationMatrimonial?: string; // Added as optional if it might not be present always
    securiteSociale?: string; // Also optional if not always present
  };
}

interface UserConnectedInformation {
  userInfo?: UserInfo | {};
  filesId?: string;
  filesPasseport?: string;
  filesAdresse?: string;
  filesDeclaration?: string;
  numeroDossier?: string;
  alert?: {
    commantaire?: string;
  };
  etapesInscription?: {
    status?: string;
  };
}

const MonEspece = () => {
  const [allDataSend, setAllDataSend] = useState("");

  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [files, setFiles] = useState<string[]>([]);

  const userInformation = useSelector<RootState, UserConnectedInformation>(
    (state) => state.createUser.userConnectedInformation
  );

  const getInformation = useSelector<RootState, Information | undefined>(
    (state) => state.createUser.userConnectedInformation.information
  );

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  //Recuperation des données dans ReelTime

  const getAdresseProfessionnelle = useSelector<
    RootState,
    Information | undefined
  >((state) => state.createUser.userConnectedInformation.adresseProfessionelle);

  const entrepriseEtInformation = useSelector<
    RootState,
    Information | undefined
  >(
    (state) => state.createUser.userConnectedInformation.entrepriseEtInformation
  );

  //Management du disabled du bouton suivant
  useEffect(() => {
    let isDisabled = true; // Définissez une valeur par défaut
    switch (step) {
      case 1:
        isDisabled = !(
          getInformation?.situationMatrimonial &&
          /^\d{15}$/.test(getInformation?.securiteSociale ?? "")
        );
        break;
      case 2:
        if (!getAdresseProfessionnelle?.checked) {
          isDisabled = !(
            getAdresseProfessionnelle?.adresse &&
            getAdresseProfessionnelle?.typeAdresse
          );
        } else {
          isDisabled = false; // Si la case est cochée, activer le bouton
        }
        break;
      case 3:
        isDisabled = !(
          entrepriseEtInformation?.periodeDeDeclaration &&
          entrepriseEtInformation?.optionVersement
        );
        break;
      case 4:
        if (
          userInformation?.filesPasseport &&
          userInformation?.filesAdresse &&
          userInformation?.filesDeclaration
        ) {
          isDisabled = false;
        } else if (
          userInformation?.filesId &&
          userInformation?.filesAdresse &&
          userInformation?.filesDeclaration
        ) {
          isDisabled = false;
        }
        break;
      default:
        isDisabled = true; // Gardez désactivé par défaut pour tout autre cas
    }
    setDisabled(isDisabled);
  }, [
    getInformation,
    getAdresseProfessionnelle,
    step,
    entrepriseEtInformation,
    userInformation,
  ]);

  useEffect(() => {
    if (
      userInformation.etapesInscription?.status === "en cours de traitement"
    ) {
      setAllDataSend("en cours de traitement");
    } else if (
      userInformation.etapesInscription?.status === "dossier complété et validé"
    ) {
      setAllDataSend("dossier complété et validé");
    } else {
      setAllDataSend("");
    }
  }, [userInformation.etapesInscription?.status]);

  const handleDataSend = () => {
    console.log(userInformation?.numeroDossier);
    ajouterOuMettreAJourUtilisateur(
      userInformation?.numeroDossier ?? "",
      "etapesInscription",
      { status: "en cours de traitement" }
    );
    setAllDataSend("en cours de traitement");
  };

  const showViewForUserDataSend = () => {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center p-4 py-10 rounded-md bg-slate-100 ">
          <h1 className="text-lg font-bold text-center text-slate-700 md:text-start">
            Vos informations nous ont bien étaient transmises.
          </h1>
          <div className="flex flex-col items-center justify-center w-full mt-7">
            <Progress
              className="max-w-[450px]"
              value={allDataSend === "en cours de traitement" ? 80 : null}
            />
            <p className="mt-5 text-slate-500 text-md">
              Status: <span className="font-bold">{allDataSend}</span>
            </p>
            <p className="text-xs text-slate-400 mt-2 max-w-[450px] text-center">
              Si un problème survient lors de la validation de vos informations
              par le service concerné, un conseiller vous contactera par
              téléphone ou par email. Vous recevrez également un courriel une
              fois votre dossier soumis à l&apos;administration.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const showViewFinish = () => {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center p-4 py-10 rounded-md bg-slate-100 ">
          <h1 className="text-lg font-bold text-center text-slate-700 md:text-start">
            Dossier complété et validé
          </h1>
          <div className="flex flex-col items-center justify-center w-full mt-7">
            <Progress
              className="max-w-[450px]"
              value={
                userInformation.etapesInscription?.status ===
                "dossier complété et validé"
                  ? 100
                  : null
              }
            />
            <p className="mt-5 text-slate-500 text-md">
              Status: <span className="font-bold">{allDataSend}</span>
            </p>
            <p className="text-xs text-slate-400 mt-2 max-w-[450px] text-center">
              Votre dossier a été validé par l&apos;administration. Le numéro de
              SIRET pourrait prendre jusqu&apos;à un mois pour vous parvenir. Si
              vous rencontrez un problème, veuillez nous contacter via votre
              espace service client.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const formStepView = () => {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-between w-full md:flex-row">
          <h1 className="text-lg font-bold text-center text-slate-700 md:text-start">
            Finalisation de déclaration de début d&apos;activité
            d&apos;auto-entreprise{" "}
          </h1>
          <div className="flex flex-col items-center justify-center p-2 px-6 mt-5 lg:px-8 md:mt-0 bg-slate-100">
            <h2 className="text-sm font-semibold text-center text-cyan-900">
              Numéro de dossier
            </h2>
            <h3 className="text-sm">
              {(
                userInformation?.userInfo as UserInfo
              )?.dossierId?.toLocaleUpperCase() || ""}
            </h3>
          </div>
        </div>
        {userInformation?.alert?.commantaire && (
          <div className="flex items-center p-2 mt-5 text-white bg-red-500 rounded-md">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
            <p>{userInformation?.alert?.commantaire}</p>
          </div>
        )}
        <FormStepView step={step} />
        {step === 1 ? (
          <Informations />
        ) : step === 2 ? (
          <AdressProfessionnelle />
        ) : step === 3 ? (
          <InformationsSociales />
        ) : step === 4 ? (
          <DocumentComplementaire />
        ) : null}
        <div className="flex justify-between w-full">
          <button
            disabled={step > 1 ? false : true}
            onClick={handlePreviousStep}
            className={`${
              step > 1 ? "bg-slate-500" : "bg-slate-500/50"
            } text-white px-4 py-2 rounded-md mt-5`}
          >
            Retour
          </button>
          <button
            disabled={disabled}
            onClick={step === 4 ? handleDataSend : handleNextStep}
            className={`${
              disabled ? "bg-cyan-900/40" : "bg-cyan-900"
            } text-white px-4 py-2 rounded-md mt-5 hover:bg-cyan-900/70 transition duration-150 ease-in-out`}
          >
            {step === 4 ? "Terminer" : "Suivant"}
          </button>
        </div>
      </div>
    );
  };

  const loadingView = () => {
    return (
      <div className="flex items-center justify-center w-full h-96">
        <div className="w-32 h-32 text-lg text-center animate-pulse text-slate-500">
          Chargement en cours...
        </div>
      </div>
    );
  };

  return (
    <>
      {!userInformation || !userInformation?.numeroDossier
        ? loadingView()
        : allDataSend === "en cours de traitement"
        ? showViewForUserDataSend()
        : allDataSend === "dossier complété et validé"
        ? showViewFinish()
        : formStepView()}
    </>
  );
};

export default MonEspece;
