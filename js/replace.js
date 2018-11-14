function replaceWords() {
  chrome.storage.sync.get(
    null,
    function (result) {
      if (result["words"] != null) {
        const iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
        let currentNode;
        while (currentNode = iter.nextNode()) {
          for (let bannedWord in result["words"]) {
            currentNode.textContent = currentNode.textContent.replace(bannedWord, result["words"][bannedWord]);
          }
        }
      }
    }
  );
}

replaceWords();