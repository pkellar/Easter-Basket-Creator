/*
 * Description: Will call download.php with the file wanting to be downloaded
 *
 * @param    file - The file the user wants downloaded
 * @return   void
 * */
function forceDownload(file) {
    //encode the file name
    let downloadFile = encodeURIComponent(file);
    //send the file name with the change in location to download.php
    window.location.href = "download.php?downloadFile=" + downloadFile;
}

/*
 * Description: Will call index.php with the file wanting to be loaded onto the page
 *
 * @param    file - The file the user wants loaded onto the main page
 * @return   void
 * */
function loadFile(file) {
    //encode the file name
    let loadFile = encodeURIComponent(file);
    //send the file name with the change in location to index.php
    window.location.href = "../index.php?loadFile=" + loadFile;
}