/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ajouterModificationUtilisateur } from "@/firebase/database/database";
import {
  initializeCompte,
  setModificationDetails,
} from "@/redux/createUserSlice";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const HeroModification = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    typeDeModification: "",
    email: "",
    siret: "",
    cgu: false,
  });

  const [disabled, setDisabled] = useState(true);

  const route = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const siretRegex = /^[0-9]{14}$/;

  useEffect(() => {
    const isFormValid =
      emailRegex.test(formValues.email) &&
      siretRegex.test(formValues.siret) &&
      formValues.typeDeModification &&
      formValues.cgu;
    setDisabled(!isFormValid);
  }, [formValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(initializeCompte());

    // Assumons que formValues contient maintenant email, siret, et typeDeModification sans nom et prénom
    const { email, siret, typeDeModification } = formValues;

    const dossierId = Math.random().toString(36).substr(2, 9); // Génération d'un ID de dossier unique

    try {
      await ajouterModificationUtilisateur(
        "brouillonModifications", // Ce paramètre peut varier selon votre implémentation
        dossierId,
        email,
        siret,
        typeDeModification
      );
      dispatch(
        setModificationDetails({
          email,
          siret,
          typeDeModification,
        })
      );
      // Si l'ajout est réussi, redirection ou mise à jour de l'interface utilisateur
      router.push("/modification/declaration"); // Assurez-vous d'avoir défini 'router'
    } catch (error) {
      console.error("Erreur lors de l'ajout de la modification :", error);
      // Gestion des erreurs (affichage d'un message utilisateur, par exemple)
    }
  };

  return (
    <>
      <style jsx>{`
        .background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <section
        id="form"
        className="w-full bg-[url('/background/modification.jpg')] py-10 md:py-24 bg-no-repeat bg-cover bg-center relative background text-slate-700"
      >
        <div className="px-6 lg:px-8 max-w-6xl mx-auto flex md:flex-row flex-col z-10 content">
          <div className="md:w-1/2 w-full">
            <h1 className=" text-white font-bold sm:text-6xl text-4xl">
              Modifier votre
              <br /> auto-entreprise <br /> en quelques cliques
            </h1>
            <ul className=" text-white mt-8">
              <li className="mt-3 flex items-center  text-normal">
                <div className="flex justify-center items-center">
                  <CheckCircleIcon className="min-w-[12px] h-7 w-auto text-white mr-3" />
                </div>
                Modification de votre auto-entreprise
              </li>
              <li className="mt-3 flex items-center text-normal">
                <div className="flex justify-center items-center">
                  <CheckCircleIcon className="min-w-[12px] h-7 w-auto text-white mr-3" />
                </div>
                Modification d&apos;adresse
              </li>
              <li className="mt-3 flex items-center text-normal">
                <div className="flex justify-center items-center">
                  <CheckCircleIcon className="min-w-[12px] h-7 w-auto text-white mr-3" />
                </div>
                Dossier traité sous 24h
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 w-full flex justify-center">
            <form
              className="md:w-[80%] w-full py-8 bg-white md:bg-white/85 rounded-md px-5 md:px-8 flex-col items-center md:mt-0 mt-7"
              onSubmit={handleSubmit}
            >
              <h2 className="text-center font-semibold w-9/12 mx-auto">
                Formulaire de modification de situation simplifié
              </h2>
              <div className="w-full mt-5">
                <div className="w-full flex justify-between">
                  <div className="flex items-center w-[47%]">
                    <input
                      id="modificationAdresse"
                      value="modificationAdresse"
                      name="typeDeModification"
                      type="radio"
                      checked={
                        formValues.typeDeModification === "modificationAdresse"
                      }
                      onChange={handleChange}
                      className="min-h-[15px] min-w-[15px] cursor-pointer"
                    />
                    <label
                      htmlFor="modificationAdresse"
                      className="ml-3 text-sm"
                    >
                      Modification d&apos;adresse
                    </label>
                  </div>
                  <div className="flex items-center w-[47%]">
                    <input
                      id="modificationActivite"
                      value="modificationActivite"
                      name="typeDeModification"
                      type="radio"
                      checked={
                        formValues.typeDeModification === "modificationActivite"
                      }
                      onChange={handleChange}
                      className="min-h-[15px] min-w-[15px] cursor-pointer"
                    />
                    <label
                      htmlFor="modificationActivite"
                      className="ml-3 text-sm"
                    >
                      Modification d&apos;activité exercée
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full mt-3">
                <label htmlFor="email" className="text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Votre email"
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                />
              </div>
              <div className="w-full mt-3">
                <label htmlFor="siret" className="text-slate-700">
                  Votre numéro de SIRET
                </label>
                <input
                  id="siret"
                  name="siret"
                  type="text" // Correction de 'type="siret"' à 'type="text"' car 'siret' n'est pas un type d'input valide.
                  placeholder="N° de SIRET (14 chiffres)"
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                />
              </div>
              <div className="w-full flex mt-3">
                <input
                  id="cgu"
                  name="cgu"
                  type="checkbox"
                  onChange={handleChange}
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="cgu" className="text-slate-700 ml-2 text-xs">
                  J&apos;accepte les{" "}
                  <a href="#">conditions générales de vente</a> ainsi que la{" "}
                  <a href="#">politique de confidentialité</a>.
                </label>
              </div>
              <button
                disabled={disabled}
                type="submit"
                className={`${
                  disabled ? "bg-green-700/70" : "bg-green-700"
                } text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut`}
              >
                Modifier mon auto-entreprise
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroModification;
