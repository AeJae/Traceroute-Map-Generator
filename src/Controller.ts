import Map from "./Map.js";
console.log("Controller loaded.");

const map: Map = new Map("map");
const recentrer: HTMLElement | null = document.getElementById("recentrer");
const title: HTMLElement | null = document.getElementById("changeableTitle");
const titleInputBox: HTMLElement | null = document.getElementById("titleInputBox");
const titleInputForm: HTMLElement | null = document.getElementById("form");
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

// Main
if (title && titleInputForm) {
    title.addEventListener("click", titleClicked);
    titleInputForm.addEventListener("submit", hideTitleInput);
} else {
    throw new Error("Could not add title related event listeners.");
}

if (recentrer) recentrer.addEventListener("click", (): void => {map.recentre(3)});