import { useEffect } from "react";

export const useClickOutside = (ref: React.MutableRefObject<HTMLInputElement | null>, callback: () => void) => {

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClick);
    // document.addEventListener("scroll", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  });
};
