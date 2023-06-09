<?php
require_once 'upload.php'; //this is how to import/include another php file
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>File Management</title>
    <link rel="stylesheet" type="text/css" href="../CSS/index.css">
    <script type="text/javascript" src="fileManagement.js"></script>
</head>
<body>

<header>
    <!--The header of the file management page-->
    <h1>File Management Page</h1>

    <!--The nave section with the links to the other pages-->
    <nav>
        <a href="../index.php">Home Page</a> |
        <a href="../helpPage.html">Help Page</a> |
        <a href="fileManagement.php">File Management Page</a>
    </nav>
</header>

<hr>

<!--Set container with border around the page content-->
<div class="content-border">

<?php
//If the "up" variable is set, run the upload function
if (isset($_GET['up'])) {
    upload();
}
?>

    <!--On this forms submission, call this page again with the "up" parameter set-->
    <form action="fileManagement.php?up=1" method="post" enctype="multipart/form-data">
        Select file to upload:

        <!--name and id are used as identifiers of the file on the php side-->
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Upload" name="submit">
    </form>


    <!-- This shows the current file list-->
    <p>Current files:
        <?php
        //Will get the files from the upload directory, and removes "." and ".." from the list since those are not necessary
        $myFiles = array_diff(scandir("../uploads/"), array(".", ".."));
        echo "<ul>";

        //Will iterate through the list of files
        foreach ($myFiles as $f) {
            //Output each file with a load and download button next to each
            echo "<li>" . $f . " <button onclick=\"loadFile('$f')\">load</button> " ;
            echo "<button onclick=\"forceDownload('$f')\">download</button></li>";
        }
        echo "</ul>";

        ?>
    </p>

</div>

</body>
</html>



