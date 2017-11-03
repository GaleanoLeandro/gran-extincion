AFRAME.registerComponent('meteorito', {
    schema: {},
    init: function () {
        const el = this.el,
            escenaEl = this.el.parentNode,
            nextState = null

        this.sky = document.createElement('a-sky');

        el.appendChild(this.sky);

        //Atributos sky
        this.sky.setAttribute('color', 'skyblue')

        // Crea elemento escenario ply
        this.createPly('escenario', '#escenario-ply', 0, 0, 0);

        //Mapa
        //0 = nada
        //1 = helecho
        //2 = helecho animado
        //3 = arbol
        var mapa = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        //posicionar elementos repetidos
        for (var x = 0; x < mapa.length; x++) {
            for (var z = 0; z < mapa[x].length; z++) {
                var posZ = (x - mapa.length / 2),
                    posX = (z - mapa[x].length / 2)
                if (mapa[x][z] == 0) {
                    continue
                } else if (mapa[x][z] == 1) {
                    //helechos
                    this.createPly('helecho', '#helecho-ply', posX + Math.random(-2, 2), .2, posZ + Math.random(-2, 2))
                } else if (mapa[x][z] == 2) {
                    continue
                } else if (mapa[x][z] == 3) {
                    //arboles
                    // this.createPly('arbol', '#arbol-ply', posX , .2, posZ)
                }
            }
        }

        //Crear portal 2
        this.createImage('portal', 'portal-2', '#portal-img', 3, 2, -7, 2.5, 4)
        this.portal = document.querySelector('.portal-2')

        //dispara evento cuando mira el portal
        this.portal.addEventListener('click', () => {
            escenaEl.components['escena'].estado(nextState);
        })


        // rio --------------------------------------------------Cambiar por modelo 3d
        this.rio = document.createElement('a-box')
        this.rio.setAttribute('color', 'blue')
        this.rio.setAttribute('position', { x: 0, y: 1, z: -2.3 })

        el.appendChild(this.rio)

        // rio texto----------


        var textH = 1.7;

        this.createImage('texto-rio', 'texto-rio', '#texto-rio', 0, 1.5, -1.5, 3.8, 0)
        this.infoRio = document.querySelector('.texto-rio')
        this.infoRio.setAttribute('rotation', { x: 0, y: 0, z: 0 })
        this.textAnimate(this.infoRio, 'showInforio', 'hiddenInforio', textH)

        this.rio.addEventListener('click', () => {
            this.infoRio.emit('mostrar')
        })
        this.infoRio.addEventListener('mouseleave', () => {
            this.infoRio.emit('ocultar')
        })

        // crater --------------------------------------------------Cambiar por modelo 3d
        this.crater = document.createElement('a-box')
        this.crater.setAttribute('color', 'blue')
        this.crater.setAttribute('position', { x: .5, y: 1, z: 1.8 })
        this.crater.setAttribute('rotation', { x: 1, y: 250, z: 0 })

        el.appendChild(this.crater)

        // crater texto----------
        this.createImage('texto-crater', 'texto-crater', '#texto-crater', 0.4, 1.8, 1.5, 3.8, 0)
        this.infocrater = document.querySelector('.texto-crater')
        this.infocrater.setAttribute('rotation', { x: 0, y: 190, z: 0 })
        this.textAnimate(this.infocrater, 'showInfocrater', 'hiddenInfocrater', textH)

        this.crater.addEventListener('click', () => {
            this.infocrater.emit('mostrar')
        })
        this.infocrater.addEventListener('mouseleave', () => {
            this.infocrater.emit('ocultar')
        })


        // meteorito --------------------------------------------------Cambiar por modelo 3d
        this.meteorito = document.createElement('a-box')
        this.meteorito.setAttribute('color', 'blue')
        this.meteorito.setAttribute('position', { x: 2.2, y: 3, z: .3 })

        el.appendChild(this.meteorito)

        // meteorito texto----------
        this.createImage('texto-meteorito', 'texto-meteorito', '#texto-meteorito', 1.3, 2.3, 0.2, 3.8, 0)
        this.infometeorito = document.querySelector('.texto-meteorito')
        this.infometeorito.setAttribute('rotation', { x: 30, y: -90, z: 0 })
        this.textAnimate(this.infometeorito, 'showInfometeorito', 'hiddenInfometeorito', textH)

        this.meteorito.addEventListener('click', () => {
            this.infometeorito.emit('mostrar')
        })
        this.infometeorito.addEventListener('mouseleave', () => {
            this.infometeorito.emit('ocultar')
        })

        // iridio --------------------------------------------------Cambiar por modelo 3d
        this.iridio = document.createElement('a-box')
        this.iridio.setAttribute('color', 'blue')
        this.iridio.setAttribute('position', { x: -3, y: 1, z: -0.7 })

        el.appendChild(this.iridio)

        // iridio texto----------
        this.createImage('texto-iridio', 'texto-iridio', '#texto-iridio', -2, 1.5, -0.7, 3.8, 0)
        this.infoiridio = document.querySelector('.texto-iridio')
        this.infoiridio.setAttribute('rotation', { x: 0, y: -290, z: 0 })
        this.textAnimate(this.infoiridio, 'showInfoiridio', 'hiddenInfoiridio', textH)

        this.iridio.addEventListener('click', () => {
            this.infoiridio.emit('mostrar')
        })
        this.infoiridio.addEventListener('mouseleave', () => {
            this.infoiridio.emit('ocultar')
        })


        // otros crateres --------------------------------------------------Cambiar por modelo 3d
        this.otroscrateres = document.createElement('a-box')
        this.otroscrateres.setAttribute('color', 'blue')
        this.otroscrateres.setAttribute('position', { x: -2.5, y: 1, z: 2 })

        el.appendChild(this.otroscrateres)

        // otros crateres----------
        this.createImage('texto-otroscrateres', 'texto-otroscrateres', '#texto-otroscrateres', -2, 2.5, 1.7, 3.8, 0)
        this.infootroscrateres = document.querySelector('.texto-otroscrateres')
        this.infootroscrateres.setAttribute('rotation', { x: 0, y: -230, z: 0 })
        this.textAnimate(this.infootroscrateres, 'showInfootroscrateres', 'hiddenInfootroscrateres', textH)

        this.otroscrateres.addEventListener('click', () => {
            this.infootroscrateres.emit('mostrar')
        })
        this.infootroscrateres.addEventListener('mouseleave', () => {
            this.infootroscrateres.emit('ocultar')
        })





    },



    //funcion para importar modelos ply.
    createPly(nameEl, id, x, y, z) {
        var pos = { x: x, y: y, z: z },
            plyEl = document.createElement('a-entity')

        this.el.appendChild(plyEl)

        plyEl.setAttribute('ply-model', { src: id })
        plyEl.setAttribute('class', nameEl)
        plyEl.setAttribute('position', pos)
    },
    createObj(nameEl, id, x, y, z, yRotate) {
        var pos = { x: x, y: y, z: z }

        nameEl = document.createElement('a-obj-model')

        this.el.appendChild(nameEl)

        nameEl.setAttribute('src', `#${id}-obj`)
        nameEl.setAttribute('mtl', `#${id}-mtl`)
        nameEl.setAttribute('position', pos)
        nameEl.setAttribute('rotation', { x: 0, y: yRotate, z: 0 })
    },
    createImage(nameEl, className, idSrc, x, y, z, w, h) {
        var pos = { x: x, y: y, z: z }

        nameEl = document.createElement('a-image')

        this.el.appendChild(nameEl)

        nameEl.setAttribute('class', className)
        nameEl.setAttribute('src', idSrc)
        nameEl.setAttribute('position', pos)
        nameEl.setAttribute('width', w)
        nameEl.setAttribute('height', h)
    },
    textAnimate(parentEl, nameAnimEnter, nameAnimLeave, h) {
        //parentEl = elemento que recibe la animacion
        //nameAnimEnter = nombre de la animacion para show
        //nameAnimLeave = nombre de la animacion para hidde

        //animacion mostrar texto
        nameAnimEnter = document.createElement('a-animation')
        nameAnimEnter.setAttribute('attribute', 'height')
        nameAnimEnter.setAttribute('from', 0)
        nameAnimEnter.setAttribute('to', h)
        nameAnimEnter.setAttribute('begin', 'mostrar')

        //animacion ocultar texto
        nameAnimLeave = document.createElement('a-animation')
        nameAnimLeave.setAttribute('attribute', 'height')
        nameAnimLeave.setAttribute('from', h)
        nameAnimLeave.setAttribute('to', 0)
        nameAnimLeave.setAttribute('begin', 'ocultar')

        parentEl.appendChild(nameAnimEnter)
        parentEl.appendChild(nameAnimLeave)
    },
    remove: function () {
    },
});
