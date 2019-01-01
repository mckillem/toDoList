<?php
/**
 * Created by PhpStorm.
 * User: mm
 * Date: 1.1.19
 * Time: 16:00
 */
require_once 'database_connections.php';
$data = json_decode(file_get_contents("php://input"));
$query = "DELETE FROM Tasks WHERE id_task=$data->del_id";
mysqli_query($con, $query);
echo true;