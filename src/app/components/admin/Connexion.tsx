"use client";

import { recupererElementsDossier } from "@/firebase/database/database";
import { useRouter } from "next/navigation";
import React from "react";
import { loginUser } from "../../firebase/database/auth/auth";

const Connexion = () => {
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      await loginUser(email, password);
      await recupererElementsDossier().then((data) => {
        data.role === "admin" || data.role === "super-admin"
          ? route.push("/admin/espace")
          : route.push("/");
      });
    } catch (error) {
      alert(
        "Erreur lors de la connexion de l'utilisateur, veuillez vérifier vos identifiants"
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
        <label htmlFor="email" className="text-slate-700 w-[450px]"></label>
        <input
          name="password"
          // onChange={handleChange}
          type="password"
          placeholder="Mot de passe"
          className="w-full border px-2 py-1 rounded-md border-slate-400 mt-2 w-[450px]"
        />
        <div className="mt-4">
          <a
            href="/reset-password"
            className="text-sm text-slate-600 hover:underline"
          >
            Mot de passe oublié?
          </a>
        </div>
        <button
          type="submit"
          className={`${"bg-green-700"}  text-white w-full py-2 rounded-md mt-5 hover:bg-green-700/70 transition duration-150 easeInOut w-[450px]`}
        >
          Se connecter
        </button>
      </form>
    </>
  );
};

export default Connexion;
