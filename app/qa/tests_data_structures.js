/**
 * Test suite for data_structures.js
 *
 * @author Evert Ball and Tyler Baylson
 * @version 26 November 2018
 */

/**Importing required files to test data_structures.js**/
var assert = require("chai").assert;
var fs = require("fs");

/**A test suite for testing the data_structures obejct**/
suite("Test suite for data_structures.js", function() {
    
    /**Test fixture for the data structures module, for the whole suite**/
    var dsFile = null;

    /**Test fixtures created to mock input for data_structures**/
    var rgybrrString = null;
    var rgybrrFilePath = null;
    var emptyFilePath = null;
    var parsedInput = null;
    var emptyInput = null;
    var whitespaceInput = null;
    var expectedParsedInput = null;

    /**Test fixtures created to mock the objects created by data_structures**/
    var expectedWC = null;
    var expectedWF = null;
    var expectedCWC = null;
    var expectedCWF = null;


    suiteSetup( function() {
        
        //console.log("BEFORE");
        dsFile = require("../data_structures.js");
        //rgybrrString = "\n\nred green \tyellow blue \nred red";
        //rgybrrFilePath = "rgybrr_input.txt"
        //fs.writeFileSync(rgybrrFilePath, rgybrrString);
        rgybrrFilePath = require("../textSamples/rgybrr_input.txt");
        emptyFilePath = "";
        parsedInput = dsFile.readFile(rgybrrFilePath);
        emptyInput = dsFile.readfile(emptyFilePath);
        whitespaceInput = dsFile.readFile(" \n \t    \n  ");
        expectedParsedInput = ["red", "green", "yellow", "blue", "red", "red"];


    }); //end suiteSetup

    setup(function() {
        
        //console.log("BEFORE_EACH");
        expectedWC = {"red":3, "green":1, "yellow": 1, "blue":1};
        expectedWF = {"red": (3/6), "green": (1/6), "yellow": (1/6),
            "blue": (1/6)}
        expectedCWC = {"red":{"green":1, "red":2}, 
            "green":{"yellow":1}, "yellow":{"blue":1}, "blue":{"red":1}};
        expectedCWF = {"red":{"green":(1/3), "red":(2/3)}, 
            "green":{"yellow":(1/1)}, "yellow":{"blue":(1/1)}, 
            "blue":{"red":(1/1)}};

    }); //end setup

    teardown(function() {

        //console.log("AFTER_EACH");
        expectedWC = null;
        expectedWF = null;
        expectedCWC = null;
        expectedCWF = null;

    }); //end Teardown

    suiteTeardown( function() {
        
        //console.log("AFTER");
        dsFile = null;
        rgybrrString = null;
        rgybrrFilePath = null;
        emptyFilePath = null;
        expectedParsedInput = null;

    }); //end suiteTeardown

    

    /**Below are the unit tests*/
    

    suite("Unit tests for readFile", function() {
        
        console.log(rgybrrFilePath);

        test("readFile function with correct input", function() {
        assert.deepStrictEquals(parsedInput, expectedParsedInput, "readFile" +
            " does not return correct array.");
        });

        test("readFile function with empty input", function() {
            assert.deepStrictEquals(emptyInput, 'empty', "readFile does not" +
                " return 'empty' when given an empty input");
        });

        test("readFile function with only whitespace", function() {
            assert.deepStrictEquals(whiteSpaceInput, 'empty', "readFile"     +
                " does not return 'empty' for whitespace file");
        });

    }); // End readFile unit tests
    

    suite("Unit tests for wordCount function", function() { 
        
        // Tests that wordCount returns the correct object
        test("Test wordCount with rgybrr", function(){
            
            assert.deepStrictEqual(dsFile.wordCount(expectedParsedInput), 
                expectedWC, "wordCount is not correct");

        });
    
    }); // End wordCount unit tests

    suite("Unit tests for condWordCount function", function() {
        
        test("Returns correct object with rgybrr", function(){
            
            assert.deepStrictEqual(dsFile.condWordCount(expectedWC, 
                expectedParsedInput), expectedCWC, 
                "condWordCount is not correct");

        });

    }); // End condWordCount unit tests

    suite("Unit tests for wordFreq function", function(){

        test("Returns correct object with rgybrr", function(){
            
            assert.deepStrictEqual(dsFile.wordFreq(expectedWC, 6), expectedWF,
                "wordFreq is not correct");
        });

    }); // end wordFreq unit tests

    suite("Unit tests for condWordFreq function", function(){

        test("Returns correct object with rgybrr", function(){

            assert.deepStrictEqual(dsFile.condWordFreq(
                dsFile.condWordCount(expectedWC, expectedParsedInput)), 
                expectedCWF, "condWordFreq is not correct");

        });

    }); // end condWordFreq unit tests

}); // End data_structures.js testing suite
