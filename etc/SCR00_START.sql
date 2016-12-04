-- Start

CREATE DATABASE mporn;

-- Caso nao tenha criado um usuário
CREATE USER 'mporn'@'localhost' IDENTIFIED BY '3U10euxnvsTKi6Ai';

-- E dado permissão
GRANT ALL PRIVILEGES ON mporn . * TO 'mporn'@'localhost';






