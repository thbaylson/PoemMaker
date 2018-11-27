/**
 * Test suite for make_poem.js
 *
 * @author Evert Ball and Tyler Baylson
 * @version 26 November 2018
 */

/**Importing required file to test make_poem.js**/
var assert = require("chai").assert;

suite("Test Make Poem", function(){
    var data_structures = null;

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


    // BEFORE
    suiteSetup( function(){
        data_structures = require("../data_structures.js");
        make_poem = require("../make_poem.js");
    });

    // BEFORE EACH
    setup( function(){
        // wordData
        words = ["red", "blue", "blue", "red", "red", "green"];
        countMap = data_structures.wordCount(words);
        freqMap = data_structures.wordFreq(countMap, 4);
        condFreqMap = data_structures.condWordFreq(countMap, words);
        wordData = {"wordCount": countMap, "wordFreq" : freqMap, 
            "condWordFreq" : condFreqMap};

        // poemData
        stanzas = 1;
        linesPerStanza = 2;
        wordsPerLine = 3;
        probabilities = "[0.6, 0.2, 0.8, 0.9, 0.4, 0.4]";
		displayWordData = true;
        probabCnt = 0;
		poemData = [0,0,0,stanzas, linesPerStanza, wordsPerLine, probabilities];
    });

    // AFTER EACH
    teardown( function(){
        words = null;
        countMap = null;
        freqMap = null;
        condFreqMap = null;

        stanzas = null;
        linesPerStanza = null;
        wordsPerLine = null;
        probabilities = null;
    });

    // AFTER
    suiteTeardown( function(){
        //data_structures = null;
        //make_poem = null;
        //wordData = null;
        //poemData = null;
    });

    // TESTS
    suite('Unit tests for the makePoem function', function(){

        test("Test makePoem with input: poemData: " + JSON.stringify(poemData), function(){
         assert(make_poem.makePoem(poemData, wordData) === "red blue red red green red",
          "Something");
        });// End test		
    });// End unitTests makePoem

    suite('Unit tests for the pickFirstWord function', function(){

        test('Test pickFirstWord with data_structures', function(){
         assert(make_poem.pickFirstWord(poemData, 
          wordData['freqMap']) === "red", "First word picked should be red");
        });// End test
    });// End unitTests pickFirstWord

    suite('Unit tests for the pickNextWord function', function(){

        test('Test pickNextWord with data_structures', function(){
         assert(make_poem.pickNextWord(poemData,
          "blue", wordData) == "red", "picknextword returns: " + 
            make_poem.pickNextWord(poemData,"blue", wordData));
        });// End test
    });// End unitTests pickNextWord

});// End MakePoemTestSuite
