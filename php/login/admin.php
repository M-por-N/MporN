<?php
//implementação para teste do frontend:
//header('Content-type: application/json; charset=utf-8');

// converto o input em json; o "@" remove a mensagem de erro (caso existir)
$input = @json_decode(file_get_contents("php://input"));

//caso não receber o login e senha, retornar um erro
if($input == null or !isset($input->login) or !isset($input->senha)) {
    //envia resposta de erro
    echo json_encode(['resultado' => false, 'mensagem' => 'Requisição invalida']);
    exit;
}

if($input->login != "admin" or $input->senha != "123qwe") {
    //envia resposta de erro
    echo json_encode(['resultado' => false, 'mensagem' => 'Login ou Senha Invalido']); 
    exit;
}

echo json_encode(['resultado' => true, 'jwt' => 'asdasdasdasdsdgh']);
exit;