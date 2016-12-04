<?php
//header('Content-type: application/json; charset=utf-8');

use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");
$input = @json_decode(file_get_contents("php://input"));

$id = $token->data->id;
$situacao = $input->situacao;

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $stmt = $pdo->prepare('SELECT t.idTrabalho, t.nomeTrabalho, t.descricaoTrabalho, p.nomePlano, uf.nomeUsuario as nomeFreelancer, uc.nomeUsuario as nomeCliente,
                           s.nomeSituacao, uc.email as emailCliente, uf.email as emailFreelancer
                           FROM trabalho t inner join plano p on t.idPlano=p.idPlano 
                           left join freelancer f on t.idFreelancer = f.idFreelancer 
                           left join usuario uf on f.idUsuario = uf.idUsuario
                           left join cliente c on t.idCliente = c.idCliente
                           left join usuario uc on c.idUsuario = uc.idUsuario
                           left join avaliacao a on t.idAvaliacao = a.idAvaliacao
                           inner join situacao s on t.idSituacao = s.idSituacao
                           WHERE t.idFreelancer = :freelancer 
                           AND t.idSituacao in (:situacao)
                           order by t.idFreelancer desc');
    $stmt->bindValue(':freelancer', $id, PDO::PARAM_INT);
    $stmt->bindValue(':situacao', $situacao, PDO::PARAM_INT);
    
    $stmt->execute(); //TDOO: verficar por erros
    $trab = array();
    $trab['trabalhos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($trab);
    
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;