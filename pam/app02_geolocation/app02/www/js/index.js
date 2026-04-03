/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// LENDO OS ELEMENTOS DO HTML NO JS
const btn1 = document.getElementById('getPosition')
const btn2 = document.getElementById('watchPosition')

// Variável para armazenar o ID do observador, permitindo que o monitoramento seja parado se necessário.
var currentWatchID = null;

// ADICIONANDO EVENTOS NOS ELEMENTOS HTML
btn1.addEventListener("click", getPosition)
btn2.addEventListener("click", watchPosition)

// --------------------------------------------------
// FUNÇÃO GET POSITION (EXECUTA UMA VEZ)
// --------------------------------------------------
function getPosition() {
    let options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }

    // Apenas retorna a posição atual uma vez
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess (position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n');
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n'
        );
    }
}

// --------------------------------------------------
// FUNÇÃO WATCH POSITION (LINHA 51)
// --------------------------------------------------
function watchPosition() {
    // Opções de alta precisão e tempo limite
    var options = {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    };

    // Callback de sucesso: executado sempre que uma nova posição é detectada
    var onSuccess = function(position) {
        var coords = position.coords;
        alert(
            'Monitorando Posição!\n\n' +
            'Latitude: ' + coords.latitude + '\n' +
            'Longitude: ' + coords.longitude + '\n' +
            'Altitude: ' + coords.altitude + ' metros\n' +
            'Accuracy: ' + coords.accuracy + ' metros (Precisão Horizontal)\n' +
            'Altitude Accuracy: ' + coords.altitudeAccuracy + ' metros (Precisão Vertical)\n' +
            'Heading: ' + coords.heading + ' graus (Direção)\n' +
            'Speed: ' + coords.speed + ' m/s (Velocidade)'
        );
    };

    // Callback de erro
    var onError = function(error) {
        alert('Erro ao Monitorar:\n' +
              'Código de erro: ' + error.code + '\n' +
              'Mensagem: ' + error.message);
    };

    // Inicia o monitoramento contínuo da posição
    currentWatchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    // Adicional: Exemplo de como você pararia o monitoramento
    /*
    setTimeout(() => {
        navigator.geolocation.clearWatch(currentWatchID);
        alert('Monitoramento de posição parado após 30 segundos.');
    }, 30000);
    */
}