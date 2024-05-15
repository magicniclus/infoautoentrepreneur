/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { incrementStep, initializeCompte } from "@/redux/createUserSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdresseModification from "../molecules/createUserStep/AdresseModification";
import CheckoutModification from "../molecules/createUserStep/CheckoutModification";
import CoordonneeModification from "../molecules/createUserStep/CoordonneeModification";

const StepManagerModification = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const step = useSelector(
    (state: RootState) => state.createUser.stepCreationCompte
  );

  const formValues = useSelector(
    (state: RootState) => state.createUser.userInfo
  );

  const formValuesActivite = useSelector(
    (state: RootState) => state.createUser.userActivite
  );

  const formValuesAdresse = useSelector(
    (state: RootState) => state.createUser.userAdresse
  );

  const formValuesModification = useSelector(
    (state: RootState) => state.createUser.userModification
  );

  useEffect(() => {
    if (!formValuesModification.email) {
      dispatch(initializeCompte());
      router.push("/modification");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleDisabled = () => {
    switch (step) {
      case 1:
        if (
          formValuesModification.dateDeNaissance &&
          formValuesModification.email &&
          /^\S+@\S+\.\S+$/.test(formValuesModification.email) &&
          formValuesModification.nom &&
          formValuesModification.prenom &&
          formValuesModification.paysDeNaissance &&
          formValuesModification.villeDeNaissance &&
          formValuesModification.sexe &&
          formValuesModification.telephone
        ) {
          setDisabled(false);
        } else setDisabled(true);
        break;
      case 2:
        if (
          formValuesModification.typeDeModification === "modificationAdresse"
        ) {
          // Condition pour activer le bouton pour la modification d'adresse
          if (
            formValuesModification.siret !== "" &&
            formValuesModification.dateDeChangement !== "" &&
            formValuesModification.adresse !== "" &&
            formValuesModification.CGV
          ) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
        } else if (
          formValuesModification.typeDeModification === "modificationActivite"
        ) {
          // Conditions spécifiques pour la modification d'activité
          const activiteNonSpecifiee =
            formValuesModification.activite ===
            "Je ne trouve pas mon domaine d’activité";
          const activitePrincipaleNonSpecifiee =
            formValuesModification.activitePrincipale ===
            "Je ne trouve pas mon activité...";
          const champsDetailEtCategorieRemplis =
            formValuesModification.activiteDetail !== "" &&
            formValuesModification.categorie !== "";
          const champsDeBaseRemplis =
            formValuesModification.activite !== "" &&
            formValuesModification.activitePrincipale !== "";

          // Ajout des conditions pour CGV, dateDeChangement et siret pour la modification d'activité
          if (
            (activiteNonSpecifiee &&
              champsDetailEtCategorieRemplis &&
              formValuesModification.CGV &&
              formValuesModification.dateDeChangement !== "" &&
              formValuesModification.siret !== "") ||
            (!activiteNonSpecifiee &&
              champsDeBaseRemplis &&
              !activitePrincipaleNonSpecifiee &&
              formValuesModification.CGV &&
              formValuesModification.dateDeChangement !== "" &&
              formValuesModification.siret !== "") ||
            (champsDeBaseRemplis &&
              activitePrincipaleNonSpecifiee &&
              champsDetailEtCategorieRemplis &&
              formValuesModification.CGV &&
              formValuesModification.dateDeChangement !== "" &&
              formValuesModification.siret !== "")
          ) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
        }
        break;
      case 3:
        const isDisabled =
          formValuesAdresse.adresse === "" || formValuesAdresse.CGV === false;
        setDisabled(isDisabled);
        break;

      default:
        break;
    }
  };

  const handleForm = () => {
    switch (step) {
      case 1:
        return <CoordonneeModification data={formValues} />;
      case 2:
        return (
          <AdresseModification
            data={formValuesAdresse}
            modificationData={formValuesModification}
          />
        );
      case 3:
        return <CheckoutModification />;

      default:
        break;
    }
  };

  const handleStep = () => {
    dispatch(incrementStep());
  };

  useEffect(() => {
    handleDisabled();
  }, [formValuesModification, step]);

  return (
    <section className="md:w-7/12 w-full">
      {step < 3 && (
        <form className="px-6 lg:px-8 text-slate-700 flex flex-col">
          {handleForm()}
          <button
            type="button"
            disabled={disabled}
            onClick={handleStep}
            className={`${
              disabled ? "bg-cyan-900/70" : "bg-cyan-900"
            }  text-white w-full py-2 rounded-md mt-10 hover:bg-cyan-900/70 transition duration-150 easeInOut`}
          >
            Continuer
          </button>
        </form>
      )}
      {step === 3 && (
        <>
          <CheckoutModification />
        </>
      )}
    </section>
  );
};

export default StepManagerModification;
