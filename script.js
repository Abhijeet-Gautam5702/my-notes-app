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
  const id = Math.random();

  const itemObject = {
    id: id,
    title: titleEl.value,
    notes: notesEl.value,
  };
  //fetch the array from localStorage
  const notes = JSON.parse(localStorage.getItem("myNotes"));
  //update the array and push it again in the localStorage
  notes.push(itemObject);
  localStorage.setItem("myNotes", JSON.stringify(notes));

  render(notes);

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
    
    <div class = "note-container" data-id = ${arr[i].id}>
      <div class = "note-content-container">
        <h3 class = "note-title"> ${arr[i].title} </h3>
        <p class = "note-content">${arr[i].notes}</p>
      </div>
      <div class = "control-btn-container">
        <button class = "dlt-btn">delete</button>
      </div>
    </div>`;
  }
  storageDiv.innerHTML = x;
  storageDiv.classList.add("container-css");

  //add event listener for delete-btn
  const dltBtns = storageDiv.querySelectorAll(".dlt-btn");
  for (let i = 0; i < dltBtns.length; i++) {
    dltBtns[i].addEventListener("click", deleteItem);
  }
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  storageDiv.removeChild(element);
  //delete item from localStorage
  const items = JSON.parse(localStorage.getItem("myNotes"));
  for (let i = 0; i < items.length; i++) {
    if (element.getAttribute("data-id") == items[i].id) {
      items.splice(i, 1);
      localStorage.setItem("myNotes", JSON.stringify(items));
    }
  }
}
