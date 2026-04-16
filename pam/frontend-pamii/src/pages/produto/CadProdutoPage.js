import './CadProdutoPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Cadastrar Produto';

class CadProdutoPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);
    }
}

customElements.define('cad-produto-page', CadProdutoPage);