import { TailSpin } from "react-loader-spinner";
function Loading() {
  return (
    <section className="bg-white w-100 vh-100 flex justify-center items-center">
      <TailSpin
        ariaLabel="loading-indicator"
        width={50}
        height={50}
        color="purple"
      />
    </section>
  );
}

export default Loading;
