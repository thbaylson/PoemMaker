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
	var displayWordData = null;
	var probabCnt = null;
	var poemData = null;


    // BEFORE ALL
    suiteSetup( function(){
		// wordData
        words = ["red", "blue", "blue", "red", "red", "green"];
        countMap = data_structures.wordCount(words);
        freqMap = data_structures.wordFreq(countMap, 6);
        condWordMap = data_structures.condWordCount(countMap, words);
        condFreqMap = data_structures.condWordFreq(condWordMap);
        wordData = {"wordCount": countMap, "wordFreqs" : freqMap, 
            "condWordCount": condWordMap, "condWordFreq" : condFreqMap};
        //console.log(JSON.stringify(wordData));

        // poemData
        stanzas = 1;
        linesPerStanza = 2;
        wordsPerLine = 3;
        probabilities = "[0.6,0.2,0.8,0.9,0.4,0.4]";
		displayWordData = true;
		poemData = [0,0,0,stanzas, linesPerStanza, wordsPerLine, probabilities];
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
    });

    // TESTS
    suite('Unit tests for the makePoem function', function(){

        test("Test makePoem", function(){
         assert(make_poem.makePoem(poemData, wordData) === 
          "\nred blue red \nred green red \n\n\n", "Fail");
        });// End test		
    });// End unitTests makePoem

    suite('Unit tests for the pickFirstWord function', function(){

        test('Test pickFirstWord with data_structures', function(){
         assert(make_poem.pickFirstWord(0.6, 
          wordData['wordFreqs']) === "red", "First word picked should be red");
        });// End test
    });// End unitTests pickFirstWord
	
    suite('Unit tests for the pickNextWord function', function(){

        test('Test pickNextWord with data_structures', function(){
         assert(make_poem.pickNextWord(0.2,
          "red", wordData) == "blue", "picknextword returns: " + 
            make_poem.pickNextWord(0.2,"red", wordData));
        });// End test
    });// End unitTests pickNextWord
});// End MakePoemTestSuite
