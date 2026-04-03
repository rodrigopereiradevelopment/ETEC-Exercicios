let allTasks = [];
let currentFilter = 'all';

function show(panel) {
    document.getElementById('loginPanel').style.display = panel === 'login' ? 'block' : 'none';
    document.getElementById('appPanel').style.display = panel === 'app' ? 'block' : 'none';
}

function getFilteredTasks() {
    if (currentFilter === 'completed') return allTasks.filter(t => t.completed);
    if (currentFilter === 'pending') return allTasks.filter(t => !t.completed);
    return allTasks;
}

function updateFilterButtons() {
    document.querySelectorAll('.filters button[data-filter]').forEach(btn => {
        const active = btn.getAttribute('data-filter') === currentFilter;
        btn.classList.toggle('filter-active', active);
    });
}

function renderTasks(list) {
    const ul = document.getElementById('taskList');
    ul.innerHTML = '';

    list.forEach(t => {
        const li = document.createElement('li');

        const topRow = document.createElement('div');
        topRow.className = 'task-row';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'checkbox task-check';
        cb.checked = t.completed;
        cb.setAttribute('aria-label', t.completed ? 'Marcar como pendente' : 'Marcar como concluída');
        cb.onclick = async () => {
            await fetch(`/tasks/${t.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ completed: cb.checked })
            });
            await fetchTasks();
        };

        const title = document.createElement('span');
        title.className = 'task-title';
        title.textContent = t.title;
        if (t.completed) title.classList.add('task-done');

        topRow.append(cb, title);

        const edit = document.createElement('button');
        edit.type = 'button';
        edit.textContent = 'Editar';
        edit.onclick = async () => {
            const { value: newTitle, isConfirmed } = await Swal.fire({
                title: 'Editar Tarefa',
                input: 'text',
                inputValue: t.title,
                showCancelButton: true,
                confirmButtonText: 'Salvar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#4f46e5'
            });
            if (!isConfirmed) return;
            const trimmed = (newTitle || '').trim();
            if (!trimmed || trimmed === t.title) return;
            await fetch(`/tasks/${t.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ title: trimmed })
            });
            await fetchTasks();
        };

        const del = document.createElement('button');
        del.type = 'button';
        del.textContent = 'Excluir';
        del.className = 'btn-danger';
        del.onclick = async () => {
            const result = await Swal.fire({
                title: 'Tem certeza?',
                text: 'Você não poderá reverter isso!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#b91c1c',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            });
            if (result.isConfirmed) {
                await fetch(`/tasks/${t.id}`, { method: 'DELETE' });
                await fetchTasks();
            }
        };

        const actions = document.createElement('span');
        actions.className = 'task-cta';
        actions.append(edit, del);

        li.append(topRow, actions);
        ul.appendChild(li);
    });
}

async function fetchTasks() {
    const res = await fetch('/tasks');
    if (res.status === 401) return show('login');
    const data = await res.json();
    data.sort((a, b) => a.title.localeCompare(b.title, 'pt', { sensitivity: 'base' }));
    allTasks = data;
    updateFilterButtons();
    renderTasks(getFilteredTasks());
}

window.filterTasks = (type) => {
    currentFilter = type;
    updateFilterButtons();
    renderTasks(getFilteredTasks());
};

document.addEventListener('DOMContentLoaded', async () => {
    const btnLogin = document.getElementById('btnLogin');
    const btnAdd = document.getElementById('btnAdd');
    const btnLogout = document.getElementById('btnLogout');

    btnLogin.onclick = async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) { show('app'); await fetchTasks(); }
        else Swal.fire('Erro', 'Usuário ou senha incorretos', 'error');
    };

    btnLogout.onclick = async () => {
        await fetch('/logout', { method: 'POST' });
        show('login');
    };

    btnAdd.onclick = async () => {
        const title = document.getElementById('newTask').value.trim();
        if (!title) return;
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ title, completed: false })
        });
        document.getElementById('newTask').value = '';
        await fetchTasks();
    };

    const me = await fetch('/me');
    if (me.ok) { show('app'); await fetchTasks(); }
    else show('login');
});
