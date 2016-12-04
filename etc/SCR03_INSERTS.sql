use mporn;

LOCK TABLES especialidade WRITE;
INSERT INTO especialidade VALUES (1,'CSS','Folha de Estilos'),(2,'HTML','Linguagem de marcação básica'),(3,'PHP','Linguagem de programação back-end'),(4,'SysAdmin','Admin de Alguma coisa'),(5,'JS,JQuery','Linguagem de programação Front-End');
UNLOCK TABLES;

LOCK TABLES plano WRITE;
INSERT INTO plano (idPlano, nomePlano, descricaoCurta, valor) VALUES (1,'Site Estatico','Criação de sites estaticos',1500),(2,'Site Intermediario','Criação de sites com tecnologia JS, JQuery',2000),(3,'Site Avançado','Criação de sites com tecnologia JS, JQuery e PHP',3000);
UNLOCK TABLES;

LOCK TABLES situacao WRITE;
INSERT INTO situacao VALUES (1, 'Aberto'), (2, 'Em andamento'),(3, 'Em análise'),(4,'Concluído');
UNLOCK TABLES;

LOCK TABLES avaliacao WRITE;
INSERT INTO avaliacao VALUES (1, 'Péssimo'), (2, 'Regular'), (3, 'Bom'), (4, 'Ótimo');
UNLOCK TABLES;


LOCK TABLES status WRITE;
INSERT INTO status VALUES (1, 'Disponivel'), (2, 'Alertado'),(3, 'Bloqueado'), (4, 'Banido');
UNLOCK TABLES;


