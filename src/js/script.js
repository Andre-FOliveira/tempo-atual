
let chave = "92559c27a7ada31d5a4a69f4ea980e00"

const data = new Date()

const dia = String(data.getDate()).padStart(2, '0' )
const mes = String(data.getMonth() + 1).padStart(2, '0')
const ano = data.getFullYear()

const hora = String(data.getHours()).padStart(2, '0')
const min = String(data.getMinutes()).padStart(2, '0')
const seg = String(data.getSeconds()).padStart(2, '0')

// const sunriseTime = document.querySelector(".sunrise")
// const sunsetTime = document.querySelector(".sunset")


const dataAtual = `${dia}/${mes}/${ano} - ${hora}:${min}:${seg}`



function colocarNaTela(dados) {
    console.log(dados)
    
    

    document.getElementById("data").innerHTML = dataAtual
    document.querySelector(".cidade").innerHTML = dados.name
    document.querySelector(".flat").src = "https://www.countryflagicons.com/FLAT/64/" + dados.sys.country + ".png"
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".sensacao-termica").innerHTML = Math.floor(dados.main.feels_like) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML =  dados.main.humidity + "%"
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

// function displayWeather(data) {
//     let {
//       dt,
//       name,
//       sys: { sunrise, sunset },
//     } = data;
  
//     currentDate.textContent = formatDate(dt);
//     cityName.textContent = name;
//     sunriseTime.textContent = formatTime(sunrise);
//     sunsetTime.textContent = formatTime(sunset);
//   }
  
//   function formatDate(epochTime) {
//     let date = new Date(epochTime * 1000);
//     let formattedDate = date.toLocaleDateString("pt-BR", {
//       month: "long",
//       day: "numeric",
//       weekday: "long",
//     });
//     return formattedDate;
//   }
  
//   function formatTime(epochTime) {
//     let date = new Date(epochTime * 1000);
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     return `${hours}:${minutes}`;
//   }
  