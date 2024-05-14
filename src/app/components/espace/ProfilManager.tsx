import { setConnectedInformation } from "@/redux/createUserSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetPassword } from "../../firebase/database/auth/auth";
import { RootState } from "../../redux/store";

interface Information {
  numeroDossier: string;
}

interface InformationUserInfo {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
}

const ProfilManager = () => {
  const route = useRouter();

  const dispatch = useDispatch();

  const getInformation = useSelector<RootState, Information | undefined>(
    (state) => state.createUser.userConnectedInformation
  );

  const getUserInfo = useSelector<RootState, InformationUserInfo | undefined>(
    (state) =>
      state.createUser?.userConnectedInformation
        ?.userInfo as InformationUserInfo
  );

  const handlePasswordChange = async () => {
    console.log("Change password");
    try {
      await resetPassword(getUserInfo?.email as string);
      await logoutUser().then(() => {
        dispatch(setConnectedInformation({}));
      });
      alert("Email de réinitialisation de mot de passe envoyé avec succès");
      route.push("/connexion");
    } catch (error) {
      alert(
        "Erreur lors de l'envoi de l'email de réinitialisation de mot de passe"
      );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-slate-100 p-4 py-10 rounded-md flex justify-center flex-col ">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profil
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Ci-dessous les informations de votre compte
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Nom, prénom
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">
                  {getUserInfo?.nom} {getUserInfo?.prenom}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Adresse email
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{getUserInfo?.email}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Changer le mot de passe
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <button
                  type="button"
                  className="font-semibold text-green-700 hover:text-green-700/50"
                  onClick={handlePasswordChange}
                >
                  Modifier
                </button>
              </dd>
            </div>
            <p className="text-gray-900 text-xs pt-6">
              Souhaitez-vous modifier, supprimer ou obtenir plus
              d&apos;informations sur les données de votre compte ? Contactez
              votre conseiller via l&apos;onglet Service client.
            </p>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfilManager;
