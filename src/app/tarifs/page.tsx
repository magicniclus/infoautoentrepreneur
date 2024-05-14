import Notes from "@/components/Notes";
import NavBar from "@/components/TailwindUi/NavBar";
import Price from "../../components/Price";
import BigFooter from "../../components/footer/BigFooter";

const page = () => {
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100vh-140px)]">
        <Price />
        <Notes />
      </main>
      <BigFooter />
    </>
  );
};

export default page;
