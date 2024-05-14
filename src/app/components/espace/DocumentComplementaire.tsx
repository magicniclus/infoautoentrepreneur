/* eslint-disable @next/next/no-img-element */
import {
  deleteAllFilesInFolder,
  deleteFile,
  listFilesInFolder,
  uploadFiles,
} from "@/firebase/storage/storage";
import {
  setConnectedInformationAdresseFiles,
  setConnectedInformationDeclarationFiles,
  setConnectedInformationIdFiles,
  setConnectedInformationPasseportFiles,
} from "@/redux/createUserSlice";
import { RootState } from "@/redux/store";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DownloadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DocumentComplementaire = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    periodeDeDeclaration: "",
    optionVersement: "",
    activiteComplemantaire: "",
    autreActivite: "",
  });

  const userInformation = useSelector<
    RootState,
    { numeroDossier?: string } | undefined
  >((state) => state.createUser.userConnectedInformation);

  const [fileId, setFileId] = useState<File | null>(null);
  const [fileIdError, setIdFileError] = useState<string | null>(null);

  const [filePasseport, setFilePasseport] = useState<File | null>(null);
  const [filePasseportError, setFilePasseportError] = useState<string | null>(
    null
  );

  const [filesAdresse, setFilesAdresse] = useState<File[]>([]);
  const [fileAdresseError, setFileAdresseError] = useState<string | null>(null);

  const [filesDeclaration, setFilesDeclaration] = useState<File[]>([]);
  const [fileDeclarationError, setFileDeclarationError] = useState<
    string | null
  >(null);

  const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

  // useEffect(() => {
  //   if (userInformation?.numeroDossier) {
  //     dispatch(setConnectedInformationIdFiles(filesAdresse));
  //     dispatch(setConnectedInformationPasseportFiles(filePasseport));
  //     dispatch(setConnectedInformationAdresseFiles(filesAdresse));
  //     dispatch(setConnectedInformationDeclarationFiles(filesDeclaration));
  //   }
  // }, [fileId, filePasseport, filesAdresse, filesDeclaration]);

  useEffect(() => {
    const updateFileStates = async () => {
      if (userInformation?.numeroDossier) {
        const idFiles = await getFileNames("id");
        const passeportFiles = await getFileNames("passeport");
        const adresseFiles = await getFileNames("justificatifDeDomicile");
        const declarationFiles = await getFileNames("declarationSurHonneur");

        // Mettre à jour les états des fichiers en fonction des dossiers
        setFileId(
          idFiles.length > 0 ? new File([new Blob()], idFiles[0]) : null
        );
        setFilePasseport(
          passeportFiles.length > 0
            ? new File([new Blob()], passeportFiles[0])
            : null
        );
        setFilesAdresse(
          adresseFiles.map((fileName) => new File([new Blob()], fileName))
        );
        setFilesDeclaration(
          declarationFiles.map((fileName) => new File([new Blob()], fileName))
        );
      }
    };

    updateFileStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformation?.numeroDossier]);

  const getFileNames = async (folder: string) => {
    if (userInformation?.numeroDossier) {
      const files = await listFilesInFolder(
        userInformation.numeroDossier,
        folder
      );
      return files.map((file) => {
        const segments = file.split("/");
        // console.log("segments : " + segments);
        return segments[segments.length - 1];
      });
    }
    return [];
  };

  const handleIdFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.size > maxFileSize) {
      setIdFileError("Le fichier doit être inférieur à 10MB.");
      event.target.value = ""; // Efface le champ de fichier pour permettre une nouvelle sélection
    } else if (file) {
      try {
        userInformation?.numeroDossier ?? "",
          // Effacer les fichiers existants dans le dossier 'id'
          await deleteAllFilesInFolder(
            userInformation?.numeroDossier ?? "",
            "id"
          );

        // Télécharger le nouveau fichier
        const url = await uploadFiles(
          file,
          userInformation?.numeroDossier ?? "",
          "id"
        );

        // Dispatch l'action Redux avec le nom du fichier
        dispatch(setConnectedInformationIdFiles(file.name));
        console.log("File uploaded successfully", url);

        // Mise à jour de l'état local avec le nouveau fichier
        setFileId(file);

        // Réinitialiser l'erreur de fichier
        setIdFileError(null);
      } catch (error) {
        console.error("Failed to upload file", error);
        setIdFileError(
          "Une erreur s'est produite lors du téléchargement du fichier."
        );
      }
    }
  };

  const handleIdDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Pour débogage
  };

  const handleIdDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size <= maxFileSize) {
        try {
          // Suppression de tous les fichiers existants dans le dossier 'id'
          await deleteAllFilesInFolder(
            userInformation?.numeroDossier ?? "",
            "id"
          );

          // Téléchargement du nouveau fichier
          const url = await uploadFiles(
            file,
            userInformation?.numeroDossier ?? "",
            "id"
          );

          // Dispatch de l'action Redux avec le nom du fichier
          dispatch(setConnectedInformationIdFiles(file.name));
          console.log("File uploaded successfully", url);

          // Mise à jour de l'état local avec le nouveau fichier
          setFileId(file);
          setIdFileError(null);
        } catch (error) {
          console.error("Error uploading file", error);
          setIdFileError(
            "Une erreur s'est produite lors du téléchargement du fichier."
          );
        }
      } else {
        setIdFileError("Le fichier doit être inférieur à 10MB.");
      }
    }
  };

  const handlePasseportFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.size > maxFileSize) {
      setFilePasseportError("Le fichier doit être inférieur à 10MB.");
      event.target.value = ""; // Efface le champ de fichier pour permettre une nouvelle sélection
    } else if (file) {
      try {
        await deleteAllFilesInFolder(
          userInformation?.numeroDossier ?? "",
          "passeport"
        );
        const url = await uploadFiles(
          file,
          userInformation?.numeroDossier ?? "",
          "passeport"
        );
        dispatch(setConnectedInformationPasseportFiles(file.name));
        console.log("Passeport file uploaded successfully", url);
        setFilePasseport(file);
        setFilePasseportError(null);
      } catch (error) {
        console.error("Failed to upload passeport file", error);
        setFilePasseportError(
          "Une erreur s'est produite lors du téléchargement du fichier."
        );
      }
    }
  };
  const handlePasseportDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Pour débogage
  };

  const handlePasseportDrop = async (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size <= maxFileSize) {
        try {
          await deleteAllFilesInFolder(
            userInformation?.numeroDossier ?? "",
            "passeport"
          );
          const url = await uploadFiles(
            file,
            userInformation?.numeroDossier ?? "",
            "passeport"
          );
          dispatch(setConnectedInformationPasseportFiles(file.name));
          console.log("Passeport file uploaded successfully", url);
          setFilePasseport(file);
          setFilePasseportError(null);
        } catch (error) {
          console.error("Error uploading passeport file", error);
          setFilePasseportError(
            "Une erreur s'est produite lors du téléchargement du fichier."
          );
        }
      } else {
        setFilePasseportError("Le fichier doit être inférieur à 10MB.");
      }
    }
  };

  const handleAdresseFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = Array.from(event.target.files || []);
    const validFiles = newFiles.filter((file) => file.size <= maxFileSize);
    if (validFiles.length !== newFiles.length) {
      setFileAdresseError("Certains fichiers sont supérieurs à 10MB.");
    } else {
      setFilesAdresse((prevFiles) => {
        // Cette approche remplace les fichiers précédents par les nouveaux jusqu'à un maximum de trois fichiers
        const updatedFiles = [...prevFiles, ...validFiles].slice(0, 3);
        return updatedFiles.length > 3
          ? updatedFiles.slice(0, 3)
          : updatedFiles;
      });

      // Upload des fichiers valides
      if (validFiles.length > 0 && userInformation?.numeroDossier) {
        uploadFiles(
          validFiles,
          userInformation.numeroDossier,
          "justificatifDeDomicile"
        )
          .then((urls) => {
            console.log("Files uploaded successfully", urls);
            // Faire quelque chose avec les URLs, par exemple les stocker dans un état ou une base de données
          })
          .catch((error) => {
            console.error("Failed to upload files:", error);
            // Gérer l'erreur selon vos besoins
          });
      }

      setFileAdresseError(null);
    }
    event.target.value = ""; // Réinitialiser l'input pour permettre la ré-sélection des mêmes fichiers
  };

  const handleAdresseDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleAdresseDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    const validFiles = newFiles.filter((file) => file.size <= maxFileSize);
    if (validFiles.length !== newFiles.length) {
      setFileAdresseError("Certains fichiers sont supérieurs à 10MB.");
    } else {
      setFilesAdresse((prevFiles) => {
        // Assurer de ne pas dépasser trois fichiers en total
        const updatedFiles = [...prevFiles, ...validFiles].slice(0, 3);
        return updatedFiles.length > 3
          ? updatedFiles.slice(0, 3)
          : updatedFiles;
      });

      // Upload des fichiers valides
      if (validFiles.length > 0 && userInformation?.numeroDossier) {
        uploadFiles(
          validFiles,
          userInformation.numeroDossier,
          "justificatifDeDomicile"
        )
          .then((urls) => {
            console.log("Files uploaded successfully", urls);
            // Faire quelque chose avec les URLs, par exemple les stocker dans un état ou une base de données
          })
          .catch((error) => {
            console.error("Failed to upload files:", error);
            // Gérer l'erreur selon vos besoins
          });
      }

      setFileAdresseError(null);
    }
  };

  const handleDeclarationFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = Array.from(event.target.files || []);
    const validFiles = newFiles.filter((file) => file.size <= maxFileSize);
    if (validFiles.length !== newFiles.length) {
      setFileDeclarationError("Certains fichiers sont supérieurs à 10MB.");
    } else {
      setFilesDeclaration((prev) => [
        ...prev,
        ...validFiles.slice(0, 3 - prev.length),
      ]);

      // Upload des fichiers valides
      if (validFiles.length > 0 && userInformation?.numeroDossier) {
        uploadFiles(
          validFiles,
          userInformation.numeroDossier,
          "declarationSurHonneur"
        )
          .then((urls) => {
            console.log("Files uploaded successfully", urls);
            // Faire quelque chose avec les URLs, par exemple les stocker dans un état ou une base de données
          })
          .catch((error) => {
            console.error("Failed to upload files:", error);
            // Gérer l'erreur selon vos besoins
          });
      }

      setFileDeclarationError(null);
    }
    event.target.value = ""; // Réinitialiser l'input pour permettre la ré-sélection des mêmes fichiers
  };

  const handleDeclarationDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    const validFiles = newFiles.filter((file) => file.size <= maxFileSize);
    if (validFiles.length !== newFiles.length) {
      setFileDeclarationError("Certains fichiers sont supérieurs à 10MB.");
    } else {
      setFilesDeclaration((prevFiles) => {
        // Assurer de ne pas ajouter plus de 3 fichiers
        return [...prevFiles.slice(0, 3 - validFiles.length), ...validFiles];
      });

      // Upload des fichiers valides
      if (validFiles.length > 0 && userInformation?.numeroDossier) {
        uploadFiles(
          validFiles,
          userInformation.numeroDossier,
          "declarationSurHonneur"
        )
          .then((urls) => {
            console.log("Files uploaded successfully", urls);
            // Faire quelque chose avec les URLs, par exemple les stocker dans un état ou une base de données
          })
          .catch((error) => {
            console.error("Failed to upload files:", error);
            // Gérer l'erreur selon vos besoins
          });
      }
    }
  };

  const handleDeclarationDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault(); // Ceci est nécessaire pour permettre le dépôt
  };

  const downloadFile = (href: string, download: string) => {
    const link = document.createElement("a");
    link.href = href;
    link.download = download;
    link.click();
  };

  const handleRemoveDelcarationFile = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
    const fileToDelete = filesDeclaration[index];
    const fileName = fileToDelete.name; // Assurez-vous que le fichier contient une propriété 'name' ou ajustez en conséquence

    // Supprimer le fichier du stockage
    try {
      if (userInformation?.numeroDossier && fileName) {
        await deleteFile(
          userInformation?.numeroDossier,
          "declarationSurHonneur",
          fileName
        );
      }
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Failed to delete file:", error);
      // Gérer l'erreur selon vos besoins
    }

    // Mettre à jour l'état en supprimant le fichier du tableau des fichiers
    setFilesDeclaration((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveAdresseFile = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
    const fileToDelete = filesAdresse[index];
    const fileName = fileToDelete.name; // Assurez-vous que le fichier contient une propriété 'name' ou ajustez en conséquence

    // Supprimer le fichier du stockage
    try {
      if (userInformation?.numeroDossier && fileName) {
        await deleteFile(
          userInformation?.numeroDossier,
          "justificatifDeDomicile",
          fileName
        );
      }
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Failed to delete file:", error);
      // Gérer l'erreur selon vos besoins
    }

    // Mettre à jour l'état en supprimant le fichier du tableau des fichiers
    setFilesAdresse((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (filesAdresse.length > 0) {
      dispatch(setConnectedInformationAdresseFiles(true));
    } else dispatch(setConnectedInformationAdresseFiles(false));
    if (filesDeclaration.length > 0) {
      dispatch(setConnectedInformationDeclarationFiles(true));
    } else dispatch(setConnectedInformationDeclarationFiles(false));
    getFileNames("id")
      .then((files) => {
        dispatch(setConnectedInformationIdFiles(files[0]));
      })
      .catch((error) => {
        dispatch(setConnectedInformationIdFiles(""));
      });

    getFileNames("passeport")
      .then((files) => {
        dispatch(setConnectedInformationPasseportFiles(files));
      })
      .catch((error) => {
        dispatch(setConnectedInformationPasseportFiles(""));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesAdresse, filesDeclaration]);

  return (
    <section className="w-full mt-7 flex flex-col justify-between">
      <form>
        <div className="col-span-full bg-slate-50 p-4 rounded-md">
          <label
            htmlFor="id-file-upload"
            className="block text-sm font-medium leading-6 text-slate-700"
          >
            Carte d&apos;identité (recto / verso)
          </label>
          <div
            onDragOver={handleIdDragOver}
            onDrop={handleIdDrop}
            className={`mt-2 flex justify-center rounded-md border ${
              fileId
                ? "border-green-700/70"
                : "border-dashed border-slate-700/50"
            } px-6 py-10 relative`}
          >
            {fileId && (
              <div className="absolute top-5 right-5 rounded-full bg-white h-5 w-5 flex justify-center items-center border-green-700">
                <CheckIcon className="h-4 w-4 text-green-700" />
              </div>
            )}
            <div className="text-center">
              <PhotoIcon
                className={`mx-auto h-12 w-12 ${
                  fileId ? "text-green-700" : "text-gray-300"
                }`}
                aria-hidden="true"
              />
              <div className="mt-4 flex flex-col text-sm leading-6 text-slate-700">
                <label
                  htmlFor="id-file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-green-700 hover:text-green-600"
                >
                  <span>
                    {fileId ? (
                      <span>
                        Fichier sélectionné :{" "}
                        <span className="text-slate-500">{fileId.name}</span>
                      </span>
                    ) : (
                      "Ajouter mon fichier"
                    )}
                  </span>
                  <input
                    id="id-file-upload"
                    name="file-upload-id"
                    type="file"
                    className="sr-only"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={handleIdFileChange}
                  />
                </label>
                <div>
                  {fileId instanceof Blob ? null : (
                    <p className="pl-1">ou glisser déposer</p>
                  )}
                </div>
                {fileIdError && (
                  <p className="text-xs text-red-600">{fileIdError}</p>
                )}
                {fileId instanceof Blob ? null : (
                  <p className="text-xs leading-5 text-slate-700">
                    PNG, JPG, GIF max 10MB
                  </p>
                )}
              </div>
              {fileIdError && (
                <p className="text-xs text-red-600">{fileIdError}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border rounded-md p-4 border-orange-500 mt-5 bg-orange-500/5">
              <p className="text-orange-500 text-xs">
                Comme montré dans l&apos;exemple suivant, assurez-vous que la
                copie de ce document inclut les deux faces de votre pièce
                d&apos;identité. Elle doit également être datée, signée et
                porter la mention &apos;conforme à l&apos;original&apos;.
              </p>
            </div>
            <img
              src="/images/id.png"
              alt="Exemple de carte d'identité"
              className="mt-5 md:w-2/6 w-full mx-auto"
            />
          </div>
        </div>
        <div className="flex items-center justify-center text-slate-700/50 text-xs mt-16">
          <div className="w-[30%] h-0.5 bg-slate-700/50"></div>
          <span className="mx-5">OU</span>
          <div className="w-[30%] h-0.5 bg-slate-700/50"></div>
        </div>
        <div className="col-span-full mt-16 bg-slate-50 p-4 rounded-md">
          <label
            htmlFor="passport-file-upload"
            className="block text-sm font-medium leading-6 text-slate-700"
          >
            Passeport
          </label>
          <div
            className={`mt-2 flex justify-center rounded-md border ${
              filePasseport
                ? "border-green-700/70"
                : "border-dashed border-slate-700/50"
            } px-6 py-10 relative`}
            onDragOver={handlePasseportDragOver}
            onDrop={handlePasseportDrop}
          >
            {filePasseport && (
              <div className="absolute top-5 right-5 rounded-full bg-white h-5 w-5 flex justify-center items-center border-green-700">
                <CheckIcon className="h-4 w-4 text-green-700" />
              </div>
            )}
            <div className="text-center">
              <PhotoIcon
                className={`mx-auto h-12 w-12 ${
                  filePasseport ? "text-green-700" : "text-gray-300"
                }`}
                aria-hidden="true"
              />
              <div className="mt-4 flex flex-col text-sm leading-6 text-slate-700">
                <label
                  htmlFor="passport-file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-green-700 hover:text-green-600"
                >
                  <span>
                    {filePasseport ? (
                      <span>
                        Fichier sélectionné :{" "}
                        <span className="text-slate-500">
                          {filePasseport.name}
                        </span>
                      </span>
                    ) : (
                      "Ajouter mon fichier"
                    )}
                  </span>
                  <input
                    id="passport-file-upload"
                    name="file-upload-passport"
                    type="file"
                    className="sr-only"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={handlePasseportFileChange}
                  />
                </label>
                <div>
                  {filePasseport instanceof Blob ? null : (
                    <p className="pl-1">ou glisser déposer</p>
                  )}
                </div>
                {filePasseportError && (
                  <p className="text-xs text-red-600">{filePasseportError}</p>
                )}
                {filePasseport instanceof Blob ? null : (
                  <p className="text-xs leading-5 text-slate-700">
                    PNG, JPG, GIF max 10MB
                  </p>
                )}
              </div>
              {filePasseportError && (
                <p className="text-xs text-red-600">{filePasseportError}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border rounded-md p-4 border-orange-500 mt-5 bg-orange-500/5">
              <p className="text-orange-500 text-xs">
                Comme illustré ci-dessous, assurez-vous que la copie de ce
                document inclut la page principale de votre passeport. Elle doit
                également être datée, signée et indiquer &apos;conforme à
                l&apos;original&apos;
              </p>
            </div>
            <img
              src="/images/passport.png"
              alt="Exemple de passeport"
              className="mt-5 md:w-2/6 w-full mx-auto"
            />
          </div>
        </div>
        <div className="col-span-full mt-16 bg-slate-50 p-4 rounded-md">
          <label
            htmlFor="adresse-file-upload"
            className="block text-sm font-medium leading-6 text-slate-700"
          >
            Justificatif de domicile
          </label>
          <div
            className={`mt-2 flex justify-center rounded-md border relative ${
              filesAdresse.length > 0
                ? "border-green-700/70"
                : "border-dashed border-slate-700/50"
            } px-6 py-10 relative`}
            onDragOver={handleAdresseDragOver}
            onDrop={handleAdresseDrop}
          >
            {filesAdresse.length > 0 && (
              <div className="absolute top-5 right-5 rounded-full bg-white h-5 w-5 flex justify-center items-center border-green-700">
                <CheckIcon className="h-4 w-4 text-green-700" />
              </div>
            )}
            <div className="text-center">
              <PhotoIcon
                className={`mx-auto h-12 w-12 ${
                  filesAdresse.length > 0 ? "text-green-700" : "text-gray-300"
                }`}
                aria-hidden="true"
              />
              <div className="mt-4 flex flex-col items-center">
                {filesAdresse.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {file.name}
                    </span>
                    <button
                      onClick={(e) => handleRemoveAdresseFile(e, index)}
                      className="rounded-full bg-slate-500 p-1 text-white"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="mt-4 flex items-center flex-col text-sm leading-6 text-slate-700">
                  {filesAdresse.length < 3 && (
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-green-700 hover:text-green-600">
                      <span>Ajouter mes fichiers (maximum 3)</span>
                      <input
                        id="adresse-file-upload"
                        name="file-upload-adresse"
                        type="file"
                        className="sr-only"
                        accept=".png, .jpg, .jpeg, .gif"
                        multiple
                        onChange={handleAdresseFileChange}
                      />
                    </label>
                  )}
                  {filesAdresse.length === 0 && (
                    <p className="pl-1 mt-2 leading-5 text-slate-700">
                      ou glisser déposer
                    </p>
                  )}
                </div>
                {fileAdresseError && (
                  <p className="text-xs text-red-600">{fileAdresseError}</p>
                )}
                {filesAdresse.length > 0 ? null : (
                  <p className="text-xs leading-5 text-slate-700">
                    PNG, JPG, GIF max 10MB
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border rounded-md p-4 border-orange-500 mt-5 bg-orange-500/5">
              <div className="text-orange-500 text-xs">
                Merci de fournir un document daté de moins de 3 mois prouvant
                l&apos;adresse de votre activité. Vous pouvez choisir parmi les
                documents suivants :
                <ul className="list-decimal">
                  <li>Facture d&apos;eau</li>
                  <li>Facture de gaz</li>
                  <li>Facture d&apos;électricité</li>
                  <li>Facture d&apos;internet</li>
                  <li>
                    Facture de téléphone fixe (les factures de téléphone mobile
                    ne sont pas acceptées)
                  </li>
                  <li>Attestation d&apos;assurance habitation</li>
                </ul>
                <br />
                Si vous résidez chez un hébergeur, les documents suivants sont
                obligatoirement à joindre :
                <ul className="list-decimal">
                  <li>
                    Justificatif de domicile récent (moins de 3 mois) au nom de
                    l&apos;hébergeant
                  </li>
                  <li>Attestation d&apos;hébergement signée et datée</li>
                  <li>
                    Copie recto verso de la pièce d&apos;identité de
                    l&apos;hébergeant
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative  md:w-2/6 w-full mx-auto">
              <DownloadIcon
                className="h-6 w-6 text-slate-700 absolute bottom-5 right-5 z-20 cursor-pointer"
                onClick={(e) =>
                  downloadFile(
                    "/documents/attestation_hebergement.pdf",
                    "attestation_hebergement.pdf"
                  )
                }
              />
              <img
                src="/images/adresse.png"
                alt="Exemple D'attestation d'hebergement"
                className="mt-5 z-0 w-full"
              />
            </div>
          </div>
        </div>
        <div className="col-span-full mt-16 bg-slate-50 p-4 rounded-md">
          <label
            htmlFor="declaration-file-upload"
            className="block text-sm font-medium leading-6 text-slate-700"
          >
            Declaration sur l&apos;honneur de non condamnation
          </label>
          <div
            className={`mt-2 flex justify-center rounded-md border relative ${
              filesDeclaration.length > 0
                ? "border-green-700/70"
                : "border-dashed border-slate-700/50"
            } px-6 py-10 relative`}
            onDragOver={handleDeclarationDragOver}
            onDrop={handleDeclarationDrop}
          >
            {filesDeclaration.length > 0 && (
              <div className="absolute top-5 right-5 rounded-full bg-white h-5 w-5 flex justify-center items-center border-green-700">
                <CheckIcon className="h-4 w-4 text-green-700" />
              </div>
            )}
            <div className="text-center">
              <PhotoIcon
                className={`mx-auto h-12 w-12 ${
                  filesDeclaration.length > 0
                    ? "text-green-700"
                    : "text-gray-300"
                }`}
                aria-hidden="true"
              />
              <div className="mt-4 flex flex-col items-center">
                {filesDeclaration.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {file.name}
                    </span>
                    <button
                      onClick={(e) => handleRemoveDelcarationFile(e, index)}
                      className="rounded-full bg-slate-500 p-1 text-white"
                    >
                      <XMarkIcon className="h-4 w-4" />{" "}
                      {/* Assuming you have <CloseIcon /> defined */}
                    </button>
                  </div>
                ))}
                <div className="mt-4 flex items-center flex-col text-sm leading-6 text-slate-700">
                  {filesDeclaration.length < 3 && ( // S'assurer que cela ne s'affiche que si moins de trois fichiers sont chargés
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-green-700 hover:text-green-600">
                      <span>Ajouter mes fichiers (maximum 3)</span>
                      <input
                        id="declaration-file-upload"
                        name="file-upload-declaration"
                        type="file"
                        className="sr-only"
                        accept=".png, .jpg, .jpeg, .gif"
                        multiple
                        onChange={handleDeclarationFileChange}
                      />
                    </label>
                  )}
                  <div>
                    {filesDeclaration.length === 0 && (
                      <p className="pl-1 mt-2 leading-5 text-slate-700">
                        ou glisser déposer
                      </p>
                    )}
                  </div>
                  {fileDeclarationError && (
                    <p className="text-xs text-red-600">
                      {fileDeclarationError}
                    </p>
                  )}
                </div>
                {filesDeclaration.length > 0 ? null : (
                  <p className="text-xs leading-5 text-slate-700">
                    PNG, JPG, GIF max 10MB
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border rounded-md p-4 border-orange-500 mt-5 bg-orange-500/5">
              <p className="text-orange-500 text-xs">
                N&apos;oubliez pas de signer le document une fois complété, en
                privilégiant une signature manuscrite. Veuillez également
                renseigner votre adresse complète ainsi que tous vos prénoms,
                dans l&apos;ordre d&apos;apparition sur votre pièce
                d&apos;identité.
                <br />
                <br />
              </p>
              <div className="text-orange-500 text-xs">
                La copie de ce document doit respecter les exigences suivantes :
                <ul className="list-decimal">
                  <li>Doit être signée de façon manuscrite (de préférence)</li>
                  <li>
                    Doit contenir l&apos;ensemble de vos prénoms dans
                    l&apos;ordre
                  </li>
                  <li>
                    Doit contenir l&apos;adresse complète de votre domicile
                  </li>
                  <li>Doit contenir le nom de naissance de votre mère</li>
                </ul>
              </div>
            </div>
            <div className="relative  md:w-2/6 w-full mx-auto">
              <DownloadIcon
                className="h-6 w-6 text-slate-700 absolute bottom-5 right-5 z-20 cursor-pointer"
                onClick={(e) =>
                  downloadFile(
                    "/documents/declaration.pdf",
                    "declaration_de_non_condamnation.pdf"
                  )
                }
              />
              <img
                src="/images/declaration.png"
                alt="Exemple de déclaration de non condamnation"
                className="mt-5 z-0 w-full"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default DocumentComplementaire;
