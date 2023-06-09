<?php

/*
 * Description: Called when a user wants to download a file from the server. Note: This was written with the use of sample code
 * from Dr. Rebenitsch (with permission given).
 *
 * @return   void
 * */
$target_dir = "../uploads/";

//Checks that there is a file that the user wants downloaded
if (isset($_GET['downloadFile'])) {
    $target_file = $target_dir . $_GET['downloadFile'];

    //Checks that the file exists where it is believed to be
    if (file_exists($target_file)) {

        //download the file to the users "downloads" directory
        header('Content-disposition: attachment; filename=' . $_GET['downloadFile']);
        readfile($target_file);
    }
}


