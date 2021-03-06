AFRAME.registerComponent('cenozoico', {
    schema: {},
    init: function () {
        const el = this.el,
            escenaEl = this.el.parentNode,
            nextState = 1

        this.sky = document.createElement('a-sky');

        el.appendChild(this.sky);

        //Atributos sky
        this.sky.setAttribute('color', '#5F0909')
        
        // Crea elemento escenario ply
        this.createPly('escenario', '#escenario-3', 0, -1, 0);

        //Altura Tarjetas
        var textH = 1.7;

        //T-rex
        this.createObj('t-rex' , 't-rex', 4, .4, -7, 180)
        this.tRex = document.querySelector('.t-rex')

        //T-rex texto 
        this.createImage('texto-t-rex', 'texto-t-rex', '#texto-t-rex', .8, 2, -1.2, 3.8, 0 )
        this.infoRex = document.querySelector('.texto-t-rex')
        this.infoRex.setAttribute('rotation', { x: 0, y: -30, z: 0 })
        this.textAnimate(this.infoRex, 'showInfoRex', 'hiddeInfoRex', textH)

        this.tRex.addEventListener('click', () => {
            this.infoRex.emit('mostrar')
        })
        this.infoRex.addEventListener('mouseleave', () => {
            this.infoRex.emit('ocultar')
        })

        // Hadrosaurus
        this.createObj('hadrosaurus', 'hadrosaurus', 5, .5, 0, 45)
        this.hadrosaurus = document.querySelector('.hadrosaurus')

        //hadrosaurus Texto
        this.createImage('texto-hadrosaurus', 'texto-hadrosaurus', '#texto-hadrosaurus', 1.5, 1.6, 0, 3.8, 0)
        this.infohadrosaurus = document.querySelector('.texto-hadrosaurus')
        this.infohadrosaurus.setAttribute('rotation', { x: 0, y: -90, z: 0 })
        this.textAnimate(this.infohadrosaurus, 'showInfoHadrosaurus', 'hiddenInfoHadrosaurus', textH)

        this.hadrosaurus.addEventListener('click', () => {
            this.infohadrosaurus.emit('mostrar')
        })
        this.infohadrosaurus.addEventListener('mouseleave', () => {
            this.infohadrosaurus.emit('ocultar')
        })

        // Beelzebufo --------------------------------------------------Cambiar por modelo 3d
        this.createObj('beelzebufo', 'beelzebufo', -5, .4, 0, -25)
        this.beelzebufo = document.querySelector('.beelzebufo')

        //beelzebufo Texto
        this.createImage('texto-beelzebufo', 'texto-beelzebufo', '#texto-beelzebufo', -1.5, 1.6, 0, 3.8, 0)
        this.infobeelzebufo = document.querySelector('.texto-beelzebufo')
        this.infobeelzebufo.setAttribute('rotation', { x: 0, y: 90, z: 0 })
        this.textAnimate(this.infobeelzebufo, 'showInfobeelzebufo', 'hiddenInfobeelzebufo', textH)

        this.beelzebufo.addEventListener('click', () => {
            this.infobeelzebufo.emit('mostrar')
        })
        this.infobeelzebufo.addEventListener('mouseleave', () => {
            this.infobeelzebufo.emit('ocultar')
        })

        // Sarcosuchus
        this.createObj('sarcosuchus', 'sarcosuchus', 0, .4, 4, 0)
        this.sarcosuchus = document.querySelector('.sarcosuchus')

        //Sarcosuchus Texto
        this.createImage('texto-sarcosuchus', 'texto-sarcosuchus', '#texto-sarcosuchus', 0, 1.6, 1.5, 3.8, 0)
        this.infosarcosuchus = document.querySelector('.texto-sarcosuchus')
        this.infosarcosuchus.setAttribute('rotation', { x: 0, y: 180, z: 0 })
        this.textAnimate(this.infosarcosuchus, 'showInfosarcosuchus', 'hiddenInfosarcosuchus', textH)

        this.sarcosuchus.addEventListener('click', () => {
            this.infosarcosuchus.emit('mostrar')
        })
        this.infosarcosuchus.addEventListener('mouseleave', () => {
            this.infosarcosuchus.emit('ocultar')
        })

        // otras hipotesis --------------------------------------------------Cambiar por modelo 3d
        this.hipotesis = document.createElement('a-box')
        this.hipotesis.setAttribute('color', '#FFFFFF')
        this.hipotesis.setAttribute('class', 'clickeable')
        this.hipotesis.setAttribute('position', { x: -4, y: .5, z: 4.3 })

        el.appendChild(this.hipotesis)

        //hipotesis Texto
        this.createImage('texto-hipotesis', 'texto-hipotesis', '#texto-hipotesis', -1.2, 1.6, 1.2, 3.8, 0)
        this.infohipotesis = document.querySelector('.texto-hipotesis')
        this.infohipotesis.setAttribute('rotation', { x: 0, y: 140, z: 0 })
        this.textAnimate(this.infohipotesis, 'showInfohipotesis', 'hiddenInfohipotesis', textH)

        this.hipotesis.addEventListener('click', () => {
            this.infohipotesis.emit('mostrar')
        })
        this.infohipotesis.addEventListener('mouseleave', () => {
            this.infohipotesis.emit('ocultar')
        })

        //Mapa
        //0 = nada
        //1 = helecho
        //2 = helecho animado
        //3 = arbol
        var mapa = [
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                } else if (mapa[x][z] == 3) {
                    //arboles
                    this.createPly('arbol', '#arbol-ply', posX, .2, posZ)
                }
            }
        }

        //Crea luis
        this.createImage('luis', 'luis', '#luis-img', 2.1, 1.3, -2.3, 2.4, 0)
        this.luis = document.querySelector('.luis')
        this.luis.classList.remove('clickeable')
        this.textAnimate(this.luis, this.showLuis, this.hiddeLuis, 3.2);

        //Crea texto 1 luis
        this.createImage('texto-1', 'texto-1', '#texto-4-1', -1, 1, -2.2, 3.9, 0)
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
