import Map from "./Map.js";
console.log("Controller loaded.");

const map: Map = new Map("map");
const title: HTMLElement | null = document.getElementById("changeableTitle");
const titleInputBox: HTMLElement | null = document.getElementById("titleInputBox");
const titleInputForm: HTMLElement | null = document.getElementById("form");
let titleInputShown: boolean = false;

function setTitle(newTitle: string): void {
    if (title) {
        title.innerText = newTitle;
    } else {
        throw new Error("Could not find title element.");
    }
}

function hideTitleInput(): void {
    if (titleInputBox) {
        // Return to Sass styling.
        titleInputShown = false;
        titleInputBox.style.visibility = "";
        titleInputBox.style.height = "";
    }
}

function showTitleInput(): void {
    if (titleInputBox) {
        titleInputShown = true;
        titleInputBox.style.visibility = "visible";
        titleInputBox.style.height = "100px";
    }
}

function titleClick(): void {
    if (titleInputBox) {
        if (titleInputShown) {
            hideTitleInput();
        } else {
            showTitleInput();
        }
    }
}

if (title) {
    title.addEventListener("click", titleClick);
}

if (titleInputForm) {
    titleInputForm.addEventListener("submit", hideTitleInput)
}