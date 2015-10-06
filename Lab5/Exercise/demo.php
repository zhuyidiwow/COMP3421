<html>
<body>
<?php
$imgs = array ( "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTXGKBjNfB7ik1M4M7eKNiXKImecLitTjyGEZYUlukdswx2sFPpU8ViFTg", "http://cdn1.xda-developers.com/devdb/deviceForum/screenshots/3706/20141020T045645.jpg", "http://theopenscroll.com/images/symbols/coldplayVivaLaVidaCoverArt.jpg", "https://s-media-cache-ak0.pinimg.com/originals/1e/76/af/1e76af3ab7d145666499176a172013f3.jpg"); 
$names = array("Phone 1", "Phone 2", "Phone 3", "Phone 4");
$id = 0;
if (isset($_GET['id']))
$id = $_GET['id'] % 4;
echo "<img width=50px src=". $imgs[$id] . "><br/>" . $names[$id];
?>
</body> 
</html>