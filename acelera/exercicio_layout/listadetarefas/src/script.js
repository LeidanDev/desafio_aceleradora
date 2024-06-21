function createListFunctions(localStorageKey, inputId, listId) {
    function validateIfExistsNovaTarefa() {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        let inputValue = document.getElementById(inputId).value;
        let exists = values.find(x => x.name == inputValue);
        return !!exists;
    }

    function novaTarefa() {
        let input = document.getElementById(inputId);
        input.style.border = '';

        // Validação
        if (!input.value) {
            input.style.border = '1px solid red';
            alert("Digite algo para inserir em sua lista");
        } else if (validateIfExistsNovaTarefa()) {
            alert('Já existe uma tarefa com essa descrição');
        } else {
            let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
            values.push({
                name: input.value
            });
            localStorage.setItem(localStorageKey, JSON.stringify(values));
            showValues();
        }
        input.value = '';
    }

    function showValues() {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        let list = document.getElementById(listId);
        list.innerHTML = '';
        values.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item.name || 'Nome não definido';
            let button = document.createElement('button');
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>`;
            button.addEventListener('click', () => {
                removeItem(item.name);
            });
            li.appendChild(button);
            list.appendChild(li);
        });
    }

    function removeItem(name) {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        let index = values.findIndex(x => x.name == name);
        if (index !== -1) {
            values.splice(index, 1);
            localStorage.setItem(localStorageKey, JSON.stringify(values));
            showValues();
        }
    }

    showValues();

    return {
        novaTarefa,
        showValues
    };
}

const listaDia = createListFunctions('list-item-dia', 'input-nova-tarefa-dia', 'list-item-dia');
const listaNoite = createListFunctions('list-item-noite', 'input-nova-tarefa-noite', 'list-item-noite');
