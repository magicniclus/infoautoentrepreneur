/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ajouterUtilisateurDansDossier } from "../firebase/database/database";
import { initializeCompte, setUserInfo } from "../redux/createUserSlice";

const Hero = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    cgu: false,
  });

  const [disabled, setDisabled] = useState(true);

  const route = useRouter();

  const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const isFormValid =
      nameRegex.test(formValues.nom) &&
      nameRegex.test(formValues.prenom) &&
      emailRegex.test(formValues.email) &&
      formValues.cgu;
    setDisabled(!isFormValid);
  }, [formValues, nameRegex, emailRegex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(initializeCompte());

    const dossierId = Math.random().toString(36).substr(2, 8);

    if (
      !nameRegex.test(formValues.nom) ||
      !nameRegex.test(formValues.prenom) ||
      !emailRegex.test(formValues.email)
    ) {
      alert("Veuillez vérifier les informations saisies.");
      return;
    }

    try {
      // Utilisation de la fonction d'ajout
      await ajouterUtilisateurDansDossier(
        "brouillonInscription",
        dossierId, // dossierId
        formValues.nom, // nom
        formValues.prenom, // prenom
        formValues.email
      );
      dispatch(
        setUserInfo({
          nom: formValues.nom,
          prenom: formValues.prenom,
          email: formValues.email,
          dossierId,
          telephone: "",
          sexe: "",
          dateDeNaissance: "",
          nationnalite: "",
          departement: "",
          paysDeNaissance: "",
          paysDeNaissanceEtranger: "",
          villeDeNaissance: "",
        })
      );
      route.push("/devenir-auto-entrepreneur/declaration");
    } catch (error) {
      console.error("Erreur lors de l'ajout du brouillon utilisateur :", error);
    }

    // Dispatch l'action pour stocker les informations de l'utilisateur
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
          background: linear-gradient(
            to right,
            rgba(59, 70, 97, 0.53) 0.03%,
            rgba(59, 70, 97, 0.2) 99.95%
          );
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <section
        id="form"
        className="w-full bg-[url('/background/papier.png')] md:bg-[url('/background/men.jpeg')] py-10 md:py-32 bg-no-repeat bg-cover md:bg-center bg-top relative background text-slate-700"
      >
        <div className="px-6 lg:px-8 max-w-6xl mx-auto flex md:flex-row flex-col z-10 content">
          <div className="md:w-1/2 w-full relative z-20">
            <img
              src="/logo.png"
              alt="hero"
              className="md:w-48 w-32 h-auto absolute -top-3 -left-3 md:-top-5 md:-left-5 z-10 opacity-60"
            />
            <h1 className="text-white font-bold sm:text-6xl text-4xl relative z-20">
              Créez votre <br /> auto-entreprise <br /> en quelques clics
            </h1>
            <ul className="text-white mt-8 relative z-20">
              <li className="mt-3 flex items-center text-normal">
                <div className="flex justify-center items-center h-[23px] w-[23px] mr-3 rounded-full bg-white/10">
                  <CheckCircleIcon className="min-w-[12px] h-7 w-7 text-cyan-700" />
                </div>
                Déclaration simplifiée au statut d&apos;auto-entrepreneur 2024
              </li>
              <li className="mt-3 flex items-center text-normal">
                <div className="flex justify-center items-center h-[23px] w-[23px] mr-3 rounded-full bg-white/10">
                  <CheckCircleIcon className="min-w-[12px] h-7 w-7 text-cyan-700" />
                </div>
                Déclaration simple et rapide
              </li>
              <li className="mt-3 flex items-center text-normal">
                <div className="flex justify-center items-center h-[23px] w-[23px] mr-3 rounded-full bg-white/10">
                  <CheckCircleIcon className="min-w-[12px] h-7 w-7 text-cyan-700" />
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
                FORMULAIRE DE DÉCLARATION EN LIGNE SIMPLIFIÉ
              </h2>
              <div className=" flex justify-between mt-5">
                <div className="w-full md:w-[45%]">
                  <label htmlFor="nom" className="text-slate-700">
                    Nom
                  </label>
                  <input
                    name="nom"
                    onChange={handleChange}
                    type="text"
                    placeholder="Votre nom"
                    className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                  />
                </div>
                <div className="w-[45%] md:block hidden">
                  <label htmlFor="prenom" className="text-slate-700">
                    Prénom
                  </label>
                  <input
                    name="prenom"
                    onChange={handleChange}
                    type="text"
                    placeholder="Votre prénom"
                    className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                  />
                </div>
              </div>
              <div className="w-full md:hidden block mt-3">
                <label htmlFor="prenom" className="text-slate-700">
                  Prénom
                </label>
                <input
                  name="prenom"
                  onChange={handleChange}
                  type="text"
                  placeholder="Votre prénom"
                  className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                />
              </div>
              <div className="w-full mt-3">
                <label htmlFor="email" className="text-slate-700">
                  Email
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Votre email"
                  className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                />
              </div>
              <div className="w-full flex mt-3">
                <input
                  type="checkbox"
                  id="cgu"
                  name="cgu"
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
                }  text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut`}
              >
                DÉMARREZ VOTRE ENTREPRISE
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
