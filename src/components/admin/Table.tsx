"use client";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface UserInfo {
  nom: string;
  prenom: string;
  email: string;
}

interface User {
  userInfo: UserInfo;
  etapesInscription: {
    status: { etapesInscription: string };
  };
  date: string;
  numeroDossier: string;
}

export default function Table() {
  const userData = useSelector((state: RootState) => state.admin.allData);
  const userId = useSelector((state: RootState) => state.admin.userSelected);
  const [data, setData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dispatch = useDispatch();

  const route = useRouter();

  useEffect(() => {
    if (userData && typeof userData === "object") {
      const usersArray: User[] = Object.values(userData);
      setData(usersArray);
    }
  }, [userData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  function getStatusColor(status: string | undefined) {
    if (!status) return "text-gray-500"; // Pas de status
    switch (status) {
      case "en cours de traitement":
        return "text-yellow-500 font-semibold";
      case "dossier complété et validé":
        return "text-green-500";
      case "Refusé":
        return "text-red-500";
      default:
        return "text-gray-500"; // Couleur par défaut pour les autres cas
    }
  }

  function capitalizeFirstLetter(input: string | null | undefined): string {
    const string = input || ""; // Convertit null ou undefined en chaîne vide
    if (string === "") return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const filteredData =
    searchTerm === ""
      ? data
      : data.filter(
          (person) =>
            person.userInfo.nom
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            person.userInfo.prenom
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            person.userInfo.email
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (person.etapesInscription?.status?.etapesInscription &&
              person?.etapesInscription?.status?.etapesInscription
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            false ||
            person.date.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const openUserPage = (userId: string) => {
    route.push("/admin/espace/user?id=" + userId);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Utilisateurs
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Voici la liste des utilisateurs enregistrés dans la base de données.
          </p>
        </div>
        <div className="relative mt-2 flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-1.5 px-1 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            placeholder="Recherche..."
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center justify-center py-1.5 pr-1.5">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Nom, prénom
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Étape
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Téléphone
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((person, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition duration-150 ease-in-out cursor-pointer"
                    onClick={() => openUserPage(person.numeroDossier)}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.userInfo.nom} {person.userInfo.prenom}
                    </td>
                    <td
                      className={`whitespace-nowrap px-3 py-4 text-sm ${getStatusColor(
                        person.etapesInscription?.status?.etapesInscription !==
                          null
                          ? person.etapesInscription?.status?.etapesInscription
                          : ""
                      )}`}
                    >
                      {person.etapesInscription
                        ? capitalizeFirstLetter(
                            person.etapesInscription?.status
                              ?.etapesInscription !== null ||
                              undefined ||
                              ""
                              ? person.etapesInscription?.status
                                  ?.etapesInscription
                              : "en cours de remplissage"
                          )
                        : "En cours de remplissage"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.userInfo.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.date}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                        <span className="sr-only">, {person.userInfo.nom}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nav className="flex justify-between items-center pt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowLongLeftIcon className="h-5 w-5 text-gray-400" />
        </button>
        <div>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`inline-flex items-center rounded-md font-medium text-sm mx-1 ${
                number === currentPage ? "text-green-500" : "text-gray-700"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
        >
          <ArrowLongRightIcon className="h-5 w-5 text-gray-400" />
        </button>
      </nav>
    </div>
  );
}
