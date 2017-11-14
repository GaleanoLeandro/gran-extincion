AFRAME.registerComponent('meteorito', {
    schema: {},
    init: function () {
        const el = this.el,
            escenaEl = this.el.parentNode,
            nextState = 4

        this.sky = document.createElement('a-sky');

        el.appendChild(this.sky);

        //Atributos sky
        this.sky.setAttribute('color', 'skyblue')

        // Crea elemento escenario ply
        this.createPly('escenario', '#escenario-2', 0, 0, 0);

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

        // rio 
        this.rio = document.createElement('a-entity')
        this.rio.setAttribute('class', 'clickeable')
        this.rio.setAttribute('position', { x: -43.8, y: -.5, z: 43.3 })
        this.rio.setAttribute('rotation', { x: -90, y: 0, z: 0 })
        this.rio.setAttribute('ocean', { amplitudeVariancex: 0.8, density: 30, color: '#22b4f2', depth: 85, width: 80 })

        el.appendChild(this.rio)

        // rio texto----------
        var textH = 1.7;

        this.createImage('texto-rio', 'texto-rio', '#texto-rio', -1.1, 1.5, 0.8, 3.8, 0)
        this.infoRio = document.querySelector('.texto-rio')
        this.infoRio.setAttribute('rotation', { x: 0, y: 135, z: 0 })
        this.textAnimate(this.infoRio, 'showInforio', 'hiddenInforio', textH)

        this.rio.addEventListener('click', () => {
            this.infoRio.emit('mostrar')
        })
        this.infoRio.addEventListener('mouseleave', () => {
            this.infoRio.emit('ocultar')
        })

        // crater --------------------------------------------------Cambiar por modelo 3d
        this.createPly('crater', '#crater-ply', 1.6, 0, 4.8);
        this.crater = document.querySelector('.crater');
        this.crater.setAttribute('class', 'clickeable')

        // crater texto----------
        this.createImage('texto-crater', 'texto-crater', '#texto-crater', 0.4, 1.8, 1.4, 3.8, 0)
        this.infocrater = document.querySelector('.texto-crater')
        this.infocrater.setAttribute('rotation', { x: 0, y: 195, z: 0 })
        this.textAnimate(this.infocrater, 'showInfocrater', 'hiddenInfocrater', textH)

        this.crater.addEventListener('click', () => {
            this.infocrater.emit('mostrar')
        })
        this.infocrater.addEventListener('mouseleave', () => {
            this.infocrater.emit('ocultar')
        })

        //meteorito
        this.createPly('meteorito', '#meteorito-ply', 3, 4.4, 0.2)
        this.meteorito = document.querySelector('.meteorito')
        this.meteorito.setAttribute('class', 'clickeable')

        // meteorito texto----------
        this.createImage('texto-meteorito', 'texto-meteorito', '#texto-meteorito', 1.1, 2.8, 0.2, 3.8, 0)
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
        this.createObj('iridio', 'iridio', 2.1, -100, -2.5, 0);
        this.iridio = document.querySelector('.iridio');

        this.showIridio = document.createElement('a-animation');
        this.showIridio.setAttribute('attribute', 'position');
        this.showIridio.setAttribute('from', '2.1 -4 -2.5');
        this.showIridio.setAttribute('to', '2.1 .4 -2.5');
        this.showIridio.setAttribute('begin', 'showIridio');

        this.iridio.appendChild(this.showIridio)

        // iridio texto----------
        this.createImage('texto-iridio', 'texto-iridio', '#texto-iridio', .9, 1.5, -1.1, 3.8, 0)
        this.infoiridio = document.querySelector('.texto-iridio')
        this.infoiridio.setAttribute('rotation', { x: 0, y: -40, z: 0 })
        this.textAnimate(this.infoiridio, 'showInfoiridio', 'hiddenInfoiridio', textH)

        this.iridio.addEventListener('click', () => {
            this.infoiridio.emit('mostrar')
        })
        this.infoiridio.addEventListener('mouseleave', () => {
            this.infoiridio.emit('ocultar')
        })

        // otros crateres
        this.createPly('crateres', '#crateres-ply', -5.8, .2, -1.3);
        this.createPly('crateres', '#crateres-ply', -7.3, .2, -3.4);
        this.createPly('crateres', '#crateres-ply', -8.9, .2, -1.4);
        this.otroscrateres = [...document.querySelectorAll('.crateres')];
        this.otroscrateres.map( crater => {
            crater.setAttribute('class', 'clickeable');
        })
        

        // otros crateres----------
        this.createImage('texto-otroscrateres', 'texto-otroscrateres', '#texto-otroscrateres', -1.2, 1.5, -.3, 3.8, 0)
        this.infootroscrateres = document.querySelector('.texto-otroscrateres')
        this.infootroscrateres.setAttribute('rotation', { x: 0, y: 70, z: 0 })
        this.textAnimate(this.infootroscrateres, 'showInfootroscrateres', 'hiddenInfootroscrateres', textH)

        this.otroscrateres.map(crater => {
            crater.addEventListener('click', () => {
                this.infootroscrateres.emit('mostrar')
            })
        })
        this.infootroscrateres.addEventListener('mouseleave', () => {
            this.infootroscrateres.emit('ocultar')
        })

        //Crea luis
        this.createImage('luis', 'luis', '#luis-img', 2.1, 1.3, -2.3, 2.4, 0)
        this.luis = document.querySelector('.luis')
        this.luis.classList.remove('clickeable')
        this.textAnimate(this.luis, this.showLuis, this.hiddeLuis, 3.2);

        //Crea texto 1 luis
        this.createImage('texto-1', 'texto-1', '#texto-3-1', -1, 1, -2.2, 3.9, 0)
        this.texto1 = document.querySelector('.texto-1')
        this.texto1.classList.remove('clickeable')
        this.textAnimate(this.texto1, this.showText1, this.showText1, 1.1);

        //Crear portal 3
        this.createImage('portal', 'portal-1', '#portal-img', -4, 2, -7, 2.5, 0)
        this.portal = document.querySelector('.portal-1')
        this.portal.setAttribute('class', 'clickeable')
        this.textAnimate(this.portal, 'showPortal', 'hiddePortal', 4)

        var textoLuis = () => {
            //funcion mostrar texto
            var textInit = 1000
            textInterval = 7000,
                timeText = textInit + textInterval;

            //Cuadro de textos luis
            this.textBox = document.createElement('a-plane')
            this.textBox.setAttribute('position', { x: -1, y: 1, z: -2.3 })
            this.textBox.setAttribute('color', '#181818')
            this.textBox.setAttribute('width', 3.9)
            this.textBox.setAttribute('height', 0)
            this.textAnimate(this.textBox, this.showBox, this.showBox, 1.1);

            el.appendChild(this.textBox);

            setTimeout(() => {
                this.textBox.emit('mostrar')
                this.texto1.emit('mostrar')
                this.luis.emit('mostrar')
            }, textInit);
            setTimeout(() => {
                this.texto1.emit('ocultar')
                this.textBox.emit('ocultar')
                this.luis.emit('ocultar')
                this.portal.emit('mostrar')
                this.iridio.emit('showIridio')
            }, timeText);
        }

        setTimeout(() => {
            textoLuis();
        }, 3000);

        //dispara evento cuando mira el portal
        this.portal.addEventListener('click', () => {
            escenaEl.components['escena'].estado(nextState);
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
        nameEl.setAttribute('class', `${id} clickeable`)
        nameEl.setAttribute('position', pos)
        nameEl.setAttribute('rotation', { x: 0, y: yRotate, z: 0 })
    },
    createImage(nameEl, className, idSrc, x, y, z, w, h) {
        var pos = { x: x, y: y, z: z }

        nameEl = document.createElement('a-image')

        this.el.appendChild(nameEl)

        nameEl.setAttribute('class', `${className} clickeable`)
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
