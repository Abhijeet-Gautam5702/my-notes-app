const storageDiv = document.querySelector(".storage-container");

//render the previously stored notes from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const arr = JSON.parse(localStorage.getItem("myNotes"));
  //if somehow, the localStorage has nothing by default, then reset the system
  if (arr === null) {
    reset();
  }
  render(arr);
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", function () {
  const titleEl = document.getElementById("title");
  const notesEl = document.getElementById("notes");

  const itemObject = {
    title: titleEl.value,
    notes: notesEl.value,
  };
  //fetch the array containing previous Notes from localStorage
  const fetchPrevNotes = JSON.parse(localStorage.getItem("myNotes"));
  //update the array and push it again in the localStorage
  fetchPrevNotes.push(itemObject);
  localStorage.setItem("myNotes", JSON.stringify(fetchPrevNotes));

  //render the latest note
  const n = fetchPrevNotes.length;
  storageDiv.innerHTML += 
  `
    <hr class = "divider" />
    <div class = "note-container">
      <h3 class = "note-title"> ${fetchPrevNotes[n - 1].title} </h3>
      <p class = "note-content">${fetchPrevNotes[n - 1].notes}</p>
    </div>
  `;
  // storageDiv.classList.toggle("container-css");

  //clear the input boxes after save-btn is clicked
  titleEl.value = "";
  notesEl.value = "";
});

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function () {
  reset();
});

//reset the complete system => inserts empty array in localStorage
function reset() {
  const empty = [];
  localStorage.setItem("myNotes", JSON.stringify(empty));
  render(empty);
  storageDiv.classList.remove("container-css");
}

//render the notes from the array to the screen
function render(arr) {
  let x = "";
  for (let i = 0; i < arr.length; i++) {
    x += `
    <hr class = "divider" />
    <div class = "note-container">
      <h3 class = "note-title"> ${arr[i].title} </h3>
      <p class = "note-content">${arr[i].notes}</p>
    </div>`;
  }
  storageDiv.innerHTML = x;
  storageDiv.classList.add("container-css");
}
