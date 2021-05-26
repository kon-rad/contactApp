console.log('main');

const httpGetAsync = (url, callback) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open('GET', url, true); // true for asynchronous
  xmlHttp.send(null);
};
const httpDelete = (url, callback) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4) {
      callback(xmlHttp.responseText, xmlHttp.status);
    }
  };
  xmlHttp.open('DELETE', url, true);
  xmlHttp.send(null);
};

const httpPost = (url, jsonData, callback) => {
  const xhr = new XMLHttpRequest();
  debugger;
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      debugger;
      callback(xhr);
    }
  };
  const data = JSON.stringify(jsonData);
  xhr.send(data);
};

function callbackPost() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const json = JSON.parse(xhr.responseText);
  }
}
const displayContacts = (response) => {
  console.log(response);
};
const initApp = () => {
  httpGetAsync('/contacts', displayContacts);
};

const handleAddContactClick = () => {
  console.log('clicked btn');
};

const deleteCallback = (message, code) => {
  console.log(message);
  if (code === 200) {
    location.reload();
  }
};
function deleteContact(clickedElem) {
  const id = clickedElem.getAttribute('data-contact-id');
  httpDelete(`/contact/${id}`, deleteCallback);
}

const displayErrors = (json) => {
  const errorsDiv = document.getElementById('errors');
  errorsDiv.innerText = json.messages.join('\n');
  // json.messages.forEach(msg => {
  //   errorsDiv.
  // })
};

const submitAddFormCallback = (xhr) => {
  debugger;
  console.log(xhr.responseText);
  const json = JSON.parse(xhr.responseText);
  if (xhr.status === 400) {
    displayErrors(json);
  } else {
    location.reload();
  }
};
function submitAddForm() {
  debugger;
  const name = document.getElementById('addFormName').value;
  const email = document.getElementById('addFormEmail').value;
  const note = document.getElementById('addFormNote').value;
  const data = {
    name,
    email,
    note,
  };
  console.log(data);
  httpPost('/contacts', data, submitAddFormCallback);
  return false;
}

// document.getElementById('addContacts').onclick = handleAddContactClick;

initApp();

// modal source https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('addContacts');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
