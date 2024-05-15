/* eslint-disable @next/next/no-img-element */
"use client";

import { logoutUser, monitorAuthState } from "@/firebase/database/auth/auth";
import {
  ajoutUtilisateurCreation,
  recupererDonneesUtilisateur,
  recupererDonneesUtilisateurParEmail,
  supprimerDonneesInscriptionEnCours,
} from "@/firebase/database/database";
import { setConnectedInformation, setuid } from "@/redux/createUserSlice";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
  HomeIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MonEspece from "../espace/MonEspece";

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
  { name: "Mon profil", fonction: "" },
  { name: "Déconnexion", fonction: "deconnexion" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface UserInfo {
  nom: string;
  prenom: string;
  email: string;
  // Add other user properties as needed
}

interface UserInformation {
  userInfo: UserInfo;
}

const View = () => {
  const [path, setPath] = useState(""); // Declare and initialize the 'path' variable
  const pathParts = path.split("/"); // Split the path
  const valueAfterSlash = pathParts[3];

  // console.log("valueAfterSlash :", valueAfterSlash);

  const navigation = [
    {
      name: "Mon espace",
      href: "/mon-espace",
      icon: HomeIcon,
      current: valueAfterSlash === undefined ? true : false,
    },
    {
      name: "Service client",
      href: "/mon-espace/service-client",
      icon: ChatBubbleLeftIcon,
      current: valueAfterSlash === "service-client" ? true : false,
    },
    {
      name: "Aides",
      href: "/mon-espace/aides",
      icon: UserIcon,
      current: valueAfterSlash === "aides" ? true : false,
    },
  ];

  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.createUser.userId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userConnectedEmail, setUserConnectedEmail] = useState(""); // Stocke l'email de l'utilisateur connecté
  const [userIsLoggingIn, setUserIsLoggingIn] = useState(true);

  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null); // Stocke les informations de l'utilisateur connecté

  const route = useRouter();

  // Écoute les changements d'état de l'authentification de l'utilisateur
  // Abonnement à l'état d'authentification
  useEffect(() => {
    // Abonnement à l'état d'authentification
    const unsubscribe = monitorAuthState((user) => {
      if (user) {
        // L'utilisateur est connecté
        setUserIsLoggingIn(true);
        dispatch(setuid(user.uid)); // Enregistre l'UID de l'utilisateur dans le store Redux
        // console.log("Utilisateur connecté :", user);
        if (user.email) {
          setUserConnectedEmail(user.email); // Stocke l'email de l'utilisateur connecté
        }
      } else {
        // Aucun utilisateur connecté
        setUserIsLoggingIn(false);
        dispatch(setConnectedInformation({})); // Réinitialise les informations de l'utilisateur connecté dans le store
        route.push("/"); // Redirige vers la page d'accueil
      }
    });

    // Fonction de nettoyage appelée lors du démontage du composant
    return () => unsubscribe();
  }, [route, dispatch]);

  // Gère les actions de l'utilisateur depuis l'interface
  const handleClickUser = (e: string) => {
    if (e === "profil") route.push("/mon-espace/profil");
    if (e === "deconnexion") {
      // Tente de déconnecter l'utilisateur
      logoutUser()
        .then(() => {
          dispatch(setConnectedInformation({})); // Réinitialise les informations de connexion
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la déconnexion de l'utilisateur :",
            error
          );
        });
    }
  };

  // Récupère les données de l'utilisateur si userId est disponible
  useEffect(() => {
    if (!userId) return; // Si userId n'est pas défini, ne fait rien

    // Appel API pour récupérer les données de l'utilisateur
    recupererDonneesUtilisateur(userId)
      .then((data) => {
        if (data) {
          // console.log(
          //   "Données spécifiques de l'utilisateur récupérées :",
          //   data
          // );
          dispatch(setConnectedInformation(data)); // Stocke les données de l'utilisateur dans Redux
          setUserInformation(data);
        } else {
          console.log("Aucune donnée trouvée pour cet utilisateur.");
          recupererDonneesUtilisateurParEmail(userConnectedEmail).then(
            (data) => {
              if (data) {
                // console.log(
                //   "Données spécifiques de l'utilisateur récupérées :",
                //   data
                // );
                ajoutUtilisateurCreation(userId, data).then(() => {
                  supprimerDonneesInscriptionEnCours(userConnectedEmail);
                });
                dispatch(setConnectedInformation(data)); // Stocke les données de l'utilisateur dans Redux
                console.log("data :", data);
                setUserInformation(data);
              } else {
                console.log("Aucune donnée trouvée pour cet utilisateur.");
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [userId, dispatch, userConnectedEmail]);

  useEffect(() => {
    // console.log("userInformation :", userInformation);
    if (!userId) return; // Si userId n'est pas défini, ne fait rien

    // Appel API pour récupérer les données de l'utilisateur
    recupererDonneesUtilisateur(userId)
      .then((data) => {
        if (data) {
          // console.log(
          //   "Données spécifiques de l'utilisateur récupérées :",
          //   data
          // );
          dispatch(setConnectedInformation(data)); // Stocke les données de l'utilisateur dans Redux
          setUserInformation(data);
          // console.log("data :", data);
        } else {
          console.log("Aucune donnée trouvée pour cet utilisateur.");
          recupererDonneesUtilisateurParEmail(userConnectedEmail).then(
            (data) => {
              if (data) {
                // console.log(
                //   "Données spécifiques de l'utilisateur récupérées :",
                //   data
                // );
                ajoutUtilisateurCreation(userId, data).then(() => {
                  supprimerDonneesInscriptionEnCours(userConnectedEmail);
                });
                dispatch(setConnectedInformation(data)); // Stocke les données de l'utilisateur dans Redux
                console.log("data :", data);
                setUserInformation(data);
              } else {
                console.log("Aucune donnée trouvée pour cet utilisateur.");
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5 ring-1 ring-white/10">
                    <div className="flex items-center h-16 shrink-0">
                      <img
                        className="w-auto h-8"
                        src="/logo.png"
                        alt="Info Auto-Entreprise"
                      />
                    </div>
                    <nav className="flex flex-col flex-1">
                      <ul role="list" className="flex flex-col flex-1 gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="w-6 h-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="p-2 py-5 mt-5 text-sm text-center text-gray-400 border border-gray-400 rounded-md">
                          <span className="text-lg font-bold">A venir :</span>{" "}
                          <br />
                          <p>Outil de gestion, de facturation et de devis.</p>
                          <button className="p-2 mt-3 text-white bg-cyan-900 rounded-md">
                            Me tenir informé
                          </button>
                        </li>
                        {/* <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div>
                          <ul role="list" className="mt-2 -mx-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li> */}
                        <li className="mt-auto">
                          <button
                            onClick={() => handleClickUser("profil")}
                            className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white"
                          >
                            <UserCircleIcon
                              className="w-6 h-6 shrink-0"
                              aria-hidden="true"
                            />
                            Profil
                          </button>
                          <button
                            onClick={() => handleClickUser("deconnexion")}
                            className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white"
                          >
                            <ArrowLeftEndOnRectangleIcon
                              className="w-6 h-6 shrink-0"
                              aria-hidden="true"
                            />
                            Deconnexion
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5">
            <div className="flex items-center h-16 shrink-0">
              <img
                className="w-auto h-8"
                src="/logo.png"
                alt="Info Auto-Entreprise"
              />
            </div>
            <nav className="flex flex-col flex-1">
              <ul role="list" className="flex flex-col flex-1 gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="w-6 h-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="p-2 py-5 mt-5 text-sm text-center text-gray-400 border border-gray-400 rounded-md">
                  <span className="text-lg font-bold">A venir :</span> <br />
                  <p>Outil de gestion, de facturation et de devis.</p>
                  <button className="p-2 mt-3 text-white bg-cyan-900 rounded-md">
                    Me tenir informé
                  </button>
                </li>
                {/* <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="mt-2 -mx-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li> */}
                <li className="mt-auto">
                  <button
                    onClick={() => handleClickUser("profil")}
                    className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white"
                  >
                    <UserCircleIcon
                      className="w-6 h-6 shrink-0"
                      aria-hidden="true"
                    />
                    Profil
                  </button>
                  <button
                    onClick={() => handleClickUser("deconnexion")}
                    className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white"
                  >
                    <ArrowLeftEndOnRectangleIcon
                      className="w-6 h-6 shrink-0"
                      aria-hidden="true"
                    />
                    Deconnexion
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="w-px h-6 bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex self-stretch justify-end flex-1 gap-x-4 lg:gap-x-6">
              {/* <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="absolute inset-y-0 left-0 w-5 h-full text-gray-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block w-full h-full py-0 pl-8 pr-0 text-gray-900 border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form> */}
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button> */}

                {/* Separator */}
                {/* <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                /> */}

                {/* Profile dropdown */}
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-slate-700"
                  aria-hidden="true"
                >
                  {userInformation?.userInfo.nom && (
                    <span>{userInformation.userInfo.nom.toUpperCase()}</span>
                  )}{" "}
                  {userInformation?.userInfo.prenom && (
                    <span>
                      {userInformation.userInfo.prenom.charAt(0).toUpperCase() +
                        userInformation.userInfo.prenom.slice(1).toLowerCase()}
                    </span>
                  )}
                </span>
                {/* <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span> */}
                {/* <img
                      className="w-8 h-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}
                {/* <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Nicolas CASTERA
                      </span>
                      <ChevronDownIcon
                        className="w-5 h-5 ml-2 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                              onClick={() => handleClickUser(item.fonction)}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <MonEspece />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default View;
