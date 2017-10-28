AFRAME.registerComponent('inicio', {
    schema: {},
    init: function () {
        const el = this.el

        this.checkpoint = document.createElement('a-plane');
        this.box = document.createElement('a-box');
        
        el.appendChild(this.box);
        el.appendChild(this.checkpoint);

        this.box.setAttribute( 'position', { x: 1, y: 1.2, z: -7})
        this.box.setAttribute( 'color', 'green')

        this.checkpoint.setAttribute('checkpoint', { offset: {x:0, y:1.6, z:0} })
        this.checkpoint.setAttribute('color', 'green')
        this.checkpoint.setAttribute('position', { x: 0, y: .1, z: -5})
        this.checkpoint.setAttribute('rotation', { x: -90, y: 0, z: 0})

        this.portalEnter();
    },
    portalEnter () {
        var escenaEl = this.el.parentNode,
            count = 2

        this.box.addEventListener('click' , () => {
            escenaEl.components['escena'].estado(count);
            // console.log(escenaEl)
            // console.log(escenaEl.components['escena'])
        })

    },
    remove: function () {
        const el = this.el

        el.removeChild(this.box)
        el.removeChild(this.checkpoint)
    },
  });



  //-----------------------------------------------


  AFRAME.registerComponent('meso', {
    schema: {},
    init: function () {
        const el = this.el

        this.checkpoint = document.createElement('a-plane');
        this.checkpoint2 = document.createElement('a-plane');
        this.box = document.createElement('a-box');
        
        el.appendChild(this.box);
        el.appendChild(this.checkpoint);
        el.appendChild(this.checkpoint2);

        this.box.setAttribute( 'position', { x: -1, y: 1.2, z: -7})
        this.box.setAttribute( 'color', 'blue')

        this.checkpoint.setAttribute('checkpoint', { offset: {x:0, y:1.6, z:0} })
        this.checkpoint.setAttribute('color', 'blue')
        this.checkpoint.setAttribute('position', { x: 0, y: .1, z: -5})
        this.checkpoint.setAttribute('rotation', { x: -90, y: 0, z: 0})

        this.checkpoint2.setAttribute('checkpoint', { offset: {x:0, y:1.6, z:0} })
        this.checkpoint2.setAttribute('color', 'blue')
        this.checkpoint2.setAttribute('position', { x: 0, y: .1, z: 0})
        this.checkpoint2.setAttribute('rotation', { x: -90, y: 0, z: 0})

        //dispara evento cuando mira el portal
        this.portalEnter();

        this.createModel('escenario', '#escenario-ply');
    },
    //funcion para importar modelos ply.
    createModel(nameEl, id) {
        // asocia parametro nameEl a variable local del componente
        this.nameEl = nameEl

        nameEl = document.createElement('a-entity')

        this.el.appendChild(nameEl)

        nameEl.setAttribute( 'ply-model', {src: id})
        nameEl.setAttribute( 'position', { x: 0, y: -.4, z: 0})
    },
    portalEnter () {
        var escenaEl = this.el.parentNode,
            count = 1

        this.box.addEventListener('click' , () => {
            escenaEl.components['escena'].estado(count);
        })

    },
    remove: function () {
        const el = this.el

        el.removeChild(this.box)
        el.removeChild(this.checkpoint)
    },
  });



  //-----------------------------------------------



AFRAME.registerComponent('escena', {
    schema: {type: 'int', default: 1},
    init: function () {
        const el = this.el

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
            this.el.removeChild(this.escena2)
            
            this.escena1 = document.createElement('a-entity')
            
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

