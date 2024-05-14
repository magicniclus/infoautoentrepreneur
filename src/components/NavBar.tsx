/* eslint-disable @next/next/no-img-element */
"use client";

import { Bars3Icon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = ({
  nav = true,
  connexion = true,
}: {
  nav?: boolean;
  connexion?: boolean;
}) => {
  const [valueAfterSlash, setValueAfterSlash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("/");
      setValueAfterSlash(pathParts[1] || "");
    }
  }, [pathname]);

  const [navIsActive, setNavIsActive] = useState(false);

  return (
    <>
      <style jsx>{`
        .under {
          position: relative;
        }
        .under::after {
          position: absolute;
          bottom: -16px;
          left: 50%;
          content: "";
          display: block;
          width: 0%;
          height: 3px;
          background: #15803d;
          opacity: 0;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .under:hover::after {
          width: 100%;
          opacity: 1;
          left: 0;
          transform: translateX(0%);
        }
        .underContinu::after {
          position: absolute;
          bottom: -16px;
          left: 0;
          content: "";
          display: block;
          width: 100%;
          height: 3px;
          background: #15803d;
        }
      `}</style>
      <header className="w-full md:bg-slate-100 relative">
        <nav className="px-4 max-w-6xl mx-auto hidden md:flex justify-between items-center py-4 text-slate-700">
          <img
            className="h-12 w-auto object-contain"
            src="/logoWithName.png"
            alt="mon-independant.fr"
          />
          {nav && (
            <>
              <ul className="flex justify-between items-center">
                <li className="mr-7 under">
                  <a href="/devenir-auto-entrepreneur">
                    <span
                      className={`font-bold ${
                        valueAfterSlash === "devenir-auto-entrepreneur" &&
                        "text-green-700 underContinu"
                      }`}
                    >
                      Devenir
                    </span>{" "}
                    <br /> auto-entrepreneur
                  </a>
                </li>
                <li className="mr-7 under">
                  <a href="/modification">
                    <span
                      className={`font-bold ${
                        valueAfterSlash === "modification" &&
                        "text-green-700 underContinu"
                      }`}
                    >
                      Modification
                    </span>{" "}
                    <br /> de votre situation
                  </a>
                </li>
                <li className="mr-7 under">
                  <a href="#">
                    <span className="font-bold">Cession</span> <br /> de votre
                    activité
                  </a>
                </li>
                <li className=" under">
                  <a href="#">
                    <span className="font-bold">Gestion</span> <br /> de votre
                    entreprise
                  </a>
                </li>
              </ul>
              <a href="/tarifs" className="">
                Nos tarifs
              </a>
            </>
          )}
          {connexion && (
            <a
              href="#"
              className="py-1 px-5 border border-green-700 text-green-700 bg-green-50 rounded-full hover:bg-green-700 hover:border-white hover:text-white transition-all duration-300 ease-in-out"
            >
              Mon Espace
            </a>
          )}
        </nav>
        <div>
          <nav
            className={`md:hidden flex max-w-full w-[300px] fixed right-0 justify-end`}
          >
            <div className="">
              <Bars3Icon className="w-6" />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
