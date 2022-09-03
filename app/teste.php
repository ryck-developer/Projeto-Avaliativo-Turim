<?php

$data = json_decode(file_get_contents('php://input'));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    echo "Area de teste";

    /*
    {
        "pessoas": [
            {
                "nome": "teste1",
                "filhos": [
                    "aaa",
                    "bbb",
                    "ccc"
                ]
            }
        ]
    }
    */


    //echo $data->pessoas[0]->nome;

    //foreach($data->pessoas as $p){
    //    echo $p->nome . " ok ";
    //}



} else {
    echo "Area Restrita";
}


