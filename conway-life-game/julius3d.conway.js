/**
 * Created by Julius Alvarado on 12/30/2016.
 */


//TODO: i NEED to convert this code into angular controllers & directives.

// just a simple selector
function j(selector, container) {
    return (container || document).querySelector(selector);
}

// conwayLifeGame class / closure
(function () {
    "use strict";

    // -- conway game utility functions --

    // will only clone a 2d array
    function clone2dArray(zArray) {
        // .slice() just returns a clone of the array
        return zArray.slice().map(function (row) {
            return row.slice();
        });
    }

    var ja = self.conwayLifeGame = function (seed) {
        // check that seed is an array.
        this.seed = seed;
        this.height = seed.length;
        this.width = seed[0].length;

        this.prevBoard = [];
        this.board = clone2dArray(seed);

    }; // end of conway

    ja.prototype = {
        next: function () {
            this.prevBoard = clone2dArray(this.board);

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var neighbors = this.aliveNeighbors(this.prevBoard, x, y);
                    // console.log(y, x, ':', neighbors);
                    var alive = !!this.board[y][x];

                    // 3 game rules are handled here:
                    // cells die & cells become alive if rules are met.
                    // cells that were already alive just continue
                    // to live on without having to write any code.
                    if (alive) {
                        if (neighbors < 2 || neighbors > 3) {
                            this.board[y][x] = 0;
                        }
                    } else {
                        if (neighbors === 3) {
                            this.board[y][x] = 1;
                        }
                    }
                }
            }
        },
        aliveNeighbors: function (zarray, x, y) {
            var prevRow = zarray[y - 1] || [];
            var nextRow = zarray[y + 1] || [];

            return [
                // the 3 squares above the current square.
                prevRow[x - 1], prevRow[x], prevRow[x + 1],
                zarray[y][x - 1], zarray[y][x + 1], // left & right
                // the 3 squares on the bottom.
                nextRow[x - 1], nextRow[x], nextRow[x + 1]
            ].reduce(function (previous, current) {
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
        toString: function () {
            return this.board.map(function (row) {
                return row.join(' ');
            }).join('\n');
        }
    };

})(); // end of conwayLifeGame class / closure


// conwayLifeGameUI class / closure
(function () {
    "use strict";

    var ja = self.conwayLifeGameUI = function (table, size) {
        this.grid = table;
        this.size = size;
        this.started = false;
        this.autoplay = false;

        this.createGrid();
    };

    ja.prototype = {
        createGrid: function () {
            var zgrid = this;
            var fragment = document.createDocumentFragment();
            this.grid.innerHTML = '';
            this.checkboxes = [];

            for (var y = 0; y < this.size; y++) {
                var row = document.createElement('tr');
                this.checkboxes[y] = [];

                for (var x = 0; x < this.size; x++) {
                    var cell = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    this.checkboxes[y][x] = checkbox;
                    checkbox.coords = [y, x];

                    cell.appendChild(checkbox);
                    row.appendChild(cell);
                }
                fragment.appendChild(row);
            }

            this.grid.addEventListener('change', function (event) {
                if (event.target.nodeName.toLowerCase() === 'input') {
                    // I already know it's a checkbox input
                    zgrid.started = false;
                }
            });

            this.grid.addEventListener('keyup', function (event) {
                var checkbox = event.target;
                if (checkbox.nodeName.toLowerCase() === 'input') {
                    var coords = checkbox.coords;
                    var y = coords[0];
                    var x = coords[1];

                    // console.log(event.keyCode);
                    switch (event.keyCode) {
                        case 37: // left
                            // make sure it stops at left edge
                            if (x > 0) {
                                zgrid.checkboxes[y][x - 1].focus();
                            }
                            break;
                        case 38: // up
                            if (y > 0) {
                                zgrid.checkboxes[y - 1][x].focus();
                            }
                            break;
                        case 39: // right
                            // make sure it stops at right edge.
                            if (x < zgrid.size) {
                                zgrid.checkboxes[y][x + 1].focus();
                            }
                            break;
                        case 40: // down
                            if (y < zgrid.size-1) {
                                zgrid.checkboxes[y + 1][x].focus();
                            }

                            break;
                    }
                }
            });

            this.grid.appendChild(fragment);
        }, // END OF: createGrid function.

        get boardArray() {
            console.log("boardArray successfully called.");
            return this.checkboxes.map(function (rowElem) {
                return rowElem.map(function (checkBox) {
                    return +checkBox.checked;
                })
            });
        },
        play: function () {
            this.game = new conwayLifeGame(this.boardArray);
            this.started = true;
        },
        next: function () {
            var znext = this;
            if (!this.started || this.game) {
                this.play();
            }
            this.game.next();
            var zboard = this.game.board;
            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var alive = !!zboard[y][x];
                    this.checkboxes[y][x].checked = alive;
                }
            }

            if (this.autoplay) {
                this.timer = setTimeout(function () {
                    znext.next();
                }, 700)
            }
        }
    }

})(); // END OF: conwayLifeGameUI class / closure; ^_^

var gameInteface = new conwayLifeGameUI(document.getElementById('jgrid'), 12);


// mini game controller class / closure
(function () {
    "use strict";

    var zbuttons = {
        next: j('button.j3dNext')
    };

    zbuttons.next.addEventListener('click', function (event) {
        gameInteface.next();
    });

    j('#autoplay').addEventListener('change', function () {
        zbuttons.next.textContent = this.checked ? 'Start' : 'Next';

        gameInteface.autoplay = this.checked;

        if (!this.checked) {
            clearTimeout(gameInteface.timer);
        }
    });
}()); // END OF: mini game controller class / closure; ^_^

/*
 var game = new conwayLifeGame([
 [0, 0, 0, 0, 0, 0],
 [0, 0, 1, 1, 1, 0],
 [0, 1, 1, 1, 0, 0],
 [0, 0, 1, 0, 0, 0],
 [0, 0, 0, 0, 0, 0]
 ]);

 console.log("Conways Game of Life: ");
 console.log(game + '');

 game.next();
 console.log(game + "");

 game.next();
 console.log(game + "");
 */





//\\