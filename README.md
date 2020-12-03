# Poem Maker
Author: Evert Ball 

Author: Tyler Baylson

Version: v3.0 (November 29, 2018)

This is "Project 3" for Dr. Andrew Scott's CS253 Course


# USAGE
    Data Structure:
    -node dsDriver.js <textFile>
    
    Poem:
    -node mpDriver.js <textFile> <stanzas> <linesPerStanza> <wordsPerLine> <probabArray> <displayDSBool>

    Istanbul Code Coverage: To see code coverage, go to:
    
    -data_structures.js:
        https://agora.cs.wcu.edu/~weball1/coverage/data_structures/lcov-report/
    -make_poem.js:
        https://agora.cs.wcu.edu/~weball1/coverage/make_poem/lcov-report/
    
    Mocha test suites:
        to run tests use command:
            
            data_structures tests:
                node_modules/.bin/mocha -u tdd qa/tests_data_structures.js
            make_poem tests:
                node_modules/.bin/mocha -u tdd qa/tests_make_poem.js

    data_structures uses command line arguments to read files.
    Useage is: node dsDriver.js <input_file>

    make_poem.js uses command line arguments to make a poem based on some input
    file of words.
    Usage is: npm run <command>
        list of commands that may be used:
            rbrbb       - Text file that contains "red blue red blue blue"
            rbbrrg      - Text file that contains "red blue blue red red green"
            ParLost     - The text file that contains Paridise Lost
            newLine     - A text file that contains new line characters
            Lowell      - The poem "For the Union Dead" by Robert  Lowell
            empty       - An empty text file
            Beowulf     - The entirety of Beowulf
            BeowulfP1   - The first part of Beowulf
            BeowulfMore - Beowulf with more!
            BeowulfHalf - Beowulf, but with half the fun.

# Output

    -The output for data_structures.js is as follows, object is the 
     data structure that is printed:
    
    -wordCount is: <object>
    -wordFreq is: <object>
    -condWordCount is: <object>
    -condWordFreq is: <object>

    -The output for make_poem.js is a poem that has the user specified amount
     of stanzas, lines per stanza, and words per line. Therefore, output is
     different depending on what is input by the user.

# Known Bugs
    
## Current known bugs:
        None

## Bugs that have been squished (i.e. Fixed issues):
      
      -condWordCount does not correctly count the number of words that follow.
      
      -As a result of the bug above, condWordFreq does not work as it relies on
      condWordCount.

      -When a word is followed by a period, and a new line character is
       directly after that period, the two words do not get seperated. Thus
       they are treated as one word.
      
      -make_poem.js does not display data_structures no matter which boolean
       value is provided.
