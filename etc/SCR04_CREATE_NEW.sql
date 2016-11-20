-- CREATE ADMIN
DROP TABLE IF EXISTS admin;

CREATE TABLE admin (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(128) NOT NULL,
  email varchar(128) NOT NULL,
  cpfcnpj varchar(11) NOT NULL,
  senha varchar(65) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


