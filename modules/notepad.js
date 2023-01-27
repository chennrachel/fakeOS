// notepad - message management
export const deleteMessages = () => {
    if (window.sessionStorage.getItem('messages')) {
        window.sessionStorage.removeItem('messages');
    }
    // call render messages to clear list
    renderMessages();
};

export const submitMessage = (event) => {
    // prevent default form submission behaviour
    event.preventDefault();
    const message = document.getElementById('message').value;
    const messageObject = { message };
    // fetch existing messages from sessionStorage
    console.log(event);
    console.log(messageObject);
    // no messages use empty array
    let currentMessages = [];
    // JSON.parse to get data back as an array
    if (window.sessionStorage.getItem('messages')) {
        currentMessages = JSON.parse(window.sessionStorage.getItem('messages'));
    }
    // add form object to messages
    currentMessages.push(messageObject);
    // add updated messages to sessionStorage
    window.sessionStorage.setItem('messages', JSON.stringify(currentMessages));
    // call renderMessages function on submission function
    document.getElementById('message').value = '';
};

export const renderMessages = () => {
    // retrieve messages from sessionStorage
    let currentMessages = [];
    if (window.sessionStorage.getItem('messages')) {
        currentMessages = JSON.parse(window.sessionStorage.getItem('messages'));
    }
    // HTML string with message
    let listItems = [];
    for (let i = 0; i < currentMessages.length; i++) {
        let listItem = '';
        const currentMessage = currentMessages[i];
        listItem += `<dd>${i + 1}. ${currentMessage.message}</dd>`;
        listItem += `---`;
        // add HTML to an array
        listItems.push(listItem);
    }
    // select dl by id, render HTML strings to page
    let descList = document.getElementById('currentMessages');
    descList.innerHTML = listItems.join(' ');
};

export const showSavedMessages = (event) => {
    event.preventDefault();
    renderMessages();
    newNotes.style.display = 'none';
    savedNotes.style.display = 'block';
};

export const showNewMessages = (event) => {
    event.preventDefault();
    savedNotes.style.display = 'none';
    newNotes.style.display = 'block';
    form.style['padding-left'] = '10%';
};

let newNotes = document.getElementById('new-notes');
let savedNotes = document.getElementById('saved-notes');
let form = document.getElementById('contact-form');
