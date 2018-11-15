function replaceWords() {
  chrome.storage.sync.get(
    null,
    function (result) {
      if (result["words"] != null) {
        const iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
        let currentNode;
        while (currentNode = iter.nextNode()) {
          for (let bannedWord in result["words"]) {
						var wordRegex = new RegExp(bannedWord,'gi');
            currentNode.textContent = currentNode.textContent.replace(wordRegex, result["words"][bannedWord]);
          }
        }
      }
    }
  );
}

replaceWords();