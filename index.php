<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Easter Basket</title>
    <link rel="stylesheet" type="text/css" href="CSS/index.css">
    <script type="text/javascript" src="undoRedo.js"></script>
    <script type="text/javascript" src="history.js"></script>
</head>

<body>
    <!--The header of the main page-->
    <header>
        <h1>Easter Basket</h1>

        <!--The nave section with the links to the other pages-->
        <nav>
            <a href="index.php">Home Page</a> |
            <a href="helpPage.html">Help Page</a> |
            <a href="File_Manager/fileManagement.php">File Management Page</a>
        </nav>
    </header>

    <hr>

    <!--Set container with border around the page content-->
    <div class="content-border">
        <div>
            <!--The button that will reset the application-->
            <button id="reset">Reset</button>

            <?php
                //if the reset variable is set, unset this session's information
                if(isset($_GET['reset'])) {
                    session_unset();
                }
            ?>
            <!--The button that will save the basket state-->
            <button onClick="save()">Save</button>

            <hr><br>

            <!--The button that will confirm the most recent goody-->
            <button id="white_egg">Confirm</button>

            <!--The button that will delete the most recent goody-->
            <button id="delete">Delete Last Goody</button>

            <br><br><hr>

            <!--The buttons that will undo and redo the current action in the history-->
            <button id="undo">Undo</button>
            <button id="redo">Redo</button>
        </div>

        <hr>

        <!--A section for warning if the goody buttons are no longer available-->
        <div id="warning"></div>
        <div class="add-section">
            <!--Sections for egg addition buttons-->
            <div class="add-title">
                Eggs
            </div>

            <!--Blue egg button with image of the egg inside-->
            <button class="add-buttons">
                <img class="add-image" id="blue_egg" src="./Starting_Images/blue_egg.png" alt="Blue Egg"><br>
            </button>

            <!--Stripe egg button with image of the egg inside-->
            <button class="add-buttons">
                <img class="add-image" id="stripe_egg" src="./Starting_Images/stripe_egg.png" alt="Stripe Egg"><br>
            </button>

            <!--Purple egg button with image of the egg inside-->
            <button class="add-buttons">
                <img class="add-image" id="purple_egg" src="./Starting_Images/purple_egg.png" alt="Purple Egg"><br>
            </button>

            <!--Red egg button with image of the egg inside-->
            <button class="add-buttons">
                <img class="add-image" id="red_egg" src="./Starting_Images/red_egg.png" alt="Red Egg"><br>
            </button>

            <!--Yellow egg button with image of the egg inside-->
            <button class="add-buttons">
                <img class="add-image" id="yellow_egg" src="./Starting_Images/yellow_egg.png" alt="Yellow Egg"><br>
            </button>
        </div>

        <div class="add-section">
            <!--Section for bunny addition button-->
            <div class="add-title">
                Bunny
            </div>

            <!--chocolate bunny button with image of the bunny inside-->
            <button class="add-buttons">
                <img class="add-image" id="chocolate_bunny" src="./Starting_Images/chocolate_bunny.png" alt="Chocolate Bunny"><br>
            </button>
        </div>

        <div class="add-section">
            <!--Sections for basket addition buttons-->
            <div class="add-title">
                Baskets
            </div>

            <!--brown basket button with image of the basket inside-->
            <button class="add-buttons">
                <img class="add-image" id="brown_basket" src="./Starting_Images/brown_basket.png" alt="Brown Basket"><br>
            </button>

            <!--white basket button with image of the basket inside-->
            <button class="add-buttons">
                <img class="add-image" id="white_basket" src="./Starting_Images/white_basket.png" alt="White Basket"><br>
            </button>
        </div>

        <div class="add-section">
            <!--Preconfigured options section-->
            <div class="add-title">
                Preconfigured Baskets
            </div>

            <!--3 buttons for each of the preconfigured options-->
            <button id="base">Base</button>
            <button id="allEggs">All Eggs</button>
            <button id="mixed">Mixed</button>
        </div>

        <hr>
        <!--Title for the section displaying the current easter basket-->
        <div class="add-title">
            Current basket:
        </div>

        <?php
            //start the current session
            session_start();

            //If "loadFile" is set, the user wants to load the contents of that file, check that it exists
            if(isset($_GET['loadFile']) && file_exists("uploads/".$_GET['loadFile'])) {
                //open the file
                $file = fopen("uploads/".$_GET['loadFile'], 'r');

                //Get the first line with the goodies and trim off the newline at the end
                $line = fgets($file);
                $line = rtrim($line, "\n");

                //echo the goody container and the line from the file as its contents
                echo '<div class="goodies" id="goodies0">';
                echo $line;
                echo '</div>';

                //container to show if there are no goodies in the basket
                echo '<div class="noneContainer" id="noneContainer"></div>';

                //echo the container for the basket
                echo '<div class="basket" id="basketContainer">';
                    //read and display the second line of the file which holds the basket information
                    $line = fgets($file);
                    echo $line;
                echo '</div>';

                //close the file
                fclose($file);

                //Run this function that will tell the history to load the current state of this page
                echo '<script>load();</script>';
            }
            //if there is no file being loaded, display standard empty starting page
            else {
                //Echo the basket container
                echo '<div class="goodies" id="goodies0">';
                echo '</div>';

                //Echo "none" six times in the basket
                echo '<div class="noneContainer" id="noneContainer">
                          <div class="none">none</div>
                          <div class="none">none</div>
                          <div class="none">none</div>
                          <div class="none">none</div>
                          <div class="none">none</div>
                          <div class="none">none</div>
                      </div>';

                //Echo basket container and the starting brown basket
                echo '<div class="basket" id="basketContainer">';
                    echo '<img src="./Starting_Images/brown_basket.png" id="currentBasket" alt="brown_basket.png">';
                echo '</div>';
            }
        ?>
    </div>

</body>
</html>