<?php    
    //Get array of all web items, remove directory management
    $fileList = array_values(scandir('web'));

    //Get the number of available items
    $fileCount = count($fileList);

    //Add web buttons
    if ($fileCount > 0){    //If there's more than 1 work
        for ($i = 0; $i < $fileCount; $i++){    //For every available item
            $file = $fileList[$i];     //Get the work item we're currently on

            // skip if not a .php file
            if (strpos($file, '.php') === false){
                continue;
            }
            
            include "web/$file";
            $imgdir = preg_replace("/ /", "", strtolower($title));

            echo "<div class='workElement' style='background-image: url(img/web/" .$imgdir. "/thumbs/01.jpg' data-page='".$file."'>
                    <div class='inner'>
                        <h5>" .$title. "</h5>
                        <p>" .$desc. "</p>
                    </div>
                </div>
            ";
        }
    }
?>