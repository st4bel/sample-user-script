// ==UserScript==
// @name        DS_Sample_Script
// @namespace   de.die-staemme
// @version     0.1.0
// @description Sample script for learning purposes
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// @match       https://*.die-staemme.de/game.php?
// @include     https://*.die-staemme.de/game.php?*
// @copyright   2016+, the stabel, git
// @downloadURL -
// ==/UserScript==

// this is the standard configuration, which is loaded when the script is used for the first time
var _config = {"running":"true","debug":"false"};

$(function(){ //everything in here get executed after the page is fully loaded

    // =====================================================
    // normaly variables cant be "transported" to the next page e.g. if you reload a page
    var storage = localStorage;
    var storagePrefix="sample_Script_v0.1.0_"; // setting a prefix to prevent using variables from another script
    function storageGet(key,defaultValue) {
        var value= storage.getItem(storagePrefix+key);
        return (value === undefined || value === null) ? defaultValue : value;
    }
    function storageSet(key,val) {
        storage.setItem(storagePrefix+key,val);
    }

    // =====================================================
    // setting variables in local storage

    // setting the config into local storage, if its not already safed, then load "_config" from above
    storageSet("config",storageGet("config",JSON.stringify(_config)));

    // =====================================================
    // initiate the User Interface 

    //init_UI();

    // =====================================================
    // if the script is activated, do something...

    var autoRun = JSON.parse(storageGet("config")).running==="true";

    if (autoRun) {
        color_storage();
    }

    // =====================================================

    function color_storage() {

        // getting the storage limit with jQuery
        var storage_limit = $("#storage").text();
        // storage_limit is still a String (e.g. "400000") but we need a number (int)
        storage_limit = parseInt(storage_limit);

        // get storage recources
        var wood = parseInt($("#wood").text());
        var stone = parseInt($("#stone").text());
        var iron = parseInt($("#iron").text());

        // deciding which color to use
        var color_wood = (wood < storage_limit * 0.8) ? (wood < storage_limit * 0.5 ? "green" : "yellow") : "red";
        var color_stone= (stone< storage_limit * 0.8) ? (stone< storage_limit * 0.5 ? "green" : "yellow") : "red";
        var color_iron = (iron < storage_limit * 0.8) ? (iron < storage_limit * 0.5 ? "green" : "yellow") : "red";
        // the lines above are so called "inline if statements", they are short for:
        /*
        if (wood < storage_limit * 0.8) {
            if (wood < storage_limit * 0.5) {
                color_wood = "green";
            } else {
                color_wood = "yellow";
            }
        } else {
            color_wood = "red";
        }       
        */

        // now we color the fields which display the stored resources depending on percentage of the maximal value
        $("#wood").css("background-color", color_wood);
        $("#stone").css("background-color", color_stone);
        $("#iron").css("background-color", color_iron);
    }
    // =====================================================

    // thats it
});