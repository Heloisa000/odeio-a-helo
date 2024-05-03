let url = "dados.xml";

$(document).ready(function() {
    // Carregar e exibir todos os itens de roupa
    $.ajax({
        url: url,
        dataType: "xml",
        success: function(xml){
            $(xml).find("moda").each(function(){
                var priceInReais = parseFloat($(this).find("preço").text()) * 0.01;
                var discount = parseFloat($(this).find("frete").text().split(" ")[0]); 
                
                var discountedPrice = priceInReais - (priceInReais * discount / 100);

                $("#cards").append('<div class="card"><a href="individual.html?id='+ $(this).find("id").text() +'"><p class="procurado">Roupa Feminina</p> <img class="foto" src="'+ $(this).find("id").text() +'.jpg"><p class="vivo">Promoção</p> <p class="nome">'+ $(this).find("nome").text() +'</p> <p class="rec"> <span class="currency-symbol">R$</span> <span class="price">'+ discountedPrice.toFixed(2) +'</span> <br> <span class="cor">Desconto: '+ $(this).find("frete").text() +'</span></p></a></div>');
            });
        },
        error: function(xhr, status, error) {
            alert("Ocorreu um erro ao carregar o arquivo XML para exibir todos os itens de roupa.");
            console.log(xhr.responseText);
        }
    });

    // Obter o ID da string de consulta da URL
    var id = parseInt(new URLSearchParams(window.location.search).get("id"));

    // Carregar e exibir detalhes individuais do item de roupa
    if (!isNaN(id)) {
        $.ajax({
            url: url,
            dataType: "xml",
            success: function(xml){
                $(xml).find("moda").each(function(){
                    var pos = parseInt($(this).find("id").text());
                    if(id === pos){
                        var priceInReais = parseFloat($(this).find("preço").text()) * 0.01;

                        $("#individual").append('<div class="card"><p class="procurado">Roupa Feminina</p> <img class="foto" src="'+ $(this).find("id").text() +'.jpg"><p class="vivo">Preço e cor</p> <p class="nome">'+ $(this).find("nome").text() +'</p> <p class="rec"> <span class="currency-symbol">R$</span> <span class="price">'+ priceInReais.toFixed(2) +'</span> <br> <span class="cor">Desconto: '+ $(this).find("frete").text() +'</span></p></div>');
                    }
                });
            },
            error: function(xhr, status, error) {
                alert("Ocorreu um erro ao carregar o arquivo XML para exibir os detalhes individuais do item de roupa.");
                console.log(xhr.responseText);
            }
        });
    } else {
        alert("ID inválido na URL.");
    }
});
