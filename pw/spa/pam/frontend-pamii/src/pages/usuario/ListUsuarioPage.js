import './ListUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Lista de Usuários';

class ListUsuarioPage extends HTMLElement {

    connectedCallback() {

        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}

        <ion-content>

            <div class="list-usuario">

            </div>

        </ion-content>

        `;

        this.querySelector('#logout-btn').addEventListener('click', logout);

        const usuarios = this.fetchUsuarios() || [];

        this.renderUsuarios(usuarios);

    }

    fetchUsuarios() {
        return [
                {
                    "id": 1,
                    "nome": "Klebin",
                    "usuario": "Usuário: Klebin123",
                },
                {
                    "id": 2,
                    "nome": "Philipe",
                    "usuario": "Usuário: Philipe123",
                },
                {
                    "id": 3,
                    "nome": "Felipe",
                    "usuario": "Usuário: Felipe123",
                }
            ]

    }

    renderUsuarios(usuarios) {

        const container = this.querySelector(".list-usuario");

        if (usuarios.length == 0) {
            container.innerHTML = '<p> Nenhum usuário encontrado </p>'
            return;
        }

        const listaUsuarios = usuarios.map(usuario => `
            <ion-item>
                <ion-label>

                <h2 style="display: flex; align-items: center; gap: 8px;">
                        <span>${usuario.nome}</span>
                    </h2>

                    <p><span>${usuario.usuario}</span></p>

                </ion-label>

                <ion-buttons slot="end">
                    <ion-button fill="clear" class="btn-edit" data-id="${usuario.id}">
                        <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" color="danger" class="btn-delete" data-id="${usuario.id}">
                        <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-item>`).join('');

        container.innerHTML = `<ion-list>${listaUsuarios}</ion-list>`;
    }

}

customElements.define('list-usuario-page', ListUsuarioPage);
