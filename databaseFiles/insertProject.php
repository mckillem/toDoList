<?php 
// Including database connections
require_once 'database_connections.php';
// Fetching and decoding the inserted data
$data = json_decode(file_get_contents("php://input")); 
// Escaping special characters from submitting data & storing in new variables.
$id_project = mysqli_real_escape_string($con, $data->id_project);
$id_user = mysqli_real_escape_string($con, $data->id_user);
$created_id = mysqli_real_escape_string($con, $data->created_id);
$name = mysqli_real_escape_string($con, $data->name);
$description = mysqli_real_escape_string($con, $data->description);
$project_code = mysqli_real_escape_string($con, $data->project_code);
$last_serial_number = mysqli_real_escape_string($con, $data->last_serial_number);

// mysqli insert query
$query = "INSERT into Projects (id_project,id_user,created_id,name,description,project_code,last_serial_number) VALUES ('$id_project','$id_user','$created_id','$name','$description','$project_code','$last_serial_number')";
// Inserting data into database
mysqli_query($con, $query);
echo true;
?>