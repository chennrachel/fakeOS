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
 * removes grey drop down for (file > close) + (file > close-all) 
 */
const ungrey = () => {
    Array.from(fileClose).forEach((item) => item.classList.remove('greyed'));
}

/**
 * greys out drop down for (file > close) + (file > close-all)
 */
const grey = () => {
    Array.from(fileClose).forEach((item) => item.classList.add('greyed'));
}

let fileClose = document.getElementsByClassName('file-close');

/**
 * shows the about-this-mac popup when (apple > about this mac) is clicked
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

/**
 * hides the relevant popup when the close icon is clicked
 */
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

/**
 * closes the popup that is on top when (file > close) is clicked
 */
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

/** 
 * closes all popups when (file > close-all) is clicked
 */
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

/**
 * hides the menu bar, body and icons, closes all popups and opens the turn-on popup when (apple > shut down) is clicked
 */
const shuttingDown = () => {
    menu.style.display = 'none';
    document.body.classList.toggle('off');
    turnOnPopUp.classList.add('show');    
    closeAllPopups();
    Array.from(icon).forEach((elem) => (elem.style.display = 'none'));
    console.log('shutting down');
}

let shutDown = document.getElementById('dropdown-apple__a--sd');
let menu = document.getElementById('main-menu-group');
let turnOnPopUp = document.getElementById('turn-back-on');
let popUps = document.getElementsByClassName('pop-up');

shutDown.addEventListener('click', shuttingDown);

/**
 * shows the menu bar, body and icons when turn-on-btn is clicked
 */
const turningOn = () => {
    console.log('turning on');
    menu.style.display = 'block';
    document.body.classList.toggle('off');
    turnOnPopUp.classList.remove('show');
    Array.from(icon).forEach((elem) => (elem.style.display = 'block'));
}

let turnOn = document.getElementById('turn-on-btn');
turnOn.addEventListener('click', turningOn);

/**
 * selects an icon by changing the background and text color when an icon is clicked
 */
const clickedIcon = (event) => {
    removeClicked();
    for (let i = 0; i < event.path.length; i++) {
        if (event.path[i].classList.contains('icon')) {
            event.path[i].classList.toggle('clicked');    
            if (event.path[i].classList.contains('note')) {
                clickedNote = true;
                console.log('icon clicked. clickedNote: ', clickedNote,'. clickedTrash: ', clickedTrash);
                open.classList.toggle('greyed');
                }
            else if (event.path[i].classList.contains('trsh')) {
                clickedTrash = true;
                console.log('icon clicked. clickedNote: ', clickedNote,'. clickedTrash: ', clickedTrash);
                open.classList.toggle('greyed');
            }
        }
    }
}

/**
 * removes icon selection by reverting background and text color change 
 */
const removeClicked = (event) => {
    Array.from(icon).forEach((elem) => (elem.classList.remove('clicked')));
    clickedNote = false;
    clickedTrash = false;
    open.classList.add('greyed')
}
let icon = document.getElementsByClassName('icon');
Array.from(icon).forEach((item) => item.addEventListener('click', clickedIcon));

/**
 * removes icon selection when anything other than an icon is clicked
 */
const clickedNonIcon = (event) => {
    if (event.path[1].classList.contains('icon')) {
        return;
    }
        else removeClicked();
}

let body = document.getElementsByTagName('body');
Array.from(body).forEach((item) => item.addEventListener('click', clickedNonIcon));

/**
 * opens notepad when the notepad icon is double clicked
 */
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

/**
 * opens trash when the trash icon is double clicked
 */
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

/**
 * opens notepad or trash if the relevant icon is selected and (file > open) is clicked
 */
const openFromFile = (event) => {
    if (clickedNote == true && !event.path[0].classList.contains('greyed')) {
        console.log('opening from file. clickedNote: ', clickedNote,'. clickedTrash: ', clickedTrash);
        showNotepad();
    }
    else if (clickedTrash == true && !event.path[0].classList.contains('greyed')) {
        console.log('opening from file. clickedNote: ', clickedNote,'. clickedTrash: ', clickedTrash);
        showTrash();
    }
}

let open = document.getElementById('dropdown-file__a--open');
open.addEventListener('click', openFromFile)

/**
 * brings a popup to the front of the screen when it is clicked
 */
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

/**
 * maximises/minimises the popup when the max/min icon is clicked
 */
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

/**
 * shows the time
 */
function time() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();  
  currentTime.textContent = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}
setInterval(time, 1000);

/**
 * calculates the highest Z Index on the page
 */
function getMaxZIndex() {
    return Math.max(
        ...Array.from(document.querySelectorAll('div.pop-up'), el =>
        parseFloat(window.getComputedStyle(el).zIndex),
        ).filter(zIndex => !Number.isNaN(zIndex)),
        0,
    );
}
