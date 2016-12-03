<?php

require_once("../config.php");
//$id = $token->data->id;


//$input = @json_decode(file_get_contents("php://input"));
$input = new stdClass();
$input->id =3; 

/**/
if($input == null or !isset($input->id)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}/**/

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
  
  
    $sql = 'UPDATE plano SET bloqueado = 0 WHERE id = :num';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':num',$input->id, PDO::PARAM_INT);
    
   $result = $stmt->execute();
    
   
    
    if(!$result){
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
        exit;
    } else {
        echo json_encode(['resultado' => true]);
    }
    
    
    
    
   
    
} catch (PDOException $e) {
    //TODO: Enviar a mensagem de erro retornada pelo PDO
    echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
}

$conn = null;

exit;
