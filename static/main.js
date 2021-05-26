document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('addContacts').onclick(handleAddContactClick);
});

const handleAddContactClick = () => {
  console.log('clicked btn');
};

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
