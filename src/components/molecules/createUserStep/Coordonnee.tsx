/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { setUserInfo } from "@/redux/createUserSlice";
import { nationnalite } from "@/utils/nationnalite";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const departements = [
  "01 Ain",
  "02 Aisne",
  "03 Allier",
  "04 Alpes-de-Haute-Provence",
  "05 Hautes-Alpes",
  "06 Alpes-Maritimes",
  "07 Ardèche",
  "08 Ardennes",
  "09 Ariège",
  "10 Aube",
  "11 Aude",
  "12 Aveyron",
  "13 Bouches-du-Rhône",
  "14 Calvados",
  "15 Cantal",
  "16 Charente",
  "17 Charente-Maritime",
  "18 Cher",
  "19 Corrèze",
  "2A Corse-du-Sud",
  "2B Haute-Corse",
  "21 Côte-d'Or",
  "22 Côtes-d'Armor",
  "23 Creuse",
  "24 Dordogne",
  "25 Doubs",
  "26 Drôme",
  "27 Eure",
  "28 Eure-et-Loir",
  "29 Finistère",
  "30 Gard",
  "31 Haute-Garonne",
  "32 Gers",
  "33 Gironde",
  "34 Hérault",
  "35 Ille-et-Vilaine",
  "36 Indre",
  "37 Indre-et-Loire",
  "38 Isère",
  "39 Jura",
  "40 Landes",
  "41 Loir-et-Cher",
  "42 Loire",
  "43 Haute-Loire",
  "44 Loire-Atlantique",
  "45 Loiret",
  "46 Lot",
  "47 Lot-et-Garonne",
  "48 Lozère",
  "49 Maine-et-Loire",
  "50 Manche",
  "51 Marne",
  "52 Haute-Marne",
  "53 Mayenne",
  "54 Meurthe-et-Moselle",
  "55 Meuse",
  "56 Morbihan",
  "57 Moselle",
  "58 Nièvre",
  "59 Nord",
  "60 Oise",
  "61 Orne",
  "62 Pas-de-Calais",
  "63 Puy-de-Dôme",
  "64 Pyrénées-Atlantiques",
  "65 Hautes-Pyrénées",
  "66 Pyrénées-Orientales",
  "67 Bas-Rhin",
  "68 Haut-Rhin",
  "69 Rhône",
  "70 Haute-Saône",
  "71 Saône-et-Loire",
  "72 Sarthe",
  "73 Savoie",
  "74 Haute-Savoie",
  "75 Paris",
  "76 Seine-Maritime",
  "77 Seine-et-Marne",
  "78 Yvelines",
  "79 Deux-Sèvres",
  "80 Somme",
  "81 Tarn",
  "82 Tarn-et-Garonne",
  "83 Var",
  "84 Vaucluse",
  "85 Vendée",
  "86 Vienne",
  "87 Haute-Vienne",
  "88 Vosges",
  "89 Yonne",
  "90 Territoire de Belfort",
  "91 Essonne",
  "92 Hauts-de-Seine",
  "93 Seine-Saint-Denis",
  "94 Val-de-Marne",
  "95 Val-d'Oise",
  "971 Guadeloupe",
  "972 Martinique",
  "973 Guyane",
  "974 La Réunion",
  "976 Mayotte",
];

const Coordonnee = ({ data }: { data: any }) => {
  const dispatch = useDispatch();

  const eighteenYearsAgo = dayjs().subtract(18, "years").format("YYYY-MM-DD");

  const userNom = useSelector(
    (state: RootState) => state.createUser.userInfo.nom
  );

  const userPrenom = useSelector(
    (state: RootState) => state.createUser.userInfo.prenom
  );

  const userEmail = useSelector(
    (state: RootState) => state.createUser.userInfo.email
  );

  const [formValues, setFormValues] = useState({
    nom: data.nom || "",
    prenom: data.prenom || "",
    email: data.email || "",
    telephone: data.telephone || "",
    sexe: data.sexe || "",
    dateDeNaissance: data.dateDeNaissance || "",
    nationnalite: data.nationnalite || "french",
    departement: data.departement || "",
    paysDeNaissance: data.paysDeNaissance || "France",
    paysDeNaissanceEtranger: data.paysDeNaissanceEtranger || "",
    villeDeNaissance: data.villeDeNaissance || "",
    dossierId: data.dossierId || "", // Ajout de dossierId
  });

  const [formErrors, setFormErrors] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    nationnalite: "",
    departement: "",
    paysDeNaissance: "",
    dateDeNaissance: "",
    paysDeNaissanceEtranger: "",
    villeDeNaissance: "",
  });

  useEffect(() => {
    // Vérifie si userNom, userPrenom, ou userEmail ne sont pas vides
    if (userNom !== "" || userPrenom !== "" || userEmail !== "") {
      setFormValues((prev) => ({
        ...prev,
        nom: userNom,
        prenom: userPrenom,
        email: userEmail,
      }));
    }
  }, [userNom, userPrenom, userEmail]);

  const handleSexeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mettre à jour directement la valeur de sexe
    setFormValues((prev) => ({ ...prev, sexe: e.target.value }));
  };

  const handlePaysDeNaissanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    let updatedFormValues = {
      ...formValues,
      paysDeNaissance: value,
      nationnalite: value === "France" ? "Française" : "",
      // Réinitialiser les valeurs en dessous de l'option de nationalité
      departement: "",
      paysDeNaissanceEtranger: "",
      villeDeNaissance: "",
    };

    setFormValues(updatedFormValues);
    dispatch(setUserInfo(updatedFormValues)); // Assurez-vous également de mettre à jour le store Redux
  };

  const handleDateChange = (newValue: string) => {
    const formattedDate = dayjs(newValue).format("YYYY-MM-DD"); // Assurez-vous que c'est une chaîne
    const today = dayjs();
    const birthdate = dayjs(newValue);
    const age = today.diff(birthdate, "year");

    if (age < 18) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dateDeNaissance: "Vous devez avoir au moins 18 ans.",
      }));
      const updatedFormValues = { ...formValues, dateDeNaissance: "" };
      setFormValues(updatedFormValues);
      dispatch(setUserInfo(updatedFormValues));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dateDeNaissance: "",
      }));
      const updatedFormValues = {
        ...formValues,
        dateDeNaissance: formattedDate,
      }; // Utiliser la date formatée
      setFormValues(updatedFormValues);
      dispatch(setUserInfo(updatedFormValues));
    }
  };

  // Fonction modifiée pour gérer les changements d'autres champs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFormValues = { ...formValues, [name]: value };
    setFormValues(newFormValues);
    validateField(name, value);
    dispatch(setUserInfo(newFormValues));
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "nom":
      case "prenom":
      case "nationnalite":
      case "departement":
      case "paysDeNaissance":
      case "villeDeNaissance":
      case "paysDeNaissanceEtranger":
        error = value.trim() === "" ? "Ce champ est obligatoire." : "";
        break;
      case "email":
        error = !/^\S+@\S+\.\S+$/.test(value) ? "Adresse email invalide." : "";
        break;
      case "telephone":
        error = !/^\d{10}$/.test(value) ? "Numéro de téléphone invalide." : "";
        break;
      default:
        break;
    }
    setFormErrors((errors) => ({ ...errors, [name]: error }));
  };

  useEffect(() => {
    if (
      (formValues.nom &&
        formValues.prenom &&
        formValues.email &&
        formValues.telephone &&
        formValues.sexe &&
        formValues.dateDeNaissance &&
        formValues.nationnalite &&
        formValues.departement &&
        formValues.paysDeNaissance) ||
      (formValues.dateDeNaissance &&
        formValues.email &&
        formValues.email &&
        formValues.nom &&
        formValues.prenom &&
        formValues.paysDeNaissance &&
        formValues.paysDeNaissanceEtranger &&
        formValues.sexe &&
        formValues.telephone &&
        formValues.villeDeNaissance)
    ) {
      dispatch(setUserInfo(formValues));
    }
  }, [formValues]);

  return (
    <>
      {/* <h2 className="text-lg font-semibold">Identité</h2> */}
      <div className="flex flex-col justify-between md:flex-row">
        <div className="w-full md:w-[48%]">
          <label htmlFor="nom" className="text-md text-slate-700">
            Nom
          </label>
          <input
            name="nom"
            onChange={handleChange}
            value={formValues.nom}
            type="text"
            placeholder="Votre nom"
            className="w-full px-2 py-2 mt-2 border rounded-md text-md hover:border-slate-500 focus:border-slate-500 border-slate-400"
          />
          {formErrors.nom && (
            <p className="mt-1 text-xs text-red-500">{formErrors.nom}</p>
          )}
        </div>
        <div className="w-full md:w-[48%] md:mt-0 mt-5">
          <label htmlFor="prenom" className="text-md text-slate-700">
            Prénom
          </label>
          <input
            name="prenom"
            onChange={handleChange}
            value={formValues.prenom}
            type="text"
            placeholder="Votre prénom"
            className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
          />
          {formErrors.prenom && (
            <p className="mt-1 text-xs text-red-500">{formErrors.prenom}</p>
          )}
        </div>
      </div>
      <div className="w-full mt-5">
        <label className="text-md text-slate-700">Sexe</label>
        <div className="flex justify-between w-full ">
          <div className="flex items-center mt-2 w-[47%]">
            <input
              id="homme"
              value="Homme"
              name="sexe"
              checked={formValues.sexe === "Homme"}
              onChange={handleSexeChange}
              type="radio"
              className="w-5 h-5 mr-2 cursor-pointer"
            />
            <label htmlFor="homme" className="ml-3 text-md">
              Homme
            </label>
          </div>
          <div className="flex items-center w-[47%]">
            <input
              id="femme"
              value="Femme"
              name="sexe"
              checked={formValues.sexe === "Femme"}
              onChange={handleSexeChange}
              type="radio"
              className="w-5 h-5 mr-2 cursor-pointer"
            />
            <label htmlFor="femme" className="ml-3 text-md">
              Femme
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-5 md:flex-row">
        <div className="w-full md:w-[48%]">
          <label htmlFor="email" className="text-md text-slate-700">
            Téléphone
          </label>
          <input
            name="telephone"
            onChange={handleChange}
            type="email"
            placeholder="Votre téléphone"
            className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
          />
          {formErrors.telephone && (
            <p className="mt-1 text-xs text-red-500">{formErrors.telephone}</p>
          )}
        </div>
        <div className="w-full md:w-[48%] mt-5 md:mt-0">
          <label htmlFor="email" className="text-md text-slate-700">
            Email
          </label>
          <input
            name="email"
            onChange={handleChange}
            value={formValues.email}
            type="email"
            placeholder="Votre email"
            className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
          />
          {formErrors.email && (
            <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full mt-5">
        <label htmlFor="dateDeNaissance" className="text-md text-slate-700">
          Date de naissance
        </label>
        <div className="relative">
          <CalendarIcon className="absolute top-3.5 right-3 text-slate-500 h-6 w-6 " />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField", "DateField", "DateField"]}>
              <DateField // Convertissez la chaîne en objet dayjs ici
                onChange={(newValue: string | null) =>
                  handleDateChange(newValue as string)
                }
                format="DD/MM/YYYY"
                sx={{
                  "& .MuiInputBase-input, & .MuiOutlinedInput-input": {
                    padding: "8px !important",
                  },
                  "& .MuiInputBase-root": {
                    border: "0.05px solid #94a3b8",
                    borderRadius: "0.4rem",
                    color: "#64748b",
                    "&:hover": {
                      borderColor: "#64748b",
                    },
                    "&:focus": {
                      borderColor: "#64748b",
                    },
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        {formErrors.dateDeNaissance && (
          <p className="mt-1 text-xs text-red-500">
            {formErrors.dateDeNaissance}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full mt-5">
        <label htmlFor="dateDeNaissance" className="text-md text-slate-700">
          Pays de naissance
        </label>
        <div className="flex justify-between w-full">
          <div className="flex justify-between w-full">
            <div className="flex w-[48%] justify-start items-center mt-2">
              <input
                type="radio"
                value="France"
                checked={formValues.paysDeNaissance === "France"}
                onChange={handlePaysDeNaissanceChange}
                className="w-5 h-5 px-3 py-4 border rounded-md cursor-pointer text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
              />
              <h3 className="ml-3 text-md">France</h3>
            </div>
            <div className="flex w-[48%] justify-start items-center">
              <input
                type="radio"
                value="Etranger"
                checked={formValues.paysDeNaissance === "Etranger"}
                onChange={handlePaysDeNaissanceChange}
                className="w-5 h-5 px-3 py-4 border rounded-md cursor-pointer text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
              />
              <h3 className="ml-3 text-md">À l&apos;étranger</h3>
            </div>
          </div>
        </div>
        {formValues.paysDeNaissance === "Etranger" ? (
          <>
            <div className="flex flex-col justify-between md:flex-row">
              <div className="w-full mt-5 md:w-[47%] w-full">
                <label
                  htmlFor="paysDeNaissance"
                  className="text-md text-slate-700"
                >
                  Pays de naissance
                </label>
                <input
                  type="text"
                  id="paysDeNaissanceEtranger"
                  name="paysDeNaissanceEtranger"
                  value={formValues.paysDeNaissanceEtranger}
                  onChange={handleChange}
                  placeholder="Entrez le pays de naissance"
                  className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
                />
                {formErrors.paysDeNaissanceEtranger && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.paysDeNaissanceEtranger}
                  </p>
                )}
              </div>
              <div className="w-full mt-5 md:w-[47%] w-full">
                <label
                  htmlFor="villeDeNaissance"
                  className="text-md text-slate-700"
                >
                  Ville de naissance
                </label>
                <input
                  name="villeDeNaissance"
                  onChange={handleChange}
                  type="text"
                  placeholder="Votre ville de naissance"
                  className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
                  value={formValues.villeDeNaissance}
                />
                {formErrors.villeDeNaissance && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.villeDeNaissance}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full mt-5">
              <label
                htmlFor="villeDeNaissance"
                className="text-md text-slate-700"
              >
                Nationnalité
              </label>
              <input
                name="nationnalite"
                onChange={handleChange}
                value={formValues.nationnalite}
                type="text"
                placeholder="Nationnalité"
                className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
              />
              {formErrors.nationnalite && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.nationnalite}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full mt-5">
              <label htmlFor="departement" className="text-md text-slate-700">
                Département de naissance
              </label>
              <select
                name="departement"
                id="departement"
                className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
                value={formValues.departement}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Sélectionnez votre nouvelle activité
                </option>
                {departements.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full mt-5">
              <label htmlFor="nationnalite" className="text-md text-slate-700">
                Nationnalité
              </label>
              <select
                name="nationnalite"
                id="nationnalite"
                className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
                value={formValues.nationnalite}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Sélectionnez votre nationnalité
                </option>
                {nationnalite.map((n) => (
                  <option key={n.value} value={n.value}>
                    {n.label}
                  </option>
                ))}
              </select>
              {/* <input
                name="nationnalite"
                onChange={handleChange}
                value={formValues.nationnalite}
                type="text"
                placeholder="Nationnalité"
                className="w-full px-2 py-2 mt-2 border rounded-md text-md border-slate-400 hover:border-slate-500 focus:border-slate-500"
              /> */}
              {formErrors.nationnalite && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.nationnalite}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Coordonnee;
