import { RootState } from "@/redux/store";
import { CheckIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

const StepModification = () => {
  const step = useSelector(
    (state: RootState) => state.createUser.stepCreationCompte
  );

  const typeDeModification = useSelector(
    (state: RootState) => state.createUser.userModification.typeDeModification
  );

  return (
    <section className="w-full text-slate-700 md:mt-0 mt-10">
      <div className="px-6 lg:px-8  md:flex hidden flex-col justify-center items-start w-full flex flex-col mt-7">
        <div
          className={`flex items-center ${
            step < 2
              ? "font-bold text-slate-400 border-slate-400"
              : " text-green-700  border-green-700 font-bold"
          }`}
        >
          <div
            className={`w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border`}
          >
            {step > 1 ? <CheckIcon className="h-3 w-3" /> : null}
          </div>
          <p className="ml-3 text-sm">Informations Personnelles</p>
        </div>
        <div
          className={`flex items-center mt-5 ${
            step === 2 || step < 3
              ? `${
                  step === 2 ? "font-bold text-slate-400" : "text-slate-300"
                } border-slate-300`
              : " text-green-700  border-green-700 font-bold"
          }`}
        >
          <div className="w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border">
            {step > 2 ? <CheckIcon className="h-3 w-3" /> : null}
          </div>
          <p className="ml-3 text-sm">
            {typeDeModification === "modificationAdresse"
              ? "Adresse"
              : "Activité"}
          </p>
        </div>
        <div
          className={`flex items-center mt-5 ${
            step === 3 || step < 4
              ? `${
                  step === 3 ? "font-bold text-slate-400" : "text-slate-300"
                } border-slate-300`
              : " text-green-700  border-green-700 font-bold"
          }`}
        >
          <div className="w-4 h-4 flex justify-center items-center bg-slate-50 rounded-full border">
            {step > 3 ? <CheckIcon className="h-3 w-3" /> : null}
          </div>
          <p className="ml-3 text-sm">Finalisation</p>
        </div>
      </div>
      <div className="w-full bg-slate-50 h-max px-6 lg:px-8 rounded-md py-5 mt-5">
        <h2 className="text-sm">Une Question ?</h2>
        <div className="flex relative lign items-center mt-5">
          <PhoneIcon className="h-4 w-4 mr-4" />
          <div className="flex flex-col justify-between">
            <a href="tel:0917164963" className="font-semibold text-sm">
              09 72 16 49 63
            </a>
            <p className="text-xs">Du lundi au vendredi - de 9h à 19h</p>
          </div>
        </div>
        <div className="flex relative lign mt-5 items-center">
          <EnvelopeIcon className="h-4 w-4 mr-4" />
          <div className="flex flex-col justify-between">
            <a
              href="mailTo:contact@mon-independant.fr"
              className="font-semibold text-sm "
            >
              contact@mon-independant.fr
            </a>
            <p className="text-xs">Du lundi au vendredi - de 9h à 19h</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepModification;
