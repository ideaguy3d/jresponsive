/**
 * Created by Julius Alvarado on 12/30/2016.
 */


// all of this will be converted into an angular controller.
(function(){
    "use strict";

    // -- conway game utility functions --

    // will only clone a 2d array
    function clone2dArray(zArray) {
        // .slice() just returns a clone of the array
        return zArray.slice().map(function(row){
            return row.slice();
        });
    }

    var conway = self.conwayLife = function(seed){
        // check that seed is an array.
        this.seed = seed;
        this.height = seed.length;
        this.width = seed[0].length;

        this.prevBoard = [];
        this.board = clone2dArray(seed);

    }; // end of conway

    conway.prototype = {
        next: function(){
            this.prevBoard = clone2dArray(this.board);

            for(var y=0; y < this.height; y++) {
                for(var x=0; x < this.width; x++) {
                    var neighbors = this.aliveNeighbors(this.prevBoard, x, y);
                    console.log(y, x, ':', neighbors);
                }
            }
        },
        aliveNeighbors: function(zarray, x, y){
            var prevRow = zarray[y-1] || [];
            var nextRow = zarray[y+1] || [];

            return [
                // the 3 squares above the current square.
                prevRow[x-1], prevRow[x], prevRow[x+1],
                zarray[y][x-1], zarray[y][x+1], // left & right
                // the 3 squares on the bottom.
                nextRow[x-1], nextRow[x], nextRow[x+1]
            ].reduce(function(previous, current){
                /*
                 +undefined
                 NaN
                 !undefined
                 true
                 !!undefined
                 false
                 +!!undefined
                 0
                */
                return previous + +!!current;
            }, 0);
        },
        toString: function(){
            return this.board.map(function(row){
                return row.join(' ');
            }).join('\n');
        }
    };


})(); // end of closure



var game = new conwayLife([
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
]);

console.log("Conways Game of Life: ");
console.log(game + '');

game.next();
console.log(game+"");



//\\