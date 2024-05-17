/* eslint-disable import/no-anonymous-default-export */
import { WelcomeEmailTemplate } from "@/components/email/WelcomeEmailTemplate";
import sgMail from "@sendgrid/mail";
import ReactDOMServer from "react-dom/server"; // Assurez-vous d'avoir react-dom installé

// Configurez SendGrid avec votre clé API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  try {
    const { nom, email, id } = req.body;

    const emailContent = ReactDOMServer.renderToString(
      <WelcomeEmailTemplate email={email} nom={nom} />
    );

    const msg = {
      to: [email], // Assurez-vous que cette adresse est valide
      from: "contact@info-autoentrepreneur.com",
      subject: "Bienvenue chez Info Auto-Entrepreneur !",
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
