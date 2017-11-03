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
        this.huevos = document.createElement('a-box')
        this.huevos.setAttribute('color', 'blue')
        this.huevos.setAttribute('position', { x: 0, y: .5, z: 2.3 })

        el.appendChild(this.huevos)

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
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,111,0, 0, 0, 0, 0, 1, 0, 0, 0 ],
            [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
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
                    this.createPly('helecho', '#helecho-ply', posX + Math.random(-2, 2), .2, posZ + Math.random(-2, 2))
                } else if (mapa[x][z] == 2){
                    // config animacion
                    animate.setAttribute('attribute', 'position')
                    animate.setAttribute('from', `${posX}, .1, ${posZ}` )
                    animate.setAttribute('to', `${posX} .4 ${posZ}` )
                    animate.setAttribute('direction', 'alternate')
                    animate.setAttribute('repeat', 'indefinide')
                    //helecho animado
                    this.createPly('helecho-anim', '#helecho-ply', posX, .1, posZ)  
                    
                    //info helecho
                    this.createImage('info-helecho', 'info-helecho', '#helecho-img', posX + 1, 2, posZ + .9, 3.7, 0 )
                } else if (mapa[x][z] == 3){
                    //arboles
                    // this.createPly('arbol', '#arbol-ply', posX , .2, posZ)
                }
            }
        }

        //seleccionar helecho a animar
        this.helechoAnim = document.querySelector('.helecho-anim')
        
        // Agregar animacion al helecho
        this.helechoAnim.appendChild(animate) 
        this.helechoAnim.setAttribute('class', 'clickeable') 

        //config informacion helecho
        this.infoHelecho = document.querySelector('.info-helecho')
        this.infoHelecho.setAttribute( 'rotation', {x: 0, y: 45, z: 0})
        this.textAnimate(this.infoHelecho, 'infohelecho-show', 'infohelecho-hidden', 1)

        //mostrar info helecho
        this.helechoAnim.addEventListener('click', () => {
            this.infoHelecho.emit('mostrar')
        })
        this.infoHelecho.addEventListener('mouseleave', () => {
            this.infoHelecho.emit('ocultar')
        })

        //Crear portal 2
        this.createImage('portal', 'portal-2', '#portal-img', 3, 2, -7, 2.5, 4 )
        this.portal = document.querySelector('.portal-2')

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
    createObj (nameEl, id, x, y, z, yRotate) {
        var pos = { x: x, y: y, z: z }

        nameEl = document.createElement('a-obj-model')

        this.el.appendChild(nameEl)

        nameEl.setAttribute( 'src', `#${id}-obj`)
        nameEl.setAttribute( 'mtl', `#${id}-mtl`)
        nameEl.setAttribute('class', `${id} clickeable`)
        nameEl.setAttribute( 'position', pos)
        nameEl.setAttribute( 'rotation', { x: 0, y: yRotate, z: 0})
    },
    createImage (nameEl, className, idSrc, x, y, z, w, h) {
        var pos = { x: x, y: y, z: z }

        nameEl = document.createElement('a-image')

        this.el.appendChild(nameEl)

        nameEl.setAttribute( 'class', `${className} clickeable` )
        nameEl.setAttribute( 'src', idSrc )
        nameEl.setAttribute( 'position', pos )
        nameEl.setAttribute( 'width', w )
        nameEl.setAttribute( 'height', h )
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
