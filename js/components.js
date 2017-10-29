AFRAME.registerComponent('inicio', {
    schema: {},
    init: function () {
        //this.el = elemento que contiene atributo inicio.
        const el = this.el,
            escenaEl = this.el.parentNode,
            nextState = 2
        
        //creacion de elementos
        this.checkpoint = document.createElement('a-plane'),
        this.sky = document.createElement('a-sky'),
        this.grid = document.createElement('a-grid')
        
        //Añadir elementos hijos de this.el
        el.appendChild(this.checkpoint);
        el.appendChild(this.sky);
        el.appendChild(this.grid);

        //Atributos sky
        this.sky.setAttribute( 'color', 'black')

        //Atributos checkpoint
        this.checkpoint.setAttribute('checkpoint', { offset: {x:0, y:1.6, z:0} })
        this.checkpoint.setAttribute('color', 'green')
        this.checkpoint.setAttribute('position', { x: 0, y: .1, z: -5})
        this.checkpoint.setAttribute('rotation', { x: -90, y: 0, z: 0})

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
            nextState = 1

        this.sky = document.createElement('a-sky');
        
        el.appendChild(this.sky);
        
        //Atributos sky
        this.sky.setAttribute( 'color', 'skyblue')

        // Crea elemento escenario ply
        this.createPly('escenario', '#escenario-ply', 0, 0, 0);

        //dino prueba BORRAR ----------------------------------
        this.createPly('dino', '#dino-ply', 2, .2, -7);

        //helechos
        // this.createPly('helecho', '#helecho-ply', -1, .2, -4)

        var mapa = [
            [ 2, 0, 0, 1, 1, 1, 1, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2 ],
            [ 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
            [ 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
            [ 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0 ]
        ]

        //posicionar elementos repetidos
            //0 = nada
            //1 = helecho
            //2 = arbol
        for (var x = 0; x < mapa.length; x++ ){
            for (var z = 0; z < mapa[x].length; z++ ){
                var posX = (x - mapa.length / 2),
                    posZ = (z - mapa[x].length / 2)
                if (mapa[x][z] == 0) {
                    continue
                } else if (mapa[x][z] == 1){
                    //helechos
                    this.createPly('helecho', '#helecho-ply', posX + Math.random(-2, 2), .2, posZ + Math.random(-2, 2))
                } else if (mapa[x][z] == 2){
                    //arboles
                    this.createPly('arbol', '#arbol-ply', posX , .2, posZ)
                }
            }
        }

        //crear portal
        this.createImage('portal', 'portal-2', '#portal-img', 2.5, 4, { x: -3, y: 2, z: -7 } )
        this.portal = document.querySelector('.portal-2')

        //dispara evento cuando mira el portal
         this.portal.addEventListener('click' , () => {
            escenaEl.components['escena'].estado(nextState);
        })

    },
    //funcion para importar modelos ply.
    createPly(nameEl, id, x, y, z) {
        var pos = { x: x, y: y, z: z }

        nameEl = document.createElement('a-entity')

        this.el.appendChild(nameEl)

        nameEl.setAttribute( 'ply-model', {src: id})

        //Posicion fija por el momento, cambiarla para pasar por parametro a la funcion
        nameEl.setAttribute( 'position', pos)
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



  //-----------------COMPONENTE ESCENA------------------------------



AFRAME.registerComponent('escena', {
    schema: {type: 'int', default: 1},
    init: function () {
        const el = this.el

        //Borrar
        this.data = 2;
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