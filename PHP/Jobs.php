<?php

$servername = "localhost";
$username = "rwda";
$password = "Passw0rd!";
$dbname = "rwdassignment";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$AllJobsResponse = function (array $parameters) use ($conn) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        if (!isset($parameters)) {
            echo json_encode([]);
            return;
        }
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $title = $conn->escape_string($parameters['title']);
        $classification = $conn->escape_string($parameters['classification']);
        $location = $conn->escape_string($parameters['location']);
        $name = $conn->escape_string($parameters['company']);
        $responsibilities = $conn->escape_string($parameters['responsibilities']);
        $requirements = $conn->escape_string($parameters['requirements']);
        $salaryFrom = $conn->escape_string($parameters['salaryFrom']);
        $salaryTo = $conn->escape_string($parameters['salaryTo']);

        $sqlWhere = " `jobs`.`title` like '%$title%' and"
            . " `jobs`.`classification` like '%$classification%' and "
            . " `jobs`.`address` like '%$location%' ";
        if (isset($name) && strlen($name) > 0) {
            $sqlWhere .= " and `employers`.`name` like '%$name%' ";
        }
        if (isset($responsibilities) && strlen($responsibilities) > 0) {
            $sqlWhere .= " and `jobs`.`responsibilities` like '%$responsibilities%' ";
        }
        if (isset($requirements) && strlen($requirements) > 0) {
            $sqlWhere .= " and `jobs`.`requirements` like '%$requirements%' ";
        }
        if (isset($salaryFrom) && is_numeric($salaryFrom) && isset($salaryTo) && is_numeric($salaryTo)) {
            $sqlWhere .= " and `jobs`.`salary` >= '$salaryFrom' and `jobs`.`salary` <= '$salaryTo' ";
        }
        $sql = "SELECT `jobs`.`id`,
                    `employers`.`name` as `employer`,
                    `jobs`.`title`,
                    `jobs`.`published_date`,
                    `jobs`.`classification`,
                    `jobs`.`description`,
                    `jobs`.`address`,
                    `jobs`.`salary`
                FROM `rwdassignment`.`jobs` left join `rwdassignment`.`employers`
                 on `jobs`.`employer_id` = `employers`.`id`
                WHERE `jobs`.`deleted` is not true and $sqlWhere;";
        $result = $conn->query($sql);
        $content = [];
        if ($result && $result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                array_push($content, [
                    'id' => intval($row['id']),
                    'employer' => $row['employer'],
                    'title' => $row['title'],
                    'published_date' => $row['published_date'],
                    'classification' => $row['classification'],
                    'description' => $row['description'],
                    'address' => $row['address'],
                    'salary' => $row['salary']
                ]);
            }
        }

        echo json_encode($content);
    } catch (Exception $e) {
        // Handle exception
    }
};

$JobByIdResponse = function ($id) use ($conn) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $id = $conn->escape_string($id);
        $sql = "SELECT `jobs`.`id`,
                    `employers`.`name` as `employer`,
                    `jobs`.`title`,
                    `jobs`.`published_date`,
                    `jobs`.`classification`,
                    `jobs`.`description`,
                    `jobs`.`responsibilities`,
                    `jobs`.`requirements`,
                    `jobs`.`address`,
                    `jobs`.`salary`,
                    `jobs`.`contact`
                FROM `rwdassignment`.`jobs` left join `rwdassignment`.`employers`
                 on `jobs`.`employer_id` = `employers`.`id`
                 WHERE `jobs`.`deleted` is not true and `jobs`.`id` = $id;";

        $result = $conn->query($sql);
        $content = [];
        if ($result && $result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                array_push($content, [
                    'id' => intval($row['id']),
                    'employer' => $row['employer'],
                    'title' => $row['title'],
                    'published_date' => $row['published_date'],
                    'classification' => $row['classification'],
                    'description' => $row['description'],
                    'responsibilities' => $row['responsibilities'],
                    'requirements' => $row['requirements'],
                    'address' => $row['address'],
                    'salary' => floatval($row['salary']),
                    'contact' => $row['contact']
                ]);
            }
        }
        echo json_encode($content[0]);
    } catch (Exception $e) {
        // Handle exception
    }
};

$JobsByCompanyResponse = function ($company) use ($conn) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $company = $conn->escape_string($company);
        $sql = "SELECT `jobs`.`id`,
                    `employers`.`name` as `employer`,
                    `jobs`.`title`,
                    `jobs`.`published_date`,
                    `jobs`.`classification`,
                    `jobs`.`description`,
                    `jobs`.`responsibilities`,
                    `jobs`.`requirements`,
                    `jobs`.`address`,
                    `jobs`.`salary`,
                    `jobs`.`contact`
                FROM `rwdassignment`.`jobs` left join `rwdassignment`.`employers`
                 on `jobs`.`employer_id` = `employers`.`id`
                 WHERE `jobs`.`deleted` is not true and `employers`.`id` = $company;";

        $result = $conn->query($sql);
        $content = [];
        if ($result && $result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                array_push($content, [
                    'id' => intval($row['id']),
                    'employer' => $row['employer'],
                    'title' => $row['title'],
                    'published_date' => $row['published_date'],
                    'classification' => $row['classification'],
                    'description' => $row['description'],
                    'responsibilities' => $row['responsibilities'],
                    'requirements' => $row['requirements'],
                    'address' => $row['address'],
                    'salary' => floatval($row['salary']),
                    'contact' => $row['contact']
                ]);
            }
        }
        echo json_encode($content);
    } catch (Exception $e) {
        // Handle exception
    }
};

$publishJobResponse = function ($job) use ($conn, $JobByIdResponse) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $employerId = $conn->escape_string($job->employerId);
        $title = $conn->escape_string($job->title);
        $classification = $conn->escape_string($job->classification);
        $description = $conn->escape_string($job->description);
        $responsibilities = $conn->escape_string($job->responsibilities);
        $requirements = $conn->escape_string($job->requirements);
        $address = $conn->escape_string($job->address);
        $salary = $conn->escape_string($job->salary);
        $contact = $conn->escape_string($job->contact);
        $sql = "INSERT INTO `rwdassignment`.`jobs`
        (`employer_id`,
        `title`,
        `published_date`,
        `classification`,
        `description`,
        `responsibilities`,
        `requirements`,
        `address`,
        `salary`,
        `contact`)
        VALUES
        ($employerId,
        '$title',
        NOW(),
        '$classification',
        '$description',
        '$responsibilities',
        '$requirements',
        '$address',
        $salary,
        '$contact');";

        $result = $conn->query($sql);
        $id = $conn->insert_id;
        if (!$result) {
            echo '{"result":"bad"}';
            return;
        }

        $JobByIdResponse($id);
    } catch (Exception $e) {
        // Handle exception
    }
};

$DeleteJobResponse = function ($id) use ($conn) {
    try {
        header("Content-Type: application/json; charset=UTF-8");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $id = $conn->escape_string($id);
        $sql = "UPDATE `rwdassignment`.`jobs` SET `jobs`.`deleted` = true, `jobs`.`deleted_date` = NOW()
                 WHERE `jobs`.`id` = $id;";

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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // The request is using the GET method
    if (array_key_exists('title', $_GET) || array_key_exists('classification', $_GET) || array_key_exists('location', $_GET)) {
        $title = $_GET['title'];
        $classification = $_GET['classification'];
        $location = $_GET['location'];
        $company = $_GET['company'];
        $responsibilities = $_GET['responsibilities'];
        $requirements = $_GET['requirements'];
        $salaryFrom = $_GET['salaryFrom'];
        $salaryTo = $_GET['salaryTo'];

        $AllJobsResponse([
            'title' => $title,
            'classification' => $classification,
            'location' => $location,
            'company' => $company,
            'responsibilities' => $responsibilities,
            'requirements' => $requirements,
            'salaryFrom' => $salaryFrom,
            'salaryTo' => $salaryTo
        ]);
        return;
    }

    if (array_key_exists('id', $_GET)) {
        $id = $_GET['id'];
        $JobByIdResponse($id);
        return;
    }

    if (array_key_exists('company', $_GET)) {
        $company = $_GET['company'];
        $JobsByCompanyResponse($company);
        return;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // The request is using the POST method
    $job = json_decode(file_get_contents("php://input"));
    $publishJobResponse($job);
    return;
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // The request is using the DELETE method
    if (array_key_exists('id', $_GET)) {
        $id = $_GET['id'];
        $DeleteJobResponse($id);
        return;
    }
}

$conn->close();
http_response_code(404);
