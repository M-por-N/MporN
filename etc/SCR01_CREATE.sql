use mporn;

-- CREATE FREELANCER_ESPECIALIDADE
DROP TABLE IF EXISTS freelancer_especialidade;

CREATE TABLE freelancer_especialidade (
  idFreelancer int(10) unsigned NOT NULL,
  idEspecialidade int(10) unsigned NOT NULL,
  PRIMARY KEY (idFreelancer,idEspecialidade),
  KEY idEspecialidade (idEspecialidade),
  KEY idFreelancer (idFreelancer)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- CREATE REPORTES
DROP TABLE IF EXISTS QUADRO;

CREATE TABLE quadro (
	idQuadro int(10) unsigned NOT NULL AUTO_INCREMENT,
	idAdmin int(10) unsigned NOT NULL,
	mensagemQuadro varchar(400) NOT NULL,
	dataHora TIMESTAMP DEFAULT NOW() NOT NULL,
    PRIMARY KEY (idQuadro),
	KEY idAdmin (idAdmin),
	KEY idQuadro (idQuadro)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



-- CREATE REPORTES
DROP TABLE IF EXISTS reporte;

CREATE TABLE reporte (
	idReporte int(10) unsigned NOT NULL AUTO_INCREMENT,
	idUsuario int(10) unsigned NOT NULL,
	mensagemReporte varchar(400) NOT NULL,
    PRIMARY KEY (idReporte),
	KEY idReporte (idReporte)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- CREATE MENSAGEM
DROP TABLE IF EXISTS mensagem;

CREATE TABLE mensagem (
  idMensagem int(10) unsigned NOT NULL AUTO_INCREMENT,
  texto varchar(400) NOT NULL,
  idTrabalho int (10) unsigned NOT NULL,
  dataHora TIMESTAMP DEFAULT NOW() NOT NULL,
  idtusuario varchar(1) NOT NULL,
  PRIMARY KEY (idMensagem),
  KEY idTrabalho (idTrabalho)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- CREATE TRABALHO
DROP TABLE IF EXISTS trabalho;

CREATE TABLE trabalho (
  idTrabalho int(10) unsigned NOT NULL AUTO_INCREMENT,
  nomeTrabalho varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  descricaoTrabalho varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  detalhadoTrabalho varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  idPlano int(10) unsigned NOT NULL,
  idCliente int(10) unsigned NOT NULL,
  idFreelancer int(10) unsigned DEFAULT NULL,
  idSituacao int(10) unsigned NOT NULL,
  idAvaliacao int(10) unsigned DEFAULT NULL,
  idStatus int(10) unsigned DEFAULT 1,
  anexo blob default null,
  PRIMARY KEY (idTrabalho),
  KEY idCliente (idCliente),
  KEY idFreelancer (idFreelancer),
  KEY idPlano (idPlano),
  KEY idAvaliacao (idAvaliacao),
  KEY idSituacao (idSituacao),
  KEY idStatus (idStatus)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




-- CREATE CLIENTE
DROP TABLE IF EXISTS cliente;

CREATE TABLE cliente (
  idCliente int(10) unsigned NOT NULL AUTO_INCREMENT,
  idUsuario int(10)  unsigned NOT NULL,
  PRIMARY KEY (idCliente),
  KEY idUsuario (idUsuario)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- CREATE FREELANCER
DROP TABLE IF EXISTS freelancer;

CREATE TABLE freelancer (
  idFreelancer int(10) unsigned NOT NULL AUTO_INCREMENT,
  idUsuario int(10)  unsigned NOT NULL,
  PRIMARY KEY (idFreelancer),
  KEY idUsuario (idUsuario)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- CREATE ADMIN
DROP TABLE IF EXISTS admin;

CREATE TABLE admin (
  idAdmin int(10) unsigned NOT NULL AUTO_INCREMENT,
  idUsuario int(10)  unsigned NOT NULL,
  PRIMARY KEY (idAdmin),
  KEY idUsuario (idUsuario)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- CREATE USUARIO
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
	idUsuario int(10) unsigned NOT NULL AUTO_INCREMENT,
	nomeUsuario varchar(128) NOT NULL,
	email varchar(128) NOT NULL,
  cpfcnpj varchar(11) NOT NULL,
  senha varchar(65) NOT NULL,
	idStatus int(10) unsigned DEFAULT 1,
  PRIMARY KEY (idUsuario),
	KEY idStatus (idStatus),
  CONSTRAINT uc_Email UNIQUE (email)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- CREATE ESPECIALIDADE
DROP TABLE IF EXISTS especialidade;

CREATE TABLE especialidade (
  idEspecialidade int(10) unsigned NOT NULL AUTO_INCREMENT,
  nomeEspecialidade varchar(40) NOT NULL,
  descricaoEspecialidade varchar(128) NOT NULL,
  PRIMARY KEY (idEspecialidade)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


-- CREATE PLANO
DROP TABLE IF EXISTS plano;

CREATE TABLE plano (
  idPlano int(10) unsigned NOT NULL AUTO_INCREMENT,
  nomePlano varchar(64) NOT NULL,
  descricaoCurta varchar(256) DEFAULT NULL,
  valor int(11) DEFAULT NULL,
  idStatus int(10) unsigned DEFAULT 1,
  imagem blob default null,
  PRIMARY KEY (idPlano),
  KEY idPlano (idPlano),
  KEY idStatus (idStatus)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


-- CREATE SITUACAO
DROP TABLE IF EXISTS situacao;

CREATE TABLE situacao (
  idSituacao int(10) unsigned NOT NULL AUTO_INCREMENT,
  nomeSituacao varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (idSituacao)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- CREATE AVALIACAO
DROP TABLE IF EXISTS avaliacao;

CREATE TABLE avaliacao (
 idAvaliacao int(10) unsigned NOT NULL AUTO_INCREMENT,
 descricao varchar(128) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY (idAvaliacao)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- CREATE STATUS
DROP TABLE IF EXISTS status;

CREATE TABLE status (
  idStatus int(10) unsigned NOT NULL AUTO_INCREMENT,
  nomeStatus varchar(128) NOT NULL,
  PRIMARY KEY (idStatus)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;






