import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutSide";
import { debounce } from "lodash";
import { InputSearchInfo } from "../InputSearchInfo/InputSearchInfo";
import { fetchSuggestions } from "../Main/Main";
import "./style.css";

interface InputSearch {
  fetchSuggestions: ({ value }: fetchSuggestions) => Promise<void>;
  suggestions: object[];
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<{}>>;
}

export const InputSearch = ({
  fetchSuggestions,
  suggestions,
  setShowPlaceInfo,
}: InputSearch) => {
  const [text, setText] = useState("");
  const [isSearchMenuActive, setIsSearchMenuActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const count = 10;
  const debouncedSaves = useCallback(
    debounce((value) => fetchSuggestions({ value, count }), 400),
    []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setText(value);
    debouncedSaves(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;

    setIsSearchMenuActive(true);
    setText(value);
  };

  useClickOutside(inputRef, () => {
    if (text) {
      setIsSearchMenuActive(false);
    }
  });

  return (
    <div className="input-main-wrapper">
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          onChange={handleChange}
          ref={inputRef}
          value={text}
          onClick={handleClick}
        />
        {text === "" && <span className="custom-placeholder">Поиск</span>}
        <InputSearchInfo
          suggestions={suggestions}
          text={text}
          setShowPlaceInfo={setShowPlaceInfo}
          setText={setText}
          isSearchMenuActive={isSearchMenuActive}
          setIsSearchMenuActive={setIsSearchMenuActive}
        />
      </div>
    </div>
  );
};
