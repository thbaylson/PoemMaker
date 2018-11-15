/**
 * Test suite for make_poem.js
 *
 * @author Evert Ball and Tyler Baylson
 * @version 26 November 2018
 */

var assert = require("chai").assert;
var make_poem = require("../make_poem.js");
var data_structures = require("../data_structures.js");

suite("Test Make Poem", function(){
    /** Test fixture for an input of words, created for whole suite**/
    var words = null;

    var probability = null;

    /** Test fixture for a countMap, created for the whole suite**/
    var countMap = null;

    var freqMap = null;

    var condFreqMap = null;

    var wordData = null;

    // BEFORE
    suiteSetup( function(){
        words = {"red", "blue", "blue", "red", "green"};
        probability = 0.8;
        countMap = data_structures.wordCount(words);
        freqMap = data_structures.wordFreq(wordCount, 4);
        condFreqMap = data_structres.condWordFreq(countMap, words);
    });

    // BEFORE EACH
    setup( function(){
        wordData = {"wordCount": countMap, "wordFreq" : freqMap, 
            "condWordFreq" : condFreqMap};
    });

    // AFTER EACH
    teardown( function(){

    });

    // AFTER
    suiteTeardown( function(){
        words = null;
        countMap = null;
        freqMap = null;
        condFreqMap = null;
    });

    // TESTS
    suite('Unit tests for the pickFirstWord function', function(){

        test('Test pickFirstWord with data_structures?', function(){
            assert(pickFirstWord(probability, freqMap) === "red",
                "First word picked is red");
        });
    });// End unitTests pickFirstWord

    suite('Unit tests for the pickNextWord function', function(){

        test('Test pickNextWord with?', function(){
            assert(pickNextWord(probability, "blue", wordData) == "red",
                "Next word picked is red?? !Unchecked!");
        });
    });// End unitTests pickNextWord

});// End MakePoemTestSuite
