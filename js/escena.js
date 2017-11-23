  //-----------------COMPONENTE ESCENA------------------------------
AFRAME.registerComponent('escena', {
    schema: {type: 'int', default: 1},
    init: function () {
        const el = this.el;

        //Borrar
        // this.data = 5;
        //Borrar

        this.escena1 = document.createElement('a-entity');
        
        el.appendChild(this.escena1);

        this.escena1.setAttribute('inicio', '');

        //Recarga la lista de objetos clickeables cuando cargan todos los modelos .obj en la escena
        el.addEventListener('model-loaded', () => {
            document.querySelector('[raycaster]').components.raycaster.refreshObjects();
        })


        var reiniciar = (seconds) => {
            var camara = document.querySelector('.cam-js'),
                cursor = document.querySelector('[cursor]'),
                trigger = 0,
                resetSeconds = seconds;
            camara.addEventListener('componentchanged', (e) =>{
                if (e.detail.name !== 'rotation') { return; }

                var camRotateX = camara.getAttribute('rotation').x;

                if (camRotateX < -75 && (this.data && this.data !== 1)){
                    if (trigger === 0){
                        cursor.emit('reset');
                        var contDown = setInterval(() => {
                            seconds --;
                            console.log(seconds)
                            if (seconds < 1) {
                                return this.el.setAttribute('escena', 1);
                            }
                            if(seconds < 1 || trigger === 0){
                                clearInterval(contDown);
                                cursor.emit('mouseleave');
                            }
                        }, 1000);
                    }
                    trigger = 1;
                } else {
                    trigger = 0;
                    seconds = resetSeconds;
                }
            })
        }

        reiniciar(10);
        this.camara = document.querySelector('.cam-js');
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
                // this.el.removeChild(this.escena1)

                this.escena4 = document.createElement('a-entity')

                this.el.appendChild(this.escena4)

                this.escena4.setAttribute('cenozoico', '')
            }, 2000);

            setTimeout(() => {
                this.el.emit('showNieblaCenozoico')
            }, 4000);
        } else if (data == 5) {
            this.el.emit('hiddeNieblaCenozoico')

            setTimeout(() => {
                this.el.removeChild(this.escena4)
                // this.el.removeChild(this.escena1)

                this.escena5 = document.createElement('a-entity')

                this.el.appendChild(this.escena5)

                this.escena5.setAttribute('final', '')
            }, 2000);

            setTimeout(() => {
                this.el.emit('hiddeNiebla')
            }, 4000);
        } else {
            data = 1;
        }
    },
    remove: function () {
    },
});