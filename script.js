// global variable, to tell if addNewSection is allowed or if it is avtive already.
active = false;

function addNewSection() {
    if (active) {
        alert("Please first enter some data");
        return;
    }
    active = true; // function active => waits for Save-Button Event

    const cardList = document.getElementById("card-list");
    const sectionId = "temp-sectionId"; // is changed later to user-input

    addNewLiDivElement(cardList, sectionId);
    const sectionDiv = document.getElementById(sectionId);
    
    addInputsToSection(sectionDiv);
    

    // insert image here
    // sectionDiv.innerHTML += "<ol><li>a</li><li>d</li></ol>";
}

function addNewLiDivElement (cardList, sectionId) {
    // create <li> El. + new <div> El. with id=sectionId
    const listItem = document.createElement("li");
    const sectionDiv = document.createElement("div");
    sectionDiv.id = sectionId;
    sectionDiv.classList.add("sectionDiv"); // for .css

    listItem.appendChild(sectionDiv);

    // Add <li> El. to "card-list"
    cardList.appendChild(listItem);
}

function addInputsToSection(sectionDiv) {
    addInputSectionId(sectionDiv)
    addInputImage(sectionDiv)
    addSaveButton(sectionDiv)
}

function addInputSectionId(sectionDiv) {
    // Create Input for the sectionId
    const sectionIdInput = document.createElement("input");
    sectionIdInput.type = "text";
    sectionIdInput.placeholder = "Enter section ID";
    sectionDiv.appendChild(sectionIdInput);
}

function addInputImage(sectionDiv) {
    // Create Input for the sectionId
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*"; // support all img-formats
    sectionDiv.appendChild(imageInput);
}

function addSaveButton(sectionDiv) {
    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.id = "saveButton";
    saveButton.addEventListener("click", function() {
        saveSection(sectionDiv);
    })
    sectionDiv.appendChild(saveButton)
}

function saveSection(sectionDiv) {
    active = false; // done => allow addNewSection
    
    saveSectionName(sectionDiv);
    saveSectionImages(sectionDiv);

    deleteInputSectionId(sectionDiv);
}

function saveSectionName(sectionDiv) {
    const sectionDivInput = sectionDiv.querySelector('input[type="text"]'); // take text input
    sectionDiv.id = sectionDivInput.value; // take user input
    sectionDiv.innerHTML = sectionDiv.id; // Change name of section to sectionId
}

function saveSectionImages(sectionDiv) {
    const sectionDivInput = sectionDiv.querySelector('input[type="file"]')
    // Check if a file is selected:
    if(sectionDivInput.files.length > 0){
        const file = sectionDivInput.files[0];

        //Check if the file is an image:
        if(file.type.startsWith('image/')) {
            // 1. Create img-Element !
            const img = document.createElement('img');
            const imgContainer = document.createElement('div');
            // 2. Create URL link ! (with objectURL)
            img.src = URL.createObjectURL(file); 
            // 3. Put the img in the Div !
            imgContainer.appendChild(img);
            sectionDiv.appendChild(imgContainer);
        } else {
            console.error("Selected file is not an image.")
        }
    } else {
        console.warn("No file selected.")
    }
}

// function deleteSectionId(sectionDiv) {
//     // Remove the whole section with the given ID
    
//     if (sectionDiv) {
//         sectionDiv.remove();
//     }
// }


function deleteInputSectionId(sectionDiv) {
    // Select all Input-El. in sectionDiv 
    const inputElements = sectionDiv.querySelectorAll('input');

    // delete all Input-El.
    inputElements.forEach(input => {
        input.remove();
    });
}

