/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as React from "react";

// Définition de l'interface pour les props
interface EmailTemplateProps {
  email: string;
  nom: string;
  prenom: string;
}

// Ajout du formatage pour inclure l'heure
const currentDate = format(new Date(), "dd/MM/yyyy HH:mm", { locale: fr });

export const EmailUserFactureTemplate: React.FC<EmailTemplateProps> = ({
  email,
  nom,
  prenom,
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
      color: "#15803d",
      borderBottom: "2px solid #15803d",
      paddingBottom: "10px",
    },
    subHeader: {
      fontWeight: "bold",
      color: "#333",
    },
    paragraph: {
      color: "#666",
    },
    littleParaph: {
      color: "#666",
      fontSize: "7px",
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
        Bonjour,
        <br />
        Merci d&apos;avoir choisi notre service pour la gestion de votre
        auto-entreprise.
      </h2>
      <p style={styles.paragraph}>
        Nous confirmons votre paiement du {currentDate}
      </p>
      <p style={styles.paragraph}>
        Voici un récapitulatif de commande. Conservez-le précieusement, ce
        document fait office de facture.
      </p>
      <br />
      <h3 style={styles.subHeader}>Récapitulatif de votre commande</h3>
      <p style={styles.paragraph}>
        Prestation: Traiment d&apos;une création d&apos;autoentreprise
      </p>
      <p style={styles.paragraph}>Total HT : 59,00€</p>
      <p style={styles.paragraph}>Total TVA : 0,00€</p>
      <p style={styles.paragraph}>Total TTC : 59,00€</p>
      <p style={styles.paragraph}>Méthode paiement : Carte bancaire</p>
      <p style={styles.paragraph}>
        Identité souscripteur : {nom} {prenom}
      </p>
      <p style={styles.paragraph}>Email du souscripteur : {email}</p>
      <br />
      <p style={styles.paragraph}>
        Le service Info Auto-Entrepreneur est disponible immédiatement dès
        l&apos;envoi de cette email. Comme le service prend effet et est livré
        instantanément suite à la transaction, les frais de prise en charge ne
        sont pas éligibles à un droit de rétractation, conformément à
        l&apos;article L221-28 du Code de la consommation.
        <br />
        <br />
        <p style={styles.littleParaph}>
          Le service vous est proposé par Info Auto-Entrepreneur, appartenant à
          la société Nicolas CASTERA.
        </p>
      </p>

      {/* Signature Section */}
      <div style={styles.signature as React.CSSProperties}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/autoentrepreneur-info.appspot.com/o/logos%2FlogoWithName.png?alt=media&token=bb1bc49a-2e51-4386-83a1-9c415e0aa77c"
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
