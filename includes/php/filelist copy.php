<?php
    $fileList = scandir('web');
    $fileList = \array_diff($fileList, [".", ".."]);
    $fileList = array_values($fileList);

    $fileCount = count($fileList);
    
    if ($fileCount > 0){
        for ($i = 0; $i < $fileCount; $i++){
            $indicator = $fileList[$i];
            $f = fopen('web/'.$indicator, 'r');
            $line= fgets($f);
            fclose($f);
            $info = explode(', ', $line);
            $info = \array_diff($info, ['<!--', '-->']);
            $info = array_values($info);

            $info = array_values(\array_diff(explode(', ', $line), ['<!--', '-->']));
                /*<div id='" . $fileList[$i+2] . "' class='workElement ind-" . $indicator ."'>
                    <h5>" . $fileList[$i+2] . "</h5>
                </div>;*/
        }
    }
?>

<script>
    //Access array elements
    workList = <?php echo json_encode($fileList); ?>;
    workCount = workList.length;
</script>