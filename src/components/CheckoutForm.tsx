import {
  ajoutUtilisateurCreation,
  ajoutUtilisateurEnCours,
} from "@/firebase/database/database";
import { setuid } from "@/redux/createUserSlice";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase/firebase.config";
import { RootState } from "../redux/store";

export default function CheckoutForm() {
  const auth = getAuth(app);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaymentReady, setIsPaymentReady] = useState<boolean>(false);

  const userEmail = useSelector(
    (state: RootState) => state.createUser.userInfo.email
  );

  const userInfo = useSelector(
    (state: RootState) => state.createUser?.userInfo
  );
  const userInfoAdresse = useSelector(
    (state: RootState) => state.createUser?.userAdresse
  );
  const userActivite = useSelector(
    (state: RootState) => state.createUser?.userActivite
  );

  const handlePaymentElementChange = (
    event: StripePaymentElementChangeEvent
  ) => {
    setIsPaymentReady(event.complete);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or elements not loaded");
      return;
    }

    setIsLoading(true);
    const password = generatePassword();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      console.log(
        "User created successfully:",
        userCredential.user.uid,
        password
      );
      await fetch("/api/sendEmailForIdentifiant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          motDePasse: password,
        }),
      })
        .then((response) => {
          console.log("Email sent successfully:", response);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
      await fetch("/api/sendFactureForUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: userInfo.nom,
          email: userEmail,
          prenom: userInfo.prenom,
        }),
      })
        .then((response) => {
          console.log("Facture sent successfully:", response);
        })
        .catch((error) => {
          console.error("Error sending facture:", error);
        });
      await fetch("/api/sendFactureForMe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: userInfo.nom,
          email: userEmail,
          prenom: userInfo.prenom,
        }),
      })
        .then((response) => {
          console.log("Facture sent successfully:", response);
        })
        .catch((error) => {
          console.error("Error sending facture:", error);
        });
      dispatch(setuid(userCredential.user.uid));

      // Tentative d'ajout de l'utilisateur à la base de données
      await ajoutUtilisateurCreation(userCredential.user.uid, {
        userInfo,
        userInfoAdresse,
        userActivite,
      }).then(() => {
        // Si tout se passe bien, rediriger vers l'espace utilisateur
        handlePayment("http://localhost:3000/mon-espace", "/mon-espace");
      });
    } catch (error) {
      console.error(
        "Error during user registration or payment handling:",
        error
      );

      await ajoutUtilisateurEnCours(userEmail, {
        userInfo,
        userInfoAdresse,
        userActivite,
      });

      handlePayment(
        "http://localhost:3000/devenir-auto-entrepreneur/declaration/connexion",
        "/devenir-auto-entrepreneur/declaration/connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (returnUrl: string, routerUrl: string) => {
    if (!stripe || !elements) {
      return;
    }
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        // confirmParams: { return_url: returnUrl },
        redirect: "if_required",
      });
      if (error) {
        setMessage(error.message || "An unexpected error occurred.");
      } else {
        router.replace(routerUrl);
      }
    } catch (error) {
      setMessage("An unexpected error occurred while processing payment.");
    }
  };

  function generatePassword() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement onChange={handlePaymentElementChange} />
      <button
        disabled={isLoading || !stripe || !elements || !isPaymentReady}
        id="submit"
        className={`text-white w-full py-2 rounded-md mt-10 ${
          !stripe || !elements || !isPaymentReady
            ? "bg-green-700/50"
            : "bg-green-700 hover:bg-green-700/80"
        } transition duration-150 ease-in-out`}
      >
        {isLoading ? "Loading..." : "DEVENIR AUTO-ENTREPRENEUR"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}
