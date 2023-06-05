// Código de desafío! :) Kayke Barbosa Loiola 
        let filas = 20
        let columnas = 20
        let lado = 15

        let reproducir = false

        let fotografia = []

        document.addEventListener("keydown", (e) => { //Para ter o controle do teclado
            e.preventDefault() //Para impedir o movimento de rolagem
            switch (e.keyCode) {
                case 39:
                    siguienteEstado()
                    break;
                case 32:
                    intercambiarReproducción()
                    break;
                case 8:
                    limpiar()
                    break;
                default:
                    break;
            }
        })

        setInterval(() => {
            if (reproducir) {
                siguienteEstado()
            }
        }, 1000 / 60);

        function centrar() {
            window.scrollTo(
                (lado * columnas - window.innerWidth) / 2,
                (lado * filas - window.innerHeight) / 2
            )
        }

        function minus() {
            lado--
            if (lado <= 7) {
                lado = 7
                return
            }
            let tablero = document.getElementById("tablero")
            tablero.style.width = lado * columnas + "px"
            tablero.style.height = lado * filas + "px"
        }

        function plus() {
            lado++
            let tablero = document.getElementById("tablero")
            tablero.style.width = lado * columnas + "px"
            tablero.style.height = lado * filas + "px"
        }

        function randomizar() {
            mapa_complejidad = []
            for (let x = 0; x < columnas; x++) {
                for (let y = 0; y < filas; y++) {
                    if (Math.random() < 0.2) {
                        cambiarEstado(x, y)
                    }
                }
            }
        }

        function intercambiarReproducción() {
            mapa_complejidad = []
            reproducir = !reproducir
            if (reproducir) {
                document.body.style.background = "white"
                document.getElementById("btn1").innerHTML = `<i class="fas fa-pause"></i>`
            } else {
                document.body.style.background = "#f0f0ff"
                document.getElementById("btn1").innerHTML = `<i class="fas fa-play"></i>`
            }
        }

        generarTablero()

        function generarTablero() {
            let html = "<table cellpadding=0 cellspacing=0 id='tablero'>"
            for (let y = 0; y < filas; y++) {
                html += "<tr>"
                for (let x = 0; x < columnas; x++) {
                    html += `<td id="celula-${x + "-" + y}" onmouseup="cambiarEstado(${x}, ${y});mapa_complejidad = []">`
                    html += "</td>"
                }
                html += "</tr>"
            }
            html += "</table>"
            let contenedor = document.getElementById("contenedor-tablero")
            contenedor.innerHTML = html
            let tablero = document.getElementById("tablero")
            tablero.style.width = lado * columnas + "px"
            tablero.style.height = lado * filas + "px"
            centrar()
        }

        function cambiarEstado(x, y) {
            let celula = document.getElementById(`celula-${x + "-" + y}`)
            if (celula.style.background != "black") {
                celula.style.background = "black"
            } else {
                celula.style.background = ""
            }
        }

        function limpiar() {
            mapa_complejidad = []
            for (let x = 0; x < columnas; x++) {
                for (let y = 0; y < filas; y++) {
                    let celula = document.getElementById(`celula-${x + "-" + y}`)
                    celula.style.background = ""
                }
            }
            if (reproducir) {
                intercambiarReproducción()
            }
        }

        let mapa_complejidad = []
        let p_mapa_complejidad = []
        let mapa_verificados = []

        function fotografiar() {
            p_mapa_complejidad = JSON.parse(JSON.stringify(mapa_complejidad));
            mapa_complejidad = []
            mapa_verificados = []
            fotografia = []
            if (!p_mapa_complejidad.length) {
                primeraFoto()
            } else {
                demasFotos()
            }
        }


        function demasFotos() {
            for (let x in p_mapa_complejidad) {
                for (let y in p_mapa_complejidad[x]) {
                    try {
                        let celula = document.getElementById(`celula-${x + "-" + y}`)
                        if (!fotografia[x]) {
                            fotografia[x] = []
                            mapa_verificados[x] = []
                        }
                        fotografia[x][y] = celula.style.background == "black"
                        calcularMapaComplejidad(Number(x), Number(y))
                    } catch (e) { }
                }
            }
            p_mapa_complejidad = []
        }

        function primeraFoto() {
            for (let x = 0; x < columnas; x++) {
                fotografia.push([])
                mapa_verificados.push([])
                for (let y = 0; y < filas; y++) {
                    let celula = document.getElementById(`celula-${x + "-" + y}`)
                    fotografia[x][y] = celula.style.background == "black"
                    calcularMapaComplejidad(x, y)
                }
            }
        }

        function calcularMapaComplejidad(x, y) {
            if (fotografia[x][y]) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (!mapa_complejidad[x + i]) {
                            mapa_complejidad[x + i] = []
                        }
                        mapa_complejidad[x + i][y + j] = true
                    }
                }
            }
        }

        function contarVivas(x, y) {
            let vivas = 0
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i == 0 && j == 0) {
                        continue
                    }
                    try {
                        if (fotografia[x + i][y + j]) {
                            vivas++
                        }
                    } catch (e) { }
                    if (vivas > 3) {
                        return vivas
                    }
                }
            }
            return vivas
        }

        function siguienteEstado() {
            fotografiar()
            for (const x in mapa_complejidad) {
                for (const y in mapa_complejidad[x]) {
                    try {
                        if (mapa_verificados[x][y]) {
                            continue
                        }
                        mapa_verificados[x][y] = true

                        let vivas = contarVivas(Number(x), Number(y))
                        let celula = document.getElementById(`celula-${x + "-" + y}`)
                        if (fotografia[x][y]) { //celula está viva
                            if (vivas < 2 || vivas > 3) {
                                celula.style.background = "" // Morrer de superlotação ou solidão
                            }
                        } else { //celula está morta
                            if (vivas == 3)
                                celula.style.background = "black"
                        }
                    } catch (e) { }
                }
            }
        }
