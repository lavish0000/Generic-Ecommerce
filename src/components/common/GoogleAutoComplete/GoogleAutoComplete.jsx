import React, { useEffect, useRef, useState } from "react";

import GoogleMap from "../../helper/GoogleMaps/GoogleMaps";
import Marker from "../../helper/UI/Marker/Marker";

const GoogleAutoComplete = ({children, onChange}) => {

    const inputRef = useRef(null);
    const searchBoxRef = useRef(null);
    const [places, setPlaces] = useState([]);
    const [mapConfig, setMapConfig] = useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
    })

    const apiHasLoaded = (map, maps) => {
        setMapConfig({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
    };

    const addPlace = (place) => {
        setPlaces(place);
    };

    const clearSearchBox = () => {
        inputRef.current.value = '';
    }

    const onPlacesChanged = () => {
        const selected = searchBoxRef.current.getPlaces();
        const { 0: place } = selected || {};
        if (!place.geometry) return;
        if (place.geometry.viewport) {
            mapConfig.mapInstance.fitBounds(place.geometry.viewport);
        } else {
            mapConfig.mapInstance.setCenter(place.geometry.location);
            mapConfig.mapInstance.setZoom(17);
        }

        addPlace(selected);
        onChange({name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()});
        inputRef.current.blur();
    };

    useEffect(() => {
        if (mapConfig.mapApiLoaded) {
            searchBoxRef.current = new mapConfig.mapApi.places.SearchBox(inputRef.current);
            searchBoxRef.current.addListener('places_changed', onPlacesChanged);
            searchBoxRef.current.bindTo('bounds', mapConfig.mapInstance);
        }

        return () => mapConfig.mapApi?.event?.clearInstanceListeners(searchBoxRef.current);
        // eslint-disable-next-line
    }, [mapConfig.mapApiLoaded])

    return (
        <React.Fragment>
            {mapConfig.mapApiLoaded && children(clearSearchBox, inputRef)}
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{
                    lat: 59.95,
                    lng: 30.33
                }}
                bootstrapURLKeys={{
                    libraries: ['places', 'geometry'],
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
            >
                {places.length
                    && places.map((place) => (
                        <Marker
                            key={place.place_id}
                            text={place.name}
                            lat={place.geometry.location.lat()}
                            lng={place.geometry.location.lng()}
                        />
                    ))}
            </GoogleMap>
        </React.Fragment>
    )
}

export default GoogleAutoComplete
