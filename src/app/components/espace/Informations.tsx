import { ajouterOuMettreAJourUtilisateur } from "@/firebase/database/database";
import { setConnectedInformationInformation } from "@/redux/createUserSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const situations = [
  { id: 1, name: "Célibataire" },
  { id: 2, name: "Marié(e)" },
  { id: 3, name: "Pacsé(e)" },
  { id: 4, name: "Divorcé(e)" },
  { id: 5, name: "Veuf(ve)" },
];

const Informations = () => {
  const dispatch = useDispatch();
  const userInformation = useSelector<
    RootState,
    { numeroDossier?: string; information?: any }
  >((state) => state.createUser.userConnectedInformation);

  const [securiteSocialeError, setSecuriteSocialeError] = useState(""); // Fix: Remove duplicate declaration

  const userGlobalInformation = useSelector<
    RootState,
    { userInfo?: any } | undefined
  >((state) => state.createUser.userConnectedInformation);

  const [formData, setFormData] = useState({
    situationMatrimonial: "",
    prenom1: "",
    prenom2: "",
    nom: "",
    securiteSociale: "",
  });

  // Synchronise l'état initial avec Redux au montage
  useEffect(() => {
    if (userInformation?.information) {
      setFormData({
        situationMatrimonial:
          userInformation.information.situationMatrimonial || "",
        prenom1: userInformation.information.prenom1 || "",
        prenom2: userInformation.information.prenom2 || "",
        nom: userInformation.information.nom || "",
        securiteSociale: userInformation.information.securiteSociale || "",
      });
    }
  }, [userInformation?.information]);

  const handleChange = (field: string, value: string) => {
    let newError = securiteSocialeError;
    if (field === "securiteSociale") {
      newError = /^\d{15}$/.test(value)
        ? ""
        : "Numero de sécurité sociale incorrect";
    }

    // Mise à jour de l'état local indépendamment des erreurs
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (userInformation?.numeroDossier) {
      const dataForRedux = {
        ...formData,
        [field]: value,
      };
      ajouterOuMettreAJourUtilisateur(
        userInformation.numeroDossier,
        "information",
        dataForRedux
      ).then(() => {
        dispatch(setConnectedInformationInformation(dataForRedux));
      });
    }

    // Mise à jour de l'état d'erreur après toutes les opérations
    setSecuriteSocialeError(newError);
  };

  return (
    <section className="w-full bg-slate-100 p-4 mt-7 rounded-md flex flex-col">
      <form>
        <label
          htmlFor="situationMatrimoniale"
          className="text-slate-700 text-sm"
        >
          Situation matrimoniale
        </label>
        <select
          id="situationMatrimoniale"
          className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
          value={formData.situationMatrimonial}
          onChange={(e) => handleChange("situationMatrimonial", e.target.value)}
          required
        >
          <option value="">Sélectionner...</option>
          {situations.map((situation) => (
            <option key={situation.id} value={situation.name}>
              {situation.name}
            </option>
          ))}
        </select>
        {/* Répéter la structure similaire pour d'autres entrées */}
        <div className="flex flex-col mt-5">
          <label htmlFor="prenom1" className="text-slate-700 text-sm">
            Prénom 1
          </label>
          <input
            id="prenom1"
            type="text"
            placeholder="Prénom 1"
            value={formData.prenom1}
            onChange={(e) => handleChange("prenom1", e.target.value)}
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
            required
          />
          <label htmlFor="prenom2" className="text-slate-700 text-sm">
            Prénom 2
          </label>
          <input
            id="prenom2"
            type="text"
            placeholder="Prénom 2"
            value={formData.prenom2}
            onChange={(e) => handleChange("prenom2", e.target.value)}
            className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
          />
          {userInformation?.numeroDossier &&
            userGlobalInformation?.userInfo?.nationnalite === "french" && (
              <div className="flex flex-col mt-5">
                <label htmlFor="prenom" className="text-slate-700 text-sm">
                  Numéro de sécurité sociale
                </label>
                <input
                  name="securiteSociale"
                  type="text"
                  placeholder="Numéro de sécurité sociale*"
                  value={formData.securiteSociale}
                  onChange={(e) =>
                    handleChange("securiteSociale", e.target.value)
                  }
                  className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
                  required
                />
                {securiteSocialeError && (
                  <span className="text-xs text-red-500">
                    {securiteSocialeError}
                  </span>
                )}
              </div>
            )}
          {/* Ajouter d'autres champs si nécessaire */}
        </div>
      </form>
    </section>
  );
};

export default Informations;
