import { Circles } from "react-loader-spinner";
function Loading() {
  return (
    <section className="bg-white">
      <Circles
        ariaLabel="loading-indicator"
        width={50}
        height={50}
        color="purple"
      />
    </section>
  );
}

export default Loading;
