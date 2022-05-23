//creamos primero una funcion con los objetos a llamar
;(function(){
    'use strict'
    let juego = {
        palabra: "ALURA",
        estado: 1,
        adivinado:['A','L',],
        errado: ['B','J','K','C']
    }
    //aquí traemos los elementos a modificar en el img del ahorcado
    let $html= {
        hombre:document.getElementById('hombre'),
        adivinado: document.querySelector('.adivinado'),
        errado:document.querySelector('.errado')
    }
    function dibujar(juego){
        //aqui actualizaremos la imagen del hombre
        let $elem;
        $elem = $html.hombre;
        $elem.src = './media/01.jpg' + juego.estado + '.jpg';

        //creamos aquí las letras adivinadas
        let palabra = juego.palabra;
        let adivinado= juego.adivinado;
        $elem = $html.adivinado
        for (let letra of palabra){
            let $span = document.createElement('span');
            let $txt = document.createTextNode('');
            if (adivinado.indexOf(letra) >= 0){
                $txt.nodeValue = letra;
            }
            $span.setAttribute('class', 'letra adivinada');
            /* $span.appenChild($txt); */
            $elem.appendChild($span);
        }
        //creamos las letras erradas
        let errado = juego.errado;
        $elem = $html.errado;
        for(let letra of errado){
            let $span = document.createElement('span');
            let $txt = document.createTextNode(letra);
            $span.setAttribute('class', 'letra errada');
            /* $span.appenChild($txt); */
            $elem.appendChild($span);            
        }

    }


    function adivinar(juego){
        
    }
    console.log(juego);
    dibujar(juego);
}())