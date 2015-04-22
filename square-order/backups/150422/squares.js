/*jslint devel: true, indent: 4, maxerr: 50, browser: true, regexp: true */
var RES = RES || {};
RES.SO = RES.SO || {};
RES.SO.CONSTANTS = RES.SO.CONSTANTS || {};

// Constants
RES.SO.CONSTANTS.BLANK_IMAGE = "blank";
RES.SO.CONSTANTS.IMG_SRC_PREFIX = "images/";
RES.SO.CONSTANTS.IMG_SRC_SUFFIX = ".png";

RES.SO.squares9 = (function () {
    "use strict";
    
    var m_squares = [],   // All squares
        m_moves = [],     // Possible moves of each space
        m_imgs = [],      // Images objects of each space
        m_emptySquare,    // The square object that is empty
        m_imgSrcPrefix,
        m_imgSrcSuffix,
        m_steps,
        m_startTime,
        m_endTime,
        m_initLayout = [0, 1, 2, 3, 4, 5, 6, 7, 8], // Maps the positions to each square when it is first displayed
        
        switchImages = function (img1, img2) {
            var tmp = m_imgs[img1].src;
            m_imgs[img1].src = m_imgs[img2].src;
            m_imgs[img2].src = tmp;
        },
        
        m_squrebase = {
            imageSrc: '',
            currentPosition: 0,
            properPosition: 0,
            isEmpty: false,
                        
            isArrived: function () {
                return this.currentPosition === this.properPosition;
            },
            
            move: function () {
                // Move a square to the adjacent empty place 
                //   - switch place with the empty squre
                // Rules:
                // 1. Empty squre does not move.
                // 2. Squares can only move to their adjacent places.
                // 3. Squares can move to an empty place.
                var i,
                    pholder;
                
                if (!this.isEmpty) {
                    // Empty square cannot move
                    for (i = 0; i < m_moves[this.currentPosition].length; i += 1) {
                        if (m_moves[this.currentPosition][i] === m_emptySquare.currentPosition) {
                            pholder = m_emptySquare.currentPosition;
                            m_emptySquare.currentPosition = this.currentPosition;
                            this.currentPosition = pholder;
                            switchImages(m_emptySquare.currentPosition, this.currentPosition);
                            
                            m_steps += 1;
                            break;
                        }
                    }
                }
            }
        };
    
    function populateMoves() {
        // A collection of all the possible moves from a given position.
        
        m_moves[0] = [1, 3];
        m_moves[1] = [0, 2, 4];
        m_moves[2] = [1, 5];
        m_moves[3] = [0, 4, 6];
        m_moves[4] = [1, 3, 5, 7];
        m_moves[5] = [2, 4, 8];
        m_moves[6] = [3, 7];
        m_moves[7] = [4, 6, 8];
        m_moves[8] = [5, 7];
    }
    
    function shuffle(array) {
        // Randomize array element order in-place.
        // Using Fisher-Yates shuffle algorithm.
        
        var i,
            j,
            temp;
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    function createSquare(sid, pid) {
        // Create a square object based on m_squrebase
        // sid: number of the square. It is also the final/proper position of the square
        // pid: the current position of he square
        
        var rv;
        rv = Object.create(m_squrebase);
        rv.imageSrc = m_imgSrcPrefix + sid + m_imgSrcSuffix;
        rv.currentPosition = pid;
        rv.properPosition = sid;
        
        return rv;
    }
    
    function emptySqure(sid) {
        if (m_squares[sid]) {
            m_squares[sid].isEmpty = true;
            m_squares[sid].imageSrc = RES.SO.CONSTANTS.IMG_SRC_PREFIX + RES.SO.CONSTANTS.BLANK_IMAGE + RES.SO.CONSTANTS.IMG_SRC_SUFFIX;
            
            m_imgs[m_squares[sid].currentPosition].src = m_squares[sid].imageSrc;
            m_emptySquare = m_squares[sid];
        }
    }
    
    function draw() {
        // initial display of the squares
        var tobj,
            trobj,
            tdobj,
            imgobj,
            i,
            j,
            k = 0;
        
        // shuffle squares to random positions
        m_initLayout = shuffle(m_initLayout);
        for (i = 0; i < m_initLayout.length; i += 1) {
            m_squares[i].currentPosition = m_initLayout[i];
        }
                
        tobj = document.createElement("table");
        tobj.setAttribute("border", "1");
        tobj.setAttribute("align", "center");
        
        // We need a 3 * 3 table
        for (i = 0; i < 3; i += 1) {
            trobj = document.createElement("tr");
            
            for (j = 0; j < 3; j += 1) {
                tdobj = document.createElement("td");
                imgobj = document.createElement("img");
                imgobj.setAttribute("id", k);
                imgobj.setAttribute("src", m_squares[m_initLayout[k]].imageSrc);
                imgobj.setAttribute("onclick", "RES.SO.squares9.move( " + k + " )");
                tdobj.appendChild(imgobj);
                trobj.appendChild(tdobj);

                // Keep the reference of the image
                m_imgs[k] = imgobj;
                
                k += 1;
            }
            
            tobj.appendChild(trobj);
        }
        
        if (document.getElementById("container")) {
            document.getElementById("container").appendChild(tobj);
        }
    }
    
    function isAllArrived() {
        // To check if all squares have reached their proper position. 
        // Returning true means the game is over and the player wins
        var i;
        
        for (i = 0; i < m_squares.length; i += 1) {
            if (!m_squares[i].isArrived()) {
                //console.log("square[" + i + "] has not arrived");
                return false;
            }
        }
        
        //console.log("All arrived");
        return true;
    }
        
    return {
        init: function () {
            //m_empty = 0;
            m_imgSrcPrefix = RES.SO.CONSTANTS.IMG_SRC_PREFIX;
            m_imgSrcSuffix = RES.SO.CONSTANTS.IMG_SRC_SUFFIX;
            
            populateMoves();
            
            m_squares[0] = createSquare(0, 0);
            m_squares[1] = createSquare(1, 1);
            m_squares[2] = createSquare(2, 2);
            m_squares[3] = createSquare(3, 3);
            m_squares[4] = createSquare(4, 4);
            m_squares[5] = createSquare(5, 5);
            m_squares[6] = createSquare(6, 6);
            m_squares[7] = createSquare(7, 7);
            m_squares[8] = createSquare(8, 8);
                 
            draw();
            
            emptySqure(0);
            
            m_steps = 0;
            m_startTime = new Date();
            
            if (isAllArrived()) {
                console.log("All done before I even do anything");
            }
        },
        
        move: function (positionId) {
            // Figure out which squre is on the clicked position
            var i,
                timeUsed;
            for (i = 0; i < m_squares.length; i += 1) {
                if (m_squares[i].currentPosition === parseInt(positionId, 10)) {
                    m_squares[i].move();
                    break;
                }
            }
            
            if (isAllArrived()) {
                m_endTime = new Date();
                timeUsed = (m_endTime.getTime() - m_startTime.getTime()) / 1000;
                console.log("You did it in " + m_steps + " steps, " + timeUsed + " seconds.");
            }
        }
    };
    
    
}());

if (window.addEventListener) {
    window.addEventListener("load", function () {
        "use strict";
        RES.SO.squares9.init();
    });
} else {
    window.attachEvent("onload", function () {
        "use strict";
        RES.SO.squares9.init();
    });
}