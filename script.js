import * as messageFunctions from "./modules/notepad.js"

// notepad - message management
let save = document.getElementById('save');
let viewSaved = document.getElementById('viewSaved');
let viewNew = document.getElementById('go-back');
let clearMessages = document.getElementById('clear');

save.addEventListener('click', messageFunctions.submitMessage);
viewSaved.addEventListener('click', messageFunctions.showSavedMessages);
viewNew.addEventListener('click', messageFunctions.showNewMessages);
clearMessages.addEventListener('click', messageFunctions.deleteMessages);

//set global variables 
const start = Date.now(); // grab date at start to figure out index
let clickedNote = false; // for open from file
let clickedTrash = false; // for open from file

/**
 * removes grey drop down: (file+close) + (file+close-all) 
 */
const ungrey = () => {
    closeFromFile.classList.remove('greyed');
    closeAll.classList.remove('greyed');
}

/**
 * greys out drop down: (file+close) + (file+close-all)
 * 
 */
const grey = () => {
    closeFromFile.classList.add('greyed');
    closeAll.classList.add('greyed');
}

/**
 * clicking apple + about this mac will open the about-this-mac popup
 * 
 */
const showAboutMac = (event) => {
    console.log('showing mac info');
    about.classList.toggle('show');
    ungrey();
    const timeSinceStart = (Date.now() - start)/1000;
    about.style['z-index'] = Math.floor(timeSinceStart);
}

let appleAbout = document.getElementById('dropdown-apple__a--about');
let about = document.getElementById('about-this-mac');

appleAbout.addEventListener('click', showAboutMac);

// hiding popups
const hidePopup = (event) => {
    let maxZIndex = getMaxZIndex();
    console.log('closing popup');
    event.path[2].classList.toggle('show');  
    event.path[2].classList.remove('maximise'); 
    event.path[2].style['z-index'] = 0;
    console.log(event);
    maxZIndex = getMaxZIndex();
    console.log(maxZIndex);
    if (maxZIndex == 0) {
        grey();
    }
}

let close = document.getElementsByClassName('fa-solid fa-x');
Array.from(close).forEach((item) => item.addEventListener('click', hidePopup));

// close from file
const closePopUp = (event) => {
    let maxZIndex = getMaxZIndex();
    for (let i = 0; i < popUps.length; i++) {
        if (popUps[i].style['z-index'] == maxZIndex) {
            popUps[i].classList.remove('show');
            popUps[i].style['z-index'] = 0;
            maxZIndex = getMaxZIndex();
        }
        if (maxZIndex == 0) {
            grey();
        }
    }
}

let closeFromFile = document.getElementById('dropdown-file__a--close');
closeFromFile.addEventListener('click', closePopUp)

// close all
const closeAllPopups = () => {
    console.log('closing all windows');
    for (let i = 0; i < popUps.length; i++) {
        popUps[i].classList.remove('show');
        popUps[i].style['z-index'] = 0;
        grey();
    }
}
let closeAll = document.getElementById('dropdown-file__a--close-all');

closeAll.addEventListener('click', closeAllPopups);

// shutting down the mac
const shuttingDown = () => {
    menu.style.display = 'none';
    document.body.classList.toggle('off');
    turnOnPopUp.classList.add('show');    
    closeAllPopups();
    for (let i = 0; i < icon.length; i++) {
        icon[i].style.display = 'none';
    }
    console.log('shutting down');
}

let shutDown = document.getElementById('dropdown-apple__a--sd');
let menu = document.getElementById('main-menu-group');
let turnOnPopUp = document.getElementById('turn-back-on');
let popUps = document.getElementsByClassName('pop-up');

shutDown.addEventListener('click', shuttingDown);

// turning mac back on
const turningOn = () => {
    console.log('turning on');
    menu.style.display = 'block';
    document.body.classList.toggle('off');
    turnOnPopUp.classList.remove('show');
    for (let i = 0; i < icon.length; i++) {
        icon[i].style.display = 'block';
    }
}

let turnOn = document.getElementById('turn-on-btn');
turnOn.addEventListener('click', turningOn);

// (un/)highlight clicked icon
const clickedIcon = (event) => {
    removeClicked();
    for (let i = 0; i < event.path.length; i++) {
        if (event.path[i].classList.contains('icon')) {
            event.path[i].classList.toggle('clicked');    
            if (event.path[i].classList.contains('note')) {
                console.log('icon clicked');
                clickedNote = true;
                console.log('clickedNote: ', clickedNote);
                console.log('clickedTrash: ', clickedTrash);
                open.classList.toggle('greyed');
                }
            else if (event.path[i].classList.contains('trsh')) {
                console.log('icon clicked');
                clickedTrash = true;
                console.log('clickedNote: ', clickedNote);
                console.log('clickedTrash: ', clickedTrash);
                open.classList.toggle('greyed');
            }
        }
    }
}
const removeClicked = (event) => {
    for (let i = 0; i < icon.length; i++) {
        icon[i].classList.remove('clicked');
    }
    clickedNote = false;
    clickedTrash = false;
    open.classList.add('greyed')
}

let icon = document.getElementsByClassName('icon');

Array.from(icon).forEach((item) => item.addEventListener('click', clickedIcon));

const clickedBody = (event) => {
    if (event.path[1].classList.contains('icon')) {
        return;
    }
        else removeClicked();
}

let body = document.getElementsByTagName('body');
Array.from(body).forEach((item) => item.addEventListener('click', clickedBody));

// open if double clicked
const showNotepad = (event) => {
    notepadPopup.classList.add('show');
    ungrey();
    console.log('opening notepad');
    const timeSinceStart = (Date.now() - start)/1000;
    notepadPopup.style['z-index'] = Math.floor(timeSinceStart);
    console.log('NP ZInd: ', notepadPopup.style['z-index']);
}

let notepadIcon = document.getElementById('notepadIcon');
let notepadPopup = document.getElementById('notepad');
notepadIcon.addEventListener('dblclick', showNotepad);

const showTrash = (event) => {
    trashPopup.classList.add('show');
    ungrey();
    console.log('opening trash');
    const timeSinceStart = (Date.now() - start)/1000;
    trashPopup.style['z-index'] = Math.floor(timeSinceStart);
    console.log('Trash ZInd: ', trashPopup.style['z-index']);
}

let trashIcon = document.getElementById('trashIcon');
let trashPopup = document.getElementById('trash');

trashIcon.addEventListener('dblclick', showTrash);

// open from file
const openFromFile = (event) => {
    if (clickedNote == true && !event.path[0].classList.contains('greyed')) {
        console.log('opening from file');
        showNotepad();
        console.log('clickedNote: ', clickedNote);
        console.log('clickedTrash: ', clickedTrash);
    }
    else if (clickedTrash == true && !event.path[0].classList.contains('greyed')) {
        console.log('opening from file');
        showTrash();
        console.log('clickedNote: ', clickedNote);
        console.log('clickedTrash: ', clickedTrash);
    }
}

let open = document.getElementById('dropdown-file__a--open');
open.addEventListener('click', openFromFile)

// clicking popup brings it to front
const bringToFront = (event) => {
    const timeSinceStart = (Date.now() - start)/1000;
    console.log(event);
    for (let i = 0; i < popUps.length; i++) {
        if (event.path[i].classList.contains('pop-up') && !event.path[0].classList.contains('fa-x')) {
            event.path[i].style['z-index'] = Math.floor(timeSinceStart);
        }
    }
}

Array.from(popUps).forEach((item) => item.addEventListener('click', bringToFront));

// maximise button
const maximiseMinimise = (event) => {
    console.log('maximising or minimising');
    for (let i = 0; i< event.path.length; i++) {
        if (event.path[i].classList.contains('pop-up')) {
            event.path[i].classList.toggle('maximise');
        }
    }
}

let maxMin = document.getElementsByClassName('fa-window-maximize');

Array.from(maxMin).forEach((item) => item.addEventListener('click', maximiseMinimise));

// show time
function time() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();  
  currentTime.textContent = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}
setInterval(time, 1000);

// find div function with the highest zindex
function getMaxZIndex() {
    return Math.max(
        ...Array.from(document.querySelectorAll('div.pop-up'), el =>
        parseFloat(window.getComputedStyle(el).zIndex),
        ).filter(zIndex => !Number.isNaN(zIndex)),
        0,
    );
}
