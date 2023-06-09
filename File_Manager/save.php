<?php

/*
 * Description: Is called when main page content wants to be saved to the uploads' directory
 *
 * @return   void
 * */


//Check the "save" parameter is set
if(isset($_GET['save'])) {

    //Will save the file as "test.txt" to the "uploads" directory
    $target_dir = "../uploads/";
    $target_file = $target_dir . "test.txt";

    //Open the current test.txt as write so that you are writing in a clean file
    $file = fopen( $target_file, 'w');

    //Write the saved goody html to the file
    fwrite($file, $_GET['goodies']);
    //Write in a new line
    fwrite($file, "\n");

    //Write the saved basket information to the file
    fwrite($file, $_GET['basket']);

    //Close the file
    fclose($file);

    //Go bask to the main page and have it load the saved test.txt file
    header('Location: ../index.php?loadFile=test.txt');
}
?>
