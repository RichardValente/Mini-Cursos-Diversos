'use strict'

const key = "81fe08d1c5dfaf51257bfc631148a534";

function colocarDadosNaTela(dados){
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Resultado para a Cidade: " + dados.city.name
    document.querySelector(".temperatura").innerHTML = Math.floor(dados.list[0].main.temp) + "ºC"
    document.querySelector(".condicao").innerHTML = dados.list[0].weather[0].description
    
    /*document.querySelector(".chuva").innerHTML = "CHuva: " + dados.list[0].weather[0].description*/
    DiaEHora();
    document.querySelector(".vento").innerHTML = "Vento: " + dados.list[0].wind.speed + " km/h"
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.list[0].main.humidity + "%"

    document.querySelector(".img-previsao").src = "https://openweathermap.org/img/wn/" + dados.list[0].weather[0].icon + ".png"
}


function DiaEHora() {
    let dw = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado",];
    let ds = new Date();
    let dtw = ds.getDay();
    var textoDia;
    switch (dtw) {
        case 0:
            textoDia = dw[0];
            break;
        case 1:
            textoDia = dw[1];
            break;
        case 2:
            textoDia = dw[2];
            break;
        case 3:
            textoDia = dw[3];
            break;
        case 4:
            textoDia = dw[4];
            break;
        case 5:
            textoDia = dw[5];
            break;
        case 6:
            textoDia = dw[6];
            break;
    }

    let h = ds.getHours();
    let m = ds.getMinutes();

    document.querySelector(".data").innerHTML = textoDia + " - " + h + ":00";

    criarResumoSemana(dados)
}

async function buscarCidade(cidade){
  

   const dados = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then (resposta2 => resposta2.json());
   
   colocarDadosNaTela(dados) 

}


function ClicarBotao(){

    const cidade = document.querySelector(".input-cidade").value;
   
    buscarCidade(cidade)
}

function criarResumoSemana(){
    
}
