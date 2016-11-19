use mporn;

LOCK TABLES cliente WRITE;
INSERT INTO cliente VALUES (1,'Bracobom','contato@bracomal.com.br','04040224040','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'),(2,'Tecnovit','contato@tecnovit.com.br','03939223913','senha'),(3,'Acerte Compras','contato@acertecompras.com.br','03939223913','senha'),(4,'Bracomal','contato@bracomal.com.br','03939223914','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'),(5,'Jussara','jussa@gmail.com','03939223913','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'),(6,'Jussara','jussa@gmail.com','03939223913','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c');
UNLOCK TABLES;

LOCK TABLES especialidade WRITE;
INSERT INTO especialidade VALUES (1,'CSS','Folha de Estilos'),(2,'HTML','Linguagem de marcação básica'),(3,'PHP','Linguagem de programação back-end'),(4,'SysAdmin',''),(5,'JS,JQuery','Linguagem de programação Front-End');
UNLOCK TABLES;

LOCK TABLES freelancer WRITE;
INSERT INTO freelancer VALUES (1,'FABRICIO PINTO BARBOSA','fabriciopbrb@gmail.com','03939223913','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'),(2,'FABRICIO PINTO BARBOSA','fabricio@dipcorp.com.br','03939223913','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c');
UNLOCK TABLES;

LOCK TABLES freelancer_especialidade WRITE;
INSERT INTO freelancer_especialidade VALUES (1,1),(2,1),(1,2),(2,2),(1,3),(2,3),(1,4),(1,5),(2,5);
UNLOCK TABLES;

LOCK TABLES plano WRITE;
INSERT INTO plano VALUES (1,'Site Estatico','Criação de sites estaticos',1500),(2,'Site Intermediario','Criação de sites com tecnologia JS, JQuery',2000),(3,'Site Avançado','Criação de sites com tecnologia JS, JQuery e PHP',3000);
UNLOCK TABLES;

LOCK TABLES situacao WRITE;
INSERT INTO situacao VALUES (1, 'Aberto'), (2, 'Em andamento'),(3, 'Em análise'),(4,'Concluído');
UNLOCK TABLES;

LOCK TABLES avaliacao WRITE;
INSERT INTO avaliacao VALUES (1, 'Péssimo'), (2, 'Regular'), (3, 'Bom'), (4, 'Ótimo');
UNLOCK TABLES;

LOCK TABLES trabalho WRITE;
INSERT INTO trabalho (id, nome, id_plano, descricao, id_cliente, id_freelancer, id_situacao, id_avaliacao, detalhado) VALUES (1,'Bracomal Pneus',1,'Apresentação da Empresa',1,NULL,1,NULL,'Trabalho todo detalhado aqui!'),(2,'Site de Loja de Tecnologia',1,'Apresentação da Empresa',2,NULL,1,NULL,'Trabalho todo detalhado aqui!'),(3,'E-commerce',3,'Loja de Vendas ONline',3,NULL,1,NULL,'Trabalho todo detalhado aqui!'),(4,'Luiza Alimentos',1,'Site para apresentar a empresa',1,1,1,NULL,'Trabalho todo detalhado aqui!'),(5,'Site Fui Feito',2,'Site que já foi feito',2,1,2,NULL,'Trabalho todo detalhado aqui!'),(6,'Site Já feito Também',1,'Outro site já feito',3,1,2,NULL,'Trabalho todo detalhado aqui!'),(8,'Novo Trabalho Bracobum',1,'Site para apresentação da Empresa',4,NULL,1,NULL,'Descrição detalhada Aqui!'),(9,'Novo Trabalho 2',1,'Descricao pequena',4,1,3,NULL,'Descricao detalhada');
UNLOCK TABLES;

