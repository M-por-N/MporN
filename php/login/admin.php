<?php

// header('Content-type: application/json; charset=utf-8'); ERRO
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
$id = $token->data->id;


// converto o input em json; o "@" remove a mensagem de erro (caso existir)
$input = @json_decode(file_get_contents("php://input"));



if($input == null or !isset($input->login) or !isset($input->senha)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}

$id = null;
try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $stmt = $pdo->prepare("SELECT a.idAdmin id, u.idStatus, s.nomeStatus
                            FROM usuario u inner join admin a on u.idUsuario = a.idUsuario
                            inner join status s on u.idStatus = s.idStatus
                            WHERE u.email = :login AND u.senha = :senha");
    $stmt->bindParam(':login', $input->login, PDO::PARAM_STR);
    $stmt->bindParam(':senha', hash('sha256', $input->senha, false), PDO::PARAM_STR);
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $idStatus = $resultado[0]['idStatus'];
    
    if($idStatus == 3 or $idStatus == 4){
        
        echo json_encode(['resultado' => false, 'mensagem' => $resultado[0]['nomeStatus']]);
        exit;
    }
    
    $id = $resultado[0]['id'];
    //TODO: verficar se o id é null
} catch(PDOException $e){
    //TODO: receber mensagem de erro do PDO
    echo json_encode(['resultado' => false, 'mensagem' => "Erro ao conectar com o Banco de Dados"]);
    exit;
}

if($resultado) {
    $horaAtual = time();
    $token = [
        'iat'  => $horaAtual,                            // Issued at: time when the token was generated
        'jti'  => base64_encode(mcrypt_create_iv(32)),   // Json Token Id: an unique identifier for the token
        'iss'  => $nomeServidor,                         // Issuer
        'nbf'  => $horaAtual,                            // Not before
        'exp'  => $horaAtual + (60*60),                  // Expire
        'data' => null                                   // Data to be signed
    ];
    $usuario = (object) ['id' => $id, 'tipo' => 'admin'];
    $token['data'] = $usuario; //adiciona o login aos dados que seram assinados pelo jwt
    $jwt = JWT::encode($token, $config->jwtKey, 'HS256'); //assina os dados do usuario
    echo json_encode(['resultado' => true, 'jwt' => $jwt]); //envia a resposta json
    
} else { //não encontrou o usuario
    echo json_encode(['resultado' => false, 'mensagem' => 'Login ou Senha Invalido']);
}
