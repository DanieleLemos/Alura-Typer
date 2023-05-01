$("#botão-frase").click(fraseAleatoria);
$("#botão-frase-id").click(buscaFrase);

function fraseAleatoria(){
    $("#spinner").toggle();
    $.get("http://localhost:3001/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria (data){
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo)
}

function buscaFrase (){
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
  
    var dados = {id: fraseId}; // é um objeto para ser enviado junto com a requisição 
    
    $.get("http://localhost:3001/frases", dados,trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data){
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}