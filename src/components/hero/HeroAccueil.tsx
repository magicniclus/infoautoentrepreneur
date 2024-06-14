/* eslint-disable @next/next/no-img-element */
import { StarIcon } from "@heroicons/react/20/solid";
const HeroAccueil = () => {
  return (
    <>
      <style jsx>{`
        .background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <section
        id="form"
        className="w-full bg-[url('/background/accueil.jpg')] py-10 md:py-52 bg-no-repeat bg-cover bg-center relative background text-slate-700"
      >
        <div className="px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center z-10 content">
          <h1 className=" text-white font-bold sm:text-6xl text-4xl">
            Info Auto-Entrepreneur
          </h1>
          <h2 className="text-white mt-3">
            Nous vous accompagnons dans votre projet d&apos;auto-entrepreneur
          </h2>
          <a
            href="/devenir-auto-entrepreneur"
            className={`${"bg-cyan-900"} text-white w-full py-2 rounded-md mt-5 hover:bg-cyan-900/90 transition duration-150 easeInOut max-w-max px-3`}
          >
            Devenir Auto-Entrepreneur
          </a>
          <div className="px-4 mx-auto flex justify-center items-center flex-col mt-5">
            <img
              src="/icons/badge.png"
              alt="badge de note"
              className="h-10 w-10"
            />
            <h2 className="mt-2 text-center text-white">
              Nos client nous évaluent{" "}
              <span className="text-white font-bold">4,8/5</span>{" "}
            </h2>
            <div className="flex mt-2">
              <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroAccueil;
