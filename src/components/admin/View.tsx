/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { logoutUser } from "@/firebase/database/auth/auth";
import {
  ecouterMisesAJourUtilisateurs,
  recupererElementsDossier,
} from "@/firebase/database/database";
import { capitalizeFirstLetter } from "@/lib/utils";
import { setAllData } from "@/redux/adminSlice";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  HomeIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { off, ref } from "firebase/database";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { database } from "../../firebase/firebase.config";

const navigation = [
  { name: "Dashboard", href: "/admin/espace", icon: HomeIcon, current: true },
  // {
  //   name: "Tous",
  //   href: "/admin/espace/allData",
  //   icon: DocumentDuplicateIcon,
  //   current: false,
  // },
  // {
  //   name: "Nouveau",
  //   href: "/admin/espace/newData",
  //   icon: UsersIcon,
  //   current: false,
  // },
  // { name: "En cours", href: "#", icon: FolderIcon, current: false },
  // { name: "A contacter", href: "#", icon: CalendarIcon, current: false },
];

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface AdminData {
  prenom: string;
  nom: string;
  // ajoutez d'autres propriétés nécessaires ici
}

export default function View(props: any) {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [data, setData] = useState(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();

  const currentPathname = usePathname();

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: currentPathname === item.href, // Utilize router.pathname instead of router.asPath
  }));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Ici, vous pouvez récupérer les détails de l'utilisateur et vérifier le rôle
        recupererElementsDossier()
          .then((userData) => {
            if (
              userData &&
              (userData.role === "admin" || userData.role === "super-admin")
            ) {
              ecouterMisesAJourUtilisateurs(setData);
              setAdminData(userData);
            } else {
              logoutUser().then(() => {
                router.push("/admin/connexion");
              });
            }
          })
          .finally(() => setIsLoading(false));
      } else {
        router.push("/admin/connexion");
      }
    });

    return () => {
      unsubscribe();
      const dossierRef = ref(database, "/users/clients/userInscription");
      off(dossierRef); // Assurez-vous de nettoyer correctement les écouteurs
    };
  }, [router, auth]);

  useEffect(() => {
    dispatch(setAllData(data));
  }, [data]);

  const handleClickUser = (action: string) => {
    logoutUser().then(() => {
      router.push("/admin/connexion");
    });
  };

  if (isLoading) {
    return (
      <div className="w-screen h-[100vh] flex items-center justify-center animate-pulse text-slate-500 font-bold">
        Loading...
      </div>
    );
  }
  return (
    <>
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
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/logo.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {updatedNavigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-green-600"
                                      : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-green-600"
                                        : "text-gray-400 group-hover:text-green-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                            <UserIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {adminData &&
                              capitalizeFirstLetter(adminData?.prenom)}{" "}
                            {adminData && adminData?.nom.toUpperCase()}
                          </div>
                          <div
                            onClick={() => handleClickUser("deconnexion")}
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 cursor-pointer"
                          >
                            <ArrowLeftEndOnRectangleIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Deconnexion
                          </div>
                        </li>
                        {/* <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div> */}
                        {/* <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? "text-indigo-600 border-indigo-600"
                                        : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul> */}
                        {/* </li> */}
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
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="Your Company" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {updatedNavigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-green-600"
                              : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-green-600"
                                : "text-gray-400 group-hover:text-green-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? "text-indigo-600 border-indigo-600"
                                : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li> */}
                <li className="-mx-6 mt-auto">
                  <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                    <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {adminData && capitalizeFirstLetter(adminData?.prenom)}{" "}
                    {adminData && adminData?.nom.toUpperCase()}
                  </div>
                  <div
                    onClick={() => handleClickUser("deconnexion")}
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 cursor-pointer"
                  >
                    <ArrowLeftEndOnRectangleIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    Deconnexion
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{props.children}</div>
        </main>
      </div>
    </>
  );
}
