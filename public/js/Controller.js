// INIT
import NetworkManager from "./NetworkManager.js";
import Map from "./Map.js";
console.log("AWAIT: Controller");
// CONSTANTS AND VARIABLES
const net = new NetworkManager(true);
const map = new Map("map");
const recentrer = document.getElementById("recentrer");
const title = document.getElementById("changeableTitle");
const titleInputBox = document.getElementById("titleInputBox");
const titleInputForm = document.getElementById("form");
const refreshButton = document.getElementById("refresh");
const openPopupButton = document.getElementById("openPopups");
let titleInputShown = false;
// FUNCTIONS
// Hides the set title area.
function hideTitleInput() {
    if (titleInputBox) {
        // Return to Sass styling.
        titleInputShown = false;
        titleInputBox.style.visibility = "";
        titleInputBox.style.height = "";
    }
}
// Shows the set title area.
function showTitleInput() {
    if (titleInputBox) {
        titleInputShown = true;
        titleInputBox.style.visibility = "visible";
        titleInputBox.style.height = "100px";
    }
}
// Decides whether to show or hide the set title area.
function titleClicked() {
    if (titleInputBox) {
        if (titleInputShown) {
            hideTitleInput();
        }
        else {
            showTitleInput();
        }
    }
}
// Loads the IP address JSON file and adds their locations to the map.
async function refreshMap() {
    map.wipe();
    const addresses = await net.getAddresses();
    console.log(addresses);
    for (const ip of addresses) {
        console.log(`Requested location of "${ip}".`);
        const coords = await net.getIPLocation(ip);
        map.addMarker(coords, ip);
    }
    map.drawLine();
}
// SETUP
// EventListeners
if (title && titleInputForm && recentrer && refreshButton && openPopupButton) {
    title.addEventListener("click", titleClicked);
    titleInputForm.addEventListener("submit", hideTitleInput);
    recentrer.addEventListener("click", () => { map.recentre(3); });
    refreshButton.addEventListener("click", refreshMap);
    openPopupButton.addEventListener("click", () => { map.openPopups(); });
}
else {
    throw new Error("Could not add event listeners.");
}
// MAIN
console.log("READY: Controller");
