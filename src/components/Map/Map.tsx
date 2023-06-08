import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import '@/styles/map.scss'
//import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
//import 'leaflet-defaulticon-compatibility'
import { CardAttributes, Bounds } from '@/Types';
import { useRef } from 'react';
import markerIcon from './markerIcon';

type Props = {
    data: CardAttributes[],
    selectedPoint: {lat: number, lng: number} | undefined,
    originalCenter: {lat: number, lng: number},
    emitBounds: (bounds: Bounds) => void,
}

const southWest = [-270, 270];
const northEast = [270, -270];
const maxBounds = [southWest, northEast];

const processCenter = (coor : {lat: number, lng: number}) : {lat: number, lng: number} => {
    return {lat: coor.lat, lng: (coor.lng - 20)};
}

const SetView = ({ animateRef, center }: any) => {

    const map = useMap();

    map.setView(center, map.getZoom(), {
        animate: animateRef.current || false,
    })
    
    return null;
}

const GetBoundary = ({ emitBounds, emitCenter }: any) => {

    const updateBounds = (e: any) => {
        emitBounds(e.target.getBounds());
        emitCenter(e.target.getCenter());
    }

    useMapEvents({
        dragend: updateBounds,
        zoomend: updateBounds,
    })
    
    return null;
}

const Map = ({ data, selectedPoint, originalCenter, emitBounds }: Props) => {	

    const animateRef = useRef(false);

    const getBounds = (bounds: Bounds) => {
        emitBounds(bounds);
    }

    const [center, setCenter] = useState(originalCenter);

    useEffect(() => {
        setCenter(processCenter(originalCenter));
    }, [originalCenter]);

    return (
        <MapContainer 
            className="map"
            center={center}
            zoom={3} 
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GetBoundary emitBounds={getBounds} emitCenter={(val: any) => {setCenter(val)}}/>
            <SetView animateRef={animateRef} center={center}/> 
            <ZoomControl position="bottomright" />
            {
                Array.isArray(data) && data.length > 0 && data.map((item, i) => {
                    return (
                        item.latlng !== undefined && 
                        <Marker
                            icon={markerIcon('blue')}
                            position={item.latlng}
                            key = {i}
                        >
                            <Popup>
                                <a href={item.object} target='_blank'>TriplyDB<i className='bx bx-link-external ml-1' /></a>
                            </Popup>
                        </Marker>
                    )
                })
            }
            {!!selectedPoint && <Marker icon={markerIcon('red')} position={selectedPoint}/>}
        </MapContainer>
    )
}

export default Map;