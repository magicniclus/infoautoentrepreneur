import { setCessationDetails } from "@/redux/createUserSlice";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AdresseCessation = ({
  data,
  modificationData,
}: {
  data: any;
  modificationData: any;
}) => {
  const siretRegex = /^[0-9]{14}$/;
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<{
    adresse: string;
    complementAdresse: string;
    siret: string;
    dateDeCessation: string;
    CGV: boolean;
  }>({
    adresse: "",
    complementAdresse: data.complementAdresse || "",
    siret: modificationData.siret || "",
    dateDeCessation: modificationData.dateDeChangement || "",
    CGV: data.CGV || false,
  });

  const [formErrors, setFormErrors] = useState<{
    adresse: string;
    complementAdresse: string;
    siret: string;
    dateDeCessation: string;
    CGV: string;
  }>({
    adresse: "",
    complementAdresse: "",
    siret: "",
    dateDeCessation: "",
    CGV: "",
  });

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    if (inputValue !== formValues.adresse) {
      setFormValues((prevValues) => ({
        ...prevValues,
        adresse: "",
      }));
    }

    if (inputValue.length > 1) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          inputValue
        )}.json?access_token=${
          mapboxgl.accessToken
        }&country=fr&proximity=2.349014,48.864716`
      );
      const data = await response.json();
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  };

  interface LocationSuggestion {
    id: string;
    place_name: string;
    place_type: string[];
    geometry: {
      coordinates: [number, number];
    };
  }

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setInput(suggestion.place_name);
    setSuggestions([]);
    setFormValues((currentValues) => ({
      ...currentValues,
      adresse: suggestion.place_name,
    }));
  };

  const handleCGVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, CGV: e.target.checked });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    let updatedValue = type === "checkbox" ? e.target.checked : value;

    // Mise à jour de formValues
    setFormValues((prev) => ({ ...prev, [name]: updatedValue }));

    // Validation du numéro de SIRET
    if (name === "siret") {
      if (!siretRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          siret: "Numéro de SIRET invalide.",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, siret: "" }));
      }
    }
  };

  const handleDateChange = (newValue: string) => {
    const today = dayjs().startOf("day");
    const selectedDate = dayjs(newValue);

    if (selectedDate.isBefore(today)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dateDeCessation:
          "La date choisie doit être supérieure à la date du jour.",
      }));
      const updatedFormValues = { ...formValues, dateDeCessation: "" };
      setFormValues(updatedFormValues);
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dateDeCessation: "",
      }));
      const updatedFormValues = { ...formValues, dateDeCessation: newValue };
      setFormValues(updatedFormValues);
    }
  };

  useEffect(() => {
    dispatch(setCessationDetails(formValues));
  }, [formValues, dispatch]);

  return (
    <div className="flex justify-between flex-col">
      <div className="w-full">
        <label htmlFor="siret" className="text-slate-700">
          Votre numéro de SIRET
        </label>
        <input
          id="siret"
          name="siret"
          type="text"
          placeholder="N° de SIRET (14 chiffres)"
          value={formValues.siret}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
        />
        {formErrors.siret && (
          <p className="text-red-500 text-xs mt-1">{formErrors.siret}</p>
        )}
      </div>
      <div className="w-full mt-5">
        <label htmlFor="adresse" className="text-slate-700 text-sm">
          Adresse de votre domicile
        </label>
        <div>
          <div className="relative">
            <MapPinIcon className="h-6 w-6 text-slate-500 absolute top-3.5 right-2" />
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
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
        {formErrors.adresse && (
          <p className="text-red-500 text-xs mt-1">{formErrors.adresse}</p>
        )}
        <p className="text-xs font-light w-10/12 mt-1">
          L’adresse du domicile sera votre adresse pour toute correspondance.
        </p>
      </div>
      <div className="w-full mt-5 w-full">
        <label htmlFor="adresse" className="text-slate-700 text-sm">
          Complement d&apos;adresse
        </label>
        <input
          type="text"
          id="complementAdresse"
          name="complementAdresse"
          value={formValues.complementAdresse}
          onChange={(e) =>
            setFormValues({ ...formValues, complementAdresse: e.target.value })
          }
          placeholder="Complement d'adresse"
          className="w-full border px-2 py-2 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500 text-sm"
        />
        {formErrors.complementAdresse && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.complementAdresse}
          </p>
        )}
        {/* <p className="text-xs font-light w-10/12 mt-1">
          L’adresse du domicile sera votre adresse pour toute correspondance.
        </p> */}
      </div>
      <div className="w-full flex flex-col mt-5">
        <label htmlFor="dateDeNaissance" className="text-slate-700 text-sm">
          Quand souhaitez-vous que ce changement soit appliqué ?
        </label>
        <div className="relative">
          <CalendarIcon className="absolute top-3.5 right-3 text-slate-500 h-6 w-6 " />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField", "DateField", "DateField"]}>
              <DateField
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
        {formErrors.dateDeCessation && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.dateDeCessation}
          </p>
        )}
      </div>
      <div className="w-full mt-5 flex">
        <input
          type="checkbox"
          id="CGV"
          name="CGV"
          checked={formValues.CGV}
          onChange={handleCGVChange}
        />
        <label htmlFor="CGV" className="text-xs font-light ml-3">
          J&apos;accepte les{" "}
          <a href="#" className="text-slate-600 font-semibold">
            conditions générales de vente
          </a>
        </label>
      </div>
    </div>
  );
};

export default AdresseCessation;
