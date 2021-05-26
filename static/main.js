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
const httpDelete = (url) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    // if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    // callback(xmlHttp.responseText);
  };
  xmlHttp.open('DELETE', url, true);
  xmlHttp.send(null);
};

const httpPost = (url, callback, jsonData) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.responseText);
      callback(json);
      console.log(json.email + ', ' + json.password);
    }
  };
  const data = JSON.stringify(jsonData);
  xhr.send(data);
};

function callbackPost() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const json = JSON.parse(xhr.responseText);
    console.log(json.email + ', ' + json.password);
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

function deleteContact(clickedElem) {
  const id = clickedElem.getAttribute('data-contact-id');
  httpDelete(`/contact/${id}`);
}

// document.getElementById('addContacts').onclick = handleAddContactClick;

initApp();

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
