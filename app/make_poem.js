/* @author Tyler Baylson
 * @version 10/22/18
 * Constructs a poem like output for a given input file, desired # of stanzas,
 * desired # of lines per stanze, desired # of words per line, and desired list
 * of probabilities.
 */

var dataStructs = require('./data_structures.js');

/* Uses pickFirstWord and pickNextWord to build a poem-like string
 * @param args: The argument array passed to the program from the console
 * @param wordData: An object representing the needed data structures, ie
 *      wordCount, wordFreq, condWordFreq
 * @return poem: The constructed poem using the input file and given probabilities
 */
function makePoem(args, wordData){
    let stanzas = args[3];
    let linesPerStanza = args[4];
    let wordsPerLine = args[5];
    let probabs = JSON.parse(args[6]);

    let current = pickFirstWord(probabs[0], wordData['wordFreqs']);
    let poem = "\n" + current + " ";

    let stanzaNum = 0;
    let lineNum = 0;
    let wordNum = 1;//Set to one because the first word has already been found
    let probabIndex = 1;//See comment above
    let next;
    while(stanzaNum < stanzas){
        while(lineNum < linesPerStanza){
            while(wordNum < wordsPerLine){
                next = pickNextWord(probabs[probabIndex++], current, wordData);
                poem += next + " ";
                current = next;
                wordNum++
            }// End word while
            poem += "\n";
            wordNum = 0;
            lineNum++;
        }// End line while
        poem += "\n\n";
        lineNum = 0;
        stanzaNum++;
    }// End stanze while
    return poem;
}// End makePoem()


/* Probabilistically determines the first word to appear in the poem.
 * In particular, if the probability generated is between zero and the.
 * probability of the first word, then the first word is chosen.
 * @param probab: The assumed probability of the first word.
 * @param theWordFreqs: The object of words and their frequencies.
 * @return first: The first word picked for the poem.
 */
function pickFirstWord(probab, wordFreqs){
    let ordered = {};
    Object.keys(wordFreqs).sort().forEach(function(key){
        ordered[key] = wordFreqs[key];
    });

    let cnt = 1;
    let lower = 0;
    let upper;
    let first;
    for(let key in ordered){
        upper = lower + ordered[key];
        upper = (cnt == ordered.length) ? Math.round(upper) : upper;
        if(lower <= probab && probab <= upper){
            first = key;
            break;
        }// End if
        else{
            lower = upper;
        }// End else
        cnt++;
    }// End for
    return first;
}// End pickFirstWord()


/* Probabilistically determines the next word.
 * @param probabs: The predetermined probability.
 * @param currentWord: The word that was just picked.
 * @param wordData: The data structures defined in data_structures.js.
 * @return nextWord: The generated next word.
 */
function pickNextWord(probab, currentWord, wordData){
    let nextWord = pickFirstWord(probab, wordData['condWordFreq'][currentWord]);
    return nextWord;
}// End pickNextWord()


/**
 * See program description at top
 */
function main(){
    let dataStructs = require('./data_structures.js');
    let args = process.argv;
    let words = dataStructs.readFile(args);
    if(words != 'empty' && args.length == 8){
        let wordData = {};
        wordData['countMap'] = dataStructs.wordCount(words);
        wordData['wordFreqs'] = dataStructs.wordFreq(wordData['countMap'], 
            words.length);
        wordData['condWordFreq'] = dataStructs.condWordFreq(
            wordData['countMap'], words);

        let poem = makePoem(args, wordData);
        console.log(poem);
        if(JSON.parse(args[7])){
            console.log("wordCount is " + JSON.stringify(
                wordData['countMap']));
            console.log("\nwordFreq is " + JSON.stringify(
                wordData['wordFreqs']));
            console.log("\ncondWordCount is " + JSON.stringify(
                dataStructs.condWordCount(wordData['countMap'], words)));
            console.log("\ncondWordFreq is " + JSON.stringify(
                wordData['condWordFreq']));
        }// End inner if
    }// End outer if
    else if(words == 'empty'){
        console.log("\nInput can not be empty of only be whitespace");
    }// End else if
    else{
        console.log("\nUsage: nodejs make_poem.js <inputFile> <stanzas> <linesPerStanza> <wordsPerLine> <probabArray> <displayDSBool>");
    }// End else
}// End main()

if(require.main == module){
    main();
}// End if