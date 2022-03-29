// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

function filterPuncuation(word) {
  return word.split("").filter(function(character) {
    return !".?,!;:'\"%$#@!^&*()_-+=\\|[]{}`~/".includes(character);
  }).join("");
}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }

  const wordArray = text.toLowerCase().split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    const filteredElement = filterPuncuation(element);
    const filteredWord = filterPuncuation(word);
    if (filteredElement.toLowerCase().includes(filteredWord.toLowerCase()) && filteredElement.length === filteredWord.length) {
      wordCount++;
    }
  });
  return wordCount;
}

function getUniqueWords(text) {
  if (text.trim().length === 0) {
    return [];
  }

  let elements = text.toLowerCase().split(" ");
  let uniqueWords = [];

  elements.forEach(function(element) {
    if (!Number(element) && !uniqueWords.includes(element)) {
      uniqueWords.push(element);
    }
  });

  return uniqueWords;
}

function filterBadWord(words, badWord) {
  let splitWords = words.split(" ")
  if (splitWords.includes(badWord)) {
   splitWords = splitWords.filter(function(word) {
    if (!word.includes(badWord)) {
    	return true;
    } if (word.includes(badWord)) {
    		return false;
      }
    });
    return splitWords.join(" ");
  }
  return words;
}

function filterBadWords(words) {
  words = filterBadWord(words, "zoinks");
  words = filterBadWord(words, "muppeteer");
  words = filterBadWord(words, "biffaroni");
  words = filterBadWord(words, "loopdaloop");

  return words;
}

// UI Logic

function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

function getTopThreeWords(text) {
  const uniqueWords = getUniqueWords(text);
  let topThreeWords = [];
  let topThreeWordCounts = [];
  uniqueWords.forEach(function(word) {
    const wordCount = numberOfOccurrencesInText(word, text);
    if (topThreeWords.length === 0) {
      topThreeWords.push(word);
      topThreeWordCounts.push(wordCount);
    } else {
      if (wordCount > topThreeWordCounts[0]) {
        topThreeWords.unshift(word);
        topThreeWordCounts.unshift(wordCount);
      } else if (topThreeWords.length < 2 || wordCount > topThreeWordCounts[1]) {
        topThreeWords.splice(1, 0, word);
        topThreeWordCounts.splice(1, 0, wordCount);
      } else if (topThreeWords.length < 3 || wordCount > topThreeWordCounts[2]) {
        topThreeWords.splice(2, 0, word);
        topThreeWordCounts.splice(2, 0, wordCount);
      }

      if (topThreeWords.length > 3) {
        topThreeWords.pop();
        topThreeWordCounts.pop();
      }
    }
  });

  let topWordList = [];

  if (topThreeWords.length === 0) {
    topWordList = "<li>none</li>";
  } else {
    topThreeWords.forEach(function(word, index) {
      topWordList.push("<li>" + word + ": " + topThreeWordCounts[index] + "</li>");
    });
  }

  return topWordList;
}


$(document).ready(function() {
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#top-three-count").text("");
    getTopThreeWords(passage).forEach(function(listItem) {
      $("#top-three-count").append($(listItem));
    });
  });
});
