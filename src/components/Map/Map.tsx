import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import '@/styles/map.scss'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

const position = [51.505, -0.09]
const positions = [
    [51.505, -0.09],
    [50, 50],
    [55, 45],
    [30, 42],
    [78, 90],
    [87, 20],
]

const Map = () => {	
    return (
        <MapContainer 
            className="map"
            center={position} 
            zoom={7} 
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></TileLayer>
            <ZoomControl position="bottomright"></ZoomControl>
            {
                positions.map((pos, i) => {
                    return (
                        <Marker 
                            position={pos}
                            key = {i}
                            eventHandlers={{
                                click: (e: any) => {
                                    console.log('marker clicked', e, pos)
                                },
                            }}
                        >
                            <Popup>
                                {`${pos[0]}, ${pos[1]}`}
                            </Popup>
                        </Marker>
                    )
                })
            }
        </MapContainer>
    )
}

export default Map;