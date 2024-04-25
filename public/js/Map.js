// Uses Leaflet: https://leafletjs.com/
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.esm.js";
// UEA Map Tile
const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> | <a id="recentrer" href="javascript:void(0)">Recentre</a>'
});
// Default map location and zoom
const defaultLoc = new L.LatLng(25, 0); // 52.62395, 1.29
const defaultZoom = 3; // 12
// Icon Source: https://github.com/pointhi/leaflet-color-markers
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
export default class Map {
    map;
    markers = L.layerGroup();
    constructor(targetElement) {
        try {
            this.map = L.map(targetElement).setView(defaultLoc, defaultZoom);
            tile.addTo(this.map);
            this.markers.addTo(this.map);
            console.log("Map added.");
        }
        catch (e) {
            console.error(`Could not add map to element '${targetElement}'.`);
            throw e;
        }
    }
    // Adds the passed marker to the map.
    addMarker(marker) {
        marker.addTo(this.markers);
    }
    // Removes the passed marker from the map.
    removeMarker(marker) {
        marker.removeFrom(this.map);
    }
    // Removes all markers from the map.
    wipe() {
        this.markers.clearLayers();
    }
    // Recentres and resets the zoom of the map
    recentre(zoomLevel) {
        this.map.setView(defaultLoc, zoomLevel);
        console.log("Map recentred.");
    }
}
