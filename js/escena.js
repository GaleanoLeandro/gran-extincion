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
          
            this.escena2.setAttribute('mesozoico', '')
        }
    },
    remove: function () {
    },
});