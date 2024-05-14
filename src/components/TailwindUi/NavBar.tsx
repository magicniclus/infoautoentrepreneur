/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog as Dialog2 } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { checkUserLoggedIn } from "../../firebase/database/auth/auth";
import { auth } from "../../firebase/firebase.config";

const navigation = [
  { name: "Devenir auto-entrepreneur", href: "/devenir-auto-entrepreneur" },
  { name: "Modification de votre situation", href: "/modification" },
  { name: "Cessation de votre activité", href: "/cessation" },
  // { name: "Gestion de votre entreprise", href: "#" },
];

const NavBar = () => {
  const route = useRouter();
  const [path, setPath] = useState(""); // Declare and initialize the 'path' variable
  const pathParts = path.split("/"); // Split the path
  const valueAfterSlash = pathParts[1];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [userInLoggin, setUserInLoggin] = useState(false);

  useEffect(() => {
    checkUserLoggedIn()
      .then((user) => {
        setUserInLoggin(true);
        // console.log("Utilisateur connecté :", user);
      })
      .catch((error) => {
        setUserInLoggin(false);
        console.error("Aucun utilisateur connecté :", error);
      });
    // This code runs only on the client side
    const currentPath = window.location.pathname; // Now safe to access window
    setPath(currentPath);
  }, []); // Empty array ensures this runs once on mount

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const persistenceType = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, persistenceType);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        route.push("/mon-espace");
        console.log("Utilisateur connecté avec succès :", userCredential.user);
      })
      .catch((error) => {
        setError("Email ou mot de passe incorrect. Veuillez réessayer.");
        console.error("Erreur de connexion :", error);
        route.push("/");
      });
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <>
      <style jsx>{`
        .under {
          position: relative;
        }
        .under::after {
          position: absolute;
          bottom: -12px;
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
          bottom: -12px;
          left: 0;
          content: "";
          display: block;
          width: 100%;
          height: 3px;
          background: #15803d;
        }
      `}</style>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 mr-7">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mon-independant.fr</span>
              <img
                className="h-12 w-auto object-contain"
                src="/logoWithName.png"
                alt="mon-independant.fr"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 flex items-center">
            <a
              href="/devenir-auto-entrepreneur"
              className=" leading-6 text-sm under"
            >
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
            <a href="/modification" className="text-sm leading-6 under">
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
            <a href="/cessation" className="text-sm leading-6 under">
              <span
                className={`font-bold ${
                  valueAfterSlash === "cessation" &&
                  "text-green-700 underContinu"
                }`}
              >
                Cessation
              </span>{" "}
              <br /> de votre activité
            </a>
            <a href="/tarifs" className="text-sm mx-auto">
              Nos tarifs
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!userInLoggin ? (
              <Dialog>
                <DialogTrigger className="text-sm font-semibold leading-6 text-green-700 py-1 px-3 border border-green-700 bg-green-50 rounded-full hover:bg-green-700 hover:border-white hover:text-white transition-all duration-300 ease-in-out">
                  Mon Espace <span aria-hidden="true">&rarr;</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="text-slate-700">
                    <DialogTitle>Connexion</DialogTitle>
                    <DialogDescription>
                      Connectez-vous à votre espace personnel
                      <form onSubmit={handleLogin}>
                        <div className="flex flex-col mt-5">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            placeholder="Votre Email"
                            name="email"
                            className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="password" className="mt-2">
                            Mot de passe
                          </label>
                          <input
                            type="password"
                            placeholder="Votre mot de passe"
                            name="password"
                            className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center mt-2">
                          <input
                            id="rememberMe"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={toggleRememberMe}
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor="rememberMe"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Se souvenir de moi
                          </label>
                        </div>
                        <div className="mt-4">
                          <a
                            href="/reset-password"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Mot de passe oublié ?
                          </a>
                        </div>
                        <div className="mt-4">
                          <p className="text-red-500">{error ? error : null}</p>
                        </div>
                        <button
                          type="submit"
                          className="bg-green-700 text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut"
                        >
                          Me connecter
                        </button>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ) : (
              <a
                href="/mon-espace"
                className="text-sm font-semibold leading-6 text-green-700 py-1 px-3 border border-green-700 bg-green-50 rounded-full hover:bg-green-700 hover:border-white hover:text-white transition-all duration-300 ease-in-out"
              >
                {" "}
                Mon Espace <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
        <Dialog2
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog2.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Mon independant</span>
                <img
                  className="h-12 w-auto"
                  src="/logoWithName.png"
                  alt="mon-independant.fr"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/tarifs"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-700 hover:bg-gray-50"
                  >
                    Nos tarifs
                  </a>
                  {!userInLoggin ? (
                    <Dialog>
                      <DialogTrigger className="text-sm font-semibold leading-6 text-green-700 py-1 px-3 border border-green-700 bg-green-50 rounded-full hover:bg-green-700 hover:border-white hover:text-white transition-all duration-300 ease-in-out">
                        Mon Espace <span aria-hidden="true">&rarr;</span>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="text-slate-700">
                          <DialogTitle>Connexion</DialogTitle>
                          <DialogDescription>
                            Connectez-vous à votre espace personnel
                            <form onSubmit={handleLogin}>
                              <div className="flex flex-col mt-5">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="text"
                                  placeholder="Votre Email"
                                  name="email"
                                  className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                              <div className="flex flex-col ">
                                <label htmlFor="password" className="mt-2">
                                  Mot de passe
                                </label>
                                <input
                                  type="password"
                                  placeholder="Votre mot de passe"
                                  name="password"
                                  className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              <div className="flex items-center mt-2">
                                <input
                                  id="rememberMe"
                                  type="checkbox"
                                  checked={rememberMe}
                                  onChange={toggleRememberMe}
                                  className="h-4 w-4"
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="ml-2 block text-sm text-gray-900"
                                >
                                  Se souvenir de moi
                                </label>
                              </div>
                              <div className="mt-4">
                                <a
                                  href="/reset-password"
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  Mot de passe oublié?
                                </a>
                              </div>
                              <div className="mt-4">
                                <p className="text-red-500">
                                  {error ? error : null}
                                </p>
                              </div>
                              <button
                                type="submit"
                                className="bg-green-700 text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut"
                              >
                                Me connecter
                              </button>
                            </form>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <a
                      href="/mon-espace"
                      className="text-sm font-semibold leading-6 text-green-700 py-1 px-3 border border-green-700 bg-green-50 rounded-full hover:bg-green-700 hover:border-white hover:text-white transition-all duration-300 ease-in-out"
                    >
                      Mon Espace <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Dialog2.Panel>
        </Dialog2>
      </header>
    </>
  );
};

export default NavBar;
