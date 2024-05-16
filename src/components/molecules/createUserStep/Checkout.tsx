/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/redux/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ChevronDownIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import CheckoutForm from "../../CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const Checkout = () => {
  const userNom = useSelector(
    (state: RootState) => state.createUser.userInfo.nom
  );
  const userPrenom = useSelector(
    (state: RootState) => state.createUser.userInfo.prenom
  );
  const userActivite = useSelector(
    (state: RootState) => state.createUser.userActivite.activitePrincipale
  );
  const userDebutActivite = useSelector(
    (state: RootState) => state.createUser.userActivite.debutActivite
  );
  const userAdresse = useSelector(
    (state: RootState) => state.createUser.userAdresse.adresse
  );
  const userEmail = useSelector(
    (state: RootState) => state.createUser.userInfo.email
  );

  const [clientSecret, setClientSecret] = React.useState("");

  const [open, setOpen] = useState(false);

  const [dateActuelle, setDateActuelle] = useState(() =>
    new Date().toLocaleDateString("fr-FR")
  );

  const [heureActuelle, setHeureActuelle] = useState(() =>
    new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const parseAddress = (address: string) => {
    const parts = address.split(", ");
    if (parts.length < 3) {
      console.error("Invalid address format");
      return null;
    }

    const line1 = parts[0];
    const [postalCode, city] = parts[1].split(" ");
    const country = parts[2];

    return { line1, city, postal_code: postalCode, country };
  };

  useEffect(() => {
    if (!userEmail) {
      console.error("Email is missing.");
      return; // Empêcher l'exécution si l'email n'est pas disponible
    }

    const parsedAddress = parseAddress(userAdresse);
    if (!parsedAddress) {
      console.error("Address parsing failed.");
      return; // Arrêter l'exécution si l'adresse est invalide
    }

    const requestBody = {
      items: [{ id: "xl-tshirt", quantity: 1 }],
      customerInfo: {
        email: userEmail,
        name: `${userPrenom} ${userNom}`,
        shippingAddress: parsedAddress,
      },
    };

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Failed to create payment intent");
          });
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Error creating payment intent:", error));
  }, [userEmail, userPrenom, userNom, userAdresse]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const appearance = {
    variables: {
      colorPrimary: "#3d546c",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <style jsx>{`
        .background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(59, 70, 97, 0.53) 0.03%,
            rgba(59, 70, 97, 0.2) 99.95%
          );
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <div className="App">
        <div className="w-full md:px-0">
          <div className="mb-7 text-center  bg-[url('/background/paper3.png')] bg-top text-slate-700 rounded-md py-4 px-2">
            <div className="flex items-center text-xs w-[90%] mx-auto mb-7">
              <CheckCircle className="h-4 w-4 text-cyan-900 mr-2" />
              <h3 className="text-start">
                Dossier enregistré{" "}
                <span className="font-semibold">
                  le {dateActuelle} à {heureActuelle}
                </span>
              </h3>
            </div>
            <h2 className="">
              {" "}
              Paiement des frais à l’inscription au régime d’auto-entrepreneur :{" "}
              <span className="font-bold text-cyan-700">59,00 €</span>
            </h2>
            <div className="w-[90%] h-[1px] bg-slate-300 mx-auto mt-3"></div>
            <div className=""></div>
            <div
              className="mt-3 w-[90%] text-slate-400 mx-auto flex justify-between items-center cursor-pointer"
              onClick={(e) => setOpen((e) => !e)}
            >
              <h3 className="flex items-center text-sm">
                <span className="w-5 h-5 flex justify-center items-center rounded-full border border-slate-300 mr-2 items-center">
                  ?
                </span>
                Voir mes informations
              </h3>
              <ChevronDownIcon
                className={`h-5 w-5 transition-all duration-150 easeInOut ${
                  open ? "transform rotate-180" : ""
                }`}
              />
            </div>
            {open && (
              <div className="p-3 text-start w-[90%] mx-auto text-slate-700 text-sm p-2 bg-white mt-3 rounded-md">
                <h3 className="font-semibold">
                  Nom, prénom du demandant :{" "}
                  <span className="font-normal">
                    {userNom.toUpperCase()} {userPrenom.toUpperCase()}
                  </span>
                </h3>
                <h3 className="mt-1.5 font-semibold">
                  Activité principale :{" "}
                  <span className="font-normal">{userActivite}</span>
                </h3>
                <h3 className="mt-1.5 font-semibold">
                  Date de début d&apos;activité :{" "}
                  <span className="font-normal">
                    {formatDate(userDebutActivite)}
                  </span>
                </h3>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mb-7 md:px-0 md:mt-0">
          <div className="flex items-center">
            <LockClosedIcon className="h-5 w-5 text-yellow-500" />
            <p className="text-slate-700 ml-2">Paiement sécurisé SSL</p>
          </div>
          <Image
            src="/icons/payment.svg"
            width={100}
            height={20}
            alt="Carte bancaire"
            className="md:block hidden"
          />
        </div>
        <div className="">
          {clientSecret && (
            <Elements
              options={{ ...options, locale: "fr-FR" }}
              stripe={stripePromise}
            >
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
