<?php

require_once('connection.php');
require_once('settings.php');


$db = new bd();
$db->createDatabase($config['host'], $config['user'], $config['password'], $config['banco']);
//$host, $user, $password, $banco estão importados através de settings.php


$sql = "CREATE TABLE IF NOT EXISTS `". $config['banco'] . "`.`pessoas` (
    `id` INT(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    `nome` VARCHAR(100) NULL DEFAULT NULL 
    ) ENGINE = InnoDB;";
$t = $db->connect($config['host'], $config['user'], $config['password'], $config['banco']);
$t->query($sql);
$t->close();

$sql = "CREATE TABLE IF NOT EXISTS `". $config['banco'] . "`.`filhos` (
    `id` INT(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `id_pessoa` INT(10) UNSIGNED NOT NULL , 
    `nome` VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_pessoa) 
        REFERENCES pessoas (id)  
    ) ENGINE = InnoDB;";
$t = $db->connect($config['host'], $config['user'], $config['password'], $config['banco']);
$t->query($sql);
$t->close();

$procedureone = $db->connect($config['host'], $config['user'], $config['password'], $config['banco']);
$procedureone->query("DROP PROCEDURE IF EXISTS `getAllPersons`");
$procedureone->query("
CREATE PROCEDURE getAllPersons()
BEGIN
    SELECT id FROM pessoas WHERE id=(SELECT max(id) FROM pessoas);
END");
$procedureone->close();
