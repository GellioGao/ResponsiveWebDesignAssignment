CREATE DATABASE `rwdassignment` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `rwdassignment`.`employers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  `business_area` VARCHAR(45) NOT NULL,
  `business_status` VARCHAR(45) NOT NULL,
  `address` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(16) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `username` VARCHAR(24) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `rwdassignment`.`jobs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `employer_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `published_date` DATETIME NOT NULL,
  `classification` VARCHAR(100) NOT NULL,
  `description` VARCHAR(300) NOT NULL,
  `responsibilities` TEXT(1500) NOT NULL,
  `requirements` TEXT(500) NOT NULL,
  `address` VARCHAR(150) NULL,
  `salary` DECIMAL(7,2) NULL,
  `contact` VARCHAR(50) NOT NULL,
  `deleted` TINYINT NULL,
  `deleted_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `employer_id_idx` (`employer_id` ASC) VISIBLE,
  CONSTRAINT `job_of_employer`
    FOREIGN KEY (`employer_id`)
    REFERENCES `rwdassignment`.`employers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `rwdassignment`.`feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NULL,
  `name` VARCHAR(50) NULL,
  `date` DATETIME NOT NULL,
  `contact` VARCHAR(50) NULL,
  `feedback_content` TEXT(500) NULL,
  PRIMARY KEY (`id`));
