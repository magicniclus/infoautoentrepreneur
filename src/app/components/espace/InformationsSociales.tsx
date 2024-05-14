import { ajouterOuMettreAJourUtilisateur } from "@/firebase/database/database";
import { setConnectedInformationEntrepriseEtInformation } from "@/redux/createUserSlice";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const activite = [
  "Salarié",
  "Salarié agricole",
  "Non salarié non agricole",
  "Retraité",
  "Activité auto-entrepreneur exclusive",
  "Pensionné invalidité",
  "Aucune",
  "Autre...",
];

interface FormValues {
  periodeDeDeclaration: string;
  optionVersement: string;
  activiteComplemantaire: string;
  autreActivite: string;
}

interface Information {
  periodeDeDeclaration?: string;
  optionVersement?: string;
  activiteComplemantaire?: string;
  autreActivite?: string;
  numeroDossier?: string | undefined;
}

const InformationsSociales = () => {
  const dispatch = useDispatch();

  const getInformation = useSelector<RootState, Information | undefined>(
    (state) =>
      state?.createUser?.userConnectedInformation?.entrepriseEtInformation
  );

  const userInformation = useSelector<
    RootState,
    { numeroDossier?: string } | undefined
  >((state) => state.createUser.userConnectedInformation);

  const [formValues, setFormValues] = useState<FormValues>({
    periodeDeDeclaration: getInformation?.periodeDeDeclaration || "",
    optionVersement: getInformation?.optionVersement || "",
    activiteComplemantaire: getInformation?.activiteComplemantaire || "",
    autreActivite: getInformation?.autreActivite || "",
  });

  // Function to update user and dispatch Redux action
  const updateUserAndStore = (values: FormValues): void => {
    if (userInformation?.numeroDossier) {
      ajouterOuMettreAJourUtilisateur(
        userInformation.numeroDossier,
        "entrepriseEtInformation",
        values
      ).then(() => {
        dispatch(setConnectedInformationEntrepriseEtInformation(values));
      });
    }
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    const newFormValues = { ...formValues, [field]: value };
    setFormValues(newFormValues);
    updateUserAndStore(newFormValues);
  };

  const handlePeriodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      periodeDeDeclaration: e.target.value,
    }));
  };

  const handleVersementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      optionVersement: e.target.value,
    }));
  };

  const handleActiviteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues((prev) => ({
      ...prev,
      activiteComplemantaire: e.target.value,
    }));
  };

  return (
    <section className="w-full bg-slate-100 p-4 mt-7 rounded-md flex flex-col justify-between">
      <form>
        <div className="w-full">
          <label className="text-slate-700 text-sm">
            Périodicité de vos déclarations de chiffre d’affaires
          </label>
          <div className="w-full flex justify-between md:flex-row flex-col">
            <div className="flex items-center mt-2 md:w-[47%]">
              <input
                id="mensuelle"
                value="mensuelle"
                name="periodeDeDeclaration"
                checked={formValues.periodeDeDeclaration === "mensuelle"}
                onChange={(e) =>
                  handleChange("periodeDeDeclaration", e.target.value)
                }
                type="radio"
                className="mr-2 h-5 w-5 cursor-pointer"
              />
              <label
                htmlFor="mensuelle"
                className="ml-3 text-sm text-slate-700"
              >
                Mensuelle
              </label>
            </div>
            <div className="flex items-center md:w-[47%] md:mt-0 mt-3">
              <input
                id="trimestrielle"
                value="trimestrielle"
                name="periodeDeDeclaration"
                checked={formValues.periodeDeDeclaration === "trimestrielle"}
                onChange={(e) =>
                  handleChange("periodeDeDeclaration", e.target.value)
                }
                type="radio"
                className="mr-2 h-5 w-5 cursor-pointer"
              />
              <label
                htmlFor="trimestrielle"
                className="ml-3 text-sm text-slate-700"
              >
                Trimestrielle
              </label>
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <label className="text-slate-700 text-sm">
            Options du versement libératoire de l&apos;impôt sur le revenu
          </label>
          <div className="w-full flex justify-between md:flex-row flex-col">
            <div className="flex items-center mt-2 md:w-[47%]">
              <input
                id="oui"
                value="oui"
                name="optionVersement"
                checked={formValues.optionVersement === "oui"}
                onChange={(e) =>
                  handleChange("optionVersement", e.target.value)
                }
                type="radio"
                className="mr-2 h-5 w-5 cursor-pointer"
              />
              <label htmlFor="oui" className="ml-3 text-sm text-slate-700">
                Oui
              </label>
            </div>
            <div className="flex items-center md:w-[47%] md:mt-0 mt-3">
              <input
                id="non"
                value="non"
                name="optionVersement"
                checked={formValues.optionVersement === "non"}
                onChange={(e) =>
                  handleChange("optionVersement", e.target.value)
                }
                type="radio"
                className="mr-2 h-5 w-5 cursor-pointer"
              />
              <label htmlFor="non" className="ml-3 text-sm text-slate-700">
                Non
              </label>
            </div>
          </div>
          <div className="w-full text-slate-700 mt-5">
            <label
              htmlFor="activitePrincipale"
              className="text-slate-700 text-sm"
            >
              Exercerez-vous une activité en plus de votre micro-entreprise ?
            </label>
            <select
              name="activitePrincipale"
              id="activitePrincipale"
              className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
              value={formValues.activiteComplemantaire}
              onChange={(e) =>
                handleChange("activiteComplemantaire", e.target.value)
              }
              required
            >
              <option value="" disabled>
                Sélectionnez une activité
              </option>
              {activite.map((situation) => (
                <option key={situation} value={situation}>
                  {situation}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 w-full">
            {formValues.activiteComplemantaire === "Autre..." && (
              <>
                <label
                  htmlFor="autreActivite"
                  className="text-slate-700 text-sm"
                >
                  Précisez
                </label>
                <input
                  type="text"
                  id="autreActivite"
                  name="autreActivite"
                  value={formValues.autreActivite}
                  onChange={(e) =>
                    handleChange("autreActivite", e.target.value)
                  }
                  placeholder="Complément d'activité"
                  className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
                />
              </>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default InformationsSociales;
