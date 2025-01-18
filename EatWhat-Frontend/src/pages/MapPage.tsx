import React, { useState, useEffect, useRef, Dispatch } from "react";
import { BackButton, MainButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useNavigate } from "react-router-dom";
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function MapPage() {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [position, setPosition] = useState<any>(null)


  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <APIProvider
        apiKey={API_KEY}
      >
        <Map
          mapId={"bf51a910020fa25a"}
          defaultZoom={10.5}
          defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <AdvancedMarker ref={markerRef} position={null} />
          {position && <MainButton
            text="Choose this location"
            onClick={() => { navigate('/Preference', { state: { lat: position.lat, lng: position.lng } }) }}
          />}
        </Map>
        <MapControl position={ControlPosition.TOP}>
          <div className="autocomplete-control">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
          </div>
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} setPosition={setPosition} />
      </APIProvider>
    </>
  );
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
  setPosition: Dispatch<any>;
}

const MapHandler = ({ place, marker, setPosition }: MapHandlerProps) => {
  const map = useMap();
  console.log(place?.geometry?.location?.lat());

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
    setPosition({ lat: place?.geometry?.location?.lat(), lng: place?.geometry?.location?.lng() })
  }, [map, place, marker]);

  return null;
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
      componentRestrictions: { country: "SG" },
    };

    setPlaceAutocomplete(
      new places.Autocomplete(inputRef.current, options)
    );
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} />
    </div>
  );
};

export default MapPage;
