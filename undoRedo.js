/*
 * Author: Patrick Kellar
 * Description: Contains functions that allow actions on the main page to be performed and undone
 * */
//GRADING: COMMAND
class UndoRedo{

    constructor(basketObject){
        this.basketObject = basketObject;
        this.savedBasket = "";
        this.savedGoodies = "";
        this.savedRowCount = -1;
        this.savedGoodieCount = 0;
        this.savedBasketImg = "";

        this.deletedGoody = "";
        this.deletedGoodyConfirmed = "";
    }

    /*
      * Description: Set the basket to brown and have a row of blue eggs with a white egg at the end
      *
      * @return void
      * */
    execAllEggs() {
        //clears the goodies and sets the basket to brown
        this.execBase();

        let newGoodies = "";
        for (let i = 1; i < 6; i++) {
            //Get 5 blue eggs
            newGoodies += `<img src="./Starting_Images/blue_egg.png" id="${i}" alt="blue_egg.png">`;
        }

        //Get 1 white egg
        newGoodies += `<img src="./Starting_Images/white_egg.png" id="${6}" alt="white_egg.png">`;

        //Add the new goodies to the goody container
        this.getGoodyContainer().innerHTML = `<div id="goodies1">${newGoodies}</div>`
    }

    /*
      * Description: Clear the goodies and change the basket to brown
      *
      * @return void
      * */
    execBase() {
        //Get the current basket and its container
        let basketContainer = document.getElementById("basketContainer");
        let currentBasket = document.getElementById("currentBasket");

        //Save the basket information
        this.savedBasket = basketContainer.innerHTML;
        this.savedBasketImg = currentBasket.alt;

        //Change the basket to brown
        basketContainer.innerHTML = `<img src="./Starting_Images/brown_basket.png" id="currentBasket" 
                                        alt="brown_basket.png">`;

        //Get the goody container and save its information
        let goodyContainer = this.getGoodyContainer();
        this.savedGoodies = goodyContainer.innerHTML;
        this.savedRowCount = goodyContainer.childElementCount;

        //If now rows, there are no goodies
        if (this.savedRowCount === 0) {
            this.savedGoodieCount = 0;
        }
        else {
            //Save the goody count
            this.savedGoodieCount = Number(goodyContainer.childNodes[0].lastChild.id);
        }

        //Clear the info in the goody container
        goodyContainer.innerHTML = "";
    }

    /*
      * Description: Will change the basket to a different color
      *
      * @return void
      * */
    execBasket() {
        //Get the basket container and the current basket
        let basketContainer = document.getElementById("basketContainer");

        //Remove the current basket
        basketContainer.removeChild(document.getElementById("currentBasket"));

        //Add in the new basket to the container
        basketContainer.innerHTML += `<img src="./Starting_Images/${this.basketObject}" id="currentBasket" 
                                        alt="${this.basketObject}">`;
    }

    /*
     * Description: Will delete the most recent goody from the main page
     *
     * @param    goodyId - Number of the id of the most current goody
     * @param    deleteRow - Boolean if a row needs to be deleted or not
     * @param    rowCount - Number of how many rows of goodies there are
     *
     * @return The current goodies' id
     * */
    execDelete(goodyId, deleteRow, rowCount) {
        //If a row needs to be deleted
        if(deleteRow) {

            //Get the goody row that needs to be removed and remove it from the goody container
            let removeRow = document.getElementById("goodies" + rowCount.toString());
            this.getGoodyContainer().removeChild(removeRow);

            //Check that there is a row bellow the one that was just removed
            if(rowCount > 1) {
                //Get the row you want to remove a goody from
                let removeItemRow = document.getElementById("goodies" + (rowCount - 1).toString());
                //Get the goody you want to remove from the row
                let removeItem = removeItemRow.lastChild;

                //Save the goody that is being deleted and the fact that it is confirmed
                this.deletedGoody = removeItem.alt;
                this.deletedGoodyConfirmed = true;

                //Remove the goody and replace it with a white egg
                removeItemRow.removeChild(removeItem);
                removeItemRow.innerHTML += `<img src="./Starting_Images/white_egg.png" id="${goodyId - 2}" 
                                            alt="white_egg.png">`;
                //return the new goody id
                return goodyId - 2;
            }

            //If row count is 1 or less, there are no goodies left, so return 0 for the new goody id
            return  0;
        }
        //If no row needs to be deleted
        else {
            //Get the row you are removing a goody from
            let removeItemRow = document.getElementById("goodies" + (rowCount).toString());

            //Check if the last item in the row is a white egg
            if (removeItemRow.lastChild.alt === "white_egg.png") {
                //Remove the white egg from the row
                let removeItem = removeItemRow.lastChild;
                removeItemRow.removeChild(removeItem);

                //Save the information of the confirmed goody
                removeItem = removeItemRow.lastChild;
                this.deletedGoody = removeItem;
                this.deletedGoodyConfirmed = true;

                //Remove the confirmed goody from the row
                removeItemRow.removeChild(removeItem);

                //Replace it with a white egg since the previous goody is still confirmed
                removeItemRow.innerHTML += `<img src="./Starting_Images/white_egg.png" id="${goodyId-1}" alt="white_egg.png">`;

                //return the new goody id
                return goodyId - 1;
            }
            //If the last item isn't a white egg, then the goody being deleted in unconfirmed
            else {
                //Get the goody being deleted and save its information
                let removeItem = removeItemRow.lastChild;
                this.deletedGoody = removeItem;
                this.deletedGoodyConfirmed = false;

                //Remove the goody
                removeItemRow.removeChild(removeItem);

                //Replace it with a white egg since the previous goody is still confirmed
                removeItemRow.innerHTML += `<img src="./Starting_Images/white_egg.png" id="${goodyId-1}" alt="white_egg.png">`;

                //return the new goody id
                return goodyId - 1;
            }
        }
    }

    /*
      * Description: Will undo delete previously performed
      *
      * @param    goodyId - Number of the id of the most current goody
      * @param    newRow - Boolean if a row needs to be added or not
      * @param    rowId - The id of the current row of goodies
      *
      * @return void
      * */
    execGoody(goodyId, newRow, rowId){
        //If new row needs to be added
        if (newRow) {
            //Get the goody container and add in a new row with the new goody
            let goodyContainer = this.getGoodyContainer();
            goodyContainer.innerHTML = `<div id=${rowId}><img src="./Starting_Images/${this.basketObject}" id="${goodyId}" 
                                        alt="${this.basketObject}"></div>` + goodyContainer.innerHTML;
        }
        else {
            //Get the current goody row
            let currentRow = document.getElementById(rowId);

            //Check if the most recent goody is a white egg
            if (currentRow.lastChild.alt === "white_egg.png") {
                //If it's a white egg, remove it to be replaced by the new goody
                let whiteEgg = document.getElementById((goodyId-1).toString());
                currentRow.removeChild(whiteEgg);
            }
            //add in the new goody to the current row
            currentRow.innerHTML += `<img src="./Starting_Images/${this.basketObject}" id="${goodyId}" alt="${this.basketObject}">`;
        }
    }

    /*
      * Description: Set the basket to white and have a row of alternating striped and blue eggs and a half row of bunnies
      *
      * @return void
      * */
    execMixed() {
        //Get the basket container and the current basket
        let basketContainer = document.getElementById("basketContainer");
        let currentBasket = document.getElementById("currentBasket");

        //Save the basket info
        this.savedBasket = basketContainer.innerHTML;
        this.savedBasketImg = currentBasket.alt;

        //Change the current basket to white
        basketContainer.innerHTML = `<img src="./Starting_Images/white_basket.png" id="currentBasket" 
                                        alt="white_basket.png">`;

        //Get the goody container and save its information
        let goodyContainer = this.getGoodyContainer();
        this.savedGoodies = goodyContainer.innerHTML;
        this.savedRowCount = goodyContainer.childElementCount;

        //Save the count of goodies on the main page
        if (this.savedRowCount === 0) {
            this.savedGoodieCount = 0;
        }
        else {
            this.savedGoodieCount = Number(goodyContainer.childNodes[0].lastChild.id);
        }

        //clear the goodies
        goodyContainer.innerHTML = "";
        let newGoodies = "";

        //Get alternating blue and striped eggs
        for (let i = 1; i < 7; i++) {
            if (i % 2 === 0) {
                newGoodies += `<img src="./Starting_Images/blue_egg.png" id="${i}" alt="blue_egg.png">`;
            }
            else {
                newGoodies += `<img src="./Starting_Images/stripe_egg.png" id="${i}" alt="stripe_egg.png">`;
            }
        }

        let newGoodies2 = "";
        //Get a new row with half bunnies
        for (let i = 7; i < 10; i++) {
            newGoodies2 += `<img src="./Starting_Images/chocolate_bunny.png" id="${i}" alt="chocolate_bunny.png">`;
        }
        newGoodies2 += `<img src="./Starting_Images/white_egg.png" id="${10}" alt="white_egg.png">`;

        //Add the two rows to the goody container
        goodyContainer.innerHTML = `<div id="goodies2">${newGoodies2}</div><div id="goodies1">${newGoodies}</div>`;
    }

    /*
      * Description: Get the container that holds to goodies from the main page
      *
      * @return The container that holds the rows of goodies
      * */
    getGoodyContainer() {
        return document.getElementById("goodies0");
    }

    /*
      * Description: Will undo a change in the basket
      *
      * @return the string of new basket image
      * */
    undoBasket() {
        //Get the basket container and the current basket
        let basketContainer = document.getElementById("basketContainer");
        let currentBasket = document.getElementById("currentBasket");

        //Remove the current basket
        basketContainer.removeChild(currentBasket);

        //If the basket object is brown, make it white and vice versa
        if (this.basketObject.includes("brown")) {
            basketContainer.innerHTML += `<img src="./Starting_Images/white_basket.png" id="currentBasket" 
                                        alt="white_basket.png">`;
            return "white_basket.png";
        }
        else {
            basketContainer.innerHTML += `<img src="./Starting_Images/brown_basket.png" id="currentBasket" 
                                        alt="brown_basket.png">`;
            return "brown_basket.png";
        }
    }

    /*
      * Description: Will undo delete previously performed
      *
      * @param    goodyId - Number of the id of the most current goody
      * @param    newRow - Boolean if a row needs to be added or not
      * @param    rowCount - Number of how many rows of goodies there are
      *
      * @return The current goodies' id
      * */
    undoDelete(goodyId, newRow, rowCount) {
        //If row needs to be added
        if (newRow) {
            //Get the current row and remove its most recent goody
            let currentRow = document.getElementById("goodies" + rowCount.toString());
            currentRow.removeChild(currentRow.lastChild);

            //Replace the removed goody with the saved one
            currentRow.innerHTML += `<img src="./Starting_Images/${this.deletedGoody}" id="${goodyId + 1}" 
                                        alt="${this.deletedGoody}">`;

            //Add in the row that was in the goody container before
            let goodyContainer = this.getGoodyContainer();
            goodyContainer.innerHTML = `<div id="goodies${rowCount + 1}"><img src="./Starting_Images/white_egg.png" id="${goodyId + 2}"
                                            alt="white_egg.png"></div>` + goodyContainer.innerHTML;

            //return the new goody id
            return goodyId + 2;
        }
        else {
            //get the current row and remove its most recent goody
            let currentRow = document.getElementById("goodies" + rowCount.toString());
            currentRow.removeChild(currentRow.lastChild);

            //add back in the saved goody
            currentRow.innerHTML += `<img src="./Starting_Images/${this.deletedGoody.alt}" id="${goodyId + 1}" 
                                        alt="${this.deletedGoody.alt}">`;

            //If the goody was confirmed before, add back in a white egg
            if(this.deletedGoodyConfirmed) {
                currentRow.innerHTML += `<img src="./Starting_Images/white_egg.png" id="${goodyId + 2}" 
                                        alt="white_egg.png">`;
                //return the new goody id, add 2 if adding the saved goody and the confirmation white egg
                return goodyId + 2;
            }

            //return the new goody id, only add one if it was previously unconfirmed
            return goodyId + 1;
        }
    }

    /*
      * Description: Will undo a goody addition
      *
      * @param    goodyId - Number of the id of the most current goody
      * @param    removeRow - Boolean if a row needs to be removed or not
      * @param    rowId - The id of the current row of goodies
      * @return void
      * */
    undoGoody(goodyId, removeRow, rowId) {
        //If row needs to be removed
        if (removeRow) {
            //Get the row that needs to be removed and delete it from the goody container
            let rowToRemove = document.getElementById(rowId);
            this.getGoodyContainer().removeChild(rowToRemove);
        }
        else {
            //Get the current row of goodies and the goody to be removed
            let currentRow = document.getElementById(rowId);
            let goodyToRemove = document.getElementById(goodyId);

            //Remove goody from the current row
            currentRow.removeChild(goodyToRemove);

            //If the goody removed isn't a white egg, add one in since the previous goody is still confirmed
            if (goodyToRemove.alt !== "white_egg.png") {
                currentRow.innerHTML += `<img src="./Starting_Images/white_egg.png" id="${goodyId-1}" alt="white_egg.png">`;
            }
        }
    }

    /*
      * Description: Undo a preconfigured command
      *
      * @return the saved information the history needs to know the current state.
      *     This includes how many rows and goodies, what basket is set, and if the goody buttons should be enabled.
      * */
    undoPreconfigure() {
        //Get the basket container and replace the basket with what was saved
        let basketContainer = document.getElementById("basketContainer");
        basketContainer.innerHTML = this.savedBasket;

        //Get the goody container and replace the goodies witch what was saved
        let goodyContainer = this.getGoodyContainer();
        goodyContainer.innerHTML = this.savedGoodies;

        let enableGoodies = false;
        //Check if the last goody is a white egg, if so set enable goodies to true so the goody buttons are enabled
        if(goodyContainer.childElementCount === 0 || goodyContainer.children[0].lastChild.alt === "white_egg.png") {
            enableGoodies = true;
        }

        //return the info the history needs in order to know the state of the main page
        return {
            rowCount: this.savedRowCount,
            goodieCount: this.savedGoodieCount,
            basket: this.savedBasketImg,
            enableGoodies: enableGoodies,
        }
    }
}