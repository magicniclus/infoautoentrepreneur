/* eslint-disable @next/next/no-img-element */
"use client";

import { RootState } from "@/redux/store";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const NavBarLanding = ({ dossier = true }: { dossier?: boolean }) => {
  const userInfo = useSelector((state: RootState) => state.createUser.userInfo);
  return (
    <>
      <style jsx>{`
        .lign:before {
          content: "";
          position: absolute;
          top: 0%;
          left: -20px;
          width: 1px;
          height: 100%;
          background-color: #c2c2c2;
        }
      `}</style>
      <header className="bg-white text-slate-700">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between  p-3 py-8 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Mon-independant.fr</span>
              <img
                className="h-12 w-auto object-contain"
                src="/logoWithName.png"
                alt="mon-independant.fr"
              />
            </div>
          </div>
          {dossier && (
            <div className="flex flex-col items-center md:hidden">
              <h2 className="font-semibold text-xs">Dossier nº</h2>
              <h3 className="text-xs">
                {userInfo.dossierId?.toLocaleUpperCase()}
              </h3>
            </div>
          )}
          <div className="md:flex flex-col items-start hidden">
            <div className=" md:flex hidden items-center justify-center relative">
              <PhoneIcon className="h-6 w-6 text-cyan-900 mr-3" />
              <div className="flex flex-col justify-between">
                <a
                  href="tel:+33972164963"
                  className="font-semibold text-xs md:text-sm text-cyan-900"
                >
                  09 72 16 49 63
                </a>
              </div>
            </div>
            <div className=" md:flex hidden items-center justify-center relative">
              <EnvelopeIcon className="h-6 w-6 text-cyan-900 mr-3" />
              <a
                href="mailto:contact@info-autoentrepreneur.fr"
                className="font-semibold text-xs md:text-sm text-cyan-900"
              >
                contact@info-autoentrepreneur.fr
              </a>
            </div>
          </div>
          <div className="h-[50px] w-[0.2px] bg-slate-700/50 mx-5 md:block hidden" />
          <div className="md:flex flex-col hidden">
            <p className="text-xs md:block hidden">
              Du lundi au vendredi - de 9h à 19h
            </p>
            <p className="text-xs md:block hidden">
              Prix d&apos;un appel local
            </p>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBarLanding;
