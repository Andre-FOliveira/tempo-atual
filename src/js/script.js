let chave = "92559c27a7ada31d5a4a69f4ea980e00"

const data = new Date()

const dia = String(data.getDate()).padStart(2, '0')
const mes = String(data.getMonth() + 1).padStart(2, '0')
const ano = data.getFullYear()

const hora = String(data.getHours()).padStart(2, '0')
const min = String(data.getMinutes()).padStart(2, '0')
const seg = String(data.getSeconds()).padStart(2, '0')


const dataAtual = `${dia}/${mes}/${ano} - ${hora}:${min}:${seg}`



function colocarNaTela(dados) {
    console.log(dados)

    document.getElementById("data").innerHTML = dataAtual
    document.querySelector(".cidade").innerHTML = dados.name
    document.querySelector(".flat").src = "https://www.countryflagicons.com/FLAT/64/" + dados.sys.country + ".png"
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".sensacao-termica").innerHTML = Math.floor(dados.main.feels_like) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = dados.main.humidity + "%"
    document.querySelector(".acao").src = "./src/animated/" + dados.weather[0].icon + ".svg"
    document.querySelector(".vento").innerHTML = Math.floor(dados.wind.speed * 3.6) + " km/h"
}


async function buscarCidade(cidade) {

    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
            cidade +
            "&appid=" +
            chave +
            "&lang=pt_br" +
            "&units=metric"
        )
        .then(resposta => resposta.json())


    colocarNaTela(dados)

}


function pesquisa() {
    let cidade = document.querySelector(".input-city").value.trim();

    buscarCidade(cidade)
}

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        alert('navegador não suporta geolozalicação');
    }

    function setPosition(position) {
        console.log(position)
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        coordResults(lat, long);
    }

    function showError(error) {
        alert(`erro: Ative sua localização ${error.message}`);
    }
})

function coordResults(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=pt_br&units=metric&APPID=${chave}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`http error: status ${resp.status}`)
            }
            return resp.json();
        })
        .catch(error => {
            alert(error.message)
        })

        .then(resp => {
            colocarNaTela(resp)
        });
}


function mudaTema() {
    document.body.classList.toggle("dark");
}