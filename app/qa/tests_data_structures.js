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
    
    var dsFile = null;
    var inputFile = null;
    var emptyInputFilePath = null;
    var nonEmptyInputFilePath = null;
    var parsedInput = null;


    suiteSetup( function() {
        
        //console.log("BEFORE");
        dsFile = require("../data_structures.js");
        rgybrrString = "\n\nred green \tyellow blue \nred red";
        rgybrrFilePath = "rgybrr_input.txt";
        fs.writeFileSync(rgybrrFilePath, rgybrrString);
        emptyFilePath = "";
        expectedParsedInput = ["red", "green", "yellow", "blue", "red", "red"];


    });



    suiteTeardown( function() {
        
        //console.log("AFTER");
        dsFile = null;
        ygybrrString = null;
        rgybrrFilePath = null;
        emptyFilePath = null;
        expectedParsedInput = null;

    });

    

    /**Below are the unit tests*/
    
    /*

    suite("Unit tests for readFile", function() {

        var parsedInput = dsFile.readFile(rgybrrFilePath);
        var emptyInput = dsFile.readfile(emptyFilePath);
        var whitespaceInput = dsFile.readFile(" \n \t    \n  ");

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
    
    */

    suite("Unit tests for wordCount function", function() { 
        
        // Tests that wordCount returns the correct object
        test("Test wordCount with rgybrr", function(){
            
            var expectedWC = {"red":3, "green":1, "yellow": 1, "blue":1};

            assert.deepStrictEqual(dsFile.wordCount(expectedParsedInput), 
                expectedWC, "wordCount is not correct");

            //assert.deepStrictEqual(dsFile.wordcount());

        });
    
    }); // End wordCount unit tests

    suite("Unit tests for condWordCount function", function() {
        
        test("Returns correct object with rgybrr", function(){
            
            var expectedCWC = {"red":{"green":1, "red":2}, 
                "green":{"yellow":1}, "yellow":{"blue":1}, "blue":{"red":1}};
            /*
            assert.deepStrictEqual(dsFile.condWordCount({"red":3, "green":1, 
                "yellow": 1, "blue":1}, expectedParsedInput),
                expectedCWC, "condWordCount is not correct");
            */
        });

    }); // End condWordCount unit tests

    suite("Unit tests for wordFreq function", function(){

        test("string", function(){

            //TODO finish

        });

    }); // end wordFreq unit tests

    suite("Unit tests for condWordFreq function", function(){

        test("string", function(){

            //TODO finish

        });

    }); // end condWordFreq unit tests

}); // End data_structures.js testing suite
