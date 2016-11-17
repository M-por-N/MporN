-- Chave estrangeira de freelancer
ALTER TABLE freelancer_especialidade
    ADD CONSTRAINT freelancer_especialidade_ibfk_1 FOREIGN KEY (id_freelancer) REFERENCES freelancer (id) ON DELETE CASCADE ON UPDATE CASCADE;
  
-- Chave estrangeira de especialidade
ALTER TABLE freelancer_especialidade
    ADD CONSTRAINT freelancer_especialidade_ibfk_2 FOREIGN KEY (id_especialidade) REFERENCES especialidade (id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Chave estrangeira de cliente
ALTER TABLE trabalho 
    ADD CONSTRAINT trabalho_ibfk_1 FOREIGN KEY (id_cliente) REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Chave estrangeira de freelancer  
ALTER TABLE trabalho
    ADD CONSTRAINT trabalho_ibfk_2 FOREIGN KEY (id_freelancer) REFERENCES freelancer (id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Chave estrangeira de plano    
ALTER TABLE trabalho
    ADD CONSTRAINT trabalho_ibfk_3 FOREIGN KEY (id_plano) REFERENCES plano (id) ON DELETE CASCADE ON UPDATE CASCADE;
    
-- Chave estrangeira de plano    
ALTER TABLE trabalho
    ADD CONSTRAINT trabalho_ibfk_4 FOREIGN KEY (id_situacao) REFERENCES situacao (id) ON DELETE CASCADE ON UPDATE CASCADE;