import { memo } from "react";
import { MutatingDots } from "react-loader-spinner";

function LoadingPage({ z = 999 }) {
  return (
    <div
      className={`absolute z-[${z}] top-0 right-0 bottom-0 left-0 bg-red bg-content flex justify-center items-center`}
    >
      <MutatingDots
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default memo(LoadingPage);
