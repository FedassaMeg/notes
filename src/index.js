import './style.css';
import { format } from 'date-fns'; 
import Apple from './apple.jpg'; // placeholder
import testLog from './alt.js';

const content = document.querySelector('.content');
const PROJECTS = [];
const projTemplate = document.querySelector('.project');


// generate vars for each project
const projFactory = (title, desc, priority) => {
  const notes = ['first note'];
  // const dom = genProjElement(title, desc);
  return { title, desc, priority, notes};
};


const newProjTest = projFactory('word', 'words', 3);
// content.appendChild(newProjTest.dom);
console.log(newProjTest.title);
console.log(newProjTest.dom);


// generate the DOM element based on input from the proj object
// using projTemplate as a reference
function genProjElement(title, desc, notes) {
  const proj = projTemplate.cloneNode(true);
  const projTitle = proj.querySelector('.project-title');
  projTitle.textContent = title;
  const projDesc = proj.querySelector('.project-desc');
  projDesc.textContent = desc;


  const noteBtn = proj.querySelector('.new-note');
  // should probably m ove this

  noteBtn.addEventListener("click", function() {
    const newNote = 'new note';
    notes.push(newNote);
    console.log(notes);
    displayController.regenDom();
  });

  const delProjBtn = proj.querySelector('.del-project');
  delProjBtn.addEventListener("click", function() {
    console.log('testing del project');
  })


  const projNotes = proj.querySelector('.notes-container');

  // go through notes array and generate a new note element for each item in array
  for (const [index, note] of notes.entries()) {
    const noteContent = document.createElement('div');
    noteContent.classList.add('note');
    const noteText = document.createElement('div');
    noteText.textContent = note;
    const noteDel = document.createElement('button');
    noteDel.textContent = 'X';

    // should probably move this somewhere outside
    noteDel.addEventListener('click', function() {
      console.log(index);
      notes.splice(index, 1);
      displayController.regenDom();
    })

    noteContent.append(noteText, noteDel);
    projNotes.appendChild(noteContent);
  }

  return proj;
};

// new project note creator
function newProjHandler() {
  const title = "Project Title"; // prompt("enter project title: ");
  const desc =  "Project Description"; // prompt("Enter project description: ");
  const newProj = projFactory(title, desc, 3);
  PROJECTS.push(newProj);
  // console.log(PROJECTS);
  displayController.regenDom();
}

function delProjHandler() {
  PROJECTS.splice(index, 1);
  displayController.regenDom();
}

function newNoteHandler() {
  const newNote = 'this';
  notes.push(newNote); // how do I access 'notes' if i can't use params
  console.log(notes);
  displayController.regenDom();
}

const displayController = (() => {
  const regenDom = () => {
    console.log('DC log 1');
    content.innerHTML = '';
    for (const ele of PROJECTS) {
      console.log(ele.title);
      const tempEle = genProjElement(ele.title, ele.desc, ele.notes);
      console.log(ele.notes);
      content.appendChild(tempEle);
    }
  }
  return {regenDom}
})();

const newButton = document.getElementById('proj-button');
newButton.addEventListener("click", newProjHandler)

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