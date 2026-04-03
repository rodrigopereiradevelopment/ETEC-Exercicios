import './ListProdutoPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Lista Produto';

class ListProdutoPage extends HTMLElement {
    async connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        
        this.innerHTML = `
            ${cabecalho}
            <ion-content>
                <div class="list-produto"></div>
            </ion-content>
        `;

        const logoutBtn = this.querySelector('#logout-btn');
        if (logoutBtn) logoutBtn.addEventListener('click', logout);

        // Busca os produtos e renderiza na tela
        const produtos = await this.fetchProdutos();
        await this.renderProdutos(produtos);
    }

    // Retorna lista de produtos (futuramente virá de uma API real)
    async fetchProdutos() {
    return [
        { "id": 1, "dsc_produto": "Macarronada", "img_query": "pasta dish",    "valor_unit": 15.99, "status": 1 },
        { "id": 2, "dsc_produto": "Lasanha",     "img_query": "lasagna",       "valor_unit": 20.99, "status": 1 },
        { "id": 3, "dsc_produto": "Caneloni",    "img_query": "cannelloni",    "valor_unit": 25.99, "status": 1 }
    ];
}

    // Busca imagem do produto pelo nome na API do Pexels
    async fetchImagemProduto(nome) {
        try {
            const res = await fetch(
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(nome)}&per_page=1`,
                { headers: { Authorization: import.meta.env.VITE_PEXELS_KEY } }
            );
            const data = await res.json();

            // Retorna a URL da primeira foto encontrada
            if (data.photos && data.photos.length > 0) {
                return data.photos[0].src.small;
            }
        } catch (e) {
            // Se falhar, retorna null e o item aparece sem imagem
            return null;
        }
        return null;
    }

    // Renderiza os produtos na lista
    async renderProdutos(produtos) {
        const container = this.querySelector(".list-produto");

        if (!produtos || produtos.length === 0) {
            container.innerHTML = "<p>Nenhum produto encontrado</p>";
            return;
        }

        const formatMoeda = (value) =>
            value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Para cada produto, busca a imagem e monta o HTML
        const itens = await Promise.all(produtos.map(async produto => {
            const imagem = await this.fetchImagemProduto(produto.img_query);

            // Se achou imagem, mostra; senão deixa vazio
            const img = imagem
                ? `<img src="${imagem}" 
                        style="width:50px; height:50px; object-fit:cover; border-radius:8px;" 
                        slot="start">`
                : '';

            return `
                <ion-item>
                    ${img}
                    <ion-label>
                        <h2 style="display:flex; align-items:center; gap:8px;">
                            <ion-icon
                                name="${produto.status === 1 ? 'checkmark-circle' : 'close-circle'}"
                                color="${produto.status === 1 ? 'success' : 'danger'}"
                                style="flex-shrink:0;">
                            </ion-icon>
                            <span>${produto.dsc_produto}</span>
                        </h2>
                        <p>${formatMoeda(produto.valor_unit)}</p>
                    </ion-label>
                    <ion-buttons slot="end">
                        <ion-button fill="clear" class="btn-edit" data-id="${produto.id}">
                            <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                        </ion-button>
                        <ion-button fill="clear" color="danger" class="btn-delete" data-id="${produto.id}">
                            <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
            `;
        }));

        container.innerHTML = `<ion-list>${itens.join('')}</ion-list>`;
    }
}

customElements.define('list-produto-page', ListProdutoPage);

