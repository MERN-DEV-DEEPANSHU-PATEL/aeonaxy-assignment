import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
      }}
      className="flex flex-col justify-center items-center"
    >
      <RotatingLines
        visible={true}
        // height={96}
        width="96"
        // color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
      <p className="text-2xl text-center">
        This Site is Free Hosted so Performance maybe Poor
      </p>
    </div>
  );
};

export default Spinner;
