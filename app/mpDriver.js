/**
 * This is the driver for make_poem.js
 *
 * @author Evert Ball and Tyler Baylson
 * @version 28 November 2018
 */

/**
 * Prints to the console the results of calling make_poem's main(args)
 * @param args: The command line arguments for make_poem.js
 */
function main(args){
    let mp = require("./make_poem.js");
    console.log(mp.main(args));
}

if(require.main === module){
    main(process.argv);
}
