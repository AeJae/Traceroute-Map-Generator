import Map from "./Map.js";
console.log("Controller loaded.");
const map = new Map("map");
const title = document.getElementById("changeableTitle");
const titleInputBox = document.getElementById("titleInputBox");
const titleInputForm = document.getElementById("form");
let titleInputShown = false;
function setTitle(newTitle) {
    if (title) {
        title.innerText = newTitle;
    }
    else {
        throw new Error("Could not find title element.");
    }
}
function hideTitleInput() {
    if (titleInputBox) {
        // Return to Sass styling.
        titleInputShown = false;
        titleInputBox.style.visibility = "";
        titleInputBox.style.height = "";
    }
}
function showTitleInput() {
    if (titleInputBox) {
        titleInputShown = true;
        titleInputBox.style.visibility = "visible";
        titleInputBox.style.height = "100px";
    }
}
function titleClick() {
    if (titleInputBox) {
        if (titleInputShown) {
            hideTitleInput();
        }
        else {
            showTitleInput();
        }
    }
}
if (title) {
    title.addEventListener("click", titleClick);
}
if (titleInputForm) {
    titleInputForm.addEventListener("submit", hideTitleInput);
}
