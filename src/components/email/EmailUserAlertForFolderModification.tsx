/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as React from "react";

// Définition de l'interface pour les props
interface EmailTemplateProps {
  email: string;
  motDePasse: string;
}

// Ajout du formatage pour inclure l'heure
const currentDate = format(new Date(), "dd/MM/yyyy HH:mm", { locale: fr });

export const EmailUserAlertForFolderModification: React.FC<
  EmailTemplateProps
> = ({ email }) => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      color: "#333",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      border: "1px solid #e3e3e3",
      maxWidth: "600px",
      margin: "20px auto",
    },
    header: {
      color: "#164e63",
      borderBottom: "2px solid #164e63",
      paddingBottom: "10px",
    },
    subHeader: {
      fontWeight: "bold",
      color: "#333",
    },
    paragraph: {
      color: "#666",
    },
    signature: {
      paddingTop: "20px",
      borderTop: "1px solid #ddd",
      marginTop: "20px",
      textAlign: "center",
    },
    signatureText: {
      color: "#444",
      fontSize: "12px",
      lineHeight: "18px",
    },
    logo: {
      height: "50px", // Hauteur du logo
      width: "auto",
      marginBottom: "10px",
    },
    button: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#164e63",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "5px",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Modification de dossier</h2>
      <p style={styles.paragraph}>
        Votre conseiller vous à envoyer un message pour vous informer que votre
        dossier doit être complété/modifié.
      </p>

      <p style={styles.paragraph}>
        Afin de voir les modifications à apporter, veuillez vous connecter à
        votre espace personnel.
      </p>
      <a
        href="https://info-autoentrepreneur.fr/connexion"
        style={styles.button}
      >
        Mon espece
      </a>
      {/* Signature Section */}
      <div style={styles.signature as React.CSSProperties}>
        <img
          src="https://www.info-autoentrepreneur.fr/logoWithName.png"
          alt="Logo de l'Entreprise"
          style={styles.logo}
        />
        <p style={styles.signatureText}>
          Contactez-nous : <br />
          Email :{" "}
          <a href="mailto:contact@info-autoentreprise.fr">
            contact@info-autoentreprise.fr
          </a>{" "}
          <br />
          {/* Téléphone : <a href="tel:0956342341">0956342341</a> */}
        </p>
      </div>
    </div>
  );
};
