<?php

class bd {
    
    public function createDatabase ($host, $user, $password, $banco) {
        //testando se o banco de dados já existe.
        $connection = $this->connect(
            $host, 
            $user, 
            $password, 
            Null
        );        
        $sql = 'CREATE DATABASE IF NOT EXISTS ' . $banco;
        $res = $connection->query($sql);

        if (! $res){
            echo 'Erro on connection' . $connection->error;
        }
        $connection->close();
    }    

    //makes the connection to the database
    public function connect ($host, $user, $password, $banco) {        
        $connection = new mysqli($host, $user, $password, $banco);
        if ($connection->connect_error){
            die('Erro: ' . $connection->connect_error);
            exit();
        }
        return $connection;
    }

    public function gravar ($data, $config = Null) {
        
        function getData($value){
            $row = $value->fetch_assoc();
            return $row['id'];
        }

        foreach ($data->pessoas as $pessoa) {        
            $con = $this->connect($config['host'], $config['user'], $config['password'], $config['banco']);
            $con->query("INSERT INTO `pessoas` (`id`,`nome`) VALUES (NULL, '". $pessoa->nome ."' );");
            $id = getData($con->query("CALL getAllPersons();"));
            $con->close();

            foreach ($pessoa->filhos as $f){                
                $c = $this->connect($config['host'], $config['user'], $config['password'], $config['banco']);
                $c->query("INSERT INTO `filhos` (`id`,`id_pessoa`,`nome`) VALUES (NULL, '". $id ."' ,'". $f ."' );");
                $c->close();
            }
        }
    }

    public function ler ($config){
        $allpersons = array(
            "pessoas" => []
        );

        $person = array(
            "nome" => Null,
            "filhos" => [],
        );
        
        //conectando no banco de dados e gerando porta de acesso para consulta.
        $t = $this->connect($config['host'], $config['user'], $config['password'], $config['banco']);
        //recebe todas as pessoas da tabela pessoas e armazena em result;
        $result = $t->query("SELECT * FROM pessoas");
        if ($result->num_rows > 0) {
            //faz um loop em todos os  dados recebidos da query anterior (pessoas)
            //e armazena na variavel row o nome recebido pelo loop
            while($row = $result->fetch_assoc()) {
                $person["nome"] = $row["nome"];
                
                //faz um query recebendo todos os elementos da tabela filhos onde 
                //o id_pessoas corresponde com o id do elemento na tabela pessoas
                $f = $t->query("SELECT * FROM filhos WHERE id_pessoa= " . $row["id"]);
                if ($f->num_rows > 0) {
                    while($row = $f->fetch_assoc()) {                        
                        $person["filhos"][] = $row["nome"];
                    }
                    //armazena em allpersons o array persons.
                    $allpersons["pessoas"][] = $person;
                    //zerando o array person para ser reutilizado no loop seguinte.
                    $person = array(
                        "nome" => Null,
                        "filhos" => [],
                    );
        
                } else {
                    $allpersons["pessoas"][] = $person;
                }
                
            }

        }

        $t->close();
        echo json_encode($allpersons);     
        
    }
}