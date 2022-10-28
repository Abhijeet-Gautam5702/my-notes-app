const myNotes = [];

const storageDiv = document.querySelector(".storage-container");

// document.addEventListener("DOMContentLoaded", renderNotesFromStorage());

const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", function () {
  const titleEl = document.getElementById("title");
  const notesEl = document.getElementById("notes");

  const itemObject = {
    title: titleEl.value,
    notes: notesEl.value,
  };

  //   myNotes = JSON.parse(localStorage.getItem("Notes"));
  //   localStorage.clear("Notes");
  myNotes.push(itemObject);
  //   localStorage.setItem("Notes", JSON.stringify(myNotes));

  //putting the notes in storage-container
  //   renderNotesFromStorage();
  /*
  storageDiv.innerHTML += 
  `
  <p class = "note-container">
    <h3> ${myNotes[0].title} </h3>
    ${myNotes[0].notes} 
  </p>
  `
  */

  //clear the input boxes after save-btn is clicked
  titleEl.value = "";
  notesEl.value = "";
});

// function renderNotesFromStorage() {
//   const notesArr = JSON.parse(localStorage.getItem("Notes"));
//   // console.log(notesArr)
//   // console.log(typeof notesArr)
//   for (let i = 0; i < notesArr.length; i++) {
//     storageDiv.innerHTML += `
//     <p class = "note-container">
//       <h3> ${notesArr[i].title} </h3>
//       ${notesArr[i].notes}
//     </p>
//     `;
//   }
// }
