import { memo } from "react";

function Input({ title, placeholder, typeIn }) {
  return (
    <label className="flex flex-col border-b border-gray-400">
      <span className="text-black">{title}</span>
      <input
        type={typeIn}
        className="outline-none border-none p-1"
        placeholder={placeholder}
      />
    </label>
  );
}

export default memo(Input);
