const Banner = ({ value }: { value: string }) => {
  return (
    <section className="w-full bg-cyan-900 text-white">
      <div className="mx-auto w-full text-center flex max-w-6xl items-center p-6 lg:px-8 flex justify-center">
        <h2 className="text-lg">{value}</h2>
      </div>
    </section>
  );
};

export default Banner;
