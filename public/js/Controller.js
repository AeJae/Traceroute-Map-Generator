import Map from "./Map.js";
console.log("Controller loaded.");
const map = new Map("map");
const recentrer = document.getElementById("recentrer");
const title = document.getElementById("changeableTitle");
const titleInputBox = document.getElementById("titleInputBox");
const titleInputForm = document.getElementById("form");
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
// Main
if (title && titleInputForm) {
    title.addEventListener("click", titleClicked);
    titleInputForm.addEventListener("submit", hideTitleInput);
}
else {
    throw new Error("Could not add title related event listeners.");
}
if (recentrer)
    recentrer.addEventListener("click", () => { map.recentre(3); });
