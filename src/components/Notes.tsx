import { StarIcon } from "@heroicons/react/20/solid";

/* eslint-disable @next/next/no-img-element */
const Notes = () => {
  return (
    <section className="w-full py-10 text-slate-700">
      <div className="px-4 max-w-6xl mx-auto w-full flex justify-center items-center flex-col">
        <img src="/icons/badge.png" alt="badge de note" className="h-14 w-14" />
        <h2 className="mt-2 text-center">
          Nos clients nous évaluent{" "}
          <span className="text-cyan-900 font-bold">4,8/5</span>{" "}
        </h2>
        <div className="flex mt-2">
          <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
          <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
          <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
          <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
          <StarIcon className="h-5 w-5 text-yellow-400" />
        </div>
        <a className="text-sm mt-3 hover:underline" href="/avis">
          Lire nos avis clients
        </a>
      </div>
    </section>
  );
};

export default Notes;
