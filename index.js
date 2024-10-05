let button = document.querySelector("#button1");
let nameInput = document.querySelector("input[name=name]");
let numberInput = document.querySelector("input[name=number]");
let emailInput = document.querySelector("input[name=EMAIL]");
let contactInput = document.querySelector("input[name=contact]");
let history = document.querySelector(".history");

// Load saved data from localStorage on page load
document.addEventListener("DOMContentLoaded", loadEntries);

button.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission
    fillOut();
});

function fillOut() {
    if (!nameInput.value || !numberInput.value || !contactInput.value || !emailInput.value) {
        return;
    }

    let entry = {
        name: nameInput.value,
        number: numberInput.value,
        email: emailInput.value,
        contact: contactInput.value
    };

    // Save entry to localStorage
    saveEntry(entry);
    addEntryToHistory(entry);

    // Clear input fields
    nameInput.value = '';
    numberInput.value = '';
    emailInput.value = '';
    contactInput.value = '';

    addScrollBar();
}

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(addEntryToHistory);
}

function addEntryToHistory(entry) {
    let list = document.createElement('div');
    let para = document.createElement('p');
    let deleteButton = document.createElement('button');
    let resetButton = document.createElement('button');

    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    resetButton.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
    deleteButton.classList.add("trash-button");
    resetButton.classList.add("reset-button");
    list.classList.add("space");
    para.style.marginBottom = '-1px';

    para.innerHTML = `${entry.name}, ${entry.number}, ${entry.email}, ${entry.contact}`;
    list.appendChild(para);
    list.appendChild(deleteButton);
    list.appendChild(resetButton);
    history.appendChild(list);
}

// Delete item functionality
history.addEventListener('click', function(e) {
    if (e.target.classList.contains("trash-button")) {
        const listItem = e.target.parentElement; // Get the parent div
        const data = listItem.querySelector('p').innerHTML.split(', ');

        // Remove the entry from localStorage
        removeEntry(data);

        history.removeChild(listItem); // Remove it from the history
    }

    // Reset item functionality
    if (e.target.classList.contains("reset-button")) {
        const listItem = e.target.parentElement; // Get the parent div
        const data = listItem.querySelector('p').innerHTML.split(', ');

        nameInput.value = data[0];
        numberInput.value = data[1];
        emailInput.value = data[2];
        contactInput.value = data[3];

        history.removeChild(listItem); // Remove the entry from the history
    }
});

function addScrollBar() {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    if (entries.length > 5) {
        history.style.overflowY = "scroll";
        history.style.maxHeight = "620px"; // Set a fixed height for scrolling
    } else {
        history.style.overflowY = "auto"; // Disable scrolling when not needed
    }
}


function removeEntry(data) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries = entries.filter(entry => {
        return entry.name !== data[0] || entry.number !== data[1];
    });
    localStorage.setItem('entries', JSON.stringify(entries));
}
