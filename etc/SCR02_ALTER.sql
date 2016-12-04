use mporn;

-- Chave estrangeira de Usuario
ALTER TABLE cliente
    ADD CONSTRAINT cliente_ibfk1 FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario) ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE freelancer
    ADD CONSTRAINT freelancer_ibfk1 FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario) ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE admin
    ADD CONSTRAINT admin_ibfk1 FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario) ON DELETE CASCADE ON UPDATE CASCADE;
 
 
-- Chave estrangeira de Status
ALTER TABLE usuario
    ADD CONSTRAINT usuario_ibfk1 FOREIGN KEY (idStatus) REFERENCES status (idStatus) ON DELETE CASCADE ON UPDATE CASCADE;
 

-- Chave estrangeira de freelancer
ALTER TABLE freelancer_especialidade
    ADD CONSTRAINT freelancer_especialidade_ibfk_1 FOREIGN KEY (idFreelancer) REFERENCES freelancer (idFreelancer) ON DELETE CASCADE ON UPDATE CASCADE;
  
-- Chave estrangeira de especialidade
ALTER TABLE freelancer_especialidade
    ADD CONSTRAINT freelancer_especialidade_ibfk_2 FOREIGN KEY (idEspecialidade) REFERENCES especialidade (idEspecialidade) ON DELETE CASCADE ON UPDATE CASCADE;

-- Chave estrangeira de cliente
ALTER TABLE trabalho 
    ADD CONSTRAINT trabalho_ibfk_1 FOREIGN KEY (idCliente) REFERENCES cliente (idCliente) ON DELETE CASCADE ON UPDATE CASCADE;

-- Chave estrangeira de freelancer  
ALTER TABLE trabalho
    ADD CONSTRAINT trabalho_ibfk_2 FOREIGN KEY (idFreelancer) REFERENCES freelancer (idFreelancer) ON DELETE CASCADE ON UPDATE CASCADE;

-- Chave estrangeira de plano    
ALTER TABLE trabalho
    ADD CONSTRAINT trabalho_ibfk_3 FOREIGN KEY (idPlano) REFERENCES plano (idPlano) ON DELETE CASCADE ON UPDATE CASCADE;
    
-- Chave estrangeira de situacao    
ALTER TABLE trabalho
    ADD CONSTRAINT trabalho_ibfk_4 FOREIGN KEY (idSituacao) REFERENCES situacao (idSituacao) ON DELETE CASCADE ON UPDATE CASCADE;
    
-- Chave estrangeira de avaliacao   
ALTER TABLE trabalho
    ADD CONSTRAINT trabalho_ibfk_5 FOREIGN KEY (idAvaliacao) REFERENCES avaliacao (idAvaliacao) ON DELETE CASCADE ON UPDATE CASCADE;
	
-- Chave estrangeira de trabalho
ALTER TABLE mensagem
    ADD CONSTRAINT mensagem_ibfk_1 FOREIGN KEY (idTrabalho) REFERENCES trabalho (idTrabalho) ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE reporte
    ADD CONSTRAINT reporte_ibfk_1 FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario) ON DELETE CASCADE ON UPDATE CASCADE;
	
	