import { ajouterOuMettreAJourUtilisateur } from "@/firebase/database/database";
import { setConnectedInformationAdresseProfessionelle } from "@/redux/createUserSlice";
import { RootState } from "@/redux/store";
import { MapPinIcon } from "@heroicons/react/20/solid";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface LocationSuggestion {
  id: string;
  place_name: string;
}

interface FormValues {
  typeAdresse: string;
  adresse: string;
  complementAdresse: string;
  checked: boolean | undefined;
}

interface Information {
  adresse?: string;
  complementAdresse?: string;
  typeAdresse?: string;
  checked?: boolean;
  numeroDossier?: string | undefined;
}

const AdressProfessionnelle: React.FC = () => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  const getInformation = useSelector<RootState, Information | undefined>(
    (state) => state.createUser.userConnectedInformation.adresseProfessionelle
  );

  const dispatch = useDispatch();

  const [input, setInput] = useState<string>(getInformation?.adresse || "");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [checked, setChecked] = useState<boolean | undefined>(true);
  const [formValues, setFormValues] = useState<FormValues>({
    typeAdresse: "",
    adresse: getInformation?.adresse || "",
    complementAdresse: getInformation?.complementAdresse || "",
    checked: checked,
  });

  useEffect(() => {
    getInformation?.checked === undefined &&
      dispatch(
        setConnectedInformationAdresseProfessionelle({
          ...formValues,
          checked: true,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInformation?.checked]);

  useEffect(() => {
    // Définir 'checked' basé strictement sur la présence de 'getInformation?.checked'
    // Si 'getInformation?.checked' est undefined ou null, 'setChecked' à true par défaut.
    if (
      getInformation?.checked !== undefined &&
      getInformation?.checked !== null
    ) {
      setChecked(getInformation.checked);
    } else {
      setChecked(true);
    }
  }, [getInformation?.checked]);

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      checked: checked,
    }));
    if (checked === null || checked === undefined) {
      dispatch(setConnectedInformationAdresseProfessionelle(formValues));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const userInformation = useSelector<
    RootState,
    { numeroDossier?: string } | undefined
  >((state) => state.createUser.userConnectedInformation);

  // Function to update user and dispatch Redux action
  const updateUserAndStore = (values: FormValues): void => {
    if (userInformation?.numeroDossier) {
      ajouterOuMettreAJourUtilisateur(
        userInformation.numeroDossier,
        "adresseProfessionelle",
        values
      ).then(() => {
        dispatch(setConnectedInformationAdresseProfessionelle(values));
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    // Update form values and potentially store and database
    const newFormValues = { ...formValues, adresse: inputValue };
    setFormValues(newFormValues);
    updateUserAndStore(newFormValues);
  };

  const handleInputDebounce = () => {
    if (timerId !== null) {
      clearTimeout(timerId); // Clear the existing timer
    }

    const newTimerId = setTimeout(() => {
      if (input.length > 1) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300); // Set a new timer

    setTimerId(newTimerId);
  };

  const fetchSuggestions = async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        input
      )}.json?access_token=${
        mapboxgl.accessToken
      }&country=fr&proximity=2.349014,48.864716`
    );
    const data = await response.json();
    setSuggestions(data.features);
  };

  const handleTypeAdresseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newFormValues = { ...formValues, typeAdresse: e.target.value };
    setFormValues(newFormValues);
    updateUserAndStore(newFormValues);
  };

  const handleCheckedChange = (): void => {
    const newChecked = !formValues.checked;
    let newFormValues = { ...formValues, checked: newChecked };

    if (newChecked) {
      // Si 'checked' est vrai, réinitialiser les autres champs
      newFormValues = {
        ...newFormValues,
        typeAdresse: "", // Mettez les valeurs par défaut souhaitées
        adresse: "",
        complementAdresse: "",
      };
    }

    setFormValues(newFormValues);
    updateUserAndStore(newFormValues);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion): void => {
    setInput(suggestion.place_name);
    setSuggestions([]);
    const newFormValues = { ...formValues, adresse: suggestion.place_name };
    setFormValues(newFormValues);
    updateUserAndStore(newFormValues);
  };

  return (
    <section className="w-full bg-slate-100 p-4 mt-7 rounded-md flex flex-col justify-between">
      <form className="flex flex-col">
        <label htmlFor="activitePrincipale" className="text-slate-700 text-sm">
          Adresse professionnelle
        </label>
        <div className="flex items-center text-slate-700 mt-2">
          <input
            type="checkbox"
            checked={formValues.checked}
            onChange={handleCheckedChange}
          />
          <span className="ml-3 text-xs text-slate-500">
            Utiliser l&apos;adresse de domicile comme adresse professionnelle
          </span>
        </div>
        {!formValues.checked && (
          <div className="w-full mt-5">
            <label className="text-slate-700 text-sm">
              Quelle est la nature de votre adresse professionnelle ?
            </label>
            <div className="w-full flex justify-between md:flex-row flex-col">
              <div className="flex items-center mt-2 md:w-[47%]">
                <input
                  id="professionnelle"
                  value="Professionnelle"
                  name="typeAdresse"
                  type="radio"
                  checked={getInformation?.typeAdresse === "Professionnelle"}
                  onChange={handleTypeAdresseChange}
                  className="mr-2 h-5 w-5 cursor-pointer"
                />
                <label
                  htmlFor="professionnelle"
                  className="ml-3 text-sm text-slate-700"
                >
                  Professionnelle
                </label>
              </div>
              <div className="flex items-center md:w-[47%] md:mt-0 mt-3">
                <input
                  id="domicile"
                  value="De domiciliation"
                  name="typeAdresse"
                  type="radio"
                  checked={getInformation?.typeAdresse === "De domiciliation"}
                  onChange={handleTypeAdresseChange}
                  className="mr-2 h-5 w-5 cursor-pointer"
                />
                <label
                  htmlFor="domicile"
                  className="ml-3 text-sm text-slate-700"
                >
                  De domiciliation
                </label>
              </div>
            </div>
            <div className="w-full mt-5">
              <label htmlFor="adresse" className="text-slate-700 text-sm">
                Adresse du lieu d&apos;exercice
              </label>
              <div className="relative">
                <MapPinIcon className="h-6 w-6 text-slate-500 absolute top-3.5 right-2" />
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyUp={handleInputDebounce}
                  placeholder="Commencez à taper votre adresse"
                  className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm text-slate-700"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white w-full mt-1 max-h-60 overflow-auto border rounded-md shadow-lg text-sm text-slate-700">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        {suggestion.place_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="w-full mt-5">
              <label
                htmlFor="complementAdresse"
                className="text-slate-700 text-sm"
              >
                Complément d&apos;adresse
              </label>
              <input
                type="text"
                id="complementAdresse"
                name="complementAdresse"
                value={formValues.complementAdresse}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    complementAdresse: e.target.value,
                  })
                }
                placeholder="Complément d'adresse"
                className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
              />
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default AdressProfessionnelle;
