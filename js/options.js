let page = document.getElementById('wordInput');
var wordList = null;

// Save Word
function saveWord() {
  var word = document.getElementById('wordToReplace');
  var replacement = document.getElementById('alternativeWord');
  
  // Add key value
  wordList["words"][word.value] = replacement.value;
  
  chrome.storage.sync.set(wordList, 
    function() {
      console.log('Settings saved');
    }
  );
  
  word.value = "";
  replacement.value = "";
  
  loadWord();
}

// Load Word
function loadWord() {
  chrome.storage.sync.get(
    'words', 
    function(result) {
      populateWords(result);
      wordList = result;
      
      // If empty keep words list
      if (wordList["words"] == null) {
        wordList["words"] = {};
      }
      
      console.log('Value currently is ' + JSON.stringify(result, null, 4));
    }
  );
}

// Populate word list
function populateWords(words) {
  // Get wordList div
  var wordListDisplay = document.getElementById('wordListDisplay');
  
  // Check if it exists
  if (wordListDisplay == null) {
    console.log('wordListDisplay does not exist');
  }
  else {
    // Clear it
    wordListDisplay.innerHTML = "";
    
    // Fill it
    for (var i in words["words"]) {
      wordListDisplay.innerHTML += "<p>" + i + "</p>";
    }
  }
}

// Clear words
function clearWords() {
  chrome.storage.sync.clear();
  loadWord();
}

loadWord();

document.getElementById("save").addEventListener("click", saveWord);
document.getElementById("load").addEventListener("click", loadWord);
document.getElementById("clear").addEventListener("click", clearWords);
