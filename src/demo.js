/**
 * demo.js
 */
import basic from 'wwwbasic';

basic.Basic(`
        PRINT "Hello World!"
        FOR i = 1 TO 10
          PRINT "Counting "; i
        NEXT i
        `, {
              debug: true
           });

console.log('basic =', basic)

/**
 * wwwBASIC
 * https://google.github.io/wwwbasic/
 */