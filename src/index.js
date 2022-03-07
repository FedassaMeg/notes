import "./style.css";
import { format } from "date-fns";
import Apple from "./apple.jpg"; // placeholder
import testLog from "./alt.js";

const content = document.querySelector(".content");
const projects = [];
const projTemplate = document.querySelector(".project");

let openProject = null;

// generate vars for each project
const projFactory = (id, title, desc, priority) => {
  const notes = ["first note"];
  // const dom = genProjElement(title, desc);
  return { id, title, desc, priority, notes };
};

const newProjTest = projFactory("word", "words", 3);
// content.appendChild(newProjTest.dom);
console.log(newProjTest.title);
console.log(newProjTest.dom);

const modal = document.querySelector(".modal");
const closeModalBtn = modal.querySelector(".close-modal");
// generate the DOM element based on input from the proj object
// using projTemplate as a reference
function genProjElement(title, desc, notes, index) {
  const proj = projTemplate.cloneNode(true);
  proj.id = `project-${index}`;
  const projTitle = proj.querySelector(".project-title");
  projTitle.textContent = title;
  const editBtn = proj.querySelector(".edit-title-btn");
  const expandBtn = proj.querySelector(".expand-btn");
  const projDesc = proj.querySelector(".project-desc");
  projDesc.textContent = desc;

  const noteBtn = proj.querySelector(".new-note");
  noteBtn.style.display = "none";
  // should probably m ove this
  const projNotes = proj.querySelector(".notes-container");


  noteBtn.addEventListener("click", function () {
    const newNote = "new note";
    notes.push(newNote);
    projNotes.innerHTML = '';
    const newNotes = noteGenerate(projNotes, notes, true);
    projects[index].notes = newNotes;
    console.log(projects);
  });

  expandBtn.addEventListener("click", (event) => {
    const noteEditbtns = proj.querySelectorAll(".edit-note-btn");
    if (event.target.textContent === "EXPAND") {
      proj.classList.add("expanded-project");
      Array.from(noteEditbtns).map(
        (btn) => (btn.style.display = "inline-block")
      );
      noteBtn.style.display = "inline-block";
      event.target.textContent = "COLLAPSE";
    } else {
      proj.classList.remove("expanded-project");
      Array.from(noteEditbtns).map((btn) => (btn.style.display = "none"));
      noteBtn.style.display = "none";
      event.target.textContent = "EXPAND";
    }
  });

  editBtn.addEventListener("click", (event) => {
    modal.querySelector(".footer").innerHTML = "";
    const saveModalBtn = document.createElement("button");
    saveModalBtn.classList.add(".save-modal");
    saveModalBtn.textContent = "SAVE";
    modal.querySelector(".footer").append(saveModalBtn);

    openProject = index;
    // if (input.style.display === "none") {
    //   input.style.display = "block";
    // } else {
    //   input.style.display = "none";
    // }
    modal.classList.add("active");

    saveModalBtn.addEventListener("click", () => {
      const inputTitle = modal.querySelector(".project-title-input");
      const inputDesc = modal.querySelector(".project-desc-input");
      const title = inputTitle.value;
      const desc = inputDesc.value;

      const currProject = projects[index];
      currProject.title = title;
      currProject.desc = desc;
      projDesc.textContent = desc;
      projTitle.textContent = title;

      modal.classList.remove("active");
    });
  });

  const delProjBtn = proj.querySelector(".del-project");
  delProjBtn.addEventListener("click", function () {
    console.log("testing del project");
    console.log(index);
    projects.splice(index, 1);
    displayController.regenDom();
  });


  // go through notes array and generate a new note element for each item in array
 const newNotes = noteGenerate(projNotes, notes, false);

 return proj;
}

closeModalBtn.addEventListener("click", () => modal.classList.remove("active"));

// new project note creator
function newProjHandler() {
  const id = 1;
  const title = "Project Title"; // prompt("enter project title: ");
  const desc = "Project Description"; // prompt("Enter project description: ");
  const newProj = projFactory(id, title, desc, 3);
  projects.push(newProj);
  // console.log(projects);
  displayController.regenDom();
}

function delProjHandler() {
  projects.splice(index, 1);
  displayController.regenDom();
}

function newNoteHandler() {
  const newNote = "this";
  notes.push(newNote); // how do I access 'notes' if i can't use params
  console.log(notes);
  displayController.regenDom();
}

function noteGenerate(container, notes, isEdit) {
  for (let [index, note] of notes.entries()) {
    const btnCntr = document.createElement("div");
    const noteContent = document.createElement("div");
    noteContent.classList.add("note");
    const noteText = document.createElement("div");
    noteText.textContent = note;
    const noteDel = document.createElement("button");
    noteDel.textContent = "X";
    const noteEdit = document.createElement("button");
    noteEdit.classList.add("edit-note-btn");
    noteEdit.textContent = "EDIT";
    noteEdit.style.display = !isEdit ? "none" : "inline-block";
    
    const textarea = document.createElement("textarea");
    textarea.style.display = "none";
    textarea.classList.add("textarea-note")
    
    
    // should probably move this somewhere outside
    noteDel.addEventListener("click", function () {
      notes.splice(index, 1);
      noteContent.remove();
    });
    
    noteEdit.addEventListener("click", () => {
      if(noteEdit.textContent === "EDIT") {
        textarea.style.display = "block";
        textarea.value = note;
        noteText.style.display = "none";
        noteEdit.textContent = "SAVE";
      } else {
        textarea.style.display = "none";
        notes[index] = textarea.value;
        noteText.textContent = notes[index];
        noteText.style.display = "block";
        noteEdit.textContent = "EDIT";
      }
    })

    btnCntr.append(noteDel, noteEdit);
    noteContent.append(noteText, textarea, btnCntr);
    container.append(noteContent);
  }
  return notes;
}

// for (const [index, note] of notes.entries()) {

const displayController = (() => {
  const regenDom = () => {
    console.log("DC log 1");
    content.innerHTML = "";
    for (const [index, ele] of projects.entries()) {
      console.log(ele.title);
      const tempEle = genProjElement(ele.title, ele.desc, ele.notes, index);
      console.log(ele.notes);
      content.appendChild(tempEle);
    }
  };
  return { regenDom };
})();

const newButton = document.getElementById("proj-button");
newButton.addEventListener("click", newProjHandler);

// generate first note
newProjHandler();

// test that date-fns is working
// (function generateSample() {
//   const newDate = format(new Date(2022, 2, 5), 'yyyy-MM-dd');
//   const ele = document.createElement('div');
//   ele.textContent = newDate;
//   content.appendChild(ele);
//   testLog();
// })();
