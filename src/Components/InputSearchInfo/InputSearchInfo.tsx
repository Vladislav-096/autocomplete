import "./style.css";

interface InputSearchInfo {
  suggestions: object[];
  text: string;
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<{}>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isSearchMenuActive: boolean;
  setIsSearchMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputSearchInfo = ({
  suggestions,
  text,
  setShowPlaceInfo,
  setText,
  isSearchMenuActive,
  setIsSearchMenuActive,
}: InputSearchInfo) => {
  console.log(suggestions);

  function handleClick(selectedOption: object, name: string) {
    setShowPlaceInfo(selectedOption);
    setText(name);
    setIsSearchMenuActive(false);
  }

  return (
    <>
      {suggestions.length !== 0 && (
        <div
          className={
            isSearchMenuActive && text
              ? "search-info-container active"
              : "search-info-container"
          }
        >
          <ul className="list-reset">
            {suggestions.map((item: any, index: number) => (
              <li
                className="search-info-card"
                key={index}
                onClick={() => handleClick(item, item.place_name)}
              >
                <div className="search-info-option">
                  {item.category && (
                    <span className="search-info-category-name">
                      <span className="pypynka">📌</span>
                      {item.category.split(",")[0].trim()}
                    </span>
                  )}
                  <span className="search-info-descr">{item.place_name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
