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
        this.sky.setAttribute( 'color', 'black')

        //Crea portal 1
        this.createImage('portal', 'portal-1', '#portal-img', 2.5, 4, { x: 2, y: 2, z: -7 });
        this.portal = document.querySelector('.portal-1')

        // funcion para detectar click en el portal
        this.portal.addEventListener('click' , () => {
            escenaEl.components['escena'].estado(nextState);
        })
    },
    createImage (nameEl, className, idSrc, w, h, pos) {
        nameEl = document.createElement('a-image')

        this.el.appendChild(nameEl)

        nameEl.setAttribute( 'class', className )
        nameEl.setAttribute( 'src', idSrc )
        nameEl.setAttribute( 'width', w )
        nameEl.setAttribute( 'height', h )
        nameEl.setAttribute( 'position', pos )
    },
    remove: function () {
    },
  });



  //-----------------COMPONENTE MESOZOICA------------------------------


  AFRAME.registerComponent('meso', {
    schema: {},
    init: function () {
        const el = this.el,
            escenaEl = this.el.parentNode,
            nextState = 1,
            //animar helecho
            animate = document.createElement('a-animation')

        this.sky = document.createElement('a-sky');

        //animacion mostrar texto
        this.showText = document.createElement('a-animation')
        this.showText.setAttribute('attribute', 'height')
        this.showText.setAttribute('from', 0 )
        this.showText.setAttribute('to', 1 )
        this.showText.setAttribute('begin', 'mostrar')
        

        //animacion ocultar texto
        this.hiddeText = document.createElement('a-animation')
        this.hiddeText.setAttribute('attribute', 'height')
        this.hiddeText.setAttribute('from', 1 )
        this.hiddeText.setAttribute('to', 0 )
        this.hiddeText.setAttribute('begin', 'ocultar')

        el.appendChild(this.sky);
        
        //Atributos sky
        this.sky.setAttribute( 'color', 'skyblue')

        // Crea elemento escenario ply
        this.createPly('escenario', '#escenario-ply', 0, 0, 0);

        //dino prueba BORRAR ----------------------------------
        this.createPly('dino', '#dino-ply', 2, .2, -7);

        //Mapa
            //0 = nada
            //1 = helecho
            //2 = helecho animado
            //3 = arbol
        var mapa = [
            [ 3, 0, 0, 1, 0, 0, 1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,111,0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3 ],
            [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
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
                    animate.setAttribute('to', `${posX} .2 ${posZ}` )
                    animate.setAttribute('direction', 'alternate')
                    animate.setAttribute('repeat', 'indefinide')
                    //helecho animado
                    this.createPly('helecho-anim', '#helecho-ply', posX, .1, posZ)  
                    
                    //info helecho
                    this.createImage('info-helecho', 'info-helecho', '#helecho-img', posX + 1, 2, posZ + .9, 3.7, 0 )
                } else if (mapa[x][z] == 3){
                    //arboles
                    this.createPly('arbol', '#arbol-ply', posX , .2, posZ)
                }
            }
        }

        //seleccionar helecho a animar
        this.helechoAnim = document.querySelector('.helecho-anim') 
        
        // Agregar animacion al helecho
        this.helechoAnim.appendChild(animate)  

        //config informacion helecho
        this.infoHelecho = document.querySelector('.info-helecho')
        this.infoHelecho.setAttribute( 'rotation', {x: 0, y: 45, z: 0})
        this.infoHelecho.appendChild(this.showText)
        this.infoHelecho.appendChild(this.hiddeText)

        //Crear portal 2
        this.createImage('portal', 'portal-2', '#portal-img', -3, 2, -7, 2.5, 4 )
        this.portal = document.querySelector('.portal-2')

        //dispara evento cuando mira el portal
         this.portal.addEventListener('click' , () => {
            escenaEl.components['escena'].estado(nextState);
        })

        //mostrar info helecho
        this.helechoAnim.addEventListener('click', () => {
            //animar info helecho
            this.infoHelecho.emit('mostrar')
        })
        this.infoHelecho.addEventListener('mouseleave' , () => {
            this.infoHelecho.emit('ocultar')
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



  //-----------------COMPONENTE ESCENA------------------------------



AFRAME.registerComponent('escena', {
    schema: {type: 'int', default: 1},
    init: function () {
        const el = this.el

        //Borrar
        // this.data = 2;
        //Borrar

        this.escena1 = document.createElement('a-entity')
        
        el.appendChild(this.escena1)

        this.escena1.setAttribute('inicio', '')

    },
    estado (estadoNum) {
        return this.el.setAttribute('escena', estadoNum)
    },
    update: function () {
        var data = this.data

        if (data == 1){
            //Remover todos los elementos de otros escenarios.
            this.el.removeChild(this.escena2)
            
            //crear componente del escenario actual
            this.escena1 = document.createElement('a-entity')
            
            // agrega componente a la escena
            this.el.appendChild(this.escena1)
            
            this.escena1.setAttribute('inicio', '')
        }
        if (data == 2) {
            this.el.removeChild(this.escena1)

            this.escena2 = document.createElement('a-entity')
            
            this.el.appendChild(this.escena2)
          
            this.escena2.setAttribute('meso', '')
        }
    },
    remove: function () {
    },
});