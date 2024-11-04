var _a;
var listaDiTask = [];
function aggiungiTask(task) {
    var nuovoTask = {
        id: Date.now(),
        task: task,
    };
    listaDiTask.push(nuovoTask);
    mostraTask();
}
function rimuoviTask(id) {
    var index = listaDiTask.findIndex(function (item) { return item.id === id; });
    if (index !== -1) {
        listaDiTask.splice(index, 1);
        mostraTask();
    }
}
function mostraTask() {
    var listaTaskElement = document.getElementById('listaTask');
    listaTaskElement.innerHTML = '';
    listaDiTask.forEach(function (item) {
        var listItem = document.createElement('li');
        var taskElement = document.createElement('span');
        taskElement.textContent = item.task;
        taskElement.style.cursor = 'pointer';
        taskElement.onclick = function () { return rimuoviTask(item.id); };
        listItem.appendChild(taskElement);
        listaTaskElement.appendChild(listItem);
    });
}
(_a = document.getElementById('pulsanteAggiungi')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var inputTask = document.getElementById('inputTask');
    var valoreTask = inputTask.value.trim();
    if (valoreTask) {
        aggiungiTask(valoreTask);
        inputTask.value = '';
    }
    else {
        alert('Inserisci un task valido.');
    }
});
