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
        

        //Añadir elementos hijos de this.el
        el.appendChild(this.sky);
        el.appendChild(this.grid);

        //Atributos sky
        this.sky.setAttribute( 'color', '#FFFFFF')

        //Crea portal 1
        this.createImage('portal', 'portal-1', '#portal-img', -4, 2, -7, 2.5, 4)
        this.portal = document.querySelector('.portal-1')
        this.portal.setAttribute('class', 'clickeable')

        //Crea luis
        this.createImage('luis', 'luis', '#luis-img', 2.1, 1, -2.3, 2.4, 3.2)
        this.luis = document.querySelector('.luis')
        
        //Crea texto 1 luis
        this.createImage('texto-1', 'texto-1', '#texto-1', -1, .8, -2.2, 3.9, 0)
        this.texto1 = document.querySelector('.texto-1')
        this.textAnimate(this.texto1, this.showText1, this.showText1);

        //Crea texto 2 luis
        this.createImage('texto-2', 'texto-2', '#texto-2', -1, .8, -2.2, 3.9, 0)
        this.texto2 = document.querySelector('.texto-2')
        this.textAnimate(this.texto2, this.showText2, this.showText2);
        
        //Crea texto 3 luis
        this.createImage('texto-3', 'texto-3', '#texto-3', -1, .8, -2.2, 3.9, 0)
        this.texto3 = document.querySelector('.texto-3')
        this.textAnimate(this.texto3, this.showText3, this.showText3);

        var textoLuis = () => {
            //funcion mostrar texto
            var textInit = 1000
                textInterval = 7000,
                timeText = textInit + textInterval;

            //Cuadro de textos luis
            this.textBox = document.createElement('a-plane')
            this.textBox.setAttribute('position', { x: -1, y: .8, z: -2.3 })
            this.textBox.setAttribute('color', '#818184')
            this.textBox.setAttribute('width', 3.9)
            this.textBox.setAttribute('height', 1.1)
            this.textAnimate(this.textBox, this.showBox, this.showBox);

            el.appendChild(this.textBox);

            setTimeout(() => {
                this.texto1.emit('mostrar')
            }, textInit);
            setTimeout(() => {
                this.texto1.emit('ocultar')
                this.texto2.emit('mostrar')
            }, timeText);
            setTimeout(() => {
                this.texto2.emit('ocultar')
                this.texto3.emit('mostrar')
            }, timeText + textInterval);
            setTimeout(() => {
                this.textBox.emit('ocultar')
                this.texto3.emit('ocultar')
            }, timeText + textInterval * 2);
        }

        var animarBoton = (parentName, nameAnim) =>{
            nameAnim = document.createElement('a-animation')

            nameAnim.setAttribute( 'attribute', 'scale')
            nameAnim.setAttribute( 'from', '1 1 1')
            nameAnim.setAttribute('to', '1.05 1.05 1.05')
            nameAnim.setAttribute('dur', '1000')
            nameAnim.setAttribute('direction', 'alternate')
            nameAnim.setAttribute('repeat', 'indefinide')


            parentName.appendChild(nameAnim)
        }

        this.createImage('btn-comenzar', 'btn-comenzar', '#btn-comenzar', -1, 1, -2.2, 2, .5)
        this.btnComenzar = document.querySelector('.btn-comenzar')
        this.btnComenzar.setAttribute('class', 'clickeable')
        animarBoton(this.btnComenzar, 'btnComenzar');


        this.btnComenzar.addEventListener( 'click', () =>{
            textoLuis();
            this.el.removeChild(this.btnComenzar)
        })

        // funcion para detectar click en el portal
        this.portal.addEventListener('click' , () => {
            escenaEl.components['escena'].estado(nextState)
        })
    },
    textAnimate (parentEl, nameAnimEnter, nameAnimLeave ) {
        //parentEl = elemento que recibe la animacion
        //nameAnimEnter = nombre de la animacion para show
        //nameAnimLeave = nombre de la animacion para hidde

        //animacion mostrar texto
        nameAnimEnter = document.createElement('a-animation')
        nameAnimEnter.setAttribute('attribute', 'height')
        nameAnimEnter.setAttribute('from', 0 )
        nameAnimEnter.setAttribute('to', 1.1 )
        nameAnimEnter.setAttribute('begin', 'mostrar')

        //animacion ocultar texto
        nameAnimLeave = document.createElement('a-animation')
        nameAnimLeave.setAttribute('attribute', 'height')
        nameAnimLeave.setAttribute('from', 1.1 )
        nameAnimLeave.setAttribute('to', 0 )
        nameAnimLeave.setAttribute('begin', 'ocultar')

        parentEl.appendChild(nameAnimEnter)
        parentEl.appendChild(nameAnimLeave)
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