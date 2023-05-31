import { memo } from "react";
import { Input, Button } from "../../components";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div
      className="fixed z-[888] top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-layer-50"
      onClick={() => {
        navigate(-1);
      }}
    >
      {/* <form className="absolute bg-white rounded-lg w-[400px] h-[60%] p-3 text-black">
        <Input
          title="Email/Phone"
          placeholder="Enter your email/phone"
          typeIn="text"
        />
        <br />
        <Input
          title="Password"
          placeholder="Enter your password"
          typeIn="password"
        />
        <br />
        <Button
          title="Đăng nhập"
          styles="px-4 py-1 text-white uppercase mx-auto"
        />
        <p className="text-end mt-4">
          Chưa có tài khoản!
          <span className="uppercase underline text-red-500">Đăng kí</span>
        </p>
      </form> */}
    </div>
  );
}

export default memo(Login);
