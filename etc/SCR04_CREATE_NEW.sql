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


-- CREATE MENSAGEM
DROP TABLE IF EXISTS mensagem;

CREATE TABLE mensagem (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  texto varchar(400) NOT NULL,
  id_trabalho int (10) unsigned NOT NULL,
  datahora TIMESTAMP DEFAULT NOW() NOT NULL,
  idtusuario varchar(1) NOT NULL,
  PRIMARY KEY (id),
  KEY id_trabalho (id_trabalho)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- Chave estrangeira de trabalho
ALTER TABLE mensagem
    ADD CONSTRAINT mensagem_ibfk_1 FOREIGN KEY (id_trabalho) REFERENCES trabalho (id) ON DELETE CASCADE ON UPDATE CASCADE;



