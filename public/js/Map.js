// Uses Leaflet: https://leafletjs.com/
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.esm.js";
// UEA Map Tile
const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> | <a id="recentrer" href="javascript:void(0)">Recentre</a>'
});
// Default map location and zoom
const defaultLoc = new L.LatLng(25, 0);
const defaultZoom = 3;
// Icon Source: https://github.com/pointhi/leaflet-color-markers
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [18, 28], // 25, 41
    iconAnchor: [10, 28], // 12, 41
    popupAnchor: [-0.9, -25], // 1, -34
    shadowSize: [28, 28] // 41, 41
});
export default class Map {
    mapObjects = L.layerGroup();
    points = [];
    markerNum = 0;
    map;
    constructor(targetElement) {
        try {
            this.map = L.map(targetElement).setView(defaultLoc, defaultZoom);
            tile.addTo(this.map);
            this.mapObjects.addTo(this.map);
            console.log("READY: Map");
        }
        catch (e) {
            console.error(`FAILED: Could not add map to element '${targetElement}'.`);
            throw e;
        }
    }
    // Adds the passed marker to the map.
    addMarker(latLongArr, ip) {
        if (latLongArr[0] && latLongArr[1]) {
            const latLng = new L.LatLng(latLongArr[0], latLongArr[1]);
            L.marker(latLng, { icon: blueIcon }).bindPopup(`<b>${ip}</b></br>Hop ${this.markerNum}`, { autoClose: false }).addTo(this.mapObjects);
            this.markerNum++;
            this.points.push(latLng);
        }
        else {
            console.error(`No marker to add for hop ${this.markerNum}.`);
            this.markerNum++;
        }
    }
    // Draws a line between the markers, in order of addition.
    drawLine() {
        const line = L.polyline(this.points, { color: '#047adc' }).addTo(this.mapObjects);
        setTimeout(() => {
            this.map.fitBounds(line.getBounds());
            setTimeout(() => { this.openPopups(); }, 525);
        }, 300);
    }
    // Opens all marker popups.
    openPopups() {
        this.mapObjects.eachLayer((obj) => {
            obj.openPopup();
        });
    }
    // Removes all objects from the map.
    wipe() {
        this.mapObjects.clearLayers();
        this.markerNum = 0;
        this.points = [];
    }
    // Recentres and resets the zoom of the map
    recentre(zoomLevel) {
        this.map.setView(defaultLoc, zoomLevel);
        console.log("Map recentred.");
    }
}
