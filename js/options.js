let page = document.getElementById('buttonDiv');
const kWords = ['frick', 'frack', 'badWord', 'ohNo'];
function constructOptions(kWords) {
  for (let item of kWords) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.innerHTML = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('word is ' + item);
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kWords);