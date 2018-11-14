function replaceWords() {
  chrome.storage.sync.get(
    null, 
    function(result) {
      if (result["words"] != null) {
        for (var i in result["words"]) {
          
          var re = new RegExp("(>[^><]*)(" + i + ")([^<>]*<)", "i"); 
          
          while (document.body.innerHTML.search(re) >= 0) {
            document.body.innerHTML = document.body.innerHTML.replace(re, "$1" + result["words"][i] + "$3");
          }
          
          console.log('Word ' + i + ' replaced with ' + result["words"][i] + '.');
        }
      }
    }
  );
}

replaceWords();