/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { incrementStep, initializeCompte } from "@/redux/createUserSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdresseCessation from "../molecules/createUserStep/AdresseCessation";
import CheckoutCessation from "../molecules/createUserStep/CheckoutCessation";
import CoordonneeCessation from "../molecules/createUserStep/CoordonneeCessation";

const StepManagerCessation = () => {
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

  const formValuesCessation = useSelector(
    (state: RootState) => state.createUser.userCessation
  );

  useEffect(() => {
    if (!formValuesCessation.email) {
      dispatch(initializeCompte());
      router.push("/cessation");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleDisabled = () => {
    switch (step) {
      case 1:
        if (
          formValuesCessation.dateDeNaissance &&
          formValuesCessation.email &&
          /^\S+@\S+\.\S+$/.test(formValuesCessation.email) &&
          formValuesCessation.nom &&
          formValuesCessation.prenom &&
          formValuesCessation.paysDeNaissance &&
          formValuesCessation.villeDeNaissance &&
          formValuesCessation.sexe &&
          formValuesCessation.telephone
        ) {
          setDisabled(false);
        } else setDisabled(true);
        break;
      case 2:
        if (
          formValuesCessation.siret &&
          formValuesCessation.dateDeCessation &&
          formValuesCessation.adresse &&
          formValuesCessation.CGV
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
        return <CoordonneeCessation data={formValuesCessation} />;
      case 2:
        return (
          <AdresseCessation
            data={formValuesCessation}
            modificationData={formValuesCessation}
          />
        );
      case 3:
        return <CheckoutCessation />;

      default:
        break;
    }
  };

  const handleStep = () => {
    dispatch(incrementStep());
  };

  useEffect(() => {
    handleDisabled();
  }, [formValuesCessation, step]);

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
              disabled ? "bg-green-700/70" : "bg-green-700"
            }  text-white w-full py-2 rounded-md mt-10 hover:bg-green-700/70 transition duration-150 easeInOut`}
          >
            Continuer
          </button>
        </form>
      )}
      {step === 3 && (
        <>
          <CheckoutCessation />
        </>
      )}
    </section>
  );
};

export default StepManagerCessation;
