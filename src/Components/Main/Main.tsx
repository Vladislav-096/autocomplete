import { useState } from "react";
import { InputSearch } from "../InputSearch/InputSearch";
import { PlaceCard } from "../PlaceCard/PlaceCard";
import "./style.css";

export interface fetchSuggestions {
  value: string;
  count: number;
}

export const Main = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showPlaceInfo, setShowPlaceInfo] = useState({});

  const fetchSuggestions = async ({ value, count }: fetchSuggestions) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoidGVybW94aW4iLCJhIjoiY2w0NjdhOHgxMDVtcTNjbjIwdWxjZHVsdCJ9.-RRQ9TZ9JdX8wkZfsOKq5g&limit=${count}`
      );
      const data = await response.json();

      let modifiedData = data.features.map((item: any) => {
        return {
          ...item.properties,
          place_name: item.place_name,
        };
      });

      setSuggestions(modifiedData);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      throw error;
    }
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="auto-complete-wrapper">
            <InputSearch
              fetchSuggestions={fetchSuggestions}
              suggestions={suggestions}
              setShowPlaceInfo={setShowPlaceInfo}
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="info-wrapper">
            <PlaceCard showPlaceInfo={showPlaceInfo} />
          </div>
        </div>
      </section>
    </main>
  );
};
