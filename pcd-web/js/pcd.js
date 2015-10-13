/*jslint devel: true, indent: 4, maxerr: 50, browser: true, regexp: true */
var RES = RES || {};
RES.PCD = RES.PCD || {};
RES.PCD.CONSTANTS = RES.PCD.CONSTANTS || {};
RES.PCD.CONSTANTS.MAX_PAGE = 9;

RES.PCD.Pagination = (function () {
    /////////////////////////////////////////////////////////////////////////////////
    // An object provides pagination function
    // Format of the pagination: < 1 2 3 4 5 6 7 8 9 >
    //                           < - previous page
    //                           > - next page
    //                           Only nine pages will be displayed at a given time.
    /////////////////////////////////////////////////////////////////////////////////
    'use strict';
    
    var rcdPerPage,
        rcdCount,
        currentPage,
        urlPre;
    
    return {
        // Setters
        setRcordsPerPage: function (rpp) {
            rcdPerPage = parseInt(rpp, 10);
        },
        
        setRcordsCount: function (rc) {
            rcdCount = parseInt(rc, 10);
        },
        
        setCurrentPage: function (cp) {
            currentPage = parseInt(cp, 10);
        },
        
        setURLPrefix: function (url) {
            if (url) {
                urlPre = url;
            } else {
                urlPre = '';
            }
            
            // Remove the last '/'
            if (urlPre.charAt(urlPre.length - 1) === '/') {
                urlPre = urlPre.substring(0, urlPre.length - 1);
            }
        },
    
        // Return the pages.
        // An array of Page objects will be returned.
        // -- The Previous/Next page buttons are only included when necessary
        // -- Maximum 9 pages will be included other than the Previous/Next
        // -- The current active page is placed in the middle of the nine pages when possible
        // The structure of a Page object:
        //    {
        //        id: int
        //        url: string
        //        label: string
        //        active: boolean
        //    }
        getPages: function () {
            var rv = [],
                pgNums = [],
                tmppg,
                pgCount,
                i = 0,
                j = 0,
                hf;
                
            if (rcdPerPage && rcdCount && currentPage) {
                pgCount = Math.floor(rcdCount / rcdPerPage);
                if (rcdCount % rcdPerPage > 0) {
                    pgCount += 1;
                }
                
                // Only show the Previous (<) button when necessary
                if (currentPage > 1) {
                    tmppg = {
                        id: i,
                        url: urlPre + '/' + (currentPage - 1),
                        label: '<',
                        active: false
                    };
                    
                    rv.push(tmppg);
                    i += 1;
                }
                
                // Get all page numbers
                if (pgCount <= RES.PCD.CONSTANTS.MAX_PAGE) {
                    while (j < pgCount) {
                        pgNums.push(j + 1);
                        j += 1;
                    }
                } else if (currentPage + RES.PCD.CONSTANTS.MAX_PAGE > pgCount) {
                    for (j = 0; j < RES.PCD.CONSTANTS.MAX_PAGE; j += 1) {
                        pgNums.push(pgCount - RES.PCD.CONSTANTS.MAX_PAGE + 1 + j);
                    }
                } else if (currentPage < Math.ceil(RES.PCD.CONSTANTS.MAX_PAGE / 2)) {
                    for (j = 0; j < RES.PCD.CONSTANTS.MAX_PAGE; j += 1) {
                        pgNums.push(j + 1);
                    }
                } else {
                    hf = Math.floor(RES.PCD.CONSTANTS.MAX_PAGE / 2);
                    for (j = 0; j < hf; j += 1) {
                        pgNums.push(currentPage - hf + j);
                    }
                    
                    for (j = 0; j < hf + 1; j += 1) {
                        pgNums.push(currentPage + j);
                    }
                }
                
                // Add pages
                for (j = 0; j < pgNums.length; j += 1) {
                    tmppg = {
                        id: i,
                        url: urlPre + '/' + pgNums[j],
                        label: pgNums[j],
                        active: pgNums[j] === currentPage ? true : false
                    };
                    
                    rv.push(tmppg);
                    i += 1;
                }
                
                // Only show the Next (>) button when necessary
                if (currentPage !== pgCount) {
                    tmppg = {
                        id: i,
                        url: urlPre + '/' + (currentPage + 1),
                        label: '>',
                        active: false
                    };
                    
                    rv.push(tmppg);
                }
                
            }
                
            return rv;
        }
    };
}());

RES.PCD.MaintainHistory = function (rs, url) {
    /////////////////////////////////////////////////
    // We maintain the history of the hashes in an array
    // in the $rootScope. We will use it to close the 
    // current page - go back to the previous page.
    /////////////////////////////////////////////////
    'use strict';
    
    if (rs && url) {
        if (rs.LinkHistory) {
            if (rs.LinkHistory[rs.LinkHistory.length - 1].lastIndexOf('/') === url.lastIndexOf('/')) {
                if (rs.LinkHistory[rs.LinkHistory.length - 1].substring(0, rs.LinkHistory[rs.LinkHistory.length - 1].lastIndexOf('/')) === url.substring(0, url.lastIndexOf('/'))) {
                    rs.LinkHistory[rs.LinkHistory.length - 1] = url;
                }
            } else {
                rs.LinkHistory.push(url);
            }
        } else {
            rs.LinkHistory = [url];
        }
    }
};