/**
 * Test suite for make_poem.js
 *
 * @author Evert Ball and Tyler Baylson
 * @version 26 November 2018
 */

/**Importing required file to test make_poem.js**/
var assert = require("chai").assert;

suite("Test Make Poem", function(){
    /**These fields relate to modules used to test the make_poem.js module**/
    var data_structures = null;
    var make_poem = null;

    /**These fields relate to data needed for the data_structures object**/
    var wordData = null;
    var words = null;
    var countMap = null;
    var freqMap = null;
    var condFreqMap = null;

    /**These fields relate to data needed for the make_poem.js module**/
    var poemData = null;
    var stanzas = null;
    var linesPerStanza = null;
    var wordsPerLine = null;
    var probabilities = null;

    // BEFORE
    suiteSetup( function(){
        data_structures = require("../data_structures.js");
        make_poem = require("../make_poem.js");
    });

    // BEFORE EACH
    setup( function(){
        // wordData
        words = {"red", "blue", "blue", "red", "green"};
        countMap = data_structures.wordCount(words);
        freqMap = data_structures.wordFreq(wordCount, 4);
        condFreqMap = data_structres.condWordFreq(countMap, words);
        wordData = {"wordCount": countMap, "wordFreq" : freqMap, 
            "condWordFreq" : condFreqMap};

        // poemData
        // TODO:
        stanzas = "";
        linesPerStanza = "";
        wordsPerLine = "";
        probabilities = "";
        var probabCnt = 0;
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
        data_structures = null;
        make_poem = null;
        wordData = null;
        poemData = null;
    });

    // TESTS
    suite('Unit tests for the makePoem function', function(){

        test(){
            assert(makePoem(poemData, wordData)) === "red blue red",
                    "Poem constructed shouble be: 'red blue red'.");
        });
    });// End unitTests makePoem

    suite('Unit tests for the pickFirstWord function', function(){

        test('Test pickFirstWord with data_structures?', function(){
            assert(pickFirstWord(poemData['probabs'][0], 
                                wordData['freqMap']) === "red",
                                "First word picked is red");
        });
    });// End unitTests pickFirstWord

    suite('Unit tests for the pickNextWord function', function(){

        test('Test pickNextWord with?', function(){
            assert(pickNextWord(poemData['probabs'][0],
                                "blue", wordData) == "red",
                                "Next word picked is red?? !Unchecked!");
        });
    });// End unitTests pickNextWord

});// End MakePoemTestSuite
