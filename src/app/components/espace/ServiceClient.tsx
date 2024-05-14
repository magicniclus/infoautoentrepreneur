import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Information {
  numeroDossier: string;
}

interface InformationUserInfo {
  nom: string;
  telephone: string;
  email: string;
}

const ServiceClient = () => {
  const getInformation = useSelector<RootState, Information | undefined>(
    (state) => state.createUser.userConnectedInformation
  );

  const getUserInfo = useSelector<RootState, InformationUserInfo | undefined>(
    (state) =>
      state.createUser?.userConnectedInformation
        ?.userInfo as InformationUserInfo
  );

  const [formValues, setFormValues] = useState({
    objet: "",
    contenu: "",
  });

  const [greatMessage, setGreatMessage] = useState<null | string>(null);

  const [formErrors, setFormErrors] = useState({
    objet: "",
    contenu: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleChangeObjet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, objet: e.target.value }));
  };

  const handleChangeContenu = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues((prev) => ({ ...prev, contenu: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("/api/sendEmailForConseiller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: getUserInfo?.nom,
        email: getUserInfo?.email,
        telephone: getUserInfo?.telephone,
        contenu: formValues.contenu,
        objet: formValues.objet,
        id: getInformation?.numeroDossier,
      }),
    }).then((response) => {
      if (response.ok) {
        console.log("Message envoyé");
        setGreatMessage("Message envoyé avec succès");
        setFormValues({
          objet: "",
          contenu: "",
        });
        setTimeout(() => {
          setGreatMessage(null);
        }, 5000);
      } else {
        console.log("Erreur lors de l'envoi du message");
        setFormErrors({
          objet: "Erreur lors de l'envoi du message",
          contenu: "Erreur lors de l'envoi du message",
        });
        setTimeout(() => {
          setFormErrors({
            objet: "",
            contenu: "",
          });
        }, 5000);
      }
    });
  };

  useEffect(() => {
    if (formValues.objet.length > 0 && formValues.contenu.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formValues]);

  return (
    <div className="w-full">
      <div className="p-4 py-10 bg-slate-100 rounded-md flex flex-col">
        <h1 className="text-slate-700 text-lg font-bold md:text-start text-center flex">
          Contactez votre conseiller dédié
        </h1>
        <h2 className="text-slate-500 text-sm mt-2">
          Il vous recontactera sous 24/48h.
        </h2>
        <form className="mt-7">
          <label htmlFor="nom" className="text-slate-700 text-sm">
            Objet
          </label>
          <input
            name="nom"
            onChange={handleChangeObjet}
            value={formValues.objet}
            type="text"
            placeholder="Saisir l'objet de mon message"
            className="w-full border hover:border-slate-500 focus:border-slate-500 px-2 py-2 rounded-md border-slate-400 mt-2 text-sm"
          />
          {formErrors.objet && (
            <p className="text-red-500 text-xs mt-1">{formErrors.objet}</p>
          )}
          <div className="mt-5">
            <label htmlFor="nom" className="text-slate-700 text-sm mt-10">
              Votre message
            </label>
            <textarea
              name="nom"
              onChange={handleChangeContenu}
              value={formValues.contenu}
              placeholder="Saisir le contenu de mon message"
              className="w-full border hover:border-slate-500 focus:border-slate-500 px-2 py-2 rounded-md border-slate-400 mt-2 text-sm min-h-[400px]"
            />
            {formErrors.contenu && (
              <p className="text-red-500 text-xs mt-1">{formErrors.contenu}</p>
            )}
            {greatMessage && (
              <p className="text-green-500 text-xs mt-1">{greatMessage}</p>
            )}
          </div>
          <button
            disabled={disabled}
            onClick={handleSubmit}
            className={`${
              disabled ? "bg-green-700/40" : "bg-green-700"
            } text-white px-4 py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 ease-in-out mt-10`}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceClient;
