import "./style.css";

interface PlaceCard {
  showPlaceInfo: any;
}

export const PlaceCard = ({ showPlaceInfo }: PlaceCard) => {
  console.log("agagag", showPlaceInfo);

  function renderValue(item: any) {
    if (item[0] == "place_name" && !showPlaceInfo.category) {
      return `🌍 ${item[1]}`;
    } else if (item[0] == "place_name") {
      return item[1];
    } else {
      return `${item[0]}: ${item[1]}`;
    }
  }

  return (
    <div className="place-card-wrapper">
      <ul className="list-reset place-card-list">
        {Object.entries(showPlaceInfo)
          .slice() // Создал копию массива, чтобы не изменить оригинальный
          .reverse() // Инвертировал порядок элементов
          .map((item, index) => (
            <li key={index} className="place-card-list__item">
              {renderValue(item)}
            </li>
          ))}
      </ul>
    </div>
  );
};
