import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvents, useMapEvent } from 'react-leaflet'
import '@/styles/map.scss'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility'
import { CardAttributes, Bounds } from '@/Types';
import { useRef } from 'react';

type Props = {
    data: CardAttributes[],
    originalCenter: {lat: number, lng: number},
    emitBounds: (bounds: Bounds) => void,
}

const southWest = [-270, 270];
const northEast = [270, -270];
const maxBounds = [southWest, northEast];

const processCenter = (coor : {lat: number, lng: number}) : {lat: number, lng: number} => {
    return {lat: coor.lat, lng: (coor.lng - 90)};
}

const SetView = ({ animateRef, coor }: any) => {

    
    const map = useMap();

    map.setView(coor, map.getZoom(), {
        animate: animateRef.current || false,
    })
    
    return null;
}

const GetBoundary = ({ emitBounds, emitCenter }: any) => {

    const updateBounds = (e: any) => {
        emitBounds(e.target.getBounds());
        emitCenter(e.target.getCenter());
        console.log(e.target);
        console.log(e.target.getCenter());
    }

    const map = useMapEvents({
        dragend: updateBounds,
        zoomend: updateBounds,
    })
    
    return null;
}

const Map = ({ data, originalCenter, emitBounds }: Props) => {	

    const animateRef = useRef(false);
    //const [bounds, setBounds] = useState(undefined as Bounds);

    const getBounds = (coor: Bounds) => {
        //setBounds(coor);
        emitBounds(coor);
    }

    const [center, setCenter] = useState(originalCenter);
    
    useEffect(() => {
        console.log("originalCenter: "+originalCenter.lat + " , " + originalCenter.lng)
    }, [center]);

    useEffect(() => {
        console.log("originalCenter: "+originalCenter.lat + " , " + originalCenter.lng)
        setCenter(processCenter(originalCenter));
    }, [originalCenter]);

    return (
        <MapContainer 
            className="map"
            center={center}
            zoom={3.4} 
            zoomControl={false}
            maxBounds={maxBounds}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SetView animateRef={animateRef} coor={center}/>
            <GetBoundary emitBounds={getBounds} emitCenter={(val: any) => {setCenter(val)}}/>
            <ZoomControl position="bottomright" />
            {
                        Array.isArray(data) && data.map((item, i) => {
                            return (
                                <Marker
                                    position={item.geoLocation}
                                    key = {i}
                                    eventHandlers={{
                                        click: (e: any) => {
                                            console.log('marker clicked', e, item.geoLocation)
                                        },
                                    }}
                                >
                                    <Popup>
                                        {`${item.geoLocation[0]}, ${item.geoLocation[1]}`}
                                    </Popup>
                                </Marker>
                            )
                        })
            }
        </MapContainer>
    )
}

export default Map;