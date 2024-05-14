/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { setCessationDetails } from "@/redux/createUserSlice";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const CoordonneeCessation = ({ data }: { data: any }) => {
  const dispatch = useDispatch();

  const userEmail = useSelector(
    (state: RootState) => state.createUser.userModification.email
  );

  const [formValues, setFormValues] = useState({
    nom: data.nom || "",
    prenom: data.prenom || "",
    email: data.email || "",
    telephone: data.telephone || "",
    sexe: data.sexe || "",
    dateDeNaissance: data.dateDeNaissance || "",
    paysDeNaissance: data.paysDeNaissance || "France",
    villeDeNaissance: data.villeDeNaissance || "",
  });

  const [formErrors, setFormErrors] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    paysDeNaissance: "",
    dateDeNaissance: "",
    villeDeNaissance: "",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, []);

  useEffect(() => {
    // Vérifie si userNom, userPrenom, ou userEmail ne sont pas vides
    if (userEmail !== "") {
      setFormValues((prev) => ({
        ...prev,
        email: userEmail,
      }));
    }
  }, [userEmail]);

  const handleSexeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mettre à jour directement la valeur de sexe
    setFormValues((prev) => ({ ...prev, sexe: e.target.value }));
  };
  // Assurez-vous également de mettre à jour le store Redux
  const handlePaysDeNaissanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    let updatedFormValues = {
      ...formValues,
      paysDeNaissance: value,
      nationnalite: value === "France" ? "Française" : "",
      departement: "",
      paysDeNaissanceEtranger: "",
      villeDeNaissance: "",
      dossierId: "", // Add the missing dossierId property
    };

    setFormValues(updatedFormValues);
    dispatch(setCessationDetails(updatedFormValues)); // Assurez-vous également de mettre à jour le store Redux
  };

  const handleDateChange = (newValue: string) => {
    const today = dayjs();
    const birthdate = dayjs(newValue);
    const age = today.diff(birthdate, "year");

    if (age < 18) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dateDeNaissance: "Vous devez avoir au moins 18 ans.",
      }));
      // Dispatch avec dateDeNaissance vide si l'utilisateur a moins de 18 ans
      const updatedFormValues = { ...formValues, dateDeNaissance: "" };
      setFormValues(updatedFormValues);
      dispatch(setCessationDetails(updatedFormValues));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dateDeNaissance: "",
      }));
      const updatedFormValues = { ...formValues, dateDeNaissance: newValue };
      setFormValues(updatedFormValues);
      dispatch(setCessationDetails(updatedFormValues));
    }
  };

  // Fonction modifiée pour gérer les changements d'autres champs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let updatedValues = { ...formValues, [name]: value };

    // Validation pour le pays de naissance ou d'autres champs au besoin
    validateField(name, value);

    setFormValues(updatedValues);
    dispatch(setCessationDetails(updatedValues));
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "nom":
      case "prenom":
      case "nationnalite":
      case "departement":
      case "paysDeNaissance":
        error = value.trim() === "" ? "Ce champ est obligatoire." : "";
        break;
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
      formValues.nom &&
      formValues.prenom &&
      formValues.email &&
      formValues.telephone &&
      formValues.sexe &&
      formValues.dateDeNaissance &&
      formValues.paysDeNaissance
    ) {
      dispatch(setCessationDetails(formValues));
    }
  }, [formValues]);

  return (
    <>
      {/* <h2 className="font-semibold text-lg">Identité</h2> */}
      <div className="flex justify-between md:flex-row flex-col">
        <div className="w-full md:w-[48%]">
          <label htmlFor="nom" className="text-slate-700 text-sm">
            Nom
          </label>
          <input
            name="nom"
            onChange={handleChange}
            value={formValues.nom}
            type="text"
            placeholder="Votre nom"
            className="w-full border hover:border-slate-500 focus:border-slate-500 px-2 py-2 rounded-md border-slate-400 mt-2 text-sm"
          />
          {formErrors.nom && (
            <p className="text-red-500 text-xs mt-1">{formErrors.nom}</p>
          )}
        </div>
        <div className="w-full md:w-[48%] md:mt-0 mt-5">
          <label htmlFor="prenom" className="text-slate-700 text-sm">
            Prénom
          </label>
          <input
            name="prenom"
            onChange={handleChange}
            value={formValues.prenom}
            type="text"
            placeholder="Votre prénom"
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2  hover:border-slate-500 focus:border-slate-500 text-sm"
          />
          {formErrors.prenom && (
            <p className="text-red-500 text-xs mt-1">{formErrors.prenom}</p>
          )}
        </div>
      </div>
      <div className="w-full mt-5">
        <label className="text-slate-700 text-sm">Sexe</label>
        <div className="w-full flex justify-between ">
          <div className="flex items-center mt-2 w-[47%]">
            <input
              id="homme"
              value="Homme"
              name="sexe"
              checked={formValues.sexe === "Homme"}
              onChange={handleSexeChange}
              type="radio"
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <label htmlFor="homme" className="ml-3 text-sm">
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
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <label htmlFor="femme" className="ml-3 text-sm">
              Femme
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between md:flex-row flex-col mt-5">
        <div className="w-full md:w-[48%]">
          <label htmlFor="email" className="text-slate-700 text-sm">
            Téléphone
          </label>
          <input
            name="telephone"
            onChange={handleChange}
            type="email"
            placeholder="Votre téléphone"
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2  hover:border-slate-500 focus:border-slate-500 text-sm"
          />
          {formErrors.telephone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.telephone}</p>
          )}
        </div>
        <div className="w-full md:w-[48%] mt-5 md:mt-0">
          <label htmlFor="email" className="text-slate-700 text-sm">
            Email
          </label>
          <input
            name="email"
            onChange={handleChange}
            value={formValues.email}
            type="email"
            placeholder="Votre email"
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2  hover:border-slate-500 focus:border-slate-500 text-sm"
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col mt-5">
        <label htmlFor="dateDeNaissance" className="text-slate-700 text-sm">
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
          <p className="text-red-500 text-xs mt-1">
            {formErrors.dateDeNaissance}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col mt-5">
        <label htmlFor="dateDeNaissance" className="text-slate-700 text-sm">
          Pays de naissance
        </label>
        <input
          id="paysDeNaissance"
          name="paysDeNaissance"
          type="text"
          placeholder="Pays de naissance"
          value={formValues.paysDeNaissance}
          onChange={handleChange}
          className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
        />
        {formErrors.paysDeNaissance && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.paysDeNaissance}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col mt-5">
        <label htmlFor="villeDeNaissance" className="text-slate-700 text-sm">
          Ville de naissance
        </label>
        <input
          id="villeDeNaissance"
          name="villeDeNaissance"
          type="text"
          placeholder="Votre ville de naissance"
          value={formValues.villeDeNaissance}
          onChange={handleChange} // Assurez-vous que cette fonction gère correctement les mises à jour pour ce champ
          className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
        />
        {formErrors.villeDeNaissance && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.villeDeNaissance}
          </p>
        )}
      </div>
    </>
  );
};

export default CoordonneeCessation;
