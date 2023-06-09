/*
 * Author: Patrick Kellar
 * Description: This preserves the history of the main application and will call the respective undo/redo functions
 * */
//GRADING: MANAGE
class History {
    preconfiguredOptions = ["base", "allEggs", "mixed"];
    constructor() {
        this.UndoRedos = [];
        this.index = 0;

        this.currentRow = "goodies0";
        this.rowCount = 0;
        this.currentGoodyId = 0;
        this.currentBasket = "brown_basket.png";
    }

    /*
     * Description: Checks if a row needs to be added with the next goody addition
     *
     * @return true if a row needed to be added and false if not
     * */
    addRow() {
        //Get the current goody row and how many goodies are in it
        let currentRow = document.getElementById(this.currentRow);
        let currentRowCount = currentRow.childElementCount;

        //Check if there is a goody and if it is a white egg
        if (currentRow.lastChild !== null && currentRow.lastChild.alt !== "white_egg.png") {
            //If it's not a white egg, that will take up a new spot and will add 1 to the row count
            currentRowCount += 1;
        }

        //Return true if row would have 7 elements after addition
        return ((currentRowCount) % 7) === 0;
    }

    /*
      * Description: Check if a redo can be done
      *
      * @return true if redo can be done, false if not
      * */
    canRedo(){
        return this.index < this.UndoRedos.length;
    }

    /*
      * Description: Check if an undo can be done
      *
      * @return true if undo can be done, false if not
      * */
    canUndo(){
        return this.index !== 0;
    }

    /*
     * Description: Will disable the goody addition buttons and enable the confirmation button
     *
     * @return   void
     * */
    disableGoodyButtons() {
        //Tell the user the goody buttons are disabled
        document.getElementById("warning").innerHTML = 'Goody Buttons disabled';

        //Enable the confirmation button (says "white_egg" since that is what is added on confirmation)
        document.getElementById("white_egg").disabled = false;

        //Sets the onclick to undefined since it is an image click that performs a command, not a button (images can't be disabled)
        //document.getElementById("blue_egg").onclick = undefined;
        document.getElementById("blue_egg").hidden = true;
        document.getElementById("stripe_egg").hidden = true;

        document.getElementById("red_egg").hidden = true;
        document.getElementById("yellow_egg").hidden = true;
        document.getElementById("purple_egg").hidden = true;

        document.getElementById("chocolate_bunny").hidden = true;
    }

    /*
     * Description: Will enable the goody addition buttons and disable the confirmation button
     *
     * @return   void
     * */
    enableGoodyButtons() {
        //Remove the warning over the goody add buttons
        document.getElementById("warning").innerHTML = '';

        //Disable the confirmation button (says "white_egg" since that is what is added on confirmation)
        document.getElementById("white_egg").disabled = true;

        //Adds the site event to the goody buttons
        document.getElementById("blue_egg").hidden = false;
        document.getElementById("stripe_egg").hidden = false;

        document.getElementById("red_egg").hidden = false;
        document.getElementById("yellow_egg").hidden = false;
        document.getElementById("purple_egg").hidden = false;

        document.getElementById("chocolate_bunny").hidden = false;
    }

    /*
     * Description: Will perform the action that is passed into it and save it to the UndoRedos array
     *
     * @param    cmd - The command the user wants to perform
     * @return   void
     * */
    executeAction(cmd) {
        //Update the current index tracker of UndoRedos and add the command to the list
        this.UndoRedos.length = this.index;
        this.UndoRedos.push(cmd);
        this.index = this.UndoRedos.length;

        //Check if the command is a basket change
        if (cmd.basketObject.includes("basket")) {
            //If it is a different basket, update the history's basket and have the command perform a basket update
            if (cmd.basketObject !== this.currentBasket) {
                this.currentBasket = cmd.basketObject;
                cmd.execBasket();
            }
            else {
                //If it's the same basket, remove it from UndoRedos array since there is no change
                this.UndoRedos.pop();
                this.index = this.UndoRedos.length;
            }
        }
        //If it isn't a basket command, it is one adding a goody, deleting a goody, or a preconfigured selection
        else {
            this.executeGoodyAction(cmd);
        }

        //Update the undo/redo and delete buttons
        this.updateUI();
    }

    /*
     * Description: Will perform the goody action that is passed into it
     *
     * @param    cmd - The command the user wants to perform
     * @return   void
     * */
    executeGoodyAction(cmd) {

        //Check if it is a delete event
        if (cmd.basketObject === "delete") {
            //Check if a row needs to be removed
            if(this.removeRow()) {
                //Execute delete and save the returned currentGoodyId
                this.currentGoodyId = cmd.execDelete(this.currentGoodyId, true, this.rowCount);

                //Update the current row information
                this.rowCount -= 1;
                this.currentRow = "goodies" + this.rowCount.toString();
            }
            else {
                //Delete the most recent goody in the row and save the returned currentGoodyId
                this.currentGoodyId = cmd.execDelete(this.currentGoodyId, false, this.rowCount);
            }

            //Enable the goody addition buttons
            this.enableGoodyButtons();
        }
        //Check if command is preconfigured
        else if (this.isPreconfigured(cmd.basketObject)) {
            //Enable the goody addition buttons
            this.enableGoodyButtons();

            switch (cmd.basketObject) {
                case 'base':
                    //Update to the base option
                    cmd.execBase();
                    this.currentGoodyId = 0;
                    this.rowCount = 0;
                    this.currentRow = "goodies0";
                    this.currentBasket = "brown_basket.png";
                    break;
                case 'allEggs':
                    //Update to the all eggs option
                    cmd.execAllEggs();
                    this.currentGoodyId = 6;
                    this.rowCount = 1;
                    this.currentRow = "goodies1";
                    this.currentBasket = "brown_basket.png";
                    break;
                case 'mixed':
                    //update to the mixed option
                    cmd.execMixed();
                    this.currentGoodyId = 10;
                    this.rowCount = 2;
                    this.currentRow = "goodies2";
                    this.currentBasket = "white_basket.png";
                    break;
            }
        }
        //Otherwise a goody is being added to the basket
        else {
            //increment the goody id
            this.currentGoodyId += 1;

            //Check if a new row needs to be added
            if (this.addRow()) {
                //Increment the row information and add the new goody
                this.rowCount += 1;
                this.currentRow = "goodies" + this.rowCount.toString();
                cmd.execGoody(this.currentGoodyId, true, this.currentRow);
            }
            else {
                //Add the new goody to the current row
                cmd.execGoody(this.currentGoodyId, false, this.currentRow);
            }

            //If basket ends in white egg, allow new goody to be added
            if(cmd.basketObject.includes("white_egg")) {
                this.enableGoodyButtons();
            }
            //Else don't allow a new goody to be added
            else {
                this.disableGoodyButtons();
            }
        }
    }

    /*
      * Description: Check if an event is preconfigured
      *
      * @param    event - The event you are checking
      * @return true if the event is preconfigured, false if not
      * */
    isPreconfigured(event) {
        return this.preconfiguredOptions.includes(event);
    }

    /*
     * Description: This is called after a file has been loaded in so that the history knows the state of the main area
     *
     * @return   void
     * */
    load() {
        //Get the current basket and save which color it is
        let basket = document.getElementById("currentBasket");
        this.currentBasket = basket.alt;

        //Get the goody container
        let goodies = document.getElementById("goodies0");

        //Get how many goody rows there are
        this.rowCount = goodies.childElementCount;
        this.currentRow = "goodies" + this.rowCount;

        //Get the goody count, if no rows, there are no goodies
        if(this.rowCount !== 0) {
            this.currentGoodyId = Number(goodies.childNodes[0].lastChild.id);
        }
        else {
            this.currentGoodyId = 0;
        }
    }

    /*
     * Description: Will redo an action that has been undone
     *
     * @return   void
     * */
    redoCmd() {
        //Check it there is a command to redo
        if(this.index < this.UndoRedos.length)
        {
            //Get the command to redo and increment the index to point to the next command
            let cmd = this.UndoRedos[this.index];
            this.index += 1;

            //If it's a basket command, change the basket
            if (cmd.basketObject.includes("basket")) {
                this.currentBasket = cmd.basketObject;
                cmd.execBasket();
            }
            //If it's not a basket command, it is a command involving the goodies
            else {
                this.executeGoodyAction(cmd);
            }

            //Update the undo/redo buttons and the delete button
            this.updateUI();
        }
    }

    /*
     * Description: Check if a row needs to be removed
     *
     * @return true if a row needed to be removed and false if not
     * */
    removeRow() {
        //Get the current goody row and how many goodies are in it
        let currentRow = document.getElementById(this.currentRow);
        let currentRowCount = currentRow.childElementCount;

        //If the most recent goody is a white egg, 1 will be removed from the count
        if (currentRow.lastChild.alt === "white_egg.png") {
            currentRowCount -= 1;
        }

        //Return true if current row will have 0 elements after a goody is removed
        return (currentRowCount === 0);
    }

    /*
     * Description: Will undo the previous action in UndoRedos
     *
     * @return   void
     * */
    undoCmd() {
        //Check there is something to undo
        if(this.index > 0)
        {
            //Get the previous command
            let cmd = this.UndoRedos[this.index-1];

            //Check if it was a basket change command
            if (cmd.basketObject.includes("basket")) {
                //Undo the basket change
                this.currentBasket = cmd.undoBasket();
            }
            //Check if it was a delete goody command
            else if (cmd.basketObject === "delete") {

                //Check if a row that was deleted before needs to be added back (if the current row is already full)
                if(document.getElementById(this.currentRow).childElementCount === 6) {
                    //Undo delete and update the currentGoodyId
                    this.currentGoodyId = cmd.undoDelete(this.currentGoodyId, true, this.rowCount);

                    //Increment the row information
                    this.rowCount += 1;
                    this.currentRow = "goodies" + this.rowCount.toString();

                    //Enable the goody addition buttons
                    this.enableGoodyButtons();
                }
                else {
                    //Undo delete and update the currentGoodyId
                    this.currentGoodyId = cmd.undoDelete(this.currentGoodyId, false, this.rowCount);

                    //Check if the most recent goody is a white egg
                    if (document.getElementById(this.currentRow).lastChild.alt === "white_egg.png") {
                        //Enable the goody add buttons if it's a white egg
                        this.enableGoodyButtons();
                    }
                    else {
                        //Disable the goody add buttons if it's not a white egg
                        this.disableGoodyButtons();
                    }
                }

            }
            //Check if you are undoing a preconfigured command
            else if (this.isPreconfigured(cmd.basketObject)) {
                let returnedHistoryValues = cmd.undoPreconfigure();

                //Update the history information to what it was before the preconfigure choice
                this.currentGoodyId = returnedHistoryValues.goodieCount;
                this.rowCount = returnedHistoryValues.rowCount;
                this.currentRow = "goodies" + this.rowCount.toString();
                this.currentBasket = returnedHistoryValues.basket;

                //Enable or disable the goody add buttons to its previous state
                if (returnedHistoryValues.enableGoodies === true) {
                    this.enableGoodyButtons();
                }
                else {
                    this.disableGoodyButtons();
                }
            }
            //Otherwise you are undoing a goody addition
            else {
                //Check if you need to remove a row
                if (this.removeRow()) {

                    //Undo the goody addition
                    cmd.undoGoody(this.currentGoodyId, true, this.currentRow);

                    //Update the row information
                    this.rowCount -= 1;
                    this.currentRow = "goodies" + this.rowCount.toString();
                }
                else {
                    //Undo the goody addition in the current row
                    cmd.undoGoody(this.currentGoodyId, false, this.currentRow);
                }

                //Decrement the currentGoodyId
                this.currentGoodyId -= 1;

                //Check if the most recent goody added is a white egg
                if(cmd.basketObject.includes("white_egg")) {
                    //If it's a white egg, disable the goody addition buttons
                    this.disableGoodyButtons();
                }
                else {
                    //If it's not a white egg, enable the goody addition buttons
                    this.enableGoodyButtons();
                }
            }

            //Decrement the index tracker for UndoRedos array
            this.index -= 1;

            //Update the undo/redo buttons and the delete button
            this.updateUI();
        }
    }

    /*
     * Description: Will set the undo, redo, delete, and "noneContainer" information based off of the current state of the main page
     *
     * @return   void
     * */
    updateUI()
    {
        document.getElementById("undo").disabled = !this.canUndo();
        document.getElementById("redo").disabled = !this.canRedo();

        let goodies = document.getElementById("goodies0");
        document.getElementById("delete").disabled = goodies.childElementCount === 0;

        if(goodies.childElementCount !== 0 && document.getElementById("noneContainer").innerHTML !== "") {
            document.getElementById("noneContainer").innerHTML = "";
        }
    }
}

//The helper class to our undo/redo
var hist = new History();

/*
 * Description: Will tell the history to load the current state of the main page
 *
 * @return   void
 * */
function load()
{
    hist.load();
}

/*
 * Description: Will exectute a preconfigured easter basket option and pss in a new UndoRedo object
 *
 * @param    event - The preconfigured event that was selected
 * @return   void
 * */
function preconfiguredEvent(event) {
    //GRADING: ACTION
    hist.executeAction(new UndoRedo(event.target.id));
}

/*
 * Description: Will tell the history to redo the current action
 *
 * @return   void
 * */
function redo()
{
    hist.redoCmd();
}

/*
 * Description: Will call the index page with reset as true so that the page information is cleared
 *
 * @return   void
 * */
function reset() {
    window.location.href = "index.php?reset=true";
}

/*
 * Description: This will trigger a file save and will keep the current state of the main page
 *
 * @return   void
 * */
function save() {
    //Get the goody container
    let goodies = document.getElementById("goodies0");

    //If there are no goodies, move on
    if(goodies.childElementCount !== 0) {
        //Check if the most recent goody is confirmed by looking for a white egg
        if (goodies.firstChild.lastChild.alt !== "white_egg.png") {
            //Get the removed goodies' id
            let removedGoodyId = Number(goodies.firstChild.lastChild.id);

            //Remove the unconfirmed goody and add in a white egg since the previous one is still confirmed
            goodies.firstChild.removeChild(goodies.firstChild.lastChild);
            goodies.firstChild.innerHTML += `<img src="./Starting_Images/white_egg.png" id="${removedGoodyId - 1}" 
                                    alt="white_egg.png">`;
        }
    }

    //Get the basket html
    let basket = document.getElementById("basketContainer").innerHTML;
    //Send the retrieved goody and basket info to the main page to be saved
    window.location.href = "./File_Manager/save.php?save=1&goodies=" + goodies.innerHTML + "&basket=" + basket;
}


/*
 * Description: Will execute an event that involves adding/changing an individual goody or basket
 *
 * @param    event - The goody event that was selected
 * @return   void
 * */
function siteEvent(event) {
    //GRADING: ACTION
    hist.executeAction(new UndoRedo( event.target.id + ".png"));
}

/*
 * Description: Will tell the history to undo the current action
 *
 * @return   void
 * */
function undo()
{
    hist.undoCmd();
}

window.onload = function() {

    //setting the goody addition button clicks
    document.getElementById("blue_egg").onclick = siteEvent;
    document.getElementById("stripe_egg").onclick = siteEvent;
    document.getElementById("purple_egg").onclick = siteEvent;
    document.getElementById("red_egg").onclick = siteEvent;
    document.getElementById("yellow_egg").onclick = siteEvent;

    document.getElementById("chocolate_bunny").onclick = siteEvent;

    //setting the undo redo button clicks
    document.getElementById("undo").onclick = undo;
    document.getElementById("redo").onclick = redo;

    //setting the basket buttons clicks
    document.getElementById("brown_basket").onclick = siteEvent;
    document.getElementById("white_basket").onclick = siteEvent;

    //setting the preconfigured button clicks
    document.getElementById("base").onclick = preconfiguredEvent;
    document.getElementById("allEggs").onclick = preconfiguredEvent;
    document.getElementById("mixed").onclick = preconfiguredEvent;
    document.getElementById("delete").onclick = preconfiguredEvent;

    //setting the reset button click
    document.getElementById("reset").onclick = reset;

    //white_egg is the id for the confirmation button, disable initially
    document.getElementById("white_egg").disabled = true;
    document.getElementById("white_egg").onclick = siteEvent;

    hist.updateUI();
}