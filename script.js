let count = 1;

document.getElementById("radio1").checked = true;

setInterval( function(){
    nextImage();
}, 6000)

function nextImage(){
    count++;
    if(count>2){
        count = 1;
    }

    document.getElementById("radio"+count).checked = true;

}

/*Script De Noticias*/



    function scrollr() {
        var left = document.querySelector(".scroll");
        left.scrollBy(350, 0)
    }
    function scrolll() {
        var right = document.querySelector(".scroll");
        right.scrollBy(-350, 0)
    }






    
        // Função para verificar a rolagem horizontal
        function handleHorizontalScroll() {
            // Obtenha a posição da rolagem horizontal
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            // Se a rolagem horizontal for maior que 0, ajuste a posição dos botões
            if (scrollLeft > 0) {
                // Substitua ".manual-navigation" pelo seletor real do seu contêiner de botões
                document.querySelector(".manual-navigation").style.position = "relative";
                document.querySelector(".manual-navigation").style.left = -scrollLeft + "px";
            } else {
                // Caso contrário, restaure a posição original
                document.querySelector(".manual-navigation").style.position = "static";
                document.querySelector(".manual-navigation").style.left = "auto";
            }
        }

     
    

