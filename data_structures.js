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
function condWordCount(countMap, inputSeq){
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
* A function that returns the condWordCount object: an array with the format:
* {<wordA>: {<wordB>:<frequency wordB immediately following wordA>}}.
* @param {object} [countMap] The wordCount object.
* @param {array} [inputSeq] The formatted array of words from the file.
* @return {object} [condMap] The conditional word frequency map.
*/
function condWordFreq(countMap, inputSeq){
    let condMap = {};
    let tmpArray = [];
    let keys = Object.keys(countMap);
    for(let k = 0; k < keys.length; k++){
        for(let i = 0; i < inputSeq.length; i++){
			//This finds if the current input element is the one we're matching
            if(keys[k] == inputSeq[i] && i + 1 < inputSeq.length){
                tmpArray.push(inputSeq[i + 1]);
            }// end if
			
            //This captures the desired wrap around effect
            else if(k == keys.length - 1 && i == inputSeq.length - 1){
                tmpArray.push(inputSeq[0]);
            }// end else if
        }// end inner for
		condMap[keys[k]] = wordFreq(wordCount(tmpArray), tmpArray.length);
        tmpArray = [];
    }// end outer for
    return condMap;
}// end function condWordFreq


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
function readFile(processArgs){
    let result;
    let fs = require('fs');
    if(processArgs.length >= 3){
        let file = fs.readFileSync(processArgs[2], 'utf8');
        let reg = /(?:[a-z]+)/g;
        result = file.match(reg);
    }// end if
    return (result != null) ? result : 'empty';
}// end function readFile


/**
* See program description at top.
*/
function main(){
    let args = process.argv;
    let words = readFile(args);
    if(words != 'empty' && args.length == 3){
		countMap = wordCount(words);
		freqMap = wordFreq(countMap, words.length);
		condCountMap = condWordCount(countMap, words);
		condFreqMap = condWordFreq(countMap, words);

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
    main();
}// end if
