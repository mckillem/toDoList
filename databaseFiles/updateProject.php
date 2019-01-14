<?php 
// Including database connections
require_once 'database_connections.php';
// Fetching the updated data & storin in new variables
$data = json_decode(file_get_contents("php://input")); 
// Escaping special characters from updated data
$id_project = mysqli_real_escape_string($con, $data->id_project);
$id_user = mysqli_real_escape_string($con, $data->id_user);
$created_id = mysqli_real_escape_string($con, $data->created_id);
$name = mysqli_real_escape_string($con, $data->name);
$description = mysqli_real_escape_string($con, $data->description);
$project_code = mysqli_real_escape_string($con, $data->project_code);
$last_serial_number = mysqli_real_escape_string($con, $data->last_serial_number);
$id_state = mysqli_real_escape_string($con, $data->id_state);
$id_priority = mysqli_real_escape_string($con, $data->id_priority);

// mysqli query to insert the updated data
$query = "UPDATE Projects SET id_project='$id_project',id_user='$id_user',created_id='$created_id',name='$name',description='$description',project_code='$project_code',last_serial_number='$last_serial_number',id_state='$id_state',id_priority='$id_priority' WHERE $id_project=$id_project";
mysqli_query($con, $query);
echo true;
?>