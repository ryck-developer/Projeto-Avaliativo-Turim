var dict = {
    pessoas: []
}


class Pessoa {
    constructor () {
        this.cont = 1;
        this.filhoIndex = 1;
    }

    filhoButton() {
        var TextButtonFilho = `<button onclick="addFilho('index` + this.cont +`')" type='button'>Adicionar Filho</button>`;
        var td = document.createElement("td");
        td.innerHTML = TextButtonFilho;
        td.classList.add("col-button");
        td.colSpan = 2;
        var tr = document.createElement("tr");
        tr.appendChild(td);
        tr.classList.add("index" + this.cont);
        return tr;
    }

    createPai(nomePai) {
        //cria botão remover a si mesmo
        var htmlTextButton = `<button onclick="removePai('index` + this.cont +`')" type='button'>remover</button>`;
        //cria duas tags td uma para botao e outra para o nome do pai
        var td = document.createElement("td");
        var tdtwo = document.createElement("td");

        //adiciona tag button ao td
        tdtwo.innerHTML = htmlTextButton;    
        //adiciona nome do pai dentro da tag tr
        td.innerHTML = nomePai;

        //cria tag tr
        var tr = document.createElement("tr");

        //adiciona tags as td que contem nome e botão criados para dentro da tag <tr>
        tr.appendChild(td);
        tr.appendChild(tdtwo);

        //adiciona uma classe a tag <tr>
        tr.classList.add("index" + this.cont);
        
        //adiciona a tag tr na tabela
        var table = document.querySelector("#person>tbody");
        table.appendChild(tr);
        table.appendChild(this.filhoButton());
        this.cont += 1;
        return "index" + (this.cont -1);
    }

    createFilho(args) {
        //cria botão remover a si mesmo
        var htmlTextButton = `<button onclick="removeFilho(` + this.filhoIndex +`)" type='button'>Remover filho</button>`;
        
        //recebe o objeto dom da tag que tem a classe igual a args['pai']
        //args['pai'] corresponde a um valor aproximado a index1, index2, index3
        var t = document.querySelector("tr[class='"+ args['pai'] +"']");

        //cria identificação para a tag filho
        var idt = "id='"+ this.filhoIndex +"'"

        //father-identifier corresponde ao id do pai, facilitando o agrupamento de pais e filhos
        var idt_pai = "father-identifier='"+ args['pai'] +"'"
        /*cria a os elementos correspondente ao filho contendo <tr> e <td>, eadicionando true para isname
        facilitando encontrar a tag posteriormente que corresponde a tag tr que contem o nome do filho*/
        var tag = `<tr `+idt+` `+idt_pai+`><td class="col-filho" isname="true">`+ args['filho'] +`</td><td class="col-filho" >`+ htmlTextButton +`</td></tr>`
        
        /*insere as tags do passo anterior abaixo da o objeto t, que contem a tag pai
        insertAdjacentHTML insere as tags no formato pilha, empilhando de cima para baixo os elementos 
        e embaixo da div pai. isto porque foi passado o parametro 'afterend'.*/
        t.insertAdjacentHTML('afterend', tag);
        this.filhoIndex += 1;
        return this;
    }
}
