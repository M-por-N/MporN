<?php
//implementação para teste do frontend:
//header('Content-type: application/json; charset=utf-8');
/**
echo json_encode(['especialidades' => [ 
        [ 'id' => 2, 'nome' => 'HTML',      'descricaoCurta' => 'asdasd' ],
        [ 'id' => 3, 'nome' => 'PHP',       'descricaoCurta' => 'asdasd' ],
        [ 'id' => 7, 'nome' => 'Sysadmin',  'descricaoCurta' => 'asdasd' ]
        ]]);
exit;
/**/

include_once('config.php');
try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
   
   
   
    $stmt = $pdo->prepare('SELECT id, nome, descricao as descricaoCurta FROM especialidade');
    
    $stmt->execute();
    $esp = ['especialidades'=>[]];
    if($row = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
       // echo json_encode($row);
       
       
       foreach($row as $linha){
          $esp['especialidades'][] = $linha; 
          
       }
       
       echo json_encode($esp);

    } else {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro ao retornar dados do Banco de Dados']);
    }
    
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}




$conn = null;

exit;

/**/