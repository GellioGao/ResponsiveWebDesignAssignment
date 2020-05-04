<?php

$servername = "localhost";
$username = "rwda";
$password = "Passw0rd!";
$dbname = "rwdassignment";

function encryptPassword($passwordOriginal)
{
    // Do something with the password.
    $result = $passwordOriginal;
    return $result;
};

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$CompanyInfo = function ($id) use ($conn) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $id = $conn->escape_string($id);
        $sql = "SELECT `employers`.`id`, `employers`.`name` 
            FROM `rwdassignment`.`employers` 
            WHERE `employers`.`id` = '$id';";
        $result = $conn->query($sql);
        $content = [];
        if ($result && $result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                array_push($content, [
                    'id' => intval($row['id']),
                    'name' => $row['name']
                ]);
            }
        }
        

        if (count($content) > 0) {
            echo json_encode($content[0]);
            return;
        }
        http_response_code(401);
    } catch (Exception $e) {
        // Handle exception
    }
};

$Register = function ($employer) use ($conn) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        if (
            !isset($employer->company) or
            !isset($employer->businessArea) or
            !isset($employer->businessStatus) or
            !isset($employer->address) or
            !isset($employer->phone) or
            !isset($employer->email) or
            !isset($employer->username) or
            !isset($employer->password)
        ) {
            echo '{"result":"bad", "message":"Missing information for registration.}';
            return;
        }


        $Company = $conn->escape_string($employer->company);
        $BusinessArea = $conn->escape_string($employer->businessArea);
        $BusinessStatus = $conn->escape_string($employer->businessStatus);
        $Address = $conn->escape_string($employer->address);
        $Phone = $conn->escape_string($employer->phone);
        $Email = $conn->escape_string($employer->email);
        $Username = $conn->escape_string($employer->username);
        $Password = $conn->escape_string($employer->password);

        $sql = "INSERT INTO `rwdassignment`.`employers`
        (`name`,
        `registration_date`,
        `business_area`,
        `business_status`,
        `address`,
        `phone`,
        `email`,
        `username`,
        `password`)
        VALUES
        ('$Company',
        NOW(),
        '$BusinessArea',
        '$BusinessStatus',
        '$Address',
        '$Phone',
        '$Email',
        '$Username',
        '$Password');";

        $result = $conn->query($sql);
        
        if (!$result) {
            echo '{"result":"bad"}';
            return;
        }
        echo '{"result":"good"}';
    } catch (Exception $e) {
        // Handle exception
    }
};

$Login = function ($user) use ($conn) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $username = $conn->escape_string($user->username);
        $password = encryptPassword($conn->escape_string($user->password));
        $sql = "SELECT `employers`.`id`, `employers`.`name` 
            FROM `rwdassignment`.`employers` 
            WHERE `employers`.`username` = '$username' 
                AND `employers`.`password` = '$password';";
        $result = $conn->query($sql);
        $content = [];
        if ($result && $result->num_rows == 1) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                session_start();
                array_push($content, [
                    'id' => intval($row['id']),
                    'name' => $row['name'],
                    'sessionId' => session_id()
                ]);
                $_SESSION['employer_id'] = $content[0]['id'];
            }
        }
        

        if (count($content) > 0) {
            echo json_encode($content[0]);
            return;
        }
        http_response_code(401);
    } catch (Exception $e) {
        // Handle exception
    }
};

$Logout = function ($sessionId) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        session_start();
        if ($sessionId === session_id()) {
            session_destroy();
            echo "{'result':'logged out'}";
            return;
        }
        http_response_code(401);
    } catch (Exception $e) {
        // Handle exception
    }
};

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // The request is using the GET method
    if (array_key_exists('id', $_GET)) {
        $id = $_GET['id'];
        $CompanyInfo($id);
        return;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // The request is using the POST method
    $parameters = json_decode(file_get_contents("php://input"));
    if (isset($parameters->company) and isset($parameters->username)) {
        $Register($parameters);
        return;
    }
    if (isset($parameters->username) and isset($parameters->password)) {
        $Login($parameters);
        return;
    }
    return;
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // The request is using the DELETE method
    if (array_key_exists('sessionId', $_GET)) {
        $sessionId = $_GET['sessionId'];
        $Logout($sessionId);
        return;
    }
}

$conn->close();
http_response_code(404);
