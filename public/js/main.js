var tempoInicial = $("#tempo-digitação").text();
var campo = $(".campo-digitação");

// para fazer as funções rodarem
$(document).ready(function(){
    atualizaTamanhoFrase();
    incicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botão-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sportField: "text"
    });

   $(".tooltip").tooltipster({
        trigger: "custon"
   }); 
});

function atualizaTempoInicial (tempo){
    tempoInicial = tempo;
    $("#tempo-digitação").text(tempo);
}

// função para tamanho da frase
function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ") .length;
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras); // . text pega o conteudo dentro de uma TAG e modifica
}

// função para quando houver digitação no campo. 
function incicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val(); // .val pega o conteudo que está dentro do campo input e altera
       
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
    
}

// função para ativar marcadores 
function inicializaMarcadores(){
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length)   
       
        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

// função para quando o jogo iniciar e os segundos irem diminuindo
function inicializaCronometro(){
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitação").text();
        var cronometroID =setInterval(function(){
            tempoRestante--;
            $("#tempo-digitação").text(tempoRestante);
            
            if(tempoRestante < 1){
                campo.attr("disabled",true); // pega o valor e altera ele
                clearInterval(cronometroID);
                finalizaJogo();
            }
        },1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled",true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

// função para botão reiniciar jogo
function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");

    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitação").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
