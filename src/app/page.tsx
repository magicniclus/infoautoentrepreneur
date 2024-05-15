/* eslint-disable @next/next/no-img-element */
"use client";

import AvantageAccueil from "@/components/AvantageAccueil";
import CTA from "@/components/CTA";
import EtapesAccueil from "@/components/EtapesAccueil";
import Faq from "@/components/Faq";
import Notes from "@/components/Notes";
import QuiSommesNous from "@/components/QuiSommesNous";
import NavBar from "@/components/TailwindUi/NavBar";
import BigFooter from "@/components/footer/BigFooter";
import HeroAccueil from "@/components/hero/HeroAccueil";

export default function Home() {
  const faqsInfoAutoEntrepreneur = [
    {
      id: 1,
      question: (
        <>
          Quels services{" "}
          <span className="text-cyan-900 font-semibold">
            Info-AutoEntrepreneur.fr
          </span>{" "}
          offre-t-il aux autoentrepreneurs ?
        </>
      ),
      answer:
        "Info-AutoEntrepreneur.fr accompagne les autoentrepreneurs à chaque étape de leur parcours entrepreneurial, de la création de leur statut à la modification ou cessation d'activité. Nous prenons en charge toutes les démarches administratives pour vous, y compris les déclarations et les modifications auprès des instances officielles.",
    },
    {
      id: 2,
      question: (
        <>
          Pourquoi choisir{" "}
          <span className="text-cyan-900 font-semibold">
            Info-AutoEntrepreneur.fr
          </span>{" "}
          pour gérer mon statut d&apos;autoentrepreneur ?
        </>
      ),
      answer:
        "Choisir Info-AutoEntrepreneur.fr, c'est opter pour la simplicité et la tranquillité d'esprit. Notre expertise et notre accompagnement personnalisé vous garantissent une gestion administrative sans faute et en toute sécurité, vous permettant de vous concentrer pleinement sur le développement de votre activité.",
    },
    {
      id: 3,
      question: (
        <>
          Combien coûte l&apos;accompagnement par{" "}
          <span className="text-cyan-900 font-semibold">
            Info-AutoEntrepreneur.fr
          </span>{" "}
          ?
        </>
      ),
      answer:
        "Nous proposons différents forfaits adaptés à vos besoins spécifiques, que ce soit pour une création, une modification, ou une cessation d'activité. Chaque forfait est conçu pour offrir un rapport qualité-prix optimal, avec tous les détails disponibles sur notre site.",
    },
    {
      id: 4,
      question: (
        <>
          Comment{" "}
          <span className="text-cyan-900 font-semibold">
            Info-AutoEntrepreneur.fr
          </span>{" "}
          facilite-t-il les démarches administratives ?
        </>
      ),
      answer:
        "Grâce à une plateforme intuitive et des outils simplifiés, nous rendons les démarches administratives accessibles et gérables, vous permettant de réaliser toutes vos obligations légales rapidement et sans erreur.",
    },
    {
      id: 5,
      question: (
        <>
          Quel support ou de problèmes ?{" "}
          <span className="text-cyan-900 font-semibold">
            Info-AutoEntrepreneur.fr
          </span>{" "}
          propose-t-il en cas de questions ou de problèmes ?
        </>
      ),
      answer:
        "Notre équipe de conseillers spécialisés est disponible pour vous assister et répondre à toutes vos questions. Que ce soit par téléphone, email, ou chat, nous nous engageons à vous fournir un soutien réactif et personnalisé pour résoudre tout défi administratif que vous pourriez rencontrer.",
    },
  ];

  return (
    <>
      <NavBar />
      <main>
        <HeroAccueil />
        <AvantageAccueil />
        <QuiSommesNous />
        <Notes />
        <div className="w-full flex items-center pb-10">
          <img
            src="/federation.png"
            className="h-10 w-auto mx-auto"
            alt="federation"
          />
        </div>
        <EtapesAccueil />
        <Faq faqs={faqsInfoAutoEntrepreneur} titre="Questions fréquentes:" />
        <div className="mt-10">
          <CTA lienBouton="/devenir-auto-entrepreneur" />
        </div>
      </main>
      <BigFooter />
    </>
  );
}
