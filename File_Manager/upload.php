<?php

/*
 * Description: Called when a user wants to upload a file to the server. Note: This was written with the use of sample code
 * from Dr. Rebenitsch (with permission given).
 *
 * @return   void
 * */
function upload()
{
    //keep uploads separate for security. uploads MUST allow public write, which is VERY unsafe if allowed in general
    $target_dir = "../uploads/"; //Notice that we are having a separate folder for uploads, if saved to same location, other people can mess with uploads
    $message = '';

    //Get the name of the file the user wants to upload and combine it with the name of the directory being saved to
    $file = $_FILES["fileToUpload"];
    $target_file = $target_dir . $file["name"];

    //Checking the file type, if it's not txt, throw an error
    $imageFileType = strtolower(pathinfo($file["name"],PATHINFO_EXTENSION));

    if($imageFileType != "txt") {
         echo  "Only txt file types are supported. Please, try a different file.<br>";
         return;
    }

    // Check file size which should be MUCH smaller than the server limit
    // Should also check that the file size is not 0
    if ($file["size"] > 5000) {
        echo  "Ack, the file is too large for me!";
        return;
    }

    // Check if file already exists, and delete it if it does so we can overwrite it
    if (file_exists($target_file)) {
        unlink($target_file); //unlink = delete
    }


    //check other errors
    $message .= 'Error uploading file';
    switch ($_FILES['fileToUpload']['error']) { //the ['error'] is a dictionary of errors
        case UPLOAD_ERR_OK:
            $message = false;
            break;
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            $message .= ' - file too large.';
            break;
        case UPLOAD_ERR_PARTIAL:  //did the internet go down part way through upload
            $message .= ' - file upload was not completed.';
            break;
        case UPLOAD_ERR_NO_FILE: //No file uploaded
            $message .= ' - zero-length file uploaded.';
            break;
        default: //Server error
            $message .= ' - internal error #' . $_FILES['fileToUpload']['error'];
            break;
    }

    //if OK thus far, try to save
    if (!$message) {
        if (!is_uploaded_file($file['tmp_name'])) {
            $message = 'Error uploading file - unknown error.'; //Permission error, OS doesn't let you save where you want
        } else {
            // Let's see if we can move the file.
            // Take file from where it is temporarily stored and move it to its target place (saving file here)
            if (!move_uploaded_file($file["tmp_name"], $target_file)) { // No error suppression so we can see the underlying error.
                $message = 'Error uploading file - could not save upload 
                (this will probably be a permissions problem in ' . $target_dir . ')';
            }
        }
    }

    //final check, and copy and force download for confirmation
    if ($message != '') {
        //if anything went wrong echo the message
        echo $message;
    }
}

?>


