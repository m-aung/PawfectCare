var stripAnsi = require('strip-ansi');
var string = '\x1b[31mThis is a red string with ANSI codes.\x1b[0m';
var strippedString = stripAnsi(string);
console.log(strippedString);
