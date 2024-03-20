<?php
    $imgList = array_values(\array_diff(scandir('../../img/web/' . $imgs), [".", "..", "thumbs"]));
    $imgCount = count($imgList);
    //echo "<script>console.log(JSON.parse('".json_encode($imgList)."'));</script>";
    
    if ($imgCount > 0){
        echo "<div class='mobileHide' id='webGallery'>";
        echo "<div class='galleryButton activeButton' style='background-image: url(../img/web/" .$imgs. "/thumbs/" .$imgList[0]. ")' onclick=\"changeImage('".$imgs."', '".$imgList[0]."', event);\"></div>";
        for ($i = 1; $i < $imgCount; $i++){
            echo "<div class='galleryButton' style='background-image: url(../img/web/" .$imgs. "/thumbs/" .$imgList[$i]. ")' onclick=\"changeImage('".$imgs."', '".$imgList[$i]."', event);\"></div>";
        }
        echo "</div>";
        echo "
            <img id='focusImage' src='../img/web/" .$imgs. "/" .$imgList[0]. "' alt='Image gallery display'>
        ";
    }else{
        echo "no images";
        }
?>