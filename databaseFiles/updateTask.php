<?php
/**
 * Created by PhpStorm.
 * User: mm
 * Date: 1.1.19
 * Time: 16:09
 */

// Including database connections
require_once 'database_connections.php';
// Fetching the updated data & storin in new variables
$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from updated data
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

// mysqli query to insert the updated data
$query = "UPDATE Tasks SET id_task='$id_task',name='$name',description='$description',created_id='$created_id',code='$code',created_date='$created_date',estimate='$estimate',remaining='$remaining',worked='$worked',id_user='$id_user',id_state='$id_state',id_priority='$id_priority' WHERE $id_task=$id_task";
mysqli_query($con, $query);
echo true;