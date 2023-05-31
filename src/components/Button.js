import { memo } from "react";

function Button({ title, iconF, iconB, styles, onClick }) {
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-full bg-active ${styles}`}
      onClick={onClick}
    >
      {iconF && <span>{iconF}</span>}
      {title}
      {iconB && <span>{iconB}</span>}
    </button>
  );
}

export default memo(Button);
