<?php 
// Including database connections
require_once 'database_connections.php';
// Fetching and decoding the inserted data
$data = json_decode(file_get_contents("php://input")); 
// Escaping special characters from submitting data & storing in new variables.
$projectName = mysqli_real_escape_string($con, $data->projectName);
$userName = mysqli_real_escape_string($con, $data->userName);
$description = mysqli_real_escape_string($con, $data->description);
$code = mysqli_real_escape_string($con, $data->code);

// mysqli insert query
$query = "INSERT into projects (projectName,userName,description,code) VALUES ('$projectName','$userName','$description','$code')";
// Inserting data into database
mysqli_query($con, $query);
echo true;
?>