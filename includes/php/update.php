<?php
    
    // $imgList = array_values(\array_diff(scandir('../img/web/' . $imgs), [".", ".."]));
    // $imgCount = count($imgList);
    
    // if ($imgCount > 0){
        
    //     echo "<div id='webGallery'>";
    //     echo "<div class='galleryButton activeButton' style='background-image: url(../img/web/thumbs/" .$imgs. "/" .$imgList[0]. ")' onclick=\"changeImage('".$imgs."', '".$imgList[0]."');\"></div>";
    //     for ($i = 1; $i < $imgCount; $i++){
    //         echo "<div class='galleryButton' style='background-image: url(../img/web/thumbs/" .$imgs. "/" .$imgList[$i]. ")' onclick=\"changeImage('".$imgs."', '".$imgList[$i]."');\"></div>";
    //     }
    //     echo "</div>";
    //     echo "
    //         <img id='focusImage' src='../img/web/" .$imgs. "/" .$imgList[0]. "' alt='Image gallery display'>
    //     ";
    // }else{
    //     echo "no images";
    // }
?>

<?php
    function console_log($output, $with_script_tags = true) {
        $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) .');';
        if ($with_script_tags) {
            $js_code = '<script>' . $js_code . '</script>';
        }
        echo $js_code;
    }

    // Gather resources 
    if(isset($_POST['entryPage'])){
        $entry = $_POST['entryPage'];
        
        $fetchData = fetch_data();
        echo json_encode($fetchData);
    }

    // include("$entry");

    // $title = "Bustout";
    // $desc = "A Game Project";
    // $roles = [
    //     1 => "Programming (JavaScript)",
    // ];
    // $href = "sub/bustout/";

    // // Generate funny page

    // // get image directory by altering the title
    // // then go through and check if there are any images in said directory 
    // $imgdir = preg_replace("/ /", "", strtolower($title)); 
    // $imgList = array_values(\array_diff(scandir('../img/web/' . $imgdir), [".", ".."]));
    // console_log($imgList)
    // $imgCount = count($imgList);
    
    // if ($imgCount > 0){
        
    //     echo "<div id='webGallery'>";
    //     echo "<div class='galleryButton activeButton' style='background-image: url(../img/web/thumbs/" .$imgs. "/" .$imgList[0]. ")' onclick=\"changeImage('".$imgs."', '".$imgList[0]."');\"></div>";
    //     for ($i = 1; $i < $imgCount; $i++){
    //         echo "<div class='galleryButton' style='background-image: url(../img/web/thumbs/" .$imgs. "/" .$imgList[$i]. ")' onclick=\"changeImage('".$imgs."', '".$imgList[$i]."');\"></div>";
    //     }
    //     echo "</div>";
    //     echo "
    //         <img id='focusImage' src='../img/web/" .$imgs. "/" .$imgList[0]. "' alt='Image gallery display'>
    //     ";
    // }else{
    //     echo "no images";
    // }
?>
