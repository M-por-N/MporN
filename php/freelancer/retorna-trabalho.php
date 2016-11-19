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
    $stmt = $pdo->prepare('SELECT t.id, t.nome trabalhoNome, t.descricao, p.nome as planoNome, f.nome as freelancerNome, 
                           f.email, t.id_situacao, a.descricao avaliacaoNome, s.nome situacaoNome
                           FROM trabalho t inner join plano p on t.id_plano=p.id 
                           left join freelancer f on t.id_freelancer = f.id 
                           left join avaliacao a on t.id_avaliacao = a.id
                           inner join situacao s on t.id_situacao = s.id
                           WHERE t.id_freelancer = :freelancer 
                           AND t.id_situacao in (:situacao)
                           order by t.id_situacao desc');
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