-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rwdassignment
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `employers`
--

LOCK TABLES `employers` WRITE;
/*!40000 ALTER TABLE `employers` DISABLE KEYS */;
INSERT INTO `employers` VALUES 
(6905676,'Houston Technology Group','2020-03-22 09:31:05','Private Sector','Private Sector','Hamilton','0272222222','example@example.com','Houston_Technology_Group','Houston@Technology@Group'),
(18080660,'Waikato District Health Board','2020-03-24 13:37:53','Private Sector','Government Sector','Hamilton','0272222222','example@example.com','Waikato_District_Health_','Waikato@District@Health@'),
(20690608,'Smart Recruitment','2020-03-20 19:37:49','Government Sector','Private Sector','Auckland Central','0272222222','example@example.com','Smart_Recruitment','Smart@Recruitment'),
(20836671,'Ministry of Social Development','2020-03-23 13:27:03','Private Sector','Government Sector','Christchurch','0272222222','example@example.com','Ministry_of_Social_Devel','Ministry@of@Social@Devel'),
(21906121,'Woolworths NZ Ltd','2020-03-21 15:54:59','Private Sector','Private Sector','Manukau & East Auckland','0272222222','example@example.com','Woolworths_NZ_Ltd','Woolworths@NZ@Ltd'),
(22493036,'IMO Group Ltd','2020-03-24 15:29:33','Private Sector','Private Sector','Auckland Central','0272222222','example@example.com','IMO_Group_Ltd','IMO@Group@Ltd'),
(24568774,'Fujitsu New Zealand','2020-03-20 13:07:10','Private Sector','Private Sector','Auckland Central','0272222222','example@example.com','Fujitsu_New_Zealand','Fujitsu@New@Zealand'),
(24873254,'1st Call Recruitment','2020-03-23 18:40:06','Government Sector','Private Sector','Porirua & Kapiti Coast','0272222222','example@example.com','1st_Call_Recruitment','1st@Call@Recruitment'),
(26366925,'Universal Communications Group Pty Ltd','2020-03-20 16:51:27','Private Sector','Government Sector','Auckland Central','0272222222','example@example.com','Universal_Communications','Universal@Communications'),
(26919419,'Tag I.T Technologies','2020-03-21 08:33:01','Private Sector','Government Sector','Hamilton','0272222222','example@example.com','Tag_I.T_Technologies','Tag@I.T@Technologies'),
(27341435,'Wilson Group','2020-03-25 02:00:00','Private Sector','Government Sector','Rest of Otago','0272222222','example@example.com','Wilson_Group','Wilson@Group'),
(27658330,'Genesis','2020-03-23 10:12:53','Government Sector','Government Sector','Hamilton','0272222222','example@example.com','Genesis','Genesis'),
(29354464,'Onceit','2020-03-23 07:42:50','Private Sector','Private Sector','Rodney & North Shore','0272222222','example@example.com','Onceit','Onceit'),
(31881413,'KeepItSafe New Zealand','2020-03-22 08:55:59','Government Sector','Government Sector','Auckland Central','0272222222','example@example.com','KeepItSafe_New_Zealand','KeepItSafe@New@Zealand'),
(32298876,'ezyVet Limited','2020-03-22 16:23:49','Private Sector','Government Sector','Auckland Central','0272222222','example@example.com','ezyVet_Limited','ezyVet@Limited'),
(32473490,'Optimus Systems Ltd','2020-03-24 18:03:46','Government Sector','Government Sector','Auckland Central','0272222222','example@example.com','Optimus_Systems_Ltd','Optimus@Systems@Ltd'),
(35147055,'Cohesion Consulting NZ Limited','2020-03-22 17:15:34','Private Sector','Government Sector','Auckland Central','0272222222','example@example.com','Cohesion_Consulting_NZ_L','Cohesion@Consulting@NZ@L'),
(35532008,'Ministry of Justice','2020-03-24 20:17:01','Private Sector','Private Sector','Hamilton','0272222222','example@example.com','Ministry_of_Justice','Ministry@of@Justice'),
(36378864,'Cityguard','2020-03-25 02:00:00','Government Sector','Private Sector','','0272222222','example@example.com','Cityguard','Cityguard'),
(36981511,'Beyond Recruitment - Winner – Best Innovation –2018 Global Recruiter Awards','2020-03-16 16:50:54','Government Sector','Government Sector','Manukau & East Auckland','0272222222','example@example.com','Beyond_Recruitment_-_Win','Beyond@Recruitment@-@Win'),
(41708558,'Wise Group','2020-03-22 16:25:39','Government Sector','Private Sector','Manukau & East Auckland','0272222222','example@example.com','Wise_Group','Wise@Group'),
(44996939,'MAN Energy Solutions New Zealand Limited','2020-03-23 10:48:44','Private Sector','Private Sector','Rodney & North Shore','0272222222','example@example.com','MAN_Energy_Solutions_New','MAN@Energy@Solutions@New');
/*!40000 ALTER TABLE `employers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (41214724,27341435,'Casual Security Officers - Oamaru','2020-03-25 02:00:00','Trades & Services','Ability to earn living wage\nBe on call as when required\nVariety of Locations throughout New Zealand','We are on the lookout for Casual Security Officers throughout New Zealand with the ability to earn living wage.','Ability to earn living wage\nBe on call as when required\nVariety of Locations throughout New Zealand','Rest of Otago',100.00,'example@example.com',NULL,NULL),
(41218276,36378864,'Full Time Security Officers - $21.15 per hour start!','2020-03-25 02:00:00','Trades & Services','Living wage as a minimum\nGreat work-life balance with great career potential!\nCareer for life','Security Roles','Living wage as a minimum\nGreat work-life balance with great career potential!\nCareer for life','',100.00,'example@example.com',NULL,NULL),
(41257326,36981511,'Desktop Support Engineer','2020-03-16 16:50:54','Information & Communication Technology','','Desktop Support Engineer | 4 week Contract | Manukau','','Manukau & East Auckland',100.00,'example@example.com',NULL,NULL),
(41263159,24568774,'Service Desk Analyst - 6 & 12 month contracts','2020-03-20 13:07:10','Information & Communication Technology','','Contract Service Desk opportunities!','','Auckland Central',100.00,'example@example.com',NULL,NULL),
(41264244,26366925,'Operations Analyst','2020-03-20 16:51:27','Consulting & Strategy','Permanent role - Auckland\nJoin an expanding business with growth opportunities\nCompetitive Remuneration and Benefits','We employ passionate people who can help us better connect New Zealanders and Australians to each other and the rest of the world!','Permanent role - Auckland\nJoin an expanding business with growth opportunities\nCompetitive Remuneration and Benefits','Auckland Central',100.00,'example@example.com',NULL,NULL),
(41265125,20690608,'Customer Service Consultant','2020-03-20 19:37:49','Call Centre & Customer Service','','Multinational IT services provider are seeking 25 Contact Centre Sales Consultants to join their Auckland team. Work from home, Full training provided','','Auckland Central',50000.00,'example@example.com',NULL,NULL),
(41265548,26919419,'Customer and Technical Support','2020-03-21 08:33:01','Information & Communication Technology','','Customer and Technical Support • Dynamic innovative IoT NZ company • Huge growth • Key influential technical role','','Hamilton',100.00,'example@example.com',NULL,NULL),
(41267268,21906121,'Senior Business Analyst - Operations','2020-03-21 15:54:59','Accounting','Enjoy flexible working options\nExciting, fast paced and positively challenging role\nOnsite Barista, Cafe and FREE parking','The purpose of the role is to own the store budgeting and forecasting process and provide financial support to the operations leadership team.','Enjoy flexible working options\nExciting, fast paced and positively challenging role\nOnsite Barista, Cafe and FREE parking','Manukau & East Auckland',100.00,'example@example.com',NULL,NULL),
(41268768,31881413,'Level 1 Service Desk Officer','2020-03-22 08:55:59','Information & Communication Technology','','Excellent opportunity for an experienced Support Desk Officer to deliver Level 1 - IT support to KeepItSafe Customers and Staff.','','Auckland Central',100.00,'example@example.com',NULL,NULL),
(41268798,6905676,'Customer Services','2020-03-22 09:31:05','Information & Communication Technology','','Do you want to utilise your excellent customer service with your IT skills? This may be the job for you!','','Hamilton',100.00,'example@example.com',NULL,NULL),
(41270955,32298876,'Global Support Manager','2020-03-22 16:23:49','Information & Communication Technology','Lead our Global Support function\nDevelop the careers of our world class team\nInnovate and optimise better ways of adding value to our customers','Lead our world class 24/7 Support operation through proactive monitoring and maintenance of ezyVet’s deployed software.','Lead our Global Support function\nDevelop the careers of our world class team\nInnovate and optimise better ways of adding value to our customers','Auckland Central',80000.00,'example@example.com',NULL,NULL),
(41270980,41708558,'Youth Worker','2020-03-22 16:25:39','Community Services & Development','Permanent Part-time role working Sunday and Monday 11pm - 7:30am\nBased in East Tamaki, Auckland\nAre you motivated and energised to support young people?','Want to work with an awesome bunch of people?  Join our team and be part of an energising, positive, youth-focused crew.','Permanent Part-time role working Sunday and Monday 11pm - 7:30am\nBased in East Tamaki, Auckland\nAre you motivated and energised to support young people?','Manukau & East Auckland',100.00,'example@example.com',NULL,NULL),
(41271459,35147055,'IT Support  Analyst','2020-03-22 17:15:34','Information & Communication Technology','Work in a socially responsible business\nJoin a growing organisation you can grow your career with\nCity based','Level 1 & 2 desktop support to a call centre environment.','Work in a socially responsible business\nJoin a growing organisation you can grow your career with\nCity based','Auckland Central',100.00,'example@example.com',NULL,NULL),
(41271836,44996939,'Finance Manager','2020-03-23 10:48:44','Accounting','','Newly created role for an experienced finance officer to join the New Zealand entity in a standalone function','','Rodney & North Shore',100.00,'example@example.com',NULL,NULL),
(41272569,29354464,'Warehouse Picking/Packing Role - Casual','2020-03-23 07:42:50','Manufacturing, Transport & Logistics','Friendly fun team\nWork in an environment that is fast paced, supportive and growing','We\'re looking for an energetic dispatch member to help our team as we ship out a backlog of orders post Level 4. This is a casual position.','Friendly fun team\nWork in an environment that is fast paced, supportive and growing','Rodney & North Shore',100.00,'example@example.com',NULL,NULL),
(41272687,27658330,'Retail Operations Analyst','2020-03-23 10:12:53','Accounting','Attractive remuneration and benefits package\nFlexible working environment\nCan be based out of Auckland or Hamilton','Were after an Analyst to support our Retail Operations group with systems, process and datasets for tracking against our strategic + operational goals','Attractive remuneration and benefits package\nFlexible working environment\nCan be based out of Auckland or Hamilton','Hamilton',100.00,'example@example.com',NULL,NULL),
(41273541,20836671,'Customer Service Representatives, Work and Income Christchurch Contact Centre','2020-03-23 13:27:03','Call Centre & Customer Service','We provide a positive and diverse work environment\nComprehensive induction and on-going training.\nRegular coaching and development opportunities.','We are seeking motivated, strong communicators to provide exceptional customer service to our clients over the phone.','We provide a positive and diverse work environment\nComprehensive induction and on-going training.\nRegular coaching and development opportunities.','Christchurch',100.00,'example@example.com',NULL,NULL),
(41275162,24873254,'Freight and Mail Sorters am - pm shifts','2020-03-23 18:40:06','Manufacturing, Transport & Logistics','','We are looking for people to join our team for day and night shift work for Freight and Mail sorting!','','Porirua & Kapiti Coast',100.00,'example@example.com',NULL,NULL),
(41276763,18080660,'Receptionist','2020-03-24 13:37:53','Administration & Office Support','','Work in Health Care, 36 hours per week.','','Hamilton',100.00,'example@example.com',NULL,NULL),
(41277306,22493036,'Warehouse Inwards Goods','2020-03-24 15:29:33','Manufacturing, Transport & Logistics','','Warehouse Inwards Goods opportunity in Parnell, Auckland. Immediate start.','','Auckland Central',100.00,'example@example.com',NULL,NULL),
(41278206,32473490,'Field Solutions Specialist','2020-03-24 18:03:46','Information & Communication Technology','','The Field Solutions Specialist is responsible for onsite service and support needs for our customers.','','Auckland Central',79999.00,'example@example.com',NULL,NULL),
(41278844,35532008,'Court Registry Officer - Hamilton','2020-03-24 20:17:01','Call Centre & Customer Service','Work with a range of stakeholders who interact with the court\nExercise Deputy Registrar powers\nBecome part of an inclusive organisation that values you','Work in a team where you\'ll support the day to day operations of the court by managing cases and working with different customers.','Work with a range of stakeholders who interact with the court\nExercise Deputy Registrar powers\nBecome part of an inclusive organisation that values you','Hamilton',100.00,'example@example.com',NULL,NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-05 14:20:21
