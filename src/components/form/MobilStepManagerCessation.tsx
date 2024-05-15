import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const MobilStepManagerCessation = () => {
  const step = useSelector(
    (state: RootState) => state.createUser.stepCreationCompte
  );

  const stepManager = () => {
    switch (step) {
      case 1:
        return "Informations Personnelles";
      case 2:
        return "Adresse";
      case 3:
        return "Finalisation";
      default:
        return "Informations personnelles";
    }
  };

  return (
    <section className="md:hidden flex w-full text-slate-700 md:mt-0 my-5 flex flex-col items-center">
      <div className="rounded-md  w-full rounded-md py-6 mx-auto px-6">
        <h2 className="font-semibold text-2xl text-cyan-900 text-center">
          {stepManager()}
        </h2>
      </div>
    </section>
  );
};

export default MobilStepManagerCessation;
