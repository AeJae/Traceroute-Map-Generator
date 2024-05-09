// Uses Leaflet: https://leafletjs.com/
import * as L from "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.esm.js";

// UEA Map Tile
const tile: L.TileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> | <a id="recentrer" href="javascript:void(0)">Recentre</a>'
});

// Default map location and zoom
const defaultLoc: L.LatLng = new L.LatLng(25, 0);
const defaultZoom: number = 3;

// Icon Source: https://github.com/pointhi/leaflet-color-markers
const blueIcon: L.Icon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [18, 28], // 25, 41
    iconAnchor: [10, 28], // 12, 41
    popupAnchor: [-0.9, -25], // 1, -34
    shadowSize: [28, 28] // 41, 41
});

export default class Map {
    private mapObjects: L.LayerGroup = L.layerGroup();
    private points: L.LatLng[] = [];
    private markerNum: number = 0;
    private readonly map: L.Map;

    constructor(targetElement: string) {
        try {
            this.map = L.map(targetElement).setView(defaultLoc, defaultZoom);
            tile.addTo(this.map);
            this.mapObjects.addTo(this.map);
            console.log("READY: Map");
        } catch (e) {
            console.error(`FAILED: Could not add map to element '${targetElement}'.`);
            throw e;
        }
    }

    // Adds the passed marker to the map.
    public addMarker(latLongArr: number[], ip: string): void {
        if (latLongArr[0] && latLongArr[1]) {
            const latLng: L.LatLng = new L.LatLng(latLongArr[0], latLongArr[1]);
            L.marker(latLng, {icon: blueIcon}).bindPopup(`<b>${ip}</b></br>Hop ${this.markerNum}`,
                {autoClose: false}).addTo(this.mapObjects);
            this.markerNum++;
            this.points.push(latLng);
        } else {
            console.warn(`No marker to add for hop ${this.markerNum}.`);
            this.markerNum++;
        }
    }

    // Draws a line between the markers, in order of addition.
    public drawLine(): void {
        const line: L.Polyline = L.polyline(this.points, {color: '#047adc'}).addTo(this.mapObjects);
        setTimeout((): void => {
            this.map.fitBounds(line.getBounds());
            setTimeout((): void => {this.openPopups()}, 525);
        }, 300)

    }

    // Opens all marker popups.
    public openPopups(): void {
        this.mapObjects.eachLayer((obj: L.Layer): void => {
            obj.openPopup();
        })
    }

    // Removes all objects from the map.
    public wipe(): void {
        this.mapObjects.clearLayers();
        this.markerNum = 0;
        this.points = [];
    }

    // Recentres and resets the zoom of the map
    public recentre(zoomLevel: number): void {
        this.map.setView(defaultLoc, zoomLevel);
        console.log("Map recentred.");
    }
}