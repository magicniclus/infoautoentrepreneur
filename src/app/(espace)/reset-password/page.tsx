import NavBar from "@/components/TailwindUi/NavBar";
import BigFooter from "@/components/footer/BigFooter";
import ChangePassword from "@/components/form/ChangePassword";

const page = () => {
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100vh-72px)]">
        <section
          id="form"
          className="w-full py-10 md:py-24 bg-no-repeat relative background text-slate-700 flex items-center"
        >
          <div className="px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center z-10">
            <h1 className=" text-slate-700 font-bold text-4xl">
              Réinitialisez votre mot de passe
            </h1>
            <h2 className="mb-10">
              Saisissez votre email pour recevoir un mail de modification de mot
              de passe
            </h2>
            <ChangePassword />
          </div>
        </section>
      </main>
      <BigFooter marginTop="0px" />
    </>
  );
};

export default page;
