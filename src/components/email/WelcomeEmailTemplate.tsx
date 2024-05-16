/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as React from "react";

// Définition de l'interface pour les props
interface WelcomeEmailProps {
  email: string;
  nom?: string;
}

// Ajout du formatage pour inclure l'heure
const currentDate = format(new Date(), "dd/MM/yyyy HH:mm", { locale: fr });

export const WelcomeEmailTemplate: React.FC<WelcomeEmailProps> = ({
  email,
  nom,
}) => {
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
    button: {
      backgroundColor: "#164e63",
      color: "#fff",
      padding: "10px 20px",
      textAlign: "center" as "center",
      display: "inline-block",
      borderRadius: "5px",
      textDecoration: "none",
      marginTop: "20px",
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
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        Bonjour {nom || "future Auto-entrepreneur"},
      </h2>
      <p style={styles.paragraph}>
        Nous sommes ravis de vous accueillir sur Info Auto-Entrepreneur. Vous
        avez franchi une première étape importante vers la création de votre
        auto-entreprise.
      </p>
      <p style={styles.paragraph}>
        Chez Info Auto-Entrepreneur, nous sommes dédiés à vous fournir toutes
        les informations et les outils nécessaires pour démarrer et réussir en
        tant qu&apos;auto-entrepreneur.
      </p>
      <p style={styles.paragraph}>
        Pour aller plus loin et bénéficier de notre service complet, nous vous
        invitons à finaliser votre inscription. Vous serez guidé étape par étape
        pour compléter votre dossier et obtenir votre statut
        d&apos;auto-entrepreneur en toute simplicité.
      </p>
      <a
        href="https://www.info-autoentrepreneur.fr/devenir-auto-entrepreneur"
        style={styles.button}
      >
        Finaliser mon inscription
      </a>
      <p style={styles.paragraph}>
        N&apos;attendez plus, chaque jour compte pour lancer votre activité !
      </p>
      <br />
      <p style={styles.paragraph}>
        En cas de questions ou de besoin d&apos;assistance, notre équipe est là
        pour vous aider.
      </p>
      <br />
      <p style={styles.paragraph}>À très bientôt sur Info Auto-Entrepreneur,</p>
      <p style={styles.paragraph}>L&apos;équipe Info Auto-Entrepreneur</p>

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
          <a href="mailto:contact@info-autoentreprise.com">
            contact@info-autoentreprise.com
          </a>{" "}
          <br />
          {/* Téléphone : <a href="tel:0956342341">0956342341</a> */}
        </p>
      </div>
    </div>
  );
};
