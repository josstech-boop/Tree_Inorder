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
    }

    insert(value) {
        let newNode = new Node(value)
        if (this.root === null) {
            this.root = newNode
            arbol.innerHTML = ''
            this.pintar(this.root)
        } else {
            let currentNode = this.root

            while (true) {
                if (value < currentNode.value) {
                    if (!currentNode.left) {
                        currentNode.left = newNode
                        arbol.innerHTML = ''
                        this.pintar(this.root)
                        return this
                    }
                    currentNode = currentNode.left
                } else {
                    if (!currentNode.right) {
                        currentNode.right = newNode
                        arbol.innerHTML = ''
                        this.pintar(this.root)
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

    pintar(node) {
        //varible temporal
        let nodeTemporal = node
        let nodoIzquierda;
        let nodoDerecha;

        if (nodeTemporal.left != null) {
            nodoIzquierda = this.pintar(nodeTemporal.left)
        }

        if (nodeTemporal.right != null) {
            nodoDerecha = this.pintar(nodeTemporal.right)
        }

        if (nodeTemporal.left == null && nodeTemporal.right == null) {
            nodoIzquierda = ''
            nodoDerecha = ''
        }
        //padre
        let padre = document.createElement('li')
        padre.setAttribute('data-indice', `${nodeTemporal.value}`)
        //indice
        let div = document.createElement('span')
        div.className = 'nodo-wrapper'

        let indice = document.createElement('div')
        indice.className = 'nodo-circulo nodo-azul'
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

}

//Variables

let inputIngreso = document.querySelector('#inputIngreso')
let btnGuardar = document.querySelector('#guardar')
let arbol = document.querySelector('.arbol')
let posiciones

let btnBuscar = document.querySelector('#buscar')
let inputBuscar = document.querySelector('#inputBuscar')

const Tree = new BinarySearchTree()

btnGuardar.addEventListener('click', (event) => {
    Tree.insert(Number(inputIngreso.value))
    inputIngreso.value = ''
    posiciones = document.querySelectorAll('[data-indice]')

})

btnBuscar.addEventListener('click', (event) => {
    btnGuardar.disabled = true
    console.log(inputBuscar.value)
})



