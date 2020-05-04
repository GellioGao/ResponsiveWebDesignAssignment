<?php

$servername = "localhost";
$username = "rwda";
$password = "Passw0rd!";
$dbname = "rwdassignment";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$AddFeedback = function ($parameters) use ($conn) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        if (
            !isset($parameters->title) or
            !isset($parameters->name) or
            !isset($parameters->contact) or
            !isset($parameters->content)
        ) {
            echo '{"result":"bad", "message":"Missing information for feedback.}';
            return;
        }


        $Title = $conn->escape_string($parameters->title);
        $Name = $conn->escape_string($parameters->name);
        $Contact = $conn->escape_string($parameters->contact);
        $Content = $conn->escape_string($parameters->content);

        $sql = "INSERT INTO `rwdassignment`.`feedback`
            (`title`,
            `name`,
            `date`,
            `contact`,
            `feedback_content`)
            VALUES
            ('$Title',
            '$Name',
            NOW(),
            '$Contact',
            '$Content');";

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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // The request is using the POST method
    $parameters = json_decode(file_get_contents("php://input"));
    if (isset($parameters->title) and isset($parameters->content)) {
        $AddFeedback($parameters);
        return;
    }
    return;
}

$conn->close();
http_response_code(404);
