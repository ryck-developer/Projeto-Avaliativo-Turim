person = new Pessoa();

function updateState(){
    document.getElementById('entry-textarea').value = JSON.stringify(dict, undefined, 4);
}

function addPai (nome_do_pai = null) {
    if (nome_do_pai == null){
        texto = document.querySelector("input[name='inputname']").value;
    } else {
        texto = nome_do_pai;
    }
    
    pai = person.createPai(texto);
    dict.pessoas.push({'nome': texto, 'filhos': []});
    updateState();
    return pai;
}

function addFilho(identificador_pai_classe, nome_do_filho = null, pai = null) {

    if (nome_do_filho == null) {
        //recebe o nome do pai contido na variavel tr com class semelhante a: index1, index2, index3
        var fatherName = document.querySelector("tr[class='"+ identificador_pai_classe +"']>td").textContent; // nome do pai

        //recebe o nome do filho pelo prompt
        var nomeDoFilho = prompt("Informe o nome: ");

    } else {
        var fatherName = pai;
        var nomeDoFilho = nome_do_filho;
    }

    /* a variavel identificador_pai_classe corresponde a um valor semelhante a: index2
    que é a variavel index + id de ordem de criação da tag dentro do objeto person.*/
    person.createFilho({'pai': identificador_pai_classe, 'filho': nomeDoFilho});
    
    
    dict['pessoas'].forEach(function callback(i, index) {
        if (i['nome'] == fatherName) {
            dict['pessoas'][index].filhos.push(nomeDoFilho)
        }
    });
    updateState();
    
    
}

function removeFilho(idt) {
    var tag = document.getElementById(idt);
    var elementPai = tag.attributes['father-identifier'].nodeValue;
    var fatherName = document.querySelector("tr[class='"+ elementPai +"']>td").textContent;
    var filho = tag.childNodes[0].textContent;
    tag.remove();
    
    dict['pessoas'].forEach(function callback(i) {
        if (i['nome'] == fatherName) {
            index = i['filhos'].indexOf(filho); //pegando o indice da palavra na lista
            if (index > -1) {
                i['filhos'].splice(index, 1); //removendo o elemento no indice recebido
            }
        }
    });
    updateState();
}

function removePai(indiceOfTag) {
    var fatherName = document.querySelector("tr[class='"+ indiceOfTag +"']>td").textContent;
    var tag = document.querySelectorAll(`tr[class='${indiceOfTag}']`);
    tag.forEach(t => {
        t.remove();
    });

    var query = document.querySelectorAll("tr[father-identifier='"+ indiceOfTag +"']");
    query.forEach(element => {
        element.remove();
    });

    dict['pessoas'].forEach(function callback(i, index) {
        if (i['nome'] == fatherName) {
            dict['pessoas'].splice(index, 1);
        }
    });
    updateState();
    
}

function gravar () {
    const options = {
        headers: {"Content-type": "application/json; charset=UTF-8"}
    };

    axios.post('app/main.php/', JSON.stringify(dict), options )
      .then(function (response) {
        alert("Salvo com sucesso!");
      })
      .catch(function (error) {
        console.log(error);
    });

    dict = {'pessoas': [] }
    
    c = document.querySelectorAll("tr");
    c.forEach(function callback (i) {
        if (String(i.className) != "titulo") {
            i.remove();
        }        
    });

    updateState();

}

function ler (){
    axios.get('app/main.php/')
    .then(function (response) {
        lendo(response.data);
    })
    .catch(function (error) {
        console.log(error);      
    });



    function lendo(data){
        
        for(indice in data.pessoas){
            if (data.pessoas[indice]['filhos'] != 0) {
                identificador_pai_classe = addPai(data.pessoas[indice]['nome']);
                lista_de_filhos = data.pessoas[indice]['filhos'];

                for (let i in lista_de_filhos) {
                    addFilho(
                        identificador_pai_classe, 
                        nome_do_filho = lista_de_filhos[i], 
                        pai = data.pessoas[indice]['nome']
                    );
                }
            }
        }
    }

}