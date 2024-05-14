import { avis } from "@/utils/avis";

const Avis = () => {
  return (
    <section className="bg-white bg-slate-50 mt-20">
      <div className="mx-auto sm:px-6 lg:px-8 flex justify-between md:flex-row flex-col ">
        {avis.slice(0, 5).map((avis, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-y-6 py-12 md:max-w-[18%] w-full border border-slate-100 rounded-md p-2 md:mt-0 mt-5"
          >
            <div className="flex items-center gap-x-4 text-slate-700">
              <div className="flex flex-col items-center">
                <h3 className="font-semibold">{avis.date}</h3>
                <p className="text-sm text-yellow-500">
                  {/* Génération des étoiles en fonction de la note */}
                  {"★".repeat(avis.note) + "☆".repeat(5 - avis.note)}
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-slate-700">{avis.avis}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Avis;
