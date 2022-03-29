Describe: wordCounter()

Test: "It should return 1 if a passage has just one word."
Code:
const text = "hello";
wordCounter(text);
Expected Output: 1

Test: "It should return 2 if a passage has two words."
Code:
const text = "hello there";
wordCounter(text);
Expected Output: 2

Test: "It should return 0 for an empty string."
Code: wordCounter("");
Expected Output: 0

Test: "It should not count numbers as words."
Code: wordCounter("hi there 77 19");
Expected Output: 2



Describe: numberOfOccurrencesInText()

Test: "It should return 0 occurrences of a word for an empty string."
Code:
const text = "";
const word = "red";
numberOfOccurrencesInText(word, text);
Expected Output: 0

Test: "It should return 1 occurrence of a word when the word and the text are the same."
Code:
const text = "red";
const word = "red";
numberOfOccurrencesInText(word, text);
Expected Output: 1

Test: "It should return 0 occurrences of a word when the word and the text are different."
Code:
const text = "red";
const word = "blue";
numberOfOccurrencesInText(word, text);
Expected Output: 0

Test: "It should return a word match regardless of case."
Code:
const text = "red RED Red green Green GREEN";
const word = "Red";
numberOfOccurrencesInText(word, text);
Expected Output: 3

Test: "It should return a word match regardless of punctuation."
Code:
const text = "Red! Red. I like red, green, and yellow.";
const word = "Red";
numberOfOccurrencesInText(word, text);
Expected Output: 3

Test: "If an empty string is passed in as a word, it should return 0."
Code:
const word = "";
const text = "red RED Red!";
wordCounter(word, text);
Expected Output: 0



Describe: boldPassage()

Test: "It should return a non-matching word in a p tag."
Code:
const word = "hello";
const text = "yo";
boldPassage(word, text);
Expected Output: "<p>yo</p>"

Test: "It should return a matching word in a b tag."
Code:
const word = "hello";
const text = "hello";
boldPassage(word, text);
Expected Output: "<p><b>hello</b></p>"

Test: "It should wrap words that match in `b` tags but not words that don't."
Code:
const word = "hello";
const text = "hello there";
boldPassage(word, text);
Expected Output: "<p><b>hello</b> there</p>"

Test: "It should wrap in `b` tags sections of words that match the word or letter sequence inputted."
Code: 
boldPassage(red, "redo not redone");
Exepcted Output: "<b>red</b>o, not, <b>red</b>one"



Describe: topThreeWords(text)

Test: "It should return 'none' if text is empty."
Code: topThreeWords("");
Expected Output: 
"Most common words:"
"none"

Test: "It should return word count of each word if text has 3 or less words."
Code: topThreeWords("one two three three");
Expected Output: 
"Most common words:"
"three: 2"
"one: 1"
"two: 1"

Test: "It should return word count of top 3 words if text has more than 3 words."
Code: topThreeWords("one two three three four four four five five five five six");
Expected Output: 
"Most common words:"
"five: 4"
"four: 3"
"three: 2"

Test: "If text has a tie for most occurances it should return the count of the word(s) that occur first."
Code: topThreeWords("one two two three three four four four five five five five six");
Expected Output: 
"Most common words:"
"five: 4"
"four: 3"
"two: 2"

Describe: filterBadWord(words, badWord)

Test: If badWord in the argument is found, return the string without the word
Code: filterBadWord("zoinks");
Expected Output: ""

Describe: filterBadWords(words)

Test: If there are only bad words, return an empty string
Code: filterBadWords("zoinks muppeteer biffaroni loopdaloop")
Expected Output: ""

Test: Should not remove words other than bad words
Code: filterBadWords("This zoinks and muppeteer biffaroni and loopdaloop")
Expected Output: "This and and"