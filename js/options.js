let page = document.getElementById('wordInput');

// Save Word
function saveWord() {
  var theValue = document.getElementById('wordToReplace').value;
  console.log(theValue);
  
  chrome.storage.sync.set({'noNoWord': theValue}, 
    function() {
      console.log('Settings saved');
    }
  );
}

// Load Word
function loadWord() {
  chrome.storage.sync.get('noNoWord', 
    function(result) {
      console.log('Value currently is ' + result.noNoWord);
      document.getElementById('wordToReplace').value = result.noNoWord;
    }
  );
}

document.getElementById("save").addEventListener("click", saveWord);
document.getElementById("load").addEventListener("click", loadWord);