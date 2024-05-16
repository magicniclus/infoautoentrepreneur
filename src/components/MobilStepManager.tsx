import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const MobilStepManager = () => {
  const step = useSelector(
    (state: RootState) => state.createUser.stepCreationCompte
  );

  const stepManager = () => {
    switch (step) {
      case 1:
        return "Coordonnées";
      case 2:
        return "Activité";
      case 3:
        return "Adresse";
      case 4:
        return "Finalisation";
      default:
        return "Informations personnelles";
    }
  };

  return (
    <section className="md:hidden flex w-full text-slate-700 md:mt-0 my-5 flex flex-col items-center">
      <div className="rounded-md  w-full rounded-md py-6 mx-auto px-6">
        <h2 className="font-semibold text-2xl text-cyan-900 text-center py-2 px-3 border rounded-lg border-cyan-700 bg-cyan-600/5">
          {stepManager()}
        </h2>
      </div>
    </section>
  );
};

export default MobilStepManager;
