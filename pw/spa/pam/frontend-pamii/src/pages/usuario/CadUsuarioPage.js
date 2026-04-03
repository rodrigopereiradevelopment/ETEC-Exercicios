import './CadUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Cadastrar Usuário';

class CadUsuarioPage extends HTMLElement {

    connectedCallback() {

        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}

               <ion-content class="ion-padding">
            <form id="form-usuario">
                <ion-list>

                    <ion-item>
                        <ion-input type="number" name="id" label="ID"
                        label-placement="floating" value="1" required>
                        </ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-input
                            type="text" name="nome" label="Nome"
                            label-placement="floating" value="Klebin" required>
                        </ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-input type="text" name="usuario" label="Usuário"
                            label-placement="floating" value="Klebin123" required>
                        </ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-input type="password" name="senha" value="123456" label="Senha"
                            label-placement="floating" required>
                        </ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-input type="text" name="perfil" label="Perfil"
                            label-placement="floating" value="1" required>
                        </ion-input>
                    </ion-item>

                </ion-list>

                <div class="ion-padding">
                    <ion-button expand="block" type="submit">
                        Salvar usuário
                    </ion-button>

                    <ion-button expand="block" color="danger" id="btn-cancelar">
                        Cancelar
                    </ion-button>
                </div>

            </form>
        </ion-content>
        `;

        this.querySelector('#logout-btn').addEventListener('click', logout);

    }
}

customElements.define('cad-usuario-page', CadUsuarioPage);
