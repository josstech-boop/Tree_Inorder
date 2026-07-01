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
    }

    insert(value) {
        let newNode = new Node(value)
        if (this.root === null) {
            this.root = newNode
            arbol.innerHTML = ''
            this.buscarNode(this.root)
        } else {
            let currentNode = this.root

            while (true) {
                if (value < currentNode.value) {
                    if (!currentNode.left) {
                        currentNode.left = newNode
                        arbol.innerHTML = ''
                        this.buscarNode(this.root)
                        return this
                    }
                    currentNode = currentNode.left
                } else {
                    if (!currentNode.right) {
                        currentNode.right = newNode
                        arbol.innerHTML = ''
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
        //varible temporal
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
        let valor = value
        let indiceTemporal = indice

        if (this.encontrado == true) {
            return this
        }

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


    buscarIndice(dataID, value) {
        //aqui hace el cambio de color
        //let tiempo = 500

        posiciones.forEach(indice => {

            if (indice.textContent == dataID) {
                console.log('Recorrido: ', indice.textContent)
                indice.className = 'nodo-circulo nodo-verde'

                !this.recorrido.includes(indice.textContent) ? this.recorrido.push(indice.textContent) : this.recorrido

                if (indice.textContent == value) {

                    console.log('Encontre valor busqueda: ', indice.textContent)
                    //setTimeout(() => {
                    indice.className = 'nodo-circulo nodo-objetivo'

                    //}, tiempo)


                    this.encontrado = true

                }
            }

            console.log(indice.textContent)
        })
        return this.encontrado


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

const Tree = new BinarySearchTree()


btnGuardar.addEventListener('click', (event) => {
    Tree.insert(Number(inputIngreso.value))
    inputIngreso.value = ''
    posiciones = document.querySelectorAll('[data-indice]')

})

btnBuscar.addEventListener('click', (event) => {

    btnGuardar.disabled = true

    console.log(Tree.inOrder(undefined, Number(inputBuscar.value)))
    contenedorRecorrido.textContent = Tree.recorrido.join(' ')

})



