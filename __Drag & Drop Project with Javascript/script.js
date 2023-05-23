// target all required elements
const dropArea = document.getElementById("dropArea");
const dragText = dropArea.querySelector("h1");
const browseBtn = document.getElementById("browse");
const cancelBtn = document.getElementById("cancel");
const input = dropArea.querySelector("input");
let file;

browseBtn.addEventListener("click", () => {
    input.click();// if user clicks on the button then the input will be clicked
});

input.addEventListener("change", function() {
    file = this.files[0];
    showFile();
    dropArea.classList.add("active");
});

// if user drag file over dropArea
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

// if user leaves dropArea
dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

// if user drops file
dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    showFile(); // calling function
});

// iF user clicks on the cancel button
cancelBtn.addEventListener("click", () => {
    window.location.reload();
});

// Function to show the file
function showFile() {
    let fileType = file.type;

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if(validExtensions.includes(fileType)) {
        let fileReader = new FileReader(); //crating new file object
        fileReader.onload = () => {
            let fileURL = fileReader.result;// passing user file source in file url variable

            let imgTag =  `<img src="${fileURL}" alt="">`; // creating an img tag and passing user selectd file soruce inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside droparea container
            cancelBtn.style.display = "block";
        }
        fileReader.readAsDataURL(file);
    }
    else {
        alert("this is not an image file");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}  

