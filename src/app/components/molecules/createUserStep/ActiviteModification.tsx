/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { setActiviteDetails } from "@/redux/createUserSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ActiviteModification = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const currentDate = dayjs();
  const [formValues, setFormValues] = useState<{
    siret: string;
    formJuridique: string;
    debutActivite: string | dayjs.Dayjs | null;
    activite: string;
    activiteDetail: string;
    categorie: string;
    activitePrincipale: string;
    nomCommercial: string;
    activiteNonSalarie: string;
  }>({
    siret: "",
    formJuridique: "",
    debutActivite: data.debutActivite || currentDate,
    activite: data.activite || "",
    activiteDetail: data.activiteDetail || "",
    categorie: data.categorie || "",
    activitePrincipale: data.activitePrincipale || "",
    nomCommercial: data.nomCommercial || "",
    activiteNonSalarie: data.activiteNonSalarie || "non",
  });

  const [formErrors, setFormErrors] = useState<{
    debutActivite: string;
    activite: string;
    activiteDetail: string;
    categorie: string;
    activitePrincipale: string;
    nomCommercial: string;
    activiteNonSalarie: string;
  }>({
    debutActivite: "",
    activite: "",
    activiteDetail: "",
    categorie: "",
    activitePrincipale: "",
    nomCommercial: "",
    activiteNonSalarie: "",
  });

  const minDate = dayjs().subtract(6, "month");
  const maxDate = dayjs().add(1, "month");

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    // Premier, vérifier si 'newValue' est null ou invalide
    if (!newValue || !newValue.isValid()) {
      // S'occuper des cas où la date est invalide ou non définie
      setFormErrors({
        ...formErrors,
        debutActivite: "",
      });
      setFormValues((prev) => ({ ...prev, debutActivite: null }));
      return; // Quitter la fonction tôt
    }

    // Ensuite, vérifier si 'newValue' est hors de la plage autorisée
    if (newValue.isBefore(minDate, "day") || newValue.isAfter(maxDate, "day")) {
      setFormErrors({
        ...formErrors,
        debutActivite:
          "La date doit être entre 6 mois avant et 1 mois après la date actuelle.",
      });
      setFormValues((prev) => ({ ...prev, debutActivite: null }));
    } else {
      // Si tout est correct, mettre à jour les valeurs et effacer les erreurs
      setFormErrors({ ...formErrors, debutActivite: "" });
      setFormValues((prev) => ({ ...prev, debutActivite: newValue }));
    }
  };

  useEffect(() => {
    if (formValues.activite === "Je ne trouve pas mon domaine d’activité")
      setFormValues({
        ...formValues,
        activitePrincipale: "",
      });
    else if (
      formValues.activite !== "Je ne trouve pas mon domaine d’activité" &&
      formValues.activite !== ""
    ) {
      setFormValues({
        ...formValues,
        activiteDetail: "",
        categorie: "",
      });
    }
    setFormValues({
      ...formValues,
      activitePrincipale: "",
    });
  }, [formValues.activite]);

  useEffect(() => {
    if (
      formValues.activitePrincipale !== "" &&
      formValues.activitePrincipale !== "Je ne trouve pas mon activité..."
    ) {
      setFormValues({
        ...formValues,
        activiteDetail: "",
        categorie: "",
      });
    }
  }, [formValues.activitePrincipale]);

  useEffect(() => {
    let debutActiviteFormatted;
    if (formValues.debutActivite) {
      // Supposant que `formValues.debutActivite` est une chaîne au format "DD/MM/YYYY"
      // et que votre backend nécessite "YYYY-MM-DD"
      const date = dayjs(formValues.debutActivite, "DD/MM/YYYY");
      debutActiviteFormatted = date.isValid()
        ? date.format("YYYY-MM-DD")
        : undefined;
    } else {
      debutActiviteFormatted = undefined;
    }

    dispatch(
      setActiviteDetails({
        ...formValues,
        debutActivite: debutActiviteFormatted,
      })
    );
  }, [formValues, dispatch]);

  return (
    <>
      <div className="flex justify-between flex-col">
        <div className="w-full mt-5 w-full">
          <label htmlFor="nomCommercial" className="text-slate-700 text-sm">
            Numero de siret
          </label>
          <input
            type="text"
            id="siret"
            name="siret"
            value={formValues.nomCommercial}
            onChange={(e) =>
              setFormValues({ ...formValues, nomCommercial: e.target.value })
            }
            placeholder="Nom commercial de votre activité"
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
          />
          {formErrors.nomCommercial && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.nomCommercial}
            </p>
          )}
          <p className="text-xs font-light w-10/12 mt-1">
            Le nom de votre micro-entreprise correspond obligatoirement à votre
            nom. Vous pouvez ajouter un nom commercial sous lequel votre
            activité sera connue du public.
          </p>
        </div>
        <div className="w-full mt-5 flex justify-between flex-col">
          <label htmlFor="nomCommercial" className="text-slate-700 text-sm">
            Avez-vous déjà exercé une activité non-salariée ?
          </label>
          <div className="w-full flex justify-between md:flex-row flex-col">
            <div
              className="flex mt-2 w-full md:w-[30%] flex-col items-end p-3 py-5 border hover:border-slate-500 focus:border-slate-500 rounded-md relative cursor-pointer"
              onClick={() =>
                setFormValues({
                  ...formValues,
                  activiteNonSalarie: "non",
                })
              }
            >
              <input
                id="activiteNonSalarieNon"
                value="non"
                name="activiteNonSalarie"
                checked={formValues.activiteNonSalarie === "non"}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    activiteNonSalarie: e.target.value,
                  })
                }
                type="radio"
                className="mr-2 h-5 w-5 cursor-pointer absolute top-2 right-2"
                onClick={(e) => e.stopPropagation()} // Empêcher l'événement de se propager lors du clic direct sur l'input
              />
              <label
                htmlFor="activiteNonSalarieNon"
                className=" text-sm w-full mt-1"
              >
                Non
              </label>
            </div>
            <div
              className="flex mt-2 w-full md:w-[30%] flex-col md:items-end p-3 py-5 border hover:border-slate-500 focus:border-slate-500 rounded-md relative cursor-pointer"
              onClick={() =>
                setFormValues({
                  ...formValues,
                  activiteNonSalarie: "oui",
                })
              }
            >
              <input
                id="activiteNonSalarieOui"
                value="oui"
                name="activiteNonSalarie"
                checked={formValues.activiteNonSalarie === "oui"}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    activiteNonSalarie: e.target.value,
                  })
                }
                type="radio"
                className="mr-2 h-5 w-5 cursor-pointer absolute top-2 right-2"
                onClick={(e) => e.stopPropagation()}
              />
              <label htmlFor="activiteNonSalarieOui" className="text-sm">
                Oui
                <br />
                <span className="text-xs">
                  En tant que micro-entreprise / entrepreneur individuel
                </span>
              </label>
            </div>

            <div
              className="flex mt-2 w-full md:w-[30%] flex-col md:items-end p-3 py-5 border hover:border-slate-500 focus:border-slate-500 rounded-md relative cursor-pointer"
              onClick={() =>
                setFormValues({
                  ...formValues,
                  activiteNonSalarie: "ouiSa",
                })
              }
            >
              <input
                id="activiteNonSalarieOuiSA"
                value="ouiSa"
                name="activiteNonSalarieSa"
                checked={formValues.activiteNonSalarie === "ouiSa"}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    activiteNonSalarie: e.target.value,
                  })
                }
                type="radio"
                className="mr-2 h-5 w-5 cursor-pointer absolute top-2 right-2"
                onClick={(e) => e.stopPropagation()}
              />
              <label htmlFor="activiteNonSalarieOuiSA" className="text-sm">
                Oui
                <br />
                <span className="text-xs">
                  En tant que EURL, SARL, SASU, SAS, etc.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiviteModification;
