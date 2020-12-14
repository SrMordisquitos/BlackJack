
(() => {

  let deck = [];
  const tipos = ["C","D","H","S"];
  const especiales = ["A","J","Q","K"];

  let puntosJugador = 0;
  let puntosMiloBot = 0;

  //Referencias del html

  const btnPedir = document.querySelector('#btnPedir');
  const btnDetener = document.querySelector('#btnDetener');
  const btnNuevoJuego = document.querySelector('#btnNuevoJuego');

  const divCartasJugador = document.querySelector('#jugador-cartas');
  const divCartasMiloBot = document.querySelector('#milo-cartas');
  const puntosHTML = document.querySelectorAll('small');

  //Esta funcion crea un nuevo deck
  const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
       for(let tipo of tipos){
         deck.push(i + tipo);
       }
    }
    for(let tipo of tipos) {
      for(let esp of especiales){
        deck.push(esp + tipo);
      }
    }
    deck = _.shuffle(deck);
    return deck;
  }

  crearDeck();

  // Esta funcion me permite tomar una carta
  const pedirCarta = () => {

  if(deck.length === 0){
    throw "No hay cartas perro no sea noob"
  }

  const carta = deck.pop();
    return carta;
  }
  //Pedir carta
  const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return(isNaN(valor)) ?
    (valor === 'A') ? 11 : 10
    : valor * 1;
  }

  //Turno de la computadora

  const turnoComputadora = (puntosMinimos) => {

    do {

      const carta = pedirCarta();

      puntosMiloBot = puntosMiloBot + valorCarta(carta);
      puntosHTML[1].innerText = puntosMiloBot;


      const imgCarta = document.createElement('img');
      imgCarta.src = `cartas/${carta}.png`
      imgCarta.classList.add('carta');
      divCartasMiloBot.append(imgCarta);

      if(puntosMinimos > 21){
        break;
      }

    }while((puntosMiloBot < puntosMinimos) && (puntosMinimos <= 21));


    setTimeout(() => {

    if(puntosMiloBot === puntosMinimos){
      alert('Nadie gano perro :D');
    } else if (puntosMinimos > 21){
      alert('La computadora gano mejor suerte a la proxima NOOB');
    } else if (puntosMiloBot > 21){
      alert('No me gusta admitirlo pero ganaste :(');
    } else {
      alert('Eres tan malo que te gano un bot XD');
    }
    }, 10);
  }


  //Eventos
  btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;


    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21){
      console.warn('Perdiste perro que manco');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21){
      console.warn('21 que pro perro');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener('click',() => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);

  });

  btnNuevoJuego.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosMiloBot = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasMiloBot.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  })


})();
