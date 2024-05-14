"use client";

import {
  ajouterOuMettreAJourUtilisateur,
  recupererElementsDossierUser,
} from "@/firebase/database/database";
import { getAllFilesInFolder } from "@/firebase/storage/storage";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DescriptionList = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [data, setData] = useState<any | {}>(null);

  const [carteIdentite, setCarteIdentite] = useState<string[]>([]);
  const [passeport, setPasseport] = useState<string[]>([]);
  const [declarationSurLhonneur, setDeclarationSurLhonneur] = useState<
    string[]
  >([]);
  const [justificatifDomicile, setJustificatifDomicile] = useState<string[]>(
    []
  );

  const [commantaire, setCommantaire] = useState<string>(
    data?.commantaire || ""
  );

  const [commantaireIsUpdate, setCommantaireIsUpdate] =
    useState<boolean>(false);

  const [commantaireUtilisateur, setCommantaireUtilisateur] = useState<string>(
    data?.commantaireUtilisateur || ""
  );

  const [commantaireUtilisateurIsUpdate, setCommantaireUtilisateurIsUpdate] =
    useState<boolean>(false);

  const [etapeValue, setEtapeValue] = useState<string>(
    data?.etapesInscription?.status?.etapesInscription ||
      "en cours de remplissage"
  );

  useEffect(() => {
    recupererElementsDossierUser(id).then((data) => {
      setData(data);
    });

    getAllFilesInFolder(id, "id").then((result) => {
      setCarteIdentite((value) => [...value, ...result]);
    });
    getAllFilesInFolder(id, "passeport").then((result) => {
      setPasseport((value) => [...value, ...result]);
    });
    getAllFilesInFolder(id, "declarationSurHonneur").then((result) => {
      setDeclarationSurLhonneur((value) => [...value, ...result]);
    });
    getAllFilesInFolder(id, "justificatifDeDomicile").then((result) => {
      setJustificatifDomicile((value) => [...value, ...result]);
    });
  }, [id]);

  useEffect(() => {
    data?.commantaire?.commantaire &&
      setCommantaire(data.commantaire.commantaire);

    data?.alert?.commantaire &&
      setCommantaireUtilisateur(data.alert.commantaire);
  }, [data?.commantaire?.commantaire, data?.alert?.commantaire]);

  useEffect(() => {
    const newStatus = data?.etapesInscription?.status?.etapesInscription;
    if (newStatus) {
      setEtapeValue(newStatus);
    } else {
      setEtapeValue("en cours de remplissage"); // Valeur par défaut si non défini
    }
  }, [data?.etapesInscription?.status]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  function downloadFile(file: string, name: string) {
    if (!file) {
      console.error("URL du fichier manquante");
      return;
    }

    // Créer un élément anchor (lien) pour le téléchargement
    const link = document.createElement("a");
    link.href = file; // URL du fichier à télécharger
    link.download = name; // Nom du fichier, ou un nom par défaut
    document.body.appendChild(link);
    link.click(); // Simule un clic sur le lien pour déclencher le téléchargement
    document.body.removeChild(link); // Nettoie en enlevant l'élément du DOM
  }

  const handleCommantaire = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    ajouterOuMettreAJourUtilisateur(id || "", "commantaire", {
      commantaire: commantaire,
    })
      .then(() => {
        setCommantaireIsUpdate(true);
        setTimeout(() => {
          setCommantaireIsUpdate(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du commantaire", error);
        setCommantaireIsUpdate(false);
      });
  };

  const handleCommantaireUtilisateur = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    ajouterOuMettreAJourUtilisateur(id || "", "alert", {
      commantaire: commantaireUtilisateur,
    })
      .then(() => {
        fetch("/api/sendEmailForAlertModification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.userInfo.email,
          }),
        })
          .then((response) => {
            console.log("Email sent successfully:", response);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
        setCommantaireUtilisateurIsUpdate(true);
        setTimeout(() => {
          setCommantaireUtilisateurIsUpdate(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du commantaire", error);
        setCommantaireUtilisateurIsUpdate(false);
      });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEtapeValue(e.target.value);
    ajouterOuMettreAJourUtilisateur(id || "", "etapesInscription/status", {
      etapesInscription: e.target.value,
    });
  };

  if (isLoading)
    return (
      <div className="w-screen h-[100vh] flex items-center justify-center animate-pulse text-slate-500 font-bold">
        Loading...
      </div>
    );

  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Dossier utilisateur: {capitalizeFirstLetter(data?.userInfo.prenom)}{" "}
          {data?.userInfo.nom.toUpperCase()}
        </h3>
        <p className="max-w-2xl mt-3 text-sm leading-6 text-gray-500">
          Date de création de dossier{" "}
          <span className="font-semibold">{data?.date}</span>
        </p>
        <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">
          Dossier{" "}
          <span className="font-semibold">n°{data?.userInfo.dossierId}</span>
        </p>
        <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-500">
          Id utilisateur{" "}
          <span className="font-semibold">n°{data?.numeroDossier}</span>
        </p>
        <select
          className={`mt-4 text-sm border border-gray-900 rounded-md px-2 p-1 ${
            etapeValue === "Refusé"
              ? "bg-red-100"
              : etapeValue === "en cours de traitement"
              ? "bg-yellow-100"
              : etapeValue === "dossier complété et validé"
              ? "bg-green-100"
              : "bg-blue-100"
          }`}
          onChange={handleSelect}
          value={etapeValue}
        >
          <option value="en cours de remplissage">
            En cours de remplissage
          </option>
          <option value="en cours de traitement">En cours de traitement</option>
          <option value="dossier complété et validé">
            Dossier complété et validé
          </option>
          <option value="Refusé">Refusé</option>
        </select>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Information */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-semibold leading-6 text-gray-900 text-md">
              Informations utilisateur
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nom</dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userInfo.nom.toUpperCase()}
              </span>
              <span className="flex-shrink-0 ml-4">
                {/* <button
                  type="button"
                  className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                >
                  Update
                </button> */}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Prenom
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {capitalizeFirstLetter(data?.userInfo?.prenom || "")}
              </span>
              <span className="flex-shrink-0 ml-4">
                {/* <button
                  type="button"
                  className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                >
                  Update
                </button> */}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Autre prénom
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {capitalizeFirstLetter(data?.information?.prenom1 || "")}
                {data?.information?.prenom2 ??
                  ", " +
                    capitalizeFirstLetter(data?.information?.prenom2 || "")}
              </span>
              <span className="flex-shrink-0 ml-4">
                {/* <button
                  type="button"
                  className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                >
                  Update
                </button> */}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Sexe
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{data?.userInfo?.sexe || ""}</span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{data?.userInfo?.email || ""}</span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Téléphone
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userInfo?.telephone || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Département
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userInfo?.departement || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Nationnalité
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {capitalizeFirstLetter(data?.userInfo?.nationnalite || "")}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Pays de naissance
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userInfo?.paysDeNaissance || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          {data?.userInfo?.paysDeNaissanceEtranger && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Pays de naissance étranger
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {data?.userInfo?.paysDeNaissanceEtranger || ""}
                </span>
                <span className="flex-shrink-0 ml-4"></span>
              </dd>
            </div>
          )}

          {data?.userInfo?.villeDeNaissance && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Pays de naissance étranger
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {data?.userInfo?.villeDeNaissance || ""}
                </span>
                <span className="flex-shrink-0 ml-4"></span>
              </dd>
            </div>
          )}
          {data?.userInfo?.villeDeNaissance && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Pays de naissance étranger
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {data?.userInfo?.villeDeNaissance || ""}
                </span>
                <span className="flex-shrink-0 ml-4"></span>
              </dd>
            </div>
          )}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              N° de sécurité sociale
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.information?.securiteSociale}
              </span>
              <span className="flex-shrink-0 ml-4">
                {/* <button
                  type="button"
                  className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                >
                  Update
                </button> */}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Situation matrimonial
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.information?.situationMatrimonial}
              </span>
              <span className="flex-shrink-0 ml-4">
                {/* <button
                  type="button"
                  className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                >
                  Update
                </button> */}
              </span>
            </dd>
          </div>
          {/* Activite */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-semibold leading-6 text-gray-900 text-md">
              Activité(s)
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Activité principale
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userActivite?.activitePrincipale || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Detail de l&apos;activité principale
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userActivite?.activite || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          {data?.userActivite?.activiteDetail && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Detail
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {data?.userActivite?.activiteDetail || ""}
                </span>
                <span className="flex-shrink-0 ml-4"></span>
              </dd>
            </div>
          )}
          {data?.userActivite?.categorie && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Catégorie
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {data?.userActivite?.categorie || ""}
                </span>
                <span className="flex-shrink-0 ml-4"></span>
              </dd>
            </div>
          )}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Date de début d&apos;activité souhaitée
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userActivite?.debutActivite || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Acitivité de non salarié deja exercée ?
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userActivite?.activiteNonSalarie || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Options du versement libératoire de l&apos;impôt sur le revenu
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.entrepriseEtInformation?.optionVersement || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Périodicité de vos déclarations de chiffre d&apos;affaires
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.entrepriseEtInformation?.periodeDeDeclaration || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Autre activité
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.entrepriseEtInformation?.activiteComplemantaire || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          {data?.userActivite?.nomCommercial && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Nom commercial
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {data?.userActivite?.nomCommercial || ""}
                </span>
                <span className="flex-shrink-0 ml-4"></span>
              </dd>
            </div>
          )}

          {/* Adresse */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-semibold leading-6 text-gray-900 text-md">
              Adresse
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Adresse de l&apos;utilisateur
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userInfoAdresse?.adresse || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Complement d&apos;adresse
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.userInfoAdresse?.complementAdresse || ""}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Adresse professionelle
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {data?.adresseProfessionelle?.adresse || "Aucune"}
              </span>
              <span className="flex-shrink-0 ml-4"></span>
            </dd>
          </div>
          {data?.adresseProfessionelle?.adresse && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Complement d&apos;adresse professionelle
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {data?.adresseProfessionelle?.complementAdresse || "Aucune"}
                </span>
                <span className="flex-shrink-0 ml-4"></span>
              </dd>
            </div>
          )}
          {data?.adresseProfessionelle?.adresse && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Type d&apos;adresse professionelle
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {data?.adresseProfessionelle?.typeAdresse}
                </span>
                <span className="flex-shrink-0 ml-4"></span>
              </dd>
            </div>
          )}
          {/* Documents */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-semibold leading-6 text-gray-900 text-md">
              Documents
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Carte identité et/ou passeport
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="border border-gray-200 divide-y divide-gray-100 rounded-md"
              >
                {Array.from(new Set(carteIdentite)).map((file, index) => (
                  <li
                    key={`ci-${index}`}
                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                  >
                    <div className="flex items-center flex-1 w-0">
                      <PaperClipIcon
                        className="flex-shrink-0 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="flex flex-1 min-w-0 gap-2 ml-4">
                        <span className="font-medium truncate">
                          Carte d&apos;identité{" "}
                          {/* Dynamically displaying file name */}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 ml-4 space-x-4">
                      <button
                        type="button"
                        className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                        onClick={() =>
                          downloadFile(file, `carte_identite_${id}`)
                        } // Assuming you have a downloadFile method
                      >
                        Télécharger
                      </button>
                    </div>
                  </li>
                ))}
                {Array.from(new Set(passeport)).map((file, index) => (
                  <li
                    key={`ps-${index}`}
                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                  >
                    <div className="flex items-center flex-1 w-0">
                      <PaperClipIcon
                        className="flex-shrink-0 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="flex flex-1 min-w-0 gap-2 ml-4">
                        <span className="font-medium truncate">
                          Passeport {/* Dynamically displaying file name */}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 ml-4 space-x-4">
                      <button
                        type="button"
                        className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                        onClick={() =>
                          downloadFile(file, `carte_identite_${id}`)
                        } // Assuming you have a downloadFile method
                      >
                        Télécharger
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Déclaration sur l&apos;honneur de non-condamnation
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="border border-gray-200 divide-y divide-gray-100 rounded-md"
              >
                {Array.from(new Set(declarationSurLhonneur)).map(
                  (file, index) => (
                    <li
                      key={`ci-${index}`}
                      className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                    >
                      <div className="flex items-center flex-1 w-0">
                        <PaperClipIcon
                          className="flex-shrink-0 w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="flex flex-1 min-w-0 gap-2 ml-4">
                          <span className="font-medium truncate">
                            Déclaration sur l&apos;honneur de non-condamnation{" "}
                            {/* Dynamically displaying file name */}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 ml-4 space-x-4">
                        <button
                          type="button"
                          className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                          onClick={() =>
                            downloadFile(
                              file,
                              `declaration_de_non_condamnation_${id}`
                            )
                          } // Assuming you have a downloadFile method
                        >
                          Télécharger
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Justificatif de domicile
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="border border-gray-200 divide-y divide-gray-100 rounded-md"
              >
                {Array.from(new Set(justificatifDomicile)).map(
                  (file, index) => (
                    <li
                      key={`ci-${index}`}
                      className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                    >
                      <div className="flex items-center flex-1 w-0">
                        <PaperClipIcon
                          className="flex-shrink-0 w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="flex flex-1 min-w-0 gap-2 ml-4">
                          <span className="font-medium truncate">
                            Justificatif de domicile{" "}
                            {/* Dynamically displaying file name */}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 ml-4 space-x-4">
                        <button
                          type="button"
                          className="font-medium text-green-600 bg-white rounded-md hover:text-green-500"
                          onClick={() =>
                            downloadFile(file, `justificatif_de_domicile_${id}`)
                          } // Assuming you have a downloadFile method
                        >
                          Télécharger
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-semibold leading-6 text-gray-900 text-md">
              Commantaires
              <br />
              <span className="text-xs font-normal text-gray-600">
                (ce commantaire sera visible uniquement par vous ou par les
                autre collaborateurs)
              </span>
            </dt>
            <dd className="flex flex-col items-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <textarea
                className="w-full h-32 p-2 border border-gray-200 rounded-md"
                defaultValue={
                  typeof commantaire === "string"
                    ? commantaire
                    : JSON.stringify(commantaire)
                }
                onChange={(e) => setCommantaire(e.target.value)}
              ></textarea>
              <button
                type="button"
                className="px-4 py-2 mt-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500"
                onClick={handleCommantaire}
              >
                envoyer
              </button>
              <p className="mt-3 text-xs text-green-500">
                {commantaireIsUpdate ? "Commantaire envoyé avec succès" : ""}
              </p>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-semibold leading-6 text-gray-900 text-md">
              Commantaire pour utilisateur <br />
              <span className="text-xs font-normal text-red-500">
                (ce commantaire sera envoyé par email et sera visible par
                l&apos;utilisateur)
              </span>
            </dt>
            <dd className="flex flex-col items-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <textarea
                className="w-full h-32 p-2 border border-gray-200 rounded-md"
                defaultValue={
                  typeof commantaireUtilisateur === "string"
                    ? commantaireUtilisateur
                    : JSON.stringify(commantaireUtilisateur)
                }
                onChange={(e) => setCommantaireUtilisateur(e.target.value)}
              ></textarea>

              <button
                type="button"
                className="px-4 py-2 mt-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500"
                onClick={handleCommantaireUtilisateur}
              >
                envoyer
              </button>
              <p className="mt-3 text-xs text-green-500">
                {commantaireUtilisateurIsUpdate
                  ? "Commantaire envoyé avec succès"
                  : ""}
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default DescriptionList;
