"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { resetPassword } from "../../firebase/database/auth/auth";

const ChangePassword = () => {
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    try {
      await resetPassword(email);
      alert("Email de réinitialisation de mot de passe envoyé avec succès");
      route.push("/connexion");
    } catch (error) {
      alert(
        "Erreur lors de l'envoi de l'email de réinitialisation de mot de passe"
      );
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col">
        <label htmlFor="email" className="text-slate-700 w-[450px]"></label>
        <input
          name="email"
          // onChange={handleChange}
          type="email"
          placeholder="Votre email"
          className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2 w-[450px]"
        />
        <button
          type="submit"
          className={`${"bg-green-700"}  text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut w-[450px]`}
        >
          Modifier
        </button>
        <a
          className={`${" hover:bg-slate-700/10"} border border-slate-700  hover:text-slate-700 flex justify-center  w-full py-2 rounded-md mt-5 bg-slate-700 text-white cursor-pointer transition duration-150 easeInOut w-[450px]`}
        >
          Se connecter
        </a>
      </form>
    </>
  );
};

export default ChangePassword;
