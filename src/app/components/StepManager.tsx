"use client";

import { incrementStep } from "@/redux/createUserSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Activite from "./molecules/createUserStep/Activite";
import Adresse from "./molecules/createUserStep/Adresse";
import Checkout from "./molecules/createUserStep/Checkout";
import Coordonnee from "./molecules/createUserStep/Coordonnee";

const StepManager = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleDisabled = () => {
    switch (step) {
      case 1:
        if (formValues.paysDeNaissance === "Etranger") {
          if (
            formValues.dateDeNaissance &&
            formValues.email &&
            /^\S+@\S+\.\S+$/.test(formValues.email) &&
            formValues.nom &&
            formValues.prenom &&
            formValues.paysDeNaissance &&
            formValues.paysDeNaissanceEtranger &&
            formValues.sexe &&
            formValues.telephone &&
            formValues.villeDeNaissance &&
            formValues.nationnalite
          ) {
            setDisabled(false);
          } else setDisabled(true);
        } else {
          if (
            formValues.nom &&
            formValues.prenom &&
            formValues.email &&
            /^\S+@\S+\.\S+$/.test(formValues.email) &&
            formValues.telephone &&
            formValues.sexe &&
            formValues.dateDeNaissance &&
            formValues.nationnalite &&
            formValues.departement
          ) {
            setDisabled(false);
          } else setDisabled(true);
        }
        break;
      case 2:
        const activiteNonSpecifiee =
          formValuesActivite.activite ===
          "Je ne trouve pas mon domaine d’activité";
        const activitePrincipaleNonSpecifiee =
          formValuesActivite.activitePrincipale ===
          "Je ne trouve pas mon activité...";
        const champsDetailEtCategorieRemplis =
          formValuesActivite.activiteDetail !== "" &&
          formValuesActivite.categorie !== "";
        const champsDeBaseRemplis =
          formValuesActivite.activite !== "" &&
          formValuesActivite.activitePrincipale !== "" &&
          formValuesActivite.activiteNonSalarie !== "";

        // Condition pour activer le bouton
        if (
          (activiteNonSpecifiee &&
            champsDetailEtCategorieRemplis &&
            formValuesActivite.debutActivite) ||
          (!activiteNonSpecifiee &&
            champsDeBaseRemplis &&
            !activitePrincipaleNonSpecifiee &&
            formValuesActivite.debutActivite) ||
          (champsDeBaseRemplis &&
            activitePrincipaleNonSpecifiee &&
            champsDetailEtCategorieRemplis &&
            formValuesActivite.debutActivite)
        ) {
          setDisabled(false);
        } else {
          setDisabled(true);
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
        return <Coordonnee data={formValues} />;
      case 2:
        return <Activite data={formValuesActivite} />;
      case 3:
        return <Adresse data={formValuesAdresse} />;
      case 4:
        return <Checkout />;
      default:
        break;
    }
  };

  const handleStep = () => {
    dispatch(incrementStep());
  };

  useEffect(() => {
    handleDisabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues, formValuesActivite, formValuesAdresse, step]);

  return (
    <section className="md:w-7/12 w-full">
      {step < 4 && (
        <form className="px-6 lg:px-8 text-slate-700 flex flex-col">
          {handleForm()}
          <button
            type="button"
            disabled={disabled}
            onClick={handleStep}
            className={`${
              disabled ? "bg-green-700/70" : "bg-green-700"
            }  text-white w-full py-2 rounded-md mt-10 hover:bg-green-700/70 transition duration-150 easeInOut`}
          >
            Continuer
          </button>
        </form>
      )}
      {step === 4 && (
        <>
          <Checkout />
        </>
      )}
    </section>
  );
};

export default StepManager;
