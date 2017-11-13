//-----------------COMPONENTE MESOZOICA------------------------------
AFRAME.registerComponent('mesozoico', {
    schema: {},
    init: function () {
        const el = this.el,
            escenaEl = this.el.parentNode,
            nextState = 3,
            //animar helecho
            animate = document.createElement('a-animation')

        this.sky = document.createElement('a-sky');

        el.appendChild(this.sky);
        
        //Atributos sky
        this.sky.setAttribute( 'color', 'skyblue')

        // Crea elemento escenario ply
        this.createPly('escenario', '#escenario-ply', 0, 0, 0);

        //triceratop
        this.createObj('triceratop', 'triceratop', 5, .3, -.5, -55)
        this.triceratop = document.querySelector('.triceratop')
        //triceratop texto 1
        var textH = 1.7;
        this.createImage('texto-triceratop', 'texto-triceratop', '#texto-triceratop', 1.5, 1.6, 0, 3.8, 0)
        this.infotriceratop = document.querySelector('.texto-triceratop')
        this.infotriceratop.setAttribute( 'rotation', {x: 0, y: -90, z: 0})
        this.textAnimate(this.infotriceratop, 'showInfoTriceratop', 'hiddeInfoTriceratop', textH)

        this.triceratop.addEventListener('click', () => {
            this.infotriceratop.emit('mostrar')
        })
        this.infotriceratop.addEventListener('mouseleave', () => {
            this.infotriceratop.emit('ocultar')
        })

        //Oviraptor
        this.createObj('oviraptor', 'oviraptor', -2.6, .2, -0.7, -135)
        this.oviraptor = document.querySelector('.oviraptor')

        //Oviraptor texto
        this.createImage('texto-oviraptor', 'texto-oviraptor', '#texto-oviraptor', -1.2, 1.2, -.2, 3.8, 0)
        this.infoOviraptor = document.querySelector('.texto-oviraptor')
        this.infoOviraptor.setAttribute('rotation', { x: 0, y: 80, z: 0 })
        this.textAnimate(this.infoOviraptor, 'showInfoOviraptor', 'hiddeInfoOviraptor', textH)

        //Animacion info oviraptor
        this.oviraptor.addEventListener('click', () => {
            this.infoOviraptor.emit('mostrar')
        })
        this.infoOviraptor.addEventListener('mouseleave', () => {
            this.infoOviraptor.emit('ocultar')
        })

        // Huevos --------------------------------------------------Cambiar por modelo 3d
        this.createObj('huevos', 'huevos', 0, .2, 2.7, 0)
        this.huevos = document.querySelector('.huevos')

        //Huevos Texto
        this.createImage('texto-huevos', 'texto-huevos', '#texto-huevos', 0, 1.2, 1.5, 3.8, 0)
        this.infoHuevos = document.querySelector('.texto-huevos')
        this.infoHuevos.setAttribute('rotation', { x: 0, y: 180, z: 0 })
        this.textAnimate(this.infoHuevos, 'showInfoHuevos', 'hiddenInfoHuevos', textH)

        this.huevos.addEventListener('click', () => {
            this.infoHuevos.emit('mostrar')
        })
        this.infoHuevos.addEventListener('mouseleave', () => {
            this.infoHuevos.emit('ocultar')
        })

        //Mapa
            //0 = nada
            //1 = helecho
            //2 = helecho animado
            //3 = arbol
        var mapa = [
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,111,0, 0, 0, 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]

        //posicionar elementos repetidos
        for (var x = 0; x < mapa.length; x++ ){
            for (var z = 0; z < mapa[x].length; z++ ){
                var posZ = (x - mapa.length / 2),
                    posX = (z - mapa[x].length / 2)
                if (mapa[x][z] == 0) {
                    continue
                } else if (mapa[x][z] == 1){
                    //helechos
                    this.createPly('helecho', '#helecho-ply', posX * 2, .2, posZ * 2)
                } else if (mapa[x][z] == 2){
                    // config animacion
                    animate.setAttribute('attribute', 'position')
                    animate.setAttribute('from', `${posX}, .7, ${posZ}` )
                    animate.setAttribute('to', `${posX} 1 ${posZ}` )
                    animate.setAttribute('direction', 'alternate')
                    animate.setAttribute('repeat', 'indefinide')

                    //Wrapper helecho animado
                    this.helechoWrap = document.createElement('a-box')
                    this.helechoWrap.setAttribute('position', { x: posX, y: 1, z: posZ})
                    this.helechoWrap.setAttribute('class', 'clickeable')
                    this.helechoWrap.setAttribute('opacity', 0)

                    //helecho modelo
                    // this.createPly('helecho-anim', '#helecho-ply', 0, .1, 0) 
                    this.helechoAnim = document.createElement('a-entity')

                    this.helechoWrap.appendChild(this.helechoAnim)

                    this.helechoAnim.setAttribute('ply-model', { src: '#helecho-ply' })
                    this.helechoAnim.setAttribute('position', { x: 0, y: -.5, z: 0 })   
                    // el.appendChild(this.helechoWrap)

                    
                    //info helecho
                    this.createImage('info-helecho', 'info-helecho', '#helecho-img', posX + .7, 1.2, posZ + 3, 3.8, 0 )
                } else if (mapa[x][z] == 3){
                    //arboles
                    this.createPly('arbol', '#arbol-ply', posX * 4, .2, posZ * 4)
                }
            }
        }
        
        // Agregar animacion al helecho
        this.helechoWrap.appendChild(animate)  

        //config informacion helecho
        this.infoHelecho = document.querySelector('.info-helecho')
        this.infoHelecho.setAttribute( 'rotation', {x: 0, y: 15, z: 0})
        this.textAnimate(this.infoHelecho, 'infohelecho-show', 'infohelecho-hidden', 1.7)

        //mostrar info helecho
        this.helechoWrap.addEventListener('click', () => {
            this.infoHelecho.emit('mostrar')
        })
        this.infoHelecho.addEventListener('mouseleave', () => {
            this.infoHelecho.emit('ocultar')
        })

        //Crea luis
        this.createImage('luis', 'luis', '#luis-img', 2.1, 1.3, -2.3, 2.4, 0)
        this.luis = document.querySelector('.luis')
        this.luis.classList.remove('clickeable')
        this.textAnimate(this.luis, this.showLuis, this.hiddeLuis, 3.2);

        //Crea texto 1 luis
        this.createImage('texto-1', 'texto-1', '#texto-2-1', -1, 1, -2.2, 3.9, 0)
        this.texto1 = document.querySelector('.texto-1')
        this.texto1.classList.remove('clickeable')
        this.textAnimate(this.texto1, this.showText1, this.showText1, 1.1);

        //Crea texto 2 luis
        this.createImage('texto-2', 'texto-2', '#texto-2-2', -1, 1, -2.2, 3.9, 0)
        this.texto2 = document.querySelector('.texto-2')
        this.texto2.classList.remove('clickeable')
        this.textAnimate(this.texto2, this.showText2, this.showText2, 1.1);

        //Crea texto 3 luis
        this.createImage('texto-3', 'texto-3', '#texto-2-3', -1, 1, -2.2, 3.9, 0)
        this.texto3 = document.querySelector('.texto-3')
        this.texto3.classList.remove('clickeable')
        this.textAnimate(this.texto3, this.showText3, this.showText3, 1.1);

        //Crear portal 2
        this.createImage('portal', 'portal-1', '#portal-img', -4, 2, -7, 2.5, 0)
        this.portal = document.querySelector('.portal-1')
        this.portal.setAttribute('class', 'clickeable')
        this.textAnimate(this.portal, 'showPortal', 'hiddePortal', 4)

        var textoLuis = () => {
            //funcion mostrar texto
            var textInit = 1000
            textInterval = 3000,
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
                this.texto2.emit('mostrar')
            }, timeText);
            setTimeout(() => {
                this.texto2.emit('ocultar')
                this.texto3.emit('mostrar')
            }, timeText + textInterval);
            setTimeout(() => {
                this.textBox.emit('ocultar')
                this.texto3.emit('ocultar')
                this.luis.emit('ocultar')
                this.portal.emit('mostrar')
                el.appendChild(this.helechoWrap)
            }, timeText + textInterval * 2);
        }

        setTimeout(() => {
            textoLuis();
        }, 3000);

        //dispara evento cuando mira el portal
         this.portal.addEventListener('click' , () => {
            escenaEl.components['escena'].estado(nextState);
        })
    },
    //funcion para importar modelos ply.
    createPly(nameEl, id, x, y, z) {
        var pos = { x: x, y: y, z: z },
            plyEl = document.createElement('a-entity')

        this.el.appendChild(plyEl)

        plyEl.setAttribute( 'ply-model', {src: id})
        plyEl.setAttribute( 'class', nameEl)
        plyEl.setAttribute( 'position', pos)
    },
    createObj(nameEl, id, x, y, z, yRotate) {
        var pos = { x: x, y: y, z: z }

        nameEl = document.createElement('a-obj-model')

        this.el.appendChild(nameEl)

        nameEl.setAttribute( 'src', `#${id}-obj`)
        nameEl.setAttribute( 'mtl', `#${id}-mtl`)
        nameEl.setAttribute('class', `${id} clickeable`)
        nameEl.setAttribute( 'position', pos)
        nameEl.setAttribute( 'rotation', { x: 0, y: yRotate, z: 0})
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
    textAnimate (parentEl, nameAnimEnter, nameAnimLeave, h ) {
        //parentEl = elemento que recibe la animacion
        //nameAnimEnter = nombre de la animacion para show
        //nameAnimLeave = nombre de la animacion para hidde

        //animacion mostrar texto
        nameAnimEnter = document.createElement('a-animation')
        nameAnimEnter.setAttribute('attribute', 'height')
        nameAnimEnter.setAttribute('from', 0 )
        nameAnimEnter.setAttribute('to', h )
        nameAnimEnter.setAttribute('begin', 'mostrar')

        //animacion ocultar texto
        nameAnimLeave = document.createElement('a-animation')
        nameAnimLeave.setAttribute('attribute', 'height')
        nameAnimLeave.setAttribute('from', h )
        nameAnimLeave.setAttribute('to', 0 )
        nameAnimLeave.setAttribute('begin', 'ocultar')

        parentEl.appendChild(nameAnimEnter)
        parentEl.appendChild(nameAnimLeave)
    },
    remove: function () {
    },
});
