'use strict';

const display = document.getElementById('display');
const previewsOperand = document.getElementById('previews-operand');
const numeros = document.querySelectorAll('[id*=tecla]'); /* o id* pega o id que contenha a palava tecla*/
const operadores = document.querySelectorAll('[id*=operador]');


let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente ()){
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;
        
        /*usando o eval*/
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
/*
           ----------------------------------------------------------- 
        eval substitiu os if em sequencia, porém tem riscos de segurança
            ----------------------------------------------------------
        if (operador =='+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if(operador =='-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if(operador =='*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if(operador =='/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
*/
    }
}

const atualizarDisplay = (texto) =>{
    if(novoNumero){ /*se for novo numero limpa a tela e coloca o numero*/
        display.textContent = texto.toLocaleString('BR'); 
        novoNumero = false;
    }else{ /*se nao for novo numero ira concatenar*/
        display.textContent += texto.toLocaleString('BR'); /* concatena os numeros*/
    }
}

/*2º - enviar para a tela o texto da tecla clicada*/ 
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

/*1º - capturar o click do teclado*/
numeros.forEach (numero =>
    numero.addEventListener('click',inserirNumero)
);

const selecionarOperador = (evento) =>{
    if(!novoNumero){ 
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

operadores.forEach (operador =>
    operador.addEventListener('click',selecionarOperador)
);

const acionarIgual = () =>{
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click',acionarIgual);

const limparDisplay = () => display.textContent = "";

document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUtimo = () => display.textContent = display.textContent.slice(0,-1);

document.getElementById('backspace').addEventListener('click', removerUtimo);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent *-1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if (!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',')
        }else{
            atualizarDisplay("0,");
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

/* capturando o teclado do computador */

const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'opeadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    :'limparCalculo',
    ','         : 'decimal',
    'Delete'    : 'limparDisplay',
    'f9'        : 'inverter'
} 

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;

    if (teclaPermitida()){
        document.getElementById(mapaTeclado[tecla]).click();
    }
}

document.addEventListener('keydown', mapearTeclado);