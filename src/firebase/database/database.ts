import { getAuth } from "firebase/auth";
import {
  DatabaseReference,
  get,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { database } from "../firebase.config";

export const ajouterUtilisateurDansDossier = async (
  dossier: string,
  dossierId: string,
  nom: string,
  prenom: string,
  email: string
): Promise<void> => {
  const dossierRef = ref(
    database,
    `/users/prospects/brouillonInscription/${dossierId}`
  );

  // Obtenir la date actuelle et la formatter avec des zéros devant les jours et les mois < 10
  // et inclure l'heure
  const date = new Date();
  const formattedDate =
    [
      date.getDate().toString().padStart(2, "0"),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getFullYear(),
    ].join("/") +
    " " +
    [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ].join(":");

  // Ajout des informations dans Firebase
  await set(dossierRef, {
    nom,
    prenom,
    email,
    numeroDossier: dossierId,
    // Ajout de la date et de l'heure au format français
    date: formattedDate,
  });
};

export const ajouterModificationUtilisateur = async (
  dossier: string,
  dossierId: string,
  email: string,
  siret: string,
  typeDeModification: string
): Promise<void> => {
  const dossierRef = ref(
    database,
    `/users/prospects/brouillonModification/${dossierId}`
  );

  const date = new Date();
  const formattedDate =
    [
      date.getDate().toString().padStart(2, "0"),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getFullYear(),
    ].join("/") +
    " " +
    [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ].join(":");

  await set(dossierRef, {
    email,
    siret,
    typeDeModification,
    numeroDossier: dossierId,
    date: formattedDate,
  });
};

export const ajouterCessionUtilisateur = async (
  dossier: string,
  dossierId: string,
  email: string,
  siret: string
): Promise<void> => {
  const dossierRef = ref(
    database,
    `/users/prospects/brouillonCession/${dossierId}`
  );

  const date = new Date();
  const formattedDate =
    [
      date.getDate().toString().padStart(2, "0"),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getFullYear(),
    ].join("/") +
    " " +
    [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ].join(":");

  await set(dossierRef, {
    email,
    siret,
    numeroDossier: dossierId,
    date: formattedDate,
  });
};

export const CheckIfUserExists = async (
  email: string,
  dossier: string
): Promise<boolean> => {
  try {
    const userRef = ref(
      database,
      `/users/prospects/${!dossier ? "brouillonInscription" : dossier}`
    );
    const snapshot = await get(userRef);
    const users = snapshot.val();
    console.log("users", users); // Pour déboguer et voir ce qui est récupéré de Firebase
    if (!users) return false;

    // Utilisation de la comparaison insensible à la casse pour les e-mails
    const user = Object.values(users).find(
      (user: any) => user.email.toLowerCase() === email.toLowerCase()
    );
    return !!user; // Renvoie true si un utilisateur est trouvé, sinon false
  } catch (error) {
    console.error("Failed to check if user exists:", error);
    return false; // Retourne false en cas d'erreur
  }
};

export const ajoutUtilisateurCreation = async (
  dossierId: string,
  utilisateur: { [key: string]: any }
): Promise<void> => {
  const dossierRef = ref(
    database,
    `/users/clients/userInscription/${dossierId}`
  );

  // Obtenir la date actuelle et la formatter avec des zéros devant les jours et les mois < 10
  // et inclure l'heure
  const date = new Date();
  const formattedDate =
    [
      date.getDate().toString().padStart(2, "0"),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getFullYear(),
    ].join("/") +
    " " +
    [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ].join(":");

  const userData = {
    ...utilisateur, // Étend l'objet utilisateur avec les données passées en paramètre
    numeroDossier: dossierId,
    date: formattedDate, // Ajout de la date et de l'heure au format local
  };

  // Ajout des informations dans Firebase
  try {
    await set(dossierRef, userData);
  } catch (error) {
    console.error("Failed to add user data to Firebase:", error);
    throw error; // Renvoyer l'erreur pour un traitement ultérieur
  }
};

export const ajoutUtilisateurEnCours = async (
  dossierIdEmail: string,
  utilisateur: { [key: string]: any }
): Promise<void> => {
  // Remplacer les points par des virgules dans l'email pour éviter les erreurs Firebase
  const safeEmail = dossierIdEmail.replace(/\./g, ",");
  const dossierRef = ref(
    database,
    `/users/clients/userInscriptionEnCours/${safeEmail}`
  );

  const date = new Date();
  const formattedDate =
    [
      date.getDate().toString().padStart(2, "0"),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getFullYear(),
    ].join("/") +
    " " +
    [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ].join(":");

  const userData = {
    ...utilisateur,
    numeroDossier: dossierIdEmail,
    date: formattedDate,
  };

  try {
    await set(dossierRef, userData);
    console.log("Utilisateur en cours ajouté avec succès.");
  } catch (error) {
    console.error("Failed to add user data to Firebase:", error);
    throw error;
  }
};

/**
 * Récupère les données d'un utilisateur à partir de son ID de dossier.
 * @param {string} dossierId L'ID unique du dossier utilisateur.
 * @returns {Promise<any>} Une promesse qui résout avec les données de l'utilisateur.
 */
export const recupererDonneesUtilisateur = async (
  dossierId: string
): Promise<any> => {
  const dossierRef = ref(
    database,
    `/users/clients/userInscription/${dossierId}`
  );
  // console.log("Chemin accédé :", dossierRef.toString()); // Pour vérifier le chemin exact construit

  try {
    const snapshot = await get(dossierRef);
    if (snapshot.exists()) {
      // console.log(
      //   "Données utilisateur récupérées avec succès :",
      //   snapshot.val()
      // );
      return snapshot.val(); // Retourne les données spécifiques de l'utilisateur
    } else {
      console.log("Aucune donnée trouvée pour l'ID de dossier:", dossierId);
      return null;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'utilisateur :",
      error
    );
    throw error;
  }
};

/**
 * Récupère les données d'un utilisateur à partir de son email dans le dossier "userInscriptionEnCours".
 * @param {string} email L'email de l'utilisateur utilisé pour identifier le dossier.
 * @returns {Promise<any>} Une promesse qui résout avec les données de l'utilisateur, ou null si aucune donnée n'est trouvée.
 */
export const recupererDonneesUtilisateurParEmail = async (
  email: string
): Promise<any> => {
  // Remplace les caractères non valides (les points) par des virgules pour être compatible avec les clés Firebase
  const safeEmail = email.replace(/\./g, ",");
  const dossierRef = ref(
    database,
    `/users/clients/userInscriptionEnCours/${safeEmail}`
  );

  try {
    const snapshot = await get(dossierRef);
    if (snapshot.exists()) {
      console.log(
        "Données utilisateur récupérées avec succès :",
        snapshot.val()
      );
      return snapshot.val(); // Retourne les données spécifiques de l'utilisateur
    } else {
      console.log("Aucune donnée trouvée pour l'email :", email);
      return null; // Retourne null si aucune donnée n'est trouvée
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'utilisateur :",
      error
    );
    throw error; // Renvoie l'erreur pour un traitement ultérieur
  }
};

/**
 * Supprime les données d'un utilisateur à partir de son email dans le dossier "userInscriptionEnCours".
 * @param {string} email L'email de l'utilisateur utilisé pour identifier le dossier.
 * @returns {Promise<void>} Une promesse qui se résout lorsque les données ont été supprimées avec succès.
 */
export const supprimerDonneesInscriptionEnCours = async (
  email: string
): Promise<void> => {
  // Remplace les caractères non valides (les points) par des virgules pour être compatible avec les clés Firebase
  const safeEmail = email.replace(/\./g, ",");
  const dossierRef = ref(
    database,
    `/users/clients/userInscriptionEnCours/${safeEmail}`
  );

  try {
    // Vérifie d'abord si les données existent
    const snapshot = await get(dossierRef);
    if (snapshot.exists()) {
      // Si les données existent, procéder à la suppression
      await remove(dossierRef);
      console.log(
        "Données utilisateur supprimées avec succès pour l'email :",
        email
      );
    } else {
      console.log("Aucune donnée à supprimer pour l'email :", email);
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression des données de l'utilisateur :",
      error
    );
    throw error; // Renvoie l'erreur pour un traitement ultérieur
  }
};

/**
 * Ajoute ou met à jour des informations utilisateur dans un dossier spécifique.
 * @param {string} dossierId - L'ID unique du dossier utilisateur.
 * @param {Object} modifications - Un objet contenant les modifications à apporter.
 */
export const ajouterOuMettreAJourUtilisateur = async (
  dossierId: string,
  dossierName: string,
  modifications: { [key: string]: any }
): Promise<void> => {
  const dossierRef = ref(
    database,
    `/users/clients/userInscription/${dossierId}/${dossierName}`
  );

  try {
    // Mise à jour des informations dans Firebase
    await update(dossierRef, modifications);
    console.log(
      "Les informations de l'utilisateur ont été mises à jour avec succès."
    );
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations de l'utilisateur :",
      error
    );
    throw error;
  }
};

/**
 * Récupère les éléments d'un dossier Admin spécifique par son ID dans Firebase,
 * après avoir vérifié que l'utilisateur est bien authentifié.
 * @param {string} dossierId - L'ID du dossier pour lequel récupérer les éléments.
 * @returns {Promise<any>} - Une promesse qui résout avec les éléments du dossier.
 */
export const recupererElementsDossier = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("Aucun utilisateur connecté.");
    return null; // Retourne null si aucun utilisateur n'est connecté.
  }

  const uid = user.uid; // UID de l'utilisateur connecté
  console.log("UID de l'utilisateur connecté :", uid);

  const dossierRef = ref(database, `/admin/gestionnaires/${uid}`);

  try {
    const snapshot = await get(dossierRef);
    if (snapshot.exists()) {
      console.log("Éléments récupérés avec succès :", snapshot.val());
      return snapshot.val(); // Retourne les éléments du dossier.
    } else {
      console.log("Aucun élément trouvé pour cet ID de dossier.");
      return null; // Retourne null si aucun élément n'est trouvé.
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des éléments :", error);
    throw error; // Propage l'erreur pour un traitement ultérieur.
  }
};

/**
 * Écoute les modifications en temps réel dans le dossier /users/clients/userInscription
 * et traite les données à chaque mise à jour.
 */
export const ecouterMisesAJourUtilisateurs = (
  callback: (data: any | null, error?: Error) => void
): void => {
  const dossierRef: DatabaseReference = ref(
    database,
    "/users/clients/userInscription"
  );

  onValue(
    dossierRef,
    (snapshot) => {
      if (snapshot.exists()) {
        console.log("Données mises à jour :", snapshot.val());
        callback(snapshot.val(), undefined); // Ajustez ici pour ne pas passer d'erreur si non nécessaire
      } else {
        console.log("Aucune donnée trouvée à l'emplacement spécifié.");
        callback(null, undefined);
      }
    },
    (error) => {
      console.error("Erreur lors de l'écoute des modifications :", error);
      callback(null, error);
    }
  );
};

/**
 * Récupère les éléments d'un dossier Admin spécifique par son ID dans Firebase,
 * après avoir vérifié que l'utilisateur est bien authentifié.
 * @param {string} dossierId - L'ID du dossier pour lequel récupérer les éléments.
 * @returns {Promise<any>} - Une promesse qui résout avec les éléments du dossier.
 */
export const recupererElementsDossierUser = async (
  dossierId: string | null | undefined
): Promise<any> => {
  const dossierRef = ref(
    database,
    `/users/clients/userInscription/${dossierId}`
  );

  try {
    const snapshot = await get(dossierRef);
    if (snapshot.exists()) {
      console.log("Éléments récupérés avec succès :", snapshot.val());
      return snapshot.val(); // Retourne les éléments du dossier.
    } else {
      console.log("Aucun élément trouvé pour cet ID de dossier.");
      return null; // Retourne null si aucun élément n'est trouvé.
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des éléments :", error);
    throw error; // Propage l'erreur pour un traitement ultérieur.
  }
};
