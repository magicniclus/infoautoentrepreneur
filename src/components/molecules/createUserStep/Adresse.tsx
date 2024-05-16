import { setAdresseDetails } from "@/redux/createUserSlice";
import { MapPinIcon } from "@heroicons/react/20/solid";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Adresse = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<{
    adresse: string;
    complementAdresse: string;
    CGV: boolean;
  }>({
    adresse: "",
    complementAdresse: "",
    CGV: false,
  });

  const [formErrors, setFormErrors] = useState<{
    adresse: string;
    complementAdresse: string;
    CGV: string;
  }>({
    adresse: data.adresse || "",
    complementAdresse: data.complementAdresse || "",
    CGV: data.CGV || "",
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

  useEffect(() => {
    // Dispatcher uniquement si l'adresse est non vide.
    dispatch(setAdresseDetails(formValues));
  }, [formValues, dispatch]);

  return (
    <div className="flex flex-col justify-between">
      <div className="w-full">
        <label htmlFor="adresse" className="text-slate-700 text-md">
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
              className="w-full px-2 py-2 mt-2 border rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-md text-slate-700"
            />
            {suggestions.length > 0 && (
              <ul className="absolute w-full mt-1 overflow-auto bg-white border rounded-md shadow-lg max-h-60 text-md text-slate-700">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {formErrors.adresse && (
          <p className="mt-1 text-xs text-red-500">{formErrors.adresse}</p>
        )}
        <p className="w-10/12 mt-1 text-xs font-light">
          L’adresse du domicile sera votre adresse pour toute correspondance.
        </p>
      </div>
      <div className="w-full mt-5">
        <label htmlFor="adresse" className="text-slate-700 text-md">
          Complément d&apos;adresse
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
          className="w-full px-2 py-2 mt-2 border rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-md"
        />
        {formErrors.complementAdresse && (
          <p className="mt-1 text-xs text-red-500">
            {formErrors.complementAdresse}
          </p>
        )}
        {/* <p className="w-10/12 mt-1 text-xs font-light">
          L’adresse du domicile sera votre adresse pour toute correspondance.
        </p> */}
      </div>
      <div className="flex w-full mt-5">
        <input
          type="checkbox"
          id="CGV"
          name="CGV"
          checked={formValues.CGV}
          onChange={handleCGVChange}
          className="cursor-pointer h-4 w-4"
        />
        <label htmlFor="CGV" className="ml-3 text-xs font-light">
          J&apos;accepte les{" "}
          <a href="#" className="font-semibold text-slate-600">
            conditions générales de vente
          </a>
        </label>
      </div>
    </div>
  );
};

export default Adresse;
