/**
 * This file runs the data_structures.js file
 *
 * @author Evert Ball and Tyler Baylson
 * @version 28 November 2018
 */

/**
 * The main entry point to the file
 */
function main(args){
        const ds = require("./data_structures.js");
        console.log(ds.main(args));
} // end main() function


if(require.main === module){
    main(process.argv[2]);
}
