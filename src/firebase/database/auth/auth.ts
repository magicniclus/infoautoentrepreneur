import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase.config"; // Assurez-vous que ceci importe correctement l'objet FirebaseApp

const auth = getAuth(app);

export const createAccount = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Utilisateur créé avec succès :", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error; // Propager l'erreur pour la gestion externe
  }
};

/**
 * Vérifie si un utilisateur est connecté dans Firebase Authentication.
 * @returns {Promise<firebase.User>} Une promesse qui résout avec les détails de l'utilisateur si connecté.
 */
export function checkUserLoggedIn() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe(); // Détacher l'écouteur une fois l'état obtenu pour éviter des écoutes inutiles
        if (user) {
          resolve(user); // L'utilisateur est connecté, renvoyer les détails de l'utilisateur
        } else {
          // Aucun utilisateur connecté
        }
      },
      (error) => {
        unsubscribe(); // Détacher l'écouteur en cas d'erreur
        reject(error); // Renvoyer l'erreur
      }
    );
  });
}

/**
 * Surveille en continu l'état de connexion de l'utilisateur.
 * @param {(user: firebase.User | null) => void} callback Fonction de rappel appelée avec l'état actuel de l'utilisateur.
 */
export function monitorAuthState(callback: (user: User | null) => void) {
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      callback(user);
    },
    (error) => {
      console.error(
        "Erreur lors de la surveillance de l'état de l'utilisateur :",
        error
      );
    }
  );

  return unsubscribe;
}

/**
 * Connecte un utilisateur à l'aide de son email et de son mot de passe.
 * @param {string} email L'email de l'utilisateur.
 * @param {string} password Le mot de passe de l'utilisateur.
 * @returns {Promise<firebase.auth.UserCredential>} Une promesse qui résout avec les détails de l'utilisateur connecté.
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Utilisateur connecté avec succès :", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    throw error; // Propager l'erreur pour une gestion externe
  }
};

/**
 * Envoie un email pour réinitialiser le mot de passe à l'utilisateur.
 * @param {string} email L'email de l'utilisateur qui souhaite réinitialiser son mot de passe.
 * @returns {Promise<void>} Une promesse qui se résout si l'email a été envoyé avec succès.
 */
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(
      "Email de réinitialisation de mot de passe envoyé avec succès à :",
      email
    );
    return;
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation de mot de passe :",
      error
    );
    throw error; // Propager l'erreur pour une gestion externe
  }
};

/**
 * Déconnecte l'utilisateur actuellement connecté.
 * @returns {Promise<void>} Une promesse qui se résout lorsque l'utilisateur est déconnecté.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Utilisateur déconnecté avec succès.");
  } catch (error) {
    console.error("Erreur lors de la déconnexion de l'utilisateur :", error);
    throw error; // Propager l'erreur pour une gestion externe
  }
};
