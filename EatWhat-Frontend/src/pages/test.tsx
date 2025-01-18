import React, { useState, useEffect, useRef } from "react";
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
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);

  const onMapClick = (e: any) => {
    console.log(e.detail.latLng);

    setPosition(e.detail.latLng);

  };

  return (
    <APIProvider
      apiKey={API_KEY}
    // solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <Map
        mapId={"bf51a910020fa25a"}
        defaultZoom={10}
        defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
        onClick={(e) => {
          onMapClick(e);
        }}
      >

        {position && <AdvancedMarker ref={markerRef} position={position} />}

      </Map>
      <MapControl position={ControlPosition.TOP}>
        <div className="autocomplete-control">
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </div>
      </MapControl>
      <MapHandler place={selectedPlace} marker={marker} position={position} />
    </APIProvider>
  );
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker, position  }: MapHandlerProps | any) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  // useEffect(() => {
  //   if (map && position) {
  //     map.panTo(position);
  //     map.setZoom(18);
  //   }
  // }, [map, position]);

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
