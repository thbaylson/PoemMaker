/*@author Tyler Baylson
* @version 09/28/18
* For a given input file, this program will generate and print objects 
* representing the word count, word frequency, conditional word count, 
* and conditional word frequency.
*/

var exports = module.exports = {};
exports.wordCount = wordCount;
exports.wordFreq = wordFreq;
exports.condWordCount = condWordCount;
exports.condWordFreq = condWordFreq;
exports.readFile = readFile;

/**
* A function to build and return the wordCount object: an array of <word>:<# of occurrences> pairs.
* @param {array} [stringOfWords] The formatted array of words from the file.
* @return {array} [countMap] The wordCount object.
*/
function wordCount(stringOfWords){
    let countMap = {};
    let keys = stringOfWords;
    for(let x = 0; x < keys.length; x++){
        if(typeof(countMap[String(keys[x])]) == "number"){
            countMap[String(keys[x])] += 1;
        }// end if
        else{
            countMap[String(keys[x])] = 1;
        }// end else
    }// end for
    return countMap;
}// end function wordCount


/**
* A function to build and return the wordFreq object: an array of <word>:<frequency> pairs.
* @param {array} [countMap] The wordCount object.
* @param {int} [totalWords] The total number of words in the input file.
* @return {array} [countMap] the wordFreq object.
*/
function wordFreq(countMap, totalWords){
    let freqMap = {};
    let keys = Object.keys(countMap);
    let total = totalWords;
    for(let x = 0; x < keys.length; x++){
        freqMap[String(keys[x])] = countMap[keys[x]] / total;
    }// end for
    return freqMap;
}// end function wordFreq


/**
* A function that returns the condWordCount object: an array with the format:
* {<wordA>: {<wordB>:<# of occurrences of wordB immediately following wordA>}}.
* @param {object} [countMap] The wordCount object.
* @param {array} [inputSeq] The formatted array of words from the file.
* @return {object} [condCount] The condWordCount object.
*/
function condWordCount(inputSeq){
    let condCount = {};

    for(let i = 0; i < inputSeq.length; i++){
        let current = inputSeq[i];
        let next = inputSeq[(i + 1) % inputSeq.length];

        if(typeof condCount[current] === 'undefined'){
            condCount[current] = {};
        }// end if
        if(typeof condCount[current][next] === 'undefined'){
            condCount[current][next] = 1;
        }// end if
        else{
            condCount[current][next] += 1;
        }// end else
    }// end for

    return condCount;
}// end function condWordCount

/**
 * Determine the frequency that a word appears after a given word.
 *
 * @param {Object} input - The value returned from condWordCount.
 * @return {String} condWordFreq - the conditional word frequency object as a
 *                                 string.
 */
function condWordFreq(input) {
    // This line creates a deep copy of the condWordCount so that
    // it doesn't change the values in the original object 
    var condWordFreq = JSON.parse(JSON.stringify(input));
    
    for(var key in input) {
        var word = input[key];
        var count = sum(word);
        
        for(var follows in word) {

            condWordFreq[key][follows] = word[follows] / count;         
        }// end inner for
    }// end outer for
    return condWordFreq;
}// end function condWordFreq

/**
 * Helper function for condWordFreq. It counts the amount of times a word
 * follows another word.
 *
 * @param {object} obj - The object to count
 * @return {number} count - the number of times a word follows another.
 */
function sum(obj) {
    
    var count = 0;
    
    for(var key in obj) {
        count += obj[key];
    }

    return count;
}


/**
* A helper function for taking in the single given file and formats
* it into an array of all the words.
* @param {filename} [fileNameString] The desired file to be opened.
* @return {array} [words] An array of all the words in the file.
*/
function readFile(fileNameString){
    
    let fs = require('fs');
    let file;
    try{
        file = fs.readFileSync(fileNameString, 'utf-8');
    } catch(err) {
        return 'empty';
    }
    let reg = /(?:[a-z]+)/g;
   
    let result = file.match(reg);
    
    
    return (result != null) ? result : 'empty';
}// end function readFile


/**
* See program description at top.
*/
function main(inputFile){
    let words = readFile(inputFile);
    let stringToReturn = "";
    if(words != 'empty'){
		countMap = wordCount(words);
		freqMap = wordFreq(countMap, words.length);
		condCountMap = condWordCount(words);
		condFreqMap = condWordFreq(condCountMap);
        
        stringToReturn = "\nwordCount is " + JSON.stringify(countMap) +
            "\nwordFreq is " + JSON.stringify(freqMap) +
		    "\ncondWordCount is " + JSON.stringify(condCountMap) +
		    "\ncondWordFreq is " + JSON.stringify(condFreqMap);
	}// end if
	else if(words == 'empty'){
		stringToReturn = "\nInput can not be empty or only be whitespace.";
	}// end else if
    else{
        stringToReturn = "\nUsage: nodejs data_structures.js <input.txt>";
    }// end else
    return stringToReturn;
}// end function main


if(require.main === module){
    var args = process.argv;
    console.log(main(args[2]));
}// end if
