import L, { Icon } from "leaflet";
import marker_red from '@/images/marker_red.png';
import marker_blue from '@/images/marker_blue.png';

const markerIcon = (color: string) => new Icon({
    iconUrl: color === 'red' ? marker_red.src : marker_blue.src,
    iconRetinaUrl: color === 'red' ? marker_red.src : marker_blue.src,
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(40, 40),
    iconAnchor: [20, 40],
    popupAnchor: [0, -36],
    zIndex: 10000,
});

export default markerIcon;