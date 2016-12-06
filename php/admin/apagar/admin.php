<?php
//header('Content-type: application/json; charset=utf-8');
use \Firebase\JWT\JWT;
require_once("../../vendor/autoload.php");
require_once("../../config.php");
include("../../recebe-jwt.php");

$input = @json_decode(file_get_contents("php://input"));
//$input = array("nome"=>"Bracobom","email"=>"contato@bracomal.com.br","cpfcnpj"=>"04040224040","senha"=>"senha");
//$input = (object) $input;
//$id = 1;

if($input == null or !isset($input->idAdmin) or !isset($input->idUsuario)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}



try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->beginTransaction();
    
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $query = 'DELETE FROM quadro WHERE idAdmin = :idAdmin';
    
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':idAdmin',$input->idAdmin, PDO::PARAM_STR);
    $result = $stmt->execute();
    
    if(!$result){
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
        exit;
    } else {
        
        $queryAdmin = 'DELETE FROM admin WHERE idAdmin = :idAdmin';
        
        $stmt = $pdo->prepare($queryAdmin);
        $stmt->bindParam(':idAdmin',$input->idAdmin, PDO::PARAM_INT);
        
        $result = $stmt->execute();
        
        
        if(!$result){
            //TODO: Enviar a mensagem de erro retornada pelo PDO
            echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
            exit;
        
        } else {
        
            $queryUsuario = 'DELETE FROM usuario WHERE idUsuario = :idUsuario';
            
            $stmt = $pdo->prepare($queryUsuario);
            $stmt->bindParam(':idUsuario',$input->idUsuario, PDO::PARAM_INT);
            $result = $stmt->execute();
        
        
            if(!$result){
                //TODO: Enviar a mensagem de erro retornada pelo PDO
                echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
                exit;
            } else {
                
                $pdo->commit();
                echo json_encode(['resultado' => true]);
                
            }
        
        }
        
    }
    
} catch (PDOException $e) {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel realizar a Exclusão"]);
}

$pdo = null;

exit;