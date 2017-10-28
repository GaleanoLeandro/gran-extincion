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
        this.checkpoint.setAttribute('color', 'red')
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
            count++
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
        this.el.setAttribute('escena', estadoNum)
    },
    update: function (data) {
        if (data > 1) {
            this.el.removeChild(this.escena1)

            // this.escena2 = document.createElement('a-entity')
            // this.el.appendChild(this.escena1)
          
            // this.escena2.setAttribute('meso', '')
        }
    },
    remove: function () {
    },
});

