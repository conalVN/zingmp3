import { memo } from "react";
import { useSelector } from "react-redux";

import { Login } from "../public";

function Personal() {
  const { isLogin } = useSelector((state) => state.app);
  return <>{!isLogin ? <Login /> : <div className=""></div>}</>;
}

export default memo(Personal);
