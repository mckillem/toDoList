<?php 
// Including database connections
require_once 'database_connections.php';
// Fetching the updated data & storin in new variables
$data = json_decode(file_get_contents("php://input")); 
// Escaping special characters from updated data
$id = mysqli_real_escape_string($con, $data->id);
$projectName = mysqli_real_escape_string($con, $data->projectName);
$userName = mysqli_real_escape_string($con, $data->userName);
$description = mysqli_real_escape_string($con, $data->description);
$code = mysqli_real_escape_string($con, $data->code);
// mysqli query to insert the updated data
$query = "UPDATE projects SET projectName='$projectName',userName='$userName',description='$description',code='$code' WHERE $code=$id";
mysqli_query($con, $query);
echo true;
?>