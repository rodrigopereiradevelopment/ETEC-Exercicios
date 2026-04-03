function show(panel) {
    document.getElementById('loginPanel').style.display = panel === 'login' ? 'block' : 'none';
    document.getElementById('appPanel').style.display = panel === 'app' ? 'block' : 'none';
}

let allTasks = [];
let currentFilter = 'all';

function getFilteredTasks() {
    if (currentFilter === 'completed') return allTasks.filter(t => t.completed);
    if (currentFilter === 'pending') return allTasks.filter(t => !t.completed);
    return allTasks;
}

function renderTasks(list) {
    const ul = document.getElementById('taskList');
    ul.innerHTML = '';

    list.forEach(t => {
        const li = document.createElement('li');

        const title = document.createElement('span');
        title.className = 'task-title';
        title.textContent = t.title;
        if (t.completed) title.classList.add('task-done');

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'checkbox';
        cb.checked = t.completed;

        cb.addEventListener('change', async () => {
            await fetch(`/tasks/${t.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ completed: cb.checked })
            });
            await fetchTasks();
        });

        const edit = document.createElement('button');
        edit.textContent = 'Editar';
        edit.style.width = 'auto';
        edit.style.marginTop = '0';
        edit.style.padding = '8px 10px';
        edit.addEventListener('click', async () => {
            const next = prompt('Editar tarefa:', t.title);
            if (next === null) return;
            const trimmed = next.trim();
            if (!trimmed || trimmed === t.title) return;
            await fetch(`/tasks/${t.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ title: trimmed })
            });
            await fetchTasks();
        });

        const del = document.createElement('button');
        del.textContent = 'Excluir';
        del.style.width = 'auto';
        del.style.marginTop = '0';
        del.style.padding = '8px 10px';
        del.addEventListener('click', async () => {
            if (!confirm('Excluir esta tarefa?')) return;
            await fetch(`/tasks/${t.id}`, { method: 'DELETE' });
            await fetchTasks();
        });

        const actions = document.createElement('span');
        actions.className = 'task-cta';
        actions.appendChild(cb);
        actions.appendChild(edit);
        actions.appendChild(del);
        li.appendChild(title);
        li.appendChild(actions);
        ul.appendChild(li);
    });
}

async function fetchTasks() {
    const res = await fetch('/tasks');

    if (res.status === 401) {
        show('login');
        return;
    }

    const data = await res.json();
    data.sort((a, b) => a.title.localeCompare(b.title, 'pt', { sensitivity: 'base' }));
    allTasks = data;
    renderTasks(getFilteredTasks());
}

function setFilter(type) {
    currentFilter = type;
    renderTasks(getFilteredTasks());
}

async function checkAuthAndInit() {
    const me = await fetch('/me');

    if (me.ok) {
        show('app');
        await fetchTasks();
    } else {
        show('login');
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    const btnLogin = document.getElementById('btnLogin');
    const btnAdd = document.getElementById('btnAdd');
    const btnLogout = document.getElementById('btnLogout');

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginMsg = document.getElementById('loginMsg');
    const newTask = document.getElementById('newTask');

    document.getElementById('filterAll').addEventListener('click', () => setFilter('all'));
    document.getElementById('filterPending').addEventListener('click', () => setFilter('pending'));
    document.getElementById('filterDone').addEventListener('click', () => setFilter('completed'));

    btnLogin.addEventListener('click', async () => {
        loginMsg.style.display = 'none';
        loginMsg.textContent = '';

        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                username: (username.value || '').trim(),
                password: (password.value || '').trim()
            })
        });

        if (!res.ok) {
            loginMsg.textContent = 'Credenciais Inválidas';
            loginMsg.style.display = 'block';
            return;
        }

        show('app');
        await fetchTasks();
    });

    btnLogout.addEventListener('click', async () => {
        await fetch('/logout', { method: 'POST' });
        show('login');
    });

    btnAdd.addEventListener('click', async () => {
        const title = (newTask.value || '').trim();

        if (!title) return;

        const res = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false })
        });

        if (res.status === 401) {
            show('login');
            return;
        }

        newTask.value = '';
        await fetchTasks();
    });

    await checkAuthAndInit();
});
