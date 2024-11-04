type TodoItem = {
    id: number;
    task: string;
};

const listaDiTask: TodoItem[] = [];

function aggiungiTask(task: string): void {
    const nuovoTask: TodoItem = {
        id: Date.now(), 
        task: task,
    };
    listaDiTask.push(nuovoTask);
    mostraTask();
}

function rimuoviTask(id: number): void {
    const index = listaDiTask.findIndex(item => item.id === id);
    if (index !== -1) {
        listaDiTask.splice(index, 1);
        mostraTask();
    }
}

function mostraTask(): void {
    const listaTaskElement = document.getElementById('listaTask') as HTMLUListElement;
    listaTaskElement.innerHTML = '';

    listaDiTask.forEach(item => {
        const listItem = document.createElement('li');

        const taskElement = document.createElement('span');
        taskElement.textContent = item.task;
        taskElement.style.cursor = 'pointer'; 
        taskElement.onclick = () => rimuoviTask(item.id);

        listItem.appendChild(taskElement);
        listaTaskElement.appendChild(listItem);
    });
}

document.getElementById('pulsanteAggiungi')?.addEventListener('click', () => {
    const inputTask = document.getElementById('inputTask') as HTMLInputElement;
    const valoreTask = inputTask.value.trim();
    
    if (valoreTask) {
        aggiungiTask(valoreTask);
        inputTask.value = '';
    } else {
        alert('Inserisci un task valido.');
    }
});
