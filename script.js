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
const titleEl = document.getElementById("title");
const notesEl = document.getElementById("notes");
saveBtn.addEventListener("click", function () {
  if (!editFlag) {
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
  } else {
    editLocalStorage(editID, titleEl.value, notesEl.value);
    editFlag = false;
    saveBtn.textContent = "Save";
  }
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
        <h3 class = "note-title">${arr[i].title}</h3>
        <p class = "note-content">${arr[i].notes}</p>
      </div>
      <div class = "control-btn-container">
        <img class = "edit-icon" src = "edit-icon.png" alt="edit">
        <img class = "dlt-icon" src = "dlt-icon.png" alt="dlt">
      </div>
    </div>`;
  }
  storageDiv.innerHTML = x;
  storageDiv.classList.add("container-css");

  //add event listener for edit/delete-btns
  const dltBtns = storageDiv.querySelectorAll(".dlt-icon");
  const editBtns = storageDiv.querySelectorAll(".edit-icon");
  for (let i = 0; i < dltBtns.length; i++) {
    dltBtns[i].addEventListener("click", deleteItem);
  }
  for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener("click", editItem);
  }
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.getAttribute("data-id");
  storageDiv.removeChild(element);
  //delete item from localStorage
  let items = JSON.parse(localStorage.getItem("myNotes"));
  items = items.filter(function (item) {
    if (item.id != id) {
      return item;
    }
  });
  localStorage.setItem("myNotes", JSON.stringify(items));
}

let editFlag = false;
let editID = "";
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.getAttribute("data-id");

  const title = element.querySelector(".note-title").textContent;
  const note = element.querySelector(".note-content").textContent;

  titleEl.value = title;
  notesEl.value = note;
  saveBtn.textContent = "Edit";
  editFlag = true;
  editID = id;
}

function editLocalStorage(id, title, note) {
  let items = JSON.parse(localStorage.getItem("myNotes"));
  // console.log(items);
  items = items.filter(function (item) {
    if (item.id != id) {
      return item;
    } else if (item.id == id) {
      item.title = title;
      item.notes = note;
      return item;
    }
  });
  localStorage.setItem("myNotes", JSON.stringify(items));
  render(items);
}
