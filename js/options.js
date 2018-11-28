let page = document.getElementById('wordInput');
var wordList = null;

// Save Word
function saveWord() {
  var word = document.getElementById('wordToReplace');
  var replacement = document.getElementById('alternativeWord');

  // Add key value
  wordList["words"][word.value] = replacement.value;

  chrome.storage.sync.set(wordList,
    function () {
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
    function (result) {
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

// Load Word
function removeWord(word) {

  delete wordList["words"][word];

  chrome.storage.sync.clear();

  // Add key value
  chrome.storage.sync.set(wordList,
    function () {
      console.log('Word ' + word + ' removed.');
    }
  );

  loadWord();
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
    for (let bannedWord in words["words"]) {
      const row = document.createElement("tr");

      const descriptionField = document.createElement("td");
      descriptionField.appendChild(document.createTextNode(bannedWord + " -> " + words["words"][bannedWord]));
      row.appendChild(descriptionField);

      const buttonField = document.createElement("td");
      const button = document.createElement("button");
      button.setAttribute("class", "button");
      button.appendChild(document.createTextNode("Remove Word"));
      button.onclick = event => {
        removeWord(bannedWord);
      };
      buttonField.appendChild(button);
      row.appendChild(buttonField);

      wordListDisplay.appendChild(row);
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
document.getElementById("clear").addEventListener("click", clearWords);
