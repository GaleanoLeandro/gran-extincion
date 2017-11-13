  //-----------------COMPONENTE ESCENA------------------------------
AFRAME.registerComponent('escena', {
    schema: {type: 'int', default: 1},
    init: function () {
        const el = this.el;

        //Borrar
        // this.data = 3;
        //Borrar

        this.escena1 = document.createElement('a-entity');
        
        el.appendChild(this.escena1);

        this.escena1.setAttribute('inicio', '');

        //Recarga la lista de objetos clickeables cuando cargan todos los modelos .obj en la escena
        el.addEventListener('model-loaded', () => {
            document.querySelector('[raycaster]').components.raycaster.refreshObjects();
        })


        var reiniciar = () => {
            var camara = document.querySelector('.cam-js');
            camara.addEventListener('componentchanged', (e) =>{
                if (e.detail.name !== 'rotation') { return; }

                var camRotateX = camara.getAttribute('rotation').x;

                if ( camRotateX < -70 && (this.data && this.data !== 1) ){
                    setTimeout(() => {
                        console.log('reinicio');
                        return this.el.setAttribute('escena', 1);
                    }, 15000);
                }
            })
        }

        reiniciar();
    },
    estado (estadoNum) {
        return this.el.setAttribute('escena', estadoNum)
    },
    update: function () {
        var data = this.data;

        if (data == 1){
            this.el.emit('hiddeNieblaCenozoico')

            setTimeout(() => {
                //Remover todos los elementos de otros escenarios.
                if (document.querySelector('[mesozoico]')) { this.el.removeChild(this.escena2) }
                if (document.querySelector('[meteorito]')) { this.el.removeChild(this.escena3) }
                if (document.querySelector('[cenozoico]')) { this.el.removeChild(this.escena4) }

                //Crear componente del escenario actual
                this.escena1 = document.createElement('a-entity')

                //Agrega componente a la escena
                this.el.appendChild(this.escena1)

                this.escena1.setAttribute('inicio', '')
            }, 2000);

            setTimeout(() => {
                this.el.emit('hiddeNiebla')
            }, 4000);
        } else if (data == 2) {

            this.el.emit('showNiebla')

            setTimeout( () => {
                this.el.removeChild(this.escena1)

                this.escena2 = document.createElement('a-entity')

                this.el.appendChild(this.escena2)

                this.escena2.setAttribute('mesozoico', '')
            }, 2000);

            setTimeout( ()  => {
                this.el.emit('hiddeNiebla')
            }, 4000);

        } else if (data == 3) {
            this.el.emit('showNiebla')

            setTimeout(() => {
                this.el.removeChild(this.escena2)
                // this.el.removeChild(this.escena1)

                this.escena3 = document.createElement('a-entity')

                this.el.appendChild(this.escena3)

                this.escena3.setAttribute('meteorito', '')
            }, 2000);

            setTimeout(() => {
                this.el.emit('hiddeNiebla')
            }, 4000);
        } else if (data == 4) {
            this.el.emit('showNiebla')

            setTimeout(() => {
                this.el.removeChild(this.escena3)

                this.escena4 = document.createElement('a-entity')

                this.el.appendChild(this.escena4)

                this.escena4.setAttribute('cenozoico', '')
            }, 2000);

            setTimeout(() => {
                this.el.emit('showNieblaCenozoico')
            }, 4000);
        } else {
            data = 1;
        }
    },
    remove: function () {
    },
});