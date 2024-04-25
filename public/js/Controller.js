import NetworkManager from "./NetworkManager.js";
import Map from "./Map.js";
console.log("READY: Controller");
const net = new NetworkManager();
const map = new Map("map");
const recentrer = document.getElementById("recentrer");
const title = document.getElementById("changeableTitle");
const titleInputBox = document.getElementById("titleInputBox");
const titleInputForm = document.getElementById("form");
const refreshButton = document.getElementById("refresh");
let titleInputShown = false;
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
    const data = await net.getAddresses();
    console.log(data);
}
// Setup
if (title && titleInputForm && recentrer && refreshButton) {
    title.addEventListener("click", titleClicked);
    titleInputForm.addEventListener("submit", hideTitleInput);
    recentrer.addEventListener("click", () => { map.recentre(3); });
    refreshButton.addEventListener("click", refreshMap);
}
else {
    throw new Error("Could not add event listeners.");
}
// Main
refreshMap();
