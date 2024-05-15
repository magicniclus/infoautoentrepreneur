import { CheckCircleIcon } from "@heroicons/react/20/solid";

const FormStepView = ({ step }: { step: number }) => {
  return (
    <section className="w-full bg-slate-100 p-4 mt-7 rounded-md flex justify-between">
      <div
        className={`flex items-center justify-between bg-white rounded-md w-full md:w-[24%] relative ${
          step === 1
            ? "border border-slate-700"
            : step > 1
            ? "border border-cyan-900"
            : null
        }`}
      >
        {step > 1 && (
          <CheckCircleIcon className="absolute top-0.5 right-0.5 w-5 h-5 text-cyan-900" />
        )}
        <div className="flex items-center justify-between p-2">
          <div
            className={`flex items-center justify-center w-6 h-6 ${
              step > 1
                ? "bg-cyan-900 text-white border border-green-600"
                : "bg-slate-100 text-slate-700"
            } rounded-full`}
          >
            1
          </div>
          <h2 className="text-slate-700 text-sm ml-3 text-start">
            Informations <br /> complémentaires
          </h2>
        </div>
      </div>
      <div
        className={`md:flex hidden items-center justify-between bg-white rounded-md w-[24%] relative ${
          step === 2
            ? "border border-slate-700"
            : step > 2
            ? "border border-cyan-900"
            : null
        }`}
      >
        {step > 2 && (
          <CheckCircleIcon className="absolute top-0.5 right-0.5 w-5 h-5 text-cyan-900" />
        )}
        <div className="flex items-center justify-between p-2">
          <div
            className={`flex items-center justify-center w-6 h-6 ${
              step > 2
                ? "bg-cyan-900 text-white border border-green-600"
                : "bg-slate-100 text-slate-700"
            } rounded-full`}
          >
            2
          </div>
          <h2 className="text-slate-700 text-sm ml-3 text-start">
            Adresse <br /> professionnelle
          </h2>
        </div>
      </div>
      <div
        className={`md:flex hidden items-center justify-between bg-white rounded-md w-[24%] relative ${
          step === 3
            ? "border border-slate-700"
            : step > 3
            ? "border border-cyan-900"
            : null
        }`}
      >
        {step > 3 && (
          <CheckCircleIcon className="absolute top-0.5 right-0.5 w-5 h-5 text-cyan-900" />
        )}
        <div className="flex items-center justify-between p-2">
          <div
            className={`flex items-center justify-center w-6 h-6 ${
              step > 3
                ? "bg-cyan-900 text-white border border-green-600"
                : "bg-slate-100 text-slate-700"
            } rounded-full`}
          >
            3
          </div>
          <h2 className="text-slate-700 text-sm ml-3 text-start">
            Entreprise <br /> et informations
          </h2>
        </div>
      </div>
      <div
        className={`md:flex hidden items-center justify-between bg-white rounded-md w-[24%] relative ${
          step === 4
            ? "border border-slate-700"
            : step > 4
            ? "border border-cyan-900"
            : null
        }`}
      >
        {step > 4 && (
          <CheckCircleIcon className="absolute top-0.5 right-0.5 w-5 h-5 text-cyan-900" />
        )}
        <div className="flex items-center justify-between p-2">
          <div
            className={`flex items-center justify-center w-6 h-6 ${
              step > 4
                ? "bg-cyan-900 text-white border border-green-600"
                : "bg-slate-100 text-slate-700"
            } rounded-full`}
          >
            4
          </div>
          <h2 className="text-slate-700 text-sm ml-3 text-start">Documents</h2>
        </div>
      </div>
    </section>
  );
};

export default FormStepView;
