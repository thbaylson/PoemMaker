/**
 * Test suite for make_poem.js
 *
 * @author Evert Ball and Tyler Baylson
 * @version 26 November 2018
 */

/**Importing required file to test make_poem.js**/
var assert = require("chai").assert;
var data_structures = require("../data_structures.js");
var make_poem = require("../make_poem.js");

suite("Test Make Poem", function(){

    var words = null;
	var countMap = null;
	var freqMap = null;
	var condFreqMap = null;
	var wordData = null;

	var stanzas = null;
	var linesPerStanza = null;
	var wordsPerLine = null;
	var probabilities = null;
	var poemData = null;

    var validInput = null;
	var validDontPrint = null;
    var invalidInput = null;
    var emptyInput = null;


    // BEFORE ALL
    suiteSetup( function(){
		// wordData
        words = ["red", "blue", "blue", "red", "red", "green"];
        countMap = data_structures.wordCount(words);
        freqMap = data_structures.wordFreq(countMap, words.length);
        condWordMap = data_structures.condWordCount(words);
        condFreqMap = data_structures.condWordFreq(condWordMap);
        wordData = {"wordCount": countMap, "wordFreqs" : freqMap, 
            "condWordCount": condWordMap, "condWordFreq" : condFreqMap};

        // poemData
        stanzas = 1;
        linesPerStanza = 2;
        wordsPerLine = 3;
        probabilities = "[0.6,0.2,0.8,0.9,0.4,0.4]";
		poemData = [0,0,0,stanzas, linesPerStanza, wordsPerLine, probabilities, true];

        validInput = [1, 1, "textSamples/rbbrrg_input_text.txt", stanzas, linesPerStanza, wordsPerLine, probabilities, true];
		validDontPrint = [1, 1, "textSamples/rbbrrg_input_text.txt", stanzas, linesPerStanza, wordsPerLine, probabilities, false];


        emptyInput = poemData;
        emptyInput[2] = "textSamples/empty_input_text.txt";

        invalidInput = [1, 1, "textSamples/rbbrrg_input_text.txt", 2, 3, 5];
    });

    // BEFORE EACH
    setup( function(){

    });

    // AFTER EACH
    teardown( function(){

    });

    // AFTER ALL
    suiteTeardown( function(){
        data_structures = null;
        make_poem = null;
		
		words = null;
        countMap = null;
        freqMap = null;
        condFreqMap = null;

        stanzas = null;
        linesPerStanza = null;
        wordsPerLine = null;
        probabilities = null;
        wordData = null;
        poemData = null;

        validInput = null;
		validDontPrint = null;
        invalidInput = null;
        emptyInput = null;
    });

    // TESTS
    suite('Unit tests for the core functionalities of make_poem', function(){

        test("Test makePoem", function(){
         assert.deepStrictEqual(make_poem.makePoem(poemData, wordData),
          "\nred blue red \nred green red \n\n\n", 
          "makePoem should return: \nred blue red \nred green red \n\n\n");
        });// End test		

        test('Test pickFirstWord with data_structures', function(){
         assert.deepStrictEqual(make_poem.pickFirstWord(0.6, 
          wordData['wordFreqs']),"red", 
          "First word picked should be red.");
        });// End test
	
        test('Test pickNextWord with data_structures', function(){
         assert.deepStrictEqual(make_poem.pickNextWord(0.2,
          "red", wordData),"blue", "picknextword returns: " + 
            make_poem.pickNextWord(0.2,"red", wordData));
        });// End test
    });// End unitTests core functionality //pickNextWord

    suite("Unit tests for the main function", function(){
        
        test("Test main() with valid inputs and displaying data_structures", function(){
            assert.deepStrictEqual(make_poem.main(validInput),
            "\nred blue red \nred green red \n\n\n" +
                "\nwordCount is " + JSON.stringify(wordData['wordCount']) +
                "\nwordFreq is " + JSON.stringify(wordData['wordFreqs']) +
                "\ncondWordCount is " + JSON.stringify(wordData['condWordCount']) +
                "\ncondWordFreq is " + JSON.stringify(wordData['condWordFreq']),
            "Program needs to output the correct poem, in the correct format, with the data_structures objects");
        });// End test
		
		test("Test main() with valid inputs and not displaying data_structures", function(){
            assert.deepStrictEqual(make_poem.main(validDontPrint),
            "\nred blue red \nred green red \n\n\n",
            "Program needs to output the correct poem, in the correct format");
        });// End test

        test("Test main() with invalid inputs", function(){
            assert.deepStrictEqual(make_poem.main(invalidInput),
            "\nUsage: nodejs make_poem.js <inputFile> <stanzas> <linesPerStanza> <wordsPerLine> <probabArray> <displayDSBool>",
            "Program should halt if inputs are invalid");
        });// End test

        test("Test main() with an empty file", function(){
            assert.deepStrictEqual(make_poem.main(emptyInput),
            "\nInput can not be empty or only be whitespace",
            "Program should halt if the file is empty");
        });// End test
    });// End unitTEsts main
});// End MakePoemTestSuite
