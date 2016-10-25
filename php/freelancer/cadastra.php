<?php
//header('Content-type: application/json; charset=utf-8');

require_once("../config.php");

$input = @json_decode(file_get_contents("php://input"));

if($input == null or !isset($input->nome) or !isset($input->email) or !isset($input->cpfcnpj) 
        or !isset($input->senha) or !isset($input->especialidade)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
  
    $sql = "INSERT INTO freelancer (nome, email, cpfcnpj, senha) VALUES (:nome, :email, :cpfcnpj, :senha)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $input->nome, PDO::PARAM_STR);
    $stmt->bindParam(':email', $input->email, PDO::PARAM_STR);
    $stmt->bindParam(':cpfcnpj', $input->cpfcnpj, PDO::PARAM_STR);
    $stmt->bindParam(':senha', hash('sha256', $input->senha, false), PDO::PARAM_STR);
    $stmt->execute();
    
    $id_freelancer = $pdo->lastInsertId();
    
    if($id_freelancer == 0) {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel realizar o Cadastro"]);
        exit;
    }
   
    foreach ($input->especialidade as $esp){
        $sql = "INSERT INTO freelancer_especialidade VALUES (:free, :esp)";
        
        $stmt = $pdo->prepare( $sql );
        $stmt->bindParam(':free', $id_freelancer, PDO::PARAM_INT);
        $stmt->bindParam(':esp', $esp, PDO::PARAM_INT);
        $stmt->execute();
    }
    
    echo json_encode(['resultado' => true]);
    
} catch (PDOException $e) {
    //TODO: Enviar a mensagem de erro retornada pelo PDO
    echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
}

$conn = null;

exit;
