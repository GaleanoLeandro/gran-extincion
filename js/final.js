AFRAME.registerComponent('final', {
    schema: {},
    init: function () {
        //this.el = elemento que contiene atributo inicio.
        const el = this.el,
            escenaEl = this.el.parentNode;

        //creacion de elementos
        this.sky = document.createElement('a-sky'),
        this.grid = document.createElement('a-grid')


        //Añadir elementos hijos de this.el
        el.appendChild(this.sky);
        el.appendChild(this.grid);

        //Atributos sky
        this.sky.setAttribute('color', '#FFFFFF')

        //Crea luis
        this.createImage('luis', 'luis', '#luis-img', 2.1, 1, -2.3, 2.4, 3.2)
        this.luis = document.querySelector('.luis');

        //Crea texto 1 luis
        this.createImage('texto-final', 'texto-final', '#texto-final', -1, .85, -2.2, 3.9, 0)
        this.textofinal = document.querySelector('.texto-final')
        this.textAnimate(this.textofinal, this.showText, this.showText, 1.1);

        // otras hipotesis --------------------------------------------------Cambiar por modelo 3d
        // this.hipotesis = document.createElement('a-box')
        // this.hipotesis.setAttribute('color', 'blue')
        // this.hipotesis.setAttribute('class', 'clickeable')
        // this.hipotesis.setAttribute('position', { x: -4, y: .5, z: -3 })

        // el.appendChild(this.hipotesis)
        this.createObj('libro', 'libro', -4, 1.2, -3, 0);
        this.libro = document.querySelector('.libro');
        this.libro.setAttribute('rotation', { x: 45, y: 45, z: 0 });

        //hipotesis Texto
        this.createImage('texto-hipotesis', 'texto-hipotesis', '#texto-hipotesis', -.9, 1.6, -.6, 3.8, 0)
        this.infohipotesis = document.querySelector('.texto-hipotesis')
        this.infohipotesis.setAttribute('class', 'clickeable')
        this.infohipotesis.setAttribute('rotation', { x: 0, y: 55, z: 0 })
        this.textAnimate(this.infohipotesis, 'showInfohipotesis', 'hiddenInfohipotesis', 1.7)

        this.libro.addEventListener('click', () => {
            this.infohipotesis.emit('mostrar')
        })
        this.infohipotesis.addEventListener('mouseleave', () => {
            this.infohipotesis.emit('ocultar')
        })

        var textoLuis = () => {
            //funcion mostrar texto
            var textInit = 1000
            textInterval = 7000,
                timeText = textInit + textInterval;

            //Cuadro de textos luis
            this.textBox = document.createElement('a-plane')
            this.textBox.setAttribute('position', { x: -1, y: .8, z: -2.3 })
            this.textBox.setAttribute('color', '#181818')
            this.textBox.setAttribute('width', 3.9)
            this.textBox.setAttribute('height', 0)
            this.textAnimate(this.textBox, this.showBox, this.showBox, 1.1);

            el.appendChild(this.textBox);

            setTimeout(() => {
                this.textBox.emit('mostrar')
                this.textofinal.emit('mostrar')
            }, textInit);
            setTimeout(() => {
                this.textofinal.emit('ocultar')
                this.textBox.emit('ocultar')
            }, timeText);
        }

        setTimeout(() => {
            textoLuis();
        }, 1000);
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
    remove: function () {
    },
});