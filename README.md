Author: Evert Ball and Tyler Baylson
Version: v3.0 (November 26, 2018)

This is "Project 3" for Dr. Andrew Scott's CS253 Course


#USAGE

    data_structures uses command line arguments to read files.
    Useage is: node data_structures.js <input_file>

    make_poem.js uses command line arguments to make a poem based on some input
    file of words.
    Usage is: node make_poem.js <input_file> <number_stanzas> <number_lines> 
    <number_words> <array_of_probabilities> <boolean_display_data_structures>
    OR
    npm run <command>
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

#Output

    -The output for data_structures.js is as follows, object is the 
     data structure that is printed:
    
    -wordCount is: <object>
    -wordFreq is: <object>
    -condWordCount is: <object>
    -condWordFreq is: <object>

    -The output for make_poem.js is a poem that has the user specified amount
     of stanzas, lines per stanza, and words per line. Therefore, output is
     different depending on what is input by the user.

#Known Bugs
    
    -Current known bags:



    -Bugs that have been squished (i.e. Fixed issues):
      
      -condWordCount does not correctly count the number of words that follow.
      
      -As a result of the bug above, condWordFreq does not work as it relies on
      condWordCount.

      -When a word is followed by a period, and a new line character is
       directly after that period, the two words do not get seperated. Thus
       they are treated as one word.
      
      -make_poem.js does not display data_structures no matter which boolean
       value is provided.
