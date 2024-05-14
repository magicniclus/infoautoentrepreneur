/* eslint-disable import/no-anonymous-default-export */
import sgMail from "@sendgrid/mail";
import ReactDOMServer from "react-dom/server"; // Assurez-vous d'avoir react-dom installé
import { EmailTemplateIdentifiant } from "../../src/components/email/EmailTemplateIdentifiant";

// Configurez SendGrid avec votre clé API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const emailContent = ReactDOMServer.renderToString(
      <EmailTemplateIdentifiant email={email} motDePasse={motDePasse} />
    );

    const msg = {
      to: [email], // Assurez-vous que cette adresse est valide
      from: "contact@info-autoentrepreneur.fr",
      subject:
        "Important: Votre identifiant pour accéder à votre espace personnel",
      html: emailContent,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: "Email envoyé avec succès" });
    } catch (error) {
      console.error("Erreur SendGrid:", error.response?.body);
      res.status(400).json({
        message: "Erreur lors de l'envoi de l'email.",
        details: error.response?.body,
      });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: error.message, stack: error.stack });
  }
};
