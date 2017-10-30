AFRAME.registerComponent('inicio', {
    schema: {},
    init: function () {
        //this.el = elemento que contiene atributo inicio.
        const el = this.el,
            escenaEl = this.el.parentNode,
            nextState = 2
        
        //creacion de elementos
        this.sky = document.createElement('a-sky'),
        this.grid = document.createElement('a-grid')
        this.textBox = document.createElement('a-plane')

        //Añadir elementos hijos de this.el
        el.appendChild(this.sky);
        el.appendChild(this.grid);
        el.appendChild(this.textBox);

        //Atributos sky
        this.sky.setAttribute( 'color', 'black')

        //Crea portal 1
        this.createImage('portal', 'portal-1', '#portal-img', -4, 2, -7, 2.5, 4)
        this.portal = document.querySelector('.portal-1')

        //Crea luis
        this.createImage('luis', 'luis', '#luis-img', 2, 1, -2.3, 1.5, 2.3)

        //config cuadro de textos luis
        this.textBox.setAttribute( 'position', {x: -1, y: .8, z: -2.3})
        this.textBox.setAttribute( 'color', '#818184')
        this.textBox.setAttribute( 'width', 3.9)
        this.textBox.setAttribute( 'height', 1.1)
        

        //Crea texto 1 luis
        this.createImage('texto-1', 'texto-1', '#texto-1', -1, .8, -2.3, 3.9, 1.1)

        // funcion para detectar click en el portal
        this.portal.addEventListener('click' , () => {
            escenaEl.components['escena'].estado(nextState)
        })
    },
    createImage (nameEl, className, idSrc, x, y, z, w, h) {
        var pos = { x: x, y: y, z: z }

        nameEl = document.createElement('a-image')

        this.el.appendChild(nameEl)

        nameEl.setAttribute( 'class', className )
        nameEl.setAttribute( 'src', idSrc )
        nameEl.setAttribute( 'position', pos )
        nameEl.setAttribute( 'width', w )
        nameEl.setAttribute( 'height', h )
    },
    remove: function () {
    },
});