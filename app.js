class Node {
    constructor(value) {
        this.left = null
        this.right = null
        this.value = value
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
        this.encontrado = false
        this.recorrido = []
        this.tiempo = 1000
    }

    insert(value) {

        let newNode = new Node(value)
        arbol.innerHTML = ''

        if (this.root === null) {
            this.root = newNode
            this.buscarNode(this.root)
        } else {
            let currentNode = this.root

            while (true) {
                if (value < currentNode.value) {
                    if (!currentNode.left) {
                        currentNode.left = newNode
                        this.buscarNode(this.root)
                        return this
                    }
                    currentNode = currentNode.left
                } else {
                    if (!currentNode.right) {
                        currentNode.right = newNode
                        this.buscarNode(this.root)
                        return this
                    }
                    currentNode = currentNode.right
                }
            }
        }
    }

    search(value) {
        let currentNode = this.root
        while (true) {
            if (value < currentNode.value) {

                if (currentNode.left.value == value) {
                    return currentNode.left
                }
                currentNode = currentNode.left
            } else {
                if (currentNode.right.value == value) {
                    return currentNode.right
                }
                currentNode = currentNode.right
            }
        }
    }

    buscarNode(node) {
        let nodeTemporal = node
        let nodoIzquierda;
        let nodoDerecha;

        if (nodeTemporal.left != null) {
            nodoIzquierda = this.buscarNode(nodeTemporal.left)
        }

        if (nodeTemporal.right != null) {
            nodoDerecha = this.buscarNode(nodeTemporal.right)
        }

        if (nodeTemporal.left == null && nodeTemporal.right == null) {
            nodoIzquierda = ''
            nodoDerecha = ''
        }
        let indice = this.dibujarEstructuraTree(nodeTemporal, nodoIzquierda, nodoDerecha)
        return indice
    }

    dibujarEstructuraTree(nodeTemporal, nodoIzquierda, nodoDerecha) {
        //padre
        let padre = document.createElement('li')
        //indice
        let div = document.createElement('span')
        div.className = 'nodo-wrapper'

        let indice = document.createElement('div')
        indice.className = 'nodo-circulo nodo-azul'
        indice.setAttribute('data-indice', `${nodeTemporal.value}`)

        indice.textContent = nodeTemporal.value

        //hijos
        let hijos = document.createElement('ul')
        let left = document.createElement('li')
        left.className = 'izquierda'
        let right = document.createElement('li')
        right.className = 'derecha'

        if (nodeTemporal.left != null) {
            left.append(nodoIzquierda)
        }
        if (nodeTemporal.right != null) {
            right.append(nodoDerecha)
        }

        div.append(indice)
        padre.append(div)
        hijos.append(left)
        hijos.append(right)
        padre.append(hijos)
        arbol.append(padre)

        return padre
    }

    inOrder(indice = this.root, value) {
        let indiceTemporal = indice

        // if (this.encontrado == true) {
        //     return this
        // }

        if (indiceTemporal.left != null) {
            this.inOrder(indiceTemporal.left, value)
        } else {
            this.buscarIndice(indiceTemporal.value, value)
        }

        if (indiceTemporal.left != null || indiceTemporal.right != null) {
            this.buscarIndice(indiceTemporal.value, value)
        }

        if (indiceTemporal.right != null) {
            this.inOrder(indiceTemporal.right, value)
        } else {
            this.buscarIndice(indiceTemporal.value, value)

        }

    }


    buscarIndice(indiceTemporal, value) {
        //aqui hace el cambio de color
        posiciones.forEach(indice => {
            if (this.encontrado != true) {
                if (indice.textContent == indiceTemporal) {

                    this.animacionPintar(indice)

                    !this.recorrido.includes(indice.textContent) ? this.recorrido.push(indice.textContent) : this.recorrido

                    if (indice.textContent == value) {
                        setTimeout(() => {
                            indice.className = 'nodo-circulo nodo-objetivo'
                        }, this.tiempo - 900)

                        this.encontrado = true

                    }
                }
            }

        })
        return this.encontrado
    }

    animacionPintar(indice) {

        setTimeout(() => {
            indice.className = 'nodo-circulo nodo-verde'


        }, this.tiempo)
        this.tiempo += 1000
    }

    limpiar() {

        arbol.innerHTML = ''
        this.buscarNode(this.root)
        this.encontrado = false
        this.recorrido = []
        this.tiempo = 1000
        contenedorRecorrido.textContent = ''
    }

}

//Variables

let inputIngreso = document.querySelector('#inputIngreso')
let btnGuardar = document.querySelector('#guardar')
let arbol = document.querySelector('.arbol')
let posiciones

let btnBuscar = document.querySelector('#buscar')
let inputBuscar = document.querySelector('#inputBuscar')
let contenedorRecorrido = document.querySelector('.resultado-box')

let btnLimpiar = document.querySelector('#limpiar')

const Tree = new BinarySearchTree()

btnGuardar.addEventListener('click', (event) => {
    Tree.insert(Number(inputIngreso.value))
    inputIngreso.value = ''
    posiciones = document.querySelectorAll('[data-indice]')
    btnBuscar.disabled = false

})

btnBuscar.addEventListener('click', (event) => {

    if (inputBuscar.value == '') {
        alert('Coloque un numero')
    } else {
        Tree.inOrder(undefined, Number(inputBuscar.value))
        btnGuardar.disabled = true
        btnBuscar.disabled = true
        btnLimpiar.disabled = false
        inputBuscar.value = ''
        contenedorRecorrido.textContent = Tree.recorrido.join(' ')
    }

})

btnLimpiar.addEventListener('click', (event) => {
    Tree.limpiar()
    posiciones = document.querySelectorAll('[data-indice]')
    btnGuardar.disabled = false
    btnLimpiar.disabled = true
    btnBuscar.disabled = false

})



