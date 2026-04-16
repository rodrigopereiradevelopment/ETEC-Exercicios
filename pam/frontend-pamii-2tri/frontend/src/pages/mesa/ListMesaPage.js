import './ListMesaPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Mesa';

class ListMesaPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content>
                <div class="list-mesa"></div>
            </ion-content>
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);

        // buscando os produtos
        const mesas = this.fetchMesas() || [];
        
        // renderizando os produtos no HTML
        this.renderMesas(mesas);
    }

    fetchMesas() {
        return [
            {
                "id": 1,
                "dsc_mesa": "Mesa 1",
                "status": 1
            },
            {
                "id": 2,
                "dsc_mesa": "Mesa 2",
                "status": 0
            },
            {
                "id": 3,
                "dsc_mesa": "Mesa 3",
                "status": 1
            }
        ]
    }

    renderMesas(mesas) {
        const container = this.querySelector(".list-mesa");

        // SE PRODUTO VAZIO, MOSTRAR MENSAGEM AO USUÁRIO
        if (mesas.length === 0) {
            container.innerHTML = '<p> Nenhuma mesa encontrada </p>'
            return;
        }

        // FORMATANDO VALORES EM REAIS
        const formatMoeda = (value) => {
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        
        
        const mesaItems = mesas.map(mesa => `
            <ion-item>
                <ion-label>
                    <h2 style="display: flex; align-items: center; gap: 8px;">
                        <ion-icon
                            name="${mesa.status ? 'checkmark-circle' : 'close-circle'}"
                            color="${mesa.status ? 'success' : 'danger'}"
                            style="flex-shrink: 0;"
                        ></ion-icon>
                        <span>${mesa.dsc_mesa}</span>
                    </h2>
                    <p>${formatMoeda(mesa.valor_unit)}</p>
                </ion-label>

                <ion-buttons slot="end">
                    <ion-button fill="clear" class="btn-edit" data-id="${mesa.id}">
                        <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" color="danger" class="btn-delete" data-id="${mesa.id}">
                        <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-item>`).join('');
    
        container.innerHTML = `<ion-list>${mesaItems}</ion-list>`;
    }

}

customElements.define('list-mesa-page', ListMesaPage);