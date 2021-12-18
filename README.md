
<img src="https://user-images.githubusercontent.com/59607914/146635304-6bc8040c-758b-4720-ba57-176c854ef4bb.png" width="300" height="100">

**An store API based on express framwork** \
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=fflat-square&logo=javascript&logoColor=black) 
![](https://img.shields.io/badge/Node.js-43853D?style=fflat-square&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/MySQL-00000F?style=fflat-square&logo=mysql&logoColor=white) \
![](https://img.shields.io/github/issues/zhuofan-16/Express_StoreAPI.svg)
![](https://img.shields.io/github/issues-pr/zhuofan-16/Express_StoreAPI.svg)
# Introduction

This project assignment is part of the ST0503: Back-End Web Development module.

SP IT! is considering setting up an online e-store to allow the public to purchase  IT products it is selling. Before it launches its online e-store, it requires a web application to computerize its inventory management module and also allow the public to view the product details online.
As such, SP IT! has tasked you to design the backend API Specs the website. The API specs would support functionalities such as user registration, publication of product info, insertion of products and user reviews.  

# Feature Implemented
**Product management** : Get products detail,add new product,update product detail,delete product.

**User mangement** : Get user details(single or all),add new users ,update existing users,delete user,get user token(This is needed to access cart and order features) 

**Cart management** : Customer can add items into their cart,update quantities of item ,delete item from cart and checkout the cart together with promo code(These features require token:User specific function) 

**Order management** :User will be able to view orders they have made (Require token:User specific function) 

**Interest management** : User can set their preference on categories,update their preference,delete their preference,view their own preference.Admin will be able to view all user's preference. 

**Promotion management**:Admin can create new promotion/discount,edit promotion details and delete promotion.(Admin token required).User will be able to view promotions that have not expired. 

**Review management**:User will be able to view reviews about an item,add reviews. 

**User Verification**:jwt module is used to verify token and get user's id,roles. 

## Preparation
### Setting up the database
You are supposed to run the following query to set up your database

```sql
/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : SP_IT

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 18/12/2021 21:35:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `userid` int NOT NULL,
  `productid` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  KEY `FK_usernameid` (`userid`),
  KEY `FK_productids` (`productid`),
  CONSTRAINT `FK_productids` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_usernameid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of cart
-- ----------------------------
BEGIN;
INSERT INTO `cart` (`userid`, `productid`, `quantity`, `created_at`) VALUES (2, 1, 1, '2021-12-18 20:06:02.086406');
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `categoryid` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` (`categoryid`, `category`, `description`) VALUES (1, 'Laptops', 'Light and high performance laptops for school');
INSERT INTO `category` (`categoryid`, `category`, `description`) VALUES (2, 'Smartphones', 'Flagship phones');
INSERT INTO `category` (`categoryid`, `category`, `description`) VALUES (3, 'Tablets', 'Light and amazing student tablet');
COMMIT;

-- ----------------------------
-- Table structure for interest
-- ----------------------------
DROP TABLE IF EXISTS `interest`;
CREATE TABLE `interest` (
  `interestid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `categoryids` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`interestid`),
  UNIQUE KEY `userid` (`userid`),
  CONSTRAINT `FK_user` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of interest
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `orderid` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `payment_value` float NOT NULL,
  `products` json NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderid`) USING BTREE,
  KEY `FK_pUserID` (`userid`),
  CONSTRAINT `FK_pUserID` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `categoryid` int NOT NULL,
  `brand` varchar(255) COLLATE utf8_bin NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `product_image` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '../productImage/default.png',
  PRIMARY KEY (`productid`),
  KEY `FK_categoryid` (`categoryid`),
  CONSTRAINT `FK_categoryid` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` (`productid`, `name`, `description`, `categoryid`, `brand`, `price`, `created_at`, `product_image`) VALUES (1, 'OPPO Reno 6 Pro 星河入梦 8+256', '焕采人像视频 在我眼里你会发光', 2, 'OPPO', 3299.00, '2021-12-16 15:01:31.710821', '/Users/zhuofan/WebstormProjects/Express_StoreAPI/productImage/849d22f534168142297c54ebcbcf8905.png');
INSERT INTO `product` (`productid`, `name`, `description`, `categoryid`, `brand`, `price`, `created_at`, `product_image`) VALUES (2, 'Apple iPad Air 3 64GB WIFI', 'Change is in the Air', 3, 'Apple', 3000.00, '2021-12-16 15:06:48.720721', '/Users/zhuofan/WebstormProjects/Express_StoreAPI/productImage/a875a676ca0cb11b0171a17424780ea9.jpeg');
INSERT INTO `product` (`productid`, `name`, `description`, `categoryid`, `brand`, `price`, `created_at`, `product_image`) VALUES (3, 'Xiaomi 11 Lite 5G NE 8+256 Swarovski White', '轻薄5G，内外皆出彩', 2, 'Xiaomi', 2500.00, '2021-12-16 16:42:15.049652', '/Users/zhuofan/WebstormProjects/Express_StoreAPI/productImage/cd8ec411f6f68fec01cc88a430f725cc.png');
INSERT INTO `product` (`productid`, `name`, `description`, `categoryid`, `brand`, `price`, `created_at`, `product_image`) VALUES (4, 'Apple Macbook Pro 2020 M1 8+256', 'All systems Pro.', 1, 'Apple', 15000.00, '2021-12-16 17:00:28.669917', '/Users/zhuofan/WebstormProjects/Express_StoreAPI/productImage/032c46e2e1e4c2c6db97b457b534563d.jpeg');
COMMIT;

-- ----------------------------
-- Table structure for promotion
-- ----------------------------
DROP TABLE IF EXISTS `promotion`;
CREATE TABLE `promotion` (
  `promotionid` int NOT NULL AUTO_INCREMENT,
  `productid` int DEFAULT NULL,
  `categoryid` int DEFAULT NULL,
  `value` float NOT NULL,
  `promo_key` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`promotionid`),
  UNIQUE KEY `promo_key` (`promo_key`),
  KEY `FK_productlink` (`productid`),
  CONSTRAINT `FK_productlink` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of promotion
-- ----------------------------
BEGIN;
INSERT INTO `promotion` (`promotionid`, `productid`, `categoryid`, `value`, `promo_key`, `description`, `start_date`, `end_date`) VALUES (1, 1, NULL, 20, 'FIRST20', '20 Dollar Off For Oppo Reno 6 Pro', '2021-12-01 18:51:22', '2022-01-29 18:51:28');
INSERT INTO `promotion` (`promotionid`, `productid`, `categoryid`, `value`, `promo_key`, `description`, `start_date`, `end_date`) VALUES (2, NULL, 1, 7, 'BLACKFRIDAY', '7 Dollar Promotion For Laptops', '2021-12-08 19:23:42', '2021-12-25 19:23:45');
INSERT INTO `promotion` (`promotionid`, `productid`, `categoryid`, `value`, `promo_key`, `description`, `start_date`, `end_date`) VALUES (3, NULL, 2, 6, 'FIRST6', '6 Dollar Promo For Smartphones', '2021-12-04 10:00:00', '2022-01-29 12:00:00');
COMMIT;

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `productid` int NOT NULL,
  `userid` int NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `FK_userid` (`userid`),
  KEY `FK_productid` (`productid`),
  CONSTRAINT `FK_productid` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of review
-- ----------------------------
BEGIN;
INSERT INTO `review` (`reviewid`, `productid`, `userid`, `rating`, `review`, `created_at`) VALUES (1, 1, 2, 5, 'Amazing phone!', '2021-12-18 20:08:23');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT COMMENT 'UserID that should be auto generated',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Name of person',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Email of person',
  `contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Contact number of person',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Password of account',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Type of user',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Timestamp of registration',
  `profile_pic_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Profile image of person',
  PRIMARY KEY (`userid`) USING BTREE,
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`userid`, `username`, `email`, `contact`, `password`, `type`, `created_at`, `profile_pic_url`) VALUES (1, 'Admin', 'admin@spit.edu.sg', '91235685', 'securePass@@word', 'Admin', '2021-12-18 19:49:42.772512', 'https://avatars.githubusercontent.com/u/59607914?s=400&u=be72da23a1e459ef39c43d5b4530cad35c804d7b&v=4');
INSERT INTO `users` (`userid`, `username`, `email`, `contact`, `password`, `type`, `created_at`, `profile_pic_url`) VALUES (2, 'Chen ZhuoFan', 'zhuofan.21@ichat.sp.edu.sg', '83836591', 'Hanci272993', 'Customer', '2021-12-18 19:56:18.012557', 'https://avatars.githubusercontent.com/u/59607914?s=400&u=be72da23a1e459ef39c43d5b4530cad35c804d7b&v=4');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

```

### Editing database config


```sql
1. Use finder/explorer and navigate for the project
2.Enter ./config
3.Open DB-SP_IT.js using a text editor such as notepad++
4.Edit the user,password to your database account details.(also change host if needed)
```

### Installing dependencies

```sql
1.Open the project in your ide
2.Go to terminal in the project's directory
3.run "npm install"
```

### Running the program

```sql
1.Open up project's folder
2.Open up ./app.js in your ide and run it
*OR*
1.Open up project's folder
2.Open your terminal/cmd and enter project's directory using "cd /xxx/xxx/xxx"
3.run "node app.js"

Project started successfully if you see the following message:
SP_IT API STARTED ON http://localhost:8090

```

# Contact/Enquire

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=fflat-square&logo=gmail&logoColor=white)](mailto:chzuofan@gmail.com)
[![Microsoft Outlook](https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=fflat-square&logo=microsoft-outlook&logoColor=white)](mailto:zhuofan.21@ichat.sp.edu.sg)
[![Instagram](https://img.shields.io/badge/那时雨-E4405F?style=fflat-square&logo=instagram&logoColor=white)](https://instagram.com/zf.xingchen)
[![Telegram](https://img.shields.io/badge/%40Hanci16-0088cc?style=fflat-square&logo=telegram&logoColor=ffffff)](https://t.me/Hanci16)
[![Microsoft Team](https://img.shields.io/badge/Microsoft_Teams-6264A7?style=fflat-square&logo=microsoft-teams&logoColor=white)](https://teams.microsoft.com/l/chat/0/0?users=zhuofan.21@ichat.sp.edu.sg)
