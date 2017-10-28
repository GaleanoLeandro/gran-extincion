const escena = document.querySelector('.escena'),
    camara = document.querySelector('.cam-js')


const centrarCamara = () => {
    camara.setAttribute('position', { x: 0, y: 1.6, z: 0} )
}

const cambiarEstado = (prevState, nextState) => {
    estado.removeAttribute(prevState)
    estado.setAttribute(nextState , '')
}