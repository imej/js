/*jslint devel: true, indent: 4, maxerr: 50, browser: true, regexp: true */
var RES = RES || {};
RES.SO = {};

RES.SO.squares9 = (function () {
    "use strict";
    
    var m_squares = [],
        m_moves = [],
        m_imgs = [],
        m_empty,
        m_imgSrcPrefix,
        m_imgSrcSuffix,
        switchImages = function (img1, img2) {
            var tmp = m_imgs[img1].src;
            m_imgs[img1].src = m_imgs[img2].src;
            m_imgs[img2].src = tmp;
        },
        m_squrebase = {
            imageSrc: '',
            currentPosition: 0,
            properPosition: 0,
                        
            isArrived: function () {
                return this.currentPosition === this.properPosition;
            },
            
            move: function () {
                var i,
                    pholder;
                
                if (m_empty !== this.currentPosition) {
                    // Empty square cannot move
                    for (i = 0; i < m_moves[this.currentPosition].length; i += 1) {
                        if (m_moves[this.currentPosition][i] === m_empty) {
                            pholder = m_empty;
                            m_empty = this.currentPosition;
                            this.currentPosition = pholder;
                            switchImages(m_empty, this.currentPosition);
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
    
    function draw() {
        // initial display of the squares
        var tobj,
            trobj,
            tdobj,
            imgobj,
            i,
            j,
            k = 0;
        
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
                imgobj.setAttribute("src", m_squares[k].imageSrc);
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
        
    return {
        init: function () {
            m_empty = 0;
            m_imgSrcPrefix = "images/";
            m_imgSrcSuffix = ".png";
            
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
        },
        
        move: function (positionId) {
            // Figure out which squre is on the clicked position
            var i;
            for (i = 0; i < m_squares.length; i += 1) {
                if (m_squares[i].currentPosition === parseInt(positionId, 10)) {
                    m_squares[i].move();
                    break;
                }
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