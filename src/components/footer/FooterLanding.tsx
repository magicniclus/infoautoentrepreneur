/* eslint-disable @next/next/no-img-element */
import { StarIcon } from "@heroicons/react/20/solid";

const FooterLanding = () => {
  return (
    <footer className="w-full py-5 text-slate-700 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-5 lg:p-8">
        <div className="flex flex-col">
          <div className="flex lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Mon-independant.fr</span>
              <img
                className="h-10 w-auto object-contain"
                src="/logoWithName.png"
                alt="mon-independant.fr"
              />
            </div>
          </div>
          <p className="text-xs leading-5 text-gray-500 mt-3">
            {" "}
            &copy; 2024 Tous droits réservés.
          </p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <img
            src="/icons/badge.png"
            alt="badge de note"
            className="h-10 w-10"
          />
          <h2 className="mt-1 text-center">Nos client nous evaluents:</h2>
          <div className="flex mt-1">
            <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
            <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
            <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
            <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
            <StarIcon className="h-5 w-5 text-yellow-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
