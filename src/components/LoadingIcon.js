import { memo } from "react";
import { RotatingLines } from "react-loader-spinner";

function LoadingIcon() {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="26"
      visible={true}
    />
  );
}

export default memo(LoadingIcon);
