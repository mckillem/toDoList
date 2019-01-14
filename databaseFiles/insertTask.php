<?php
/**
 * Created by PhpStorm.
 * User: mm
 * Date: 1.1.19
 * Time: 15:43
 */

// Including database connections
require_once 'database_connections.php';
// Fetching and decoding the inserted data
$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from submitting data & storing in new variables.
$id_task = mysqli_real_escape_string($con, $data->id_task);
$name = mysqli_real_escape_string($con, $data->name);
$description = mysqli_real_escape_string($con, $data->description);
$created_id = mysqli_real_escape_string($con, $data->created_id);
$code = mysqli_real_escape_string($con, $data->code);
$created_date = mysqli_real_escape_string($con, $data->created_date);
$estimate = mysqli_real_escape_string($con, $data->estimate);
$remaining = mysqli_real_escape_string($con, $data->remaining);
$worked = mysqli_real_escape_string($con, $data->worked);
$id_user = mysqli_real_escape_string($con, $data->id_user);
$id_state = mysqli_real_escape_string($con, $data->id_state);
$id_priority = mysqli_real_escape_string($con, $data->id_priority);

// mysqli insert query
$query = "INSERT into Tasks (id_task,name,description,created_id,code,created_date,estimate,remaining,worked,id_user,id_state,id_priority) VALUES ('$id_task','$name','$description','$created_id','$code','$created_date','$estimate','$remaining','$worked','$id_user','$id_state','$id_priority')";
// Inserting data into database
mysqli_query($con, $query);
echo true;