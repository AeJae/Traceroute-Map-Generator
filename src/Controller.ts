import NetworkManager from "./NetworkManager.js";
import Map from "./Map.js";
console.log("READY: Controller");

const net: NetworkManager = new NetworkManager();
const map: Map = new Map("map");
const recentrer: HTMLElement | null = document.getElementById("recentrer");
const title: HTMLElement | null = document.getElementById("changeableTitle");
const titleInputBox: HTMLElement | null = document.getElementById("titleInputBox");
const titleInputForm: HTMLElement | null = document.getElementById("form");
const refreshButton: HTMLElement | null = document.getElementById("refresh");
let titleInputShown: boolean = false;

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
    const data: any[] = await net.getAddresses();
    console.log(data);
}

// Setup
if (title && titleInputForm && recentrer && refreshButton) {
    title.addEventListener("click", titleClicked);
    titleInputForm.addEventListener("submit", hideTitleInput);
    recentrer.addEventListener("click", (): void => {map.recentre(3)});
    refreshButton.addEventListener("click", refreshMap);
} else {
    throw new Error("Could not add event listeners.");
}

// Main
refreshMap();