// INIT
import NetworkManager from "./NetworkManager.js";
import Map from "./Map.js";
console.log("AWAIT: Controller");


// CONSTANTS AND VARIABLES
const net: NetworkManager = new NetworkManager(false);
const map: Map = new Map("map");
const recentrer: HTMLElement | null = document.getElementById("recentrer");
const title: HTMLElement | null = document.getElementById("changeableTitle");
const titleInputBox: HTMLElement | null = document.getElementById("titleInputBox");
const titleInputForm: HTMLElement | null = document.getElementById("form");
const refreshButton: HTMLElement | null = document.getElementById("refresh");
const openPopupButton: HTMLElement | null = document.getElementById("openPopups");
let titleInputShown: boolean = false;


// FUNCTIONS
// Hides the set title area.
function hideTitleInput(): void {
    if (titleInputBox) {
        // Return to Sass styling.
        titleInputShown = false;
        titleInputBox.style.visibility = "";
        titleInputBox.style.height = "";
    }
}

// Shows the set title area.
function showTitleInput(): void {
    if (titleInputBox) {
        titleInputShown = true;
        titleInputBox.style.visibility = "visible";
        titleInputBox.style.height = "100px";
    }
}

// Decides whether to show or hide the set title area.
function titleClicked(): void {
    if (titleInputBox) {
        if (titleInputShown) {
            hideTitleInput();
        } else {
            showTitleInput();
        }
    }
}

// Loads the IP address JSON file and adds their locations to the map.
async function refreshMap(): Promise<void> {
    map.wipe();
    const addresses: any[] = await net.getAddresses();
    console.log(addresses);
    for (const ip of addresses) {
        console.log(`Requested location of "${ip}".`)
        const coords: number[] = await net.getIPLocation(ip);
        map.addMarker(coords, ip);
    }
    map.drawLine();
}


// SETUP
// EventListeners
if (title && titleInputForm && recentrer && refreshButton && openPopupButton) {
    title.addEventListener("click", titleClicked);
    titleInputForm.addEventListener("submit", hideTitleInput);
    recentrer.addEventListener("click", (): void => {map.recentre(3)});
    refreshButton.addEventListener("click", refreshMap);
    openPopupButton.addEventListener("click", (): void => {map.openPopups()});
} else {
    throw new Error("Could not add event listeners.");
}


// MAIN
console.log("READY: Controller");