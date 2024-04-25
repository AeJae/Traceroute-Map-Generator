// Uses Leaflet: https://leafletjs.com/
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.esm.js";

// UEA Map Tile
const tile: L.TileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> | <a id="recentrer" href="javascript:void(0)">Recentre</a>'
});

// Default map location and zoom
const defaultLoc: L.LatLng = new L.LatLng(25, 0); // 52.62395, 1.29
const defaultZoom: number = 3; // 12

// Icon Source: https://github.com/pointhi/leaflet-color-markers
const blueIcon: L.Icon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default class Map {
    private readonly map: L.Map;
    private markers: L.LayerGroup = L.layerGroup();

    constructor(targetElement: string) {
        try {
            this.map = L.map(targetElement).setView(defaultLoc, defaultZoom);
            tile.addTo(this.map);
            this.markers.addTo(this.map);
            console.log("READY: Map");
        } catch (e) {
            console.error(`FAILED: Could not add map to element '${targetElement}'.`);
            throw e;
        }
    }

    // Adds the passed marker to the map.
    private addMarker(marker: L.Marker): void {
        marker.addTo(this.markers);
    }

    // Removes the passed marker from the map.
    private removeMarker(marker: L.Marker): void {
        marker.removeFrom(this.map);
    }

    // Removes all markers from the map.
    private wipe(): void {
        this.markers.clearLayers();
    }

    // Recentres and resets the zoom of the map
    public recentre(zoomLevel: number): void {
        this.map.setView(defaultLoc, zoomLevel);
        console.log("Map recentred.");
    }
}