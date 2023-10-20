# Easter-Basket-Creator

This is a web application that uses CSS, JavaScript, and PHP to let you create and easter basket. 
I utilized UwAmp to run this application, but it can also be run by opening up index.php in your browser.

The coloring and styling of this page was not chosen by me. I just followed the requirements set for the project.

Program Usage and Limitations
Home Page:

The home page of this application is used to create a goody basket, and this can be done in a variety of ways. It can first be done by making a custom basket using the buttons with "Eggs", "Bunny", and "Baskets" above them (showing the respective images). When one of these buttons is clicked, it will add the goody to the basket bellow with "Current Basket" titled above it. Once a goody is added, it will need to be confirmed using the button that says "confirm". While there is an unconfirmed goody, the goody selection buttons will disappear until the most recent goody is confirmed. After a goody is confirmed, it will add a white egg as a placeholder for another goody, and another goody could then be added.

Another way to make an easter basket is by using one of the preconfigured options that are listed to the right of the custom basket changing options. After one of these options is selected, further goodies can be added using the goody and basket options.

Through any of the custom goodies added or preconfigured options discussed so far, the "undo" button can be clicked to take the basket back a state. There is no limit on how many times the user wants to undo. Conversely, by clicking the "redo" button, all the changes can be redone back to the state that the user desires.

The most recent goody can also be deleted from the basket by clicking the "Delete Last Goody" button. If a goody is confirmed, (there is a white egg after it), it will remove the white egg and the confirmed goody. If the goody is unconfirmed, it will remove the goody and replace it with a white egg since the goody before it is still confirmed. NOTE: I implemented delete into the undo/redo, so any delete can be undone and redone.

Once a basket is configured as desired, it can be saved as a txt file to the "uploads" folder by clicking the button that says "save" on the home page. This will save the html of the goodies and the basket to the file. It will then send back the name of the file saved (test.txt) back to the home page for it to reload the content and thus preserve it as it was before the save. However, the undo and redo states are not preserved through this. It is also important to note that "unconfirmed" goodies will not be preserved across this save. I do not consider this to be not preserving the state of the page since it's a requirement to not save "unconfirmed" goodies. ALso, this allows the user to see what was actually saved.

It is also important to note that the "reset" button next to the save button can be used to clear the file that has been loaded. This button is really only needed when the "loadFile" parameter is set in the URL since it wont be cleared when the page is refreshed. If the "loadFile" parameter isn't set in the URL, the normal refresh will clear the page, but the "reset" button will work as well.


File Management Page:

This page will allow you to upload, download, and load a file. To upload a file, click the "Choose File" and choose a txt file with the proper html. This should only be two lines. One line that has the goodies html and another that has the basket html.Once a file is chosen, click the "upload" button to add it to the "uploads" directory.

Bellow the upload section is the current file section that will list all the txt files in the "uploads" directory. Next to each file listed is a "load" and "download" button. If the download is selected, it will download the file to the users downloads directory. If load is selected, it will redirect back to the home page and load in the save goodies and basket.

This load does not preserve the undo redo from when it was saved, but further goodies and basket changes can be made and those can then be undone and redone.
