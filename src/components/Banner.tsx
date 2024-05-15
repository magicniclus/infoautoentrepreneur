const Banner = ({ value }: { value: string }) => {
  return (
    <section className="w-full bg-slate-700 text-white">
      <div className="mx-auto w-full text-center flex max-w-6xl items-center px-6 lg:px-12 py-12 md:py-16 flex justify-center">
        <h2 className="text-xl">{value}</h2>
      </div>
    </section>
  );
};

export default Banner;
