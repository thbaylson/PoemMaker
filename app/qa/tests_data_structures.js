/**
 * Test suite for data_structures.js
 *
 * @author Evert Ball and Tyler Baylson
 * @version 26 November 2018
 */

/**Importing required files to test data_structures.js**/
var assert = require("chai").assert;

/**A test suite for testing the data_structures obejct**/
suite("Test suite for data_structures.js", function() {
    
    var dsFile = null;
    var inputFile = null;
    var inputFilePath = null;
    var wordCount = null;
    var condWordCount = null;
    var wordFreq = null;
    var condWordFreq = null;


    suiteSetup( function() {
        
        //console.log("BEFORE");
        dsFile = require("../data_structures.js");

    });

    setup( function() {

        //console.log("BEFORE_EACH");
        inputFile = "red green yellow blue red red";
        emptyInputFilePath = "";
        nonEmptyInputFilePath = "rgybrr_input.txt";
        parsedInput = ["red", "green", "yellow", "blue", "red", "red"];

    });

    teardown( function() {
        
        //console.log("AFTER_EACH");
        wordCount = null;
        condWordCount = null;
        wordFreq = null;
        condWordFreq = null;
     
    });

    suiteTeardown( function() {
        
        //console.log("AFTER");
        dsFile = null;
        inputFile = null;
        inputFilePath = null;
        parsedInput = null;

    });

    /**Below are the unit tests*/
    suite("Unit tests for parseInputFile", function() {

        test("string", function() {

            //TODO finish

        });

    }); // End parseInputFile unit tests

    suite("Unit tests for wordCount function", function() { 
    
        test("wordCount", function(){

            //TODO finish

        });
    
    }); // End wordCount unit tests

    suite("Unit tests for condWordCount function", function() {

        test("string", function(){

            //TODO finish

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
