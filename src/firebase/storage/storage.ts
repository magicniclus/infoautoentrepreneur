import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase.config"; // Assurez-vous que le chemin est correct

// Modifiez la signature de la fonction pour accepter File | File[]
export async function uploadFiles(
  files: File | File[],
  userId: string,
  dossier: string
): Promise<string | string[]> {
  const processFile = async (file: File): Promise<string> => {
    const fileRef = ref(
      storage,
      `userInscription/${userId}/${dossier}/${file.name}`
    );
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  if (Array.isArray(files)) {
    // Si 'files' est un tableau, traitez chaque fichier et retournez un tableau de URLs
    const uploadPromises = files.map((file) => processFile(file));
    return Promise.all(uploadPromises);
  } else {
    // Si 'files' est un seul fichier, retournez une seule URL
    return processFile(files);
  }
}

export async function listFilesInFolder(
  userId: string,
  folderName: string
): Promise<string[]> {
  const folderRef = ref(storage, `userInscription/${userId}/${folderName}`);
  try {
    const result = await listAll(folderRef);
    return result.items.map((itemRef) => itemRef.fullPath);
  } catch (error) {
    console.error("Failed to list files:", error);
    throw error; // Ou gérer l'erreur comme vous le souhaitez
  }
}

export async function deleteFile(
  userId: string,
  folderName: string,
  fileName: string
): Promise<void> {
  const fileRef = ref(
    storage,
    `userInscription/${userId}/${folderName}/${fileName}`
  );
  try {
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Failed to delete file:", error);
    throw error; // Ou gérer l'erreur comme vous le souhaitez
  }
}

export async function deleteAllFilesInFolder(
  userId: string,
  folderName: string
): Promise<void> {
  const folderRef = ref(storage, `userInscription/${userId}/${folderName}`);
  try {
    const result = await listAll(folderRef);
    const deletePromises = result.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);
    console.log("All files in folder deleted successfully");
  } catch (error) {
    console.error("Failed to delete files in folder:", error);
    throw error; // Ou gérer l'erreur comme vous le souhaitez
  }
}

/**
 * Récupère tous les fichiers dans un dossier spécifié et renvoie leurs URLs.
 * @param {string} userId - L'identifiant de l'utilisateur.
 * @param {string} folderName - Le nom du dossier.
 * @returns {Promise<string[]>} Une promesse qui renvoie un tableau des URLs des fichiers.
 */
export async function getAllFilesInFolder(
  userId: string | null | undefined,
  folderName: string
) {
  const folderRef = ref(storage, `userInscription/${userId}/${folderName}`);
  try {
    const result = await listAll(folderRef);
    const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
    return await Promise.all(urlPromises);
  } catch (error) {
    console.error("Failed to retrieve files:", error);
    throw error; // Ou gérer l'erreur comme vous le souhaitez
  }
}
