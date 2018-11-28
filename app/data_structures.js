/**
* @author Tyler Baylson
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
    
    var condWordFreq = input;
    
    for(var key in input) {
        var word = input[key];
        var count = sum(word);
        
        for(var follows in word) {

            condWordFreq[key][follows] = word[follows] / count;
         
        }


    }
    
    return condWordFreq;
}

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
* A helper function for formating how these objects should be represented as strings.
* @param {object} [obj] One of the four data structures defined above.
* @return {string} [result] The formatted string of the data structure.
*/
function getKeyValuePairs(obj){
	let tmpStr;
    let result = "{";
    if(typeof obj == 'object'){
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        for(let x = 0; x < keys.length; x++){
            let value;
            if(typeof values[x] == 'object'){
                value = getKeyValuePairs(values[x]);
				result += "'" + keys[x] + "'" + ": " + value + ",\n ";
				tmpStr = result.substring(0, result.length - 3);
            }// end inner if
            else{
                value = values[x];
				result += "'" + keys[x] + "'" + ": " + value + ", ";
				tmpStr = result.substring(0, result.length - 2);
            }// end inner else
        }// end for       
        result = tmpStr + "}";
    }// end outer if
    else{
       result = "\nParameter Error: getKeyValuePairs was not passed an object parameter";
    }// end outer else
    return result;
}// end function getKeyValuePairs


/**
* A helper function for taking in the single given file and formats
* it into an array of all the words.
* @param {filename} [fileNameString] The desired file to be opened.
* @return {array} [words] An array of all the words in the file.
*/
function readFile(fileNameString){
    let result;
    let fs = require('fs');
    let file = fs.readFileSync(fileNameString, 'utf8');
    let reg = /(?:[a-z]+)/g;
   
    result = file.match(reg);
    
    return (result != null) ? result : 'empty';
}// end function readFile


/**
* See program description at top.
*/
function main(inputArgs){
    let args = inputArgs;
    let words = readFile(args[2]);
    if(words != 'empty' && args.length == 3){
		countMap = wordCount(words);
		freqMap = wordFreq(countMap, words.length);
		condCountMap = condWordCount(words);
		condFreqMap = condWordFreq(condCountMap);
		
        console.log("\nwordCount is " + getKeyValuePairs(countMap));
		console.log("\nwordFreq is " + getKeyValuePairs(freqMap));
		console.log("\ncondWordCount is " + getKeyValuePairs(condCountMap));
		console.log("\ncondWordFreq is " + getKeyValuePairs(condFreqMap));
	}// end if
	else if(words == 'empty'){
		console.log("\nInput can not be empty or only be whitespace.");
	}// end else if
    else{
        console.log("\nUsage: nodejs data_structures.js <input.txt>");
    }// end else
}// end function main


if(require.main === module){
    var args = process.argv;
    main(args);
}// end if
