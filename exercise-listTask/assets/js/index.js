const inputTarefa = document.querySelector('.newTarefa');
const btnTarefa = document.querySelector('.addTarefa');
const listTarefa = document.querySelector('.tarefas');

function criaList(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13) {
        console.log('Enter pressionado');
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaButton(li){
    li.innerHTML += '';
    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML += 'Apagar';
    buttonDelete.setAttribute('class','apagar');
    buttonDelete.setAttribute('title','apagar esta tarefa');

    li.appendChild(buttonDelete);
}

function criaTarefa(textInput){
    const li = criaList();
    li.innerHTML += textInput;
    listTarefa.appendChild(li);
    limpaInput();
    criaButton(li);
    salvarTarefas();

}


btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value) return;
    
    criaTarefa(inputTarefa.value);
})


document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = listTarefa.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas',tarefasJSON);
    console.log(tarefasJSON);
}

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

addTarefasSalvas();