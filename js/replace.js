function replaceWords() {
  getReplacmentsAsync().then((replacements, error) => {
    doRecursiveReplace(document.body, replacements);
    setupMutationObserver(replacements);
  });
}

// replaces all text in children of passed node
function doRecursiveReplace(target, replacements) {
  const iter = document.createNodeIterator(target, NodeFilter.SHOW_TEXT);
  let currentNode;
  while (currentNode = iter.nextNode()) {
    replaced = getReplacementString(currentNode.textContent, replacements);
    if (replaced !== currentNode.textContent) {
      currentNode.textContent = replaced;
      console.log(replaced);
    }
  }
}

// setups a mutation observer to watch for any text changes on the page
function setupMutationObserver(replacements) {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mut of mutationsList) {
      doRecursiveReplace(mut.target, replacements);
    }
  });
  observer.observe(document.body, { characterData: true, subtree: true, attributes: false, childList: true });
}


// gets the string a given string should be replaced with
// attempts to preform the replacement up to 6 times
// if that fails we almost certainly have a cycle
// we therfore do not replace the string at all (or the dom 'mutation' would cause an infinite loop)
function getReplacementString(text, replacements) {
  result = text;
  for (let i = 0; i < 5; i++) {
    let changed = false;
    for (let replacementPair of replacements) {
      if (result.match(replacementPair[0])) {
        result = result.replace(replacementPair[0], replacementPair[1]);
        changed = true;
      }
    }
    if (changed) {
      return result;
    }
  }
  return text; // if we kept finding replacements then the string shouln't be changed
}

// gets a list of mapping from profain regex's to replacement words
function getReplacmentsAsync() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(
      null,
      (data) => {
        if (data["words"] == null) {
          resolve(null);
        }
        results = [];
        for (let bannedWord in data["words"]) {
          results.push([new RegExp(bannedWord, 'gi'), data["words"][bannedWord]]);
        }
        resolve(results);
      }
    );
  });
}

// Calls initial replacement
replaceWords()