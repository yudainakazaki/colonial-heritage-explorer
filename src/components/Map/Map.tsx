import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import '@/styles/map.scss'
import { CardAttributes, Bounds } from '@/Types';
import { useRef } from 'react';
import markerIcon from './markerIcon';
import L from 'leaflet'

type Props = {
    data: CardAttributes[],
    selectedPoint: {lat: number, lng: number} | undefined,
    originalCenter: {lat: number, lng: number},
    emitBounds: (bounds: Bounds) => void,
}

const southWest = {lat: -90, lng: 240};
const northEast = {lat: 90, lng: -240};
const maxBounds = L.latLngBounds(southWest, northEast);

const processCenter = (coor : {lat: number, lng: number}, window: number, zoom: number) : {lat: number, lng: number} => {
    const diff = window > 1300 ? 90 * 3/(zoom*zoom) :
                zoom < 5 ? 180 * 3/(zoom*zoom) :
                zoom < 7 ? 30 * 2/zoom : (12/zoom) * 1/zoom*zoom
                    
    return {lat: coor.lat, lng: coor.lng - diff};
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

const GetZoom = ({ emitZoom }: any) => {
    const map = useMap();
    useMapEvents({
        zoomend: () => emitZoom(map.getZoom())
    })
    return null;
}

const Map = ({ data, selectedPoint, originalCenter, emitBounds }: Props) => {	

    const animateRef = useRef(false);
    const windowWidth = window.innerWidth;
    const [zoom, setZoom] = useState(3);

    const getBounds = (bounds: Bounds) => {
        emitBounds(bounds);
    }

    const getZoom = (curZoom: number) => {
        setZoom(curZoom);
    }

    const [center, setCenter] = useState(originalCenter);

    useEffect(() => {
        setCenter(processCenter(originalCenter, windowWidth, zoom));
    }, [originalCenter]);

    return (
        <MapContainer 
            className="map"
            center={center}
            zoom={3} 
            zoomControl={false}
            maxBounds={maxBounds}
            maxZoom={10}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GetBoundary emitBounds={getBounds} emitCenter={(val: any) => {setCenter(val)}}/>
            <GetZoom emitZoom={getZoom}/>
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