<?php
    $imgList = array_values(\array_diff(scandir('../img/web/' . $imgs), [".", ".."]));
    $imgCount = count($imgList);
    
    if ($imgCount > 0){
        
        echo "<div id='webGallery'>";
        echo "<div class='galleryButton activeButton' style='background-image: url(../img/web/thumbs/" .$imgs. "/" .$imgList[0]. ")' onclick=\"changeImage('".$imgs."', '".$imgList[0]."');\"></div>";
        for ($i = 1; $i < $imgCount; $i++){
            echo "<div class='galleryButton' style='background-image: url(../img/web/thumbs/" .$imgs. "/" .$imgList[$i]. ")' onclick=\"changeImage('".$imgs."', '".$imgList[$i]."');\"></div>";
        }
        echo "</div>";
        echo "
            <img id='focusImage' src='../img/web/" .$imgs. "/" .$imgList[0]. "' alt='Image gallery display'>
        ";
    }else{
        echo "no images";
    }
?>