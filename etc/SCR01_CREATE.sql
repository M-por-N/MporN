use mporn;

-- CREATE FREELANCER_ESPECIALIDADE
DROP TABLE IF EXISTS freelancer_especialidade;

CREATE TABLE freelancer_especialidade (
  id_freelancer int(10) unsigned NOT NULL,
  id_especialidade int(10) unsigned NOT NULL,
  PRIMARY KEY (id_freelancer,id_especialidade),
  KEY id_especialidade (id_especialidade),
  KEY id_freelancer (id_freelancer)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- CREATE TRABALHO
DROP TABLE IF EXISTS trabalho;

CREATE TABLE trabalho (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  descricao varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  detalhado varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  id_plano int(10) unsigned NOT NULL,
  id_cliente int(10) unsigned NOT NULL,
  id_freelancer int(10) unsigned DEFAULT NULL,
  id_situacao int(10) unsigned NOT NULL,
  id_avaliacao int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (id),
  KEY id_cliente (id_cliente),
  KEY id_freelancer (id_freelancer),
  KEY id_plano (id_plano),
  KEY id_avaliacao (id_avaliacao)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- CREATE CLIENTE
DROP TABLE IF EXISTS cliente;

CREATE TABLE cliente (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(128) NOT NULL,
  email varchar(128) NOT NULL,
  cpfcnpj varchar(11) NOT NULL,
  senha varchar(65) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


-- CREATE ESPECIALIDADE
DROP TABLE IF EXISTS especialidade;

CREATE TABLE especialidade (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(40) NOT NULL,
  descricao varchar(128) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


-- CREATE FREELANCER
DROP TABLE IF EXISTS freelancer;

CREATE TABLE freelancer (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(128) NOT NULL,
  email varchar(128) NOT NULL,
  cpfcnpj varchar(11) NOT NULL,
  senha varchar(65) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


-- CREATE PLANO
DROP TABLE IF EXISTS plano;

CREATE TABLE plano (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(64) NOT NULL,
  descricaocurta varchar(256) DEFAULT NULL,
  valor int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


-- CREATE SITUACAO

DROP TABLE IF EXISTS situacao;

CREATE TABLE situacao (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- CREATE AVALIACAO
DROP TABLE IF EXISTS avaliacao;

CREATE TABLE avaliacao (
 id int(10) unsigned NOT NULL AUTO_INCREMENT,
 descricao varchar(128) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



