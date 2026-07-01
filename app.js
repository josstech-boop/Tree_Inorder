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
            this.pintar(this.root)
        } else {
            let currentNode = this.root

            while (true) {
                if (value < currentNode.value) {
                    if (!currentNode.left) {
                        currentNode.left = newNode
                        return this
                    }
                    currentNode = currentNode.left
                } else {
                    if (!currentNode.right) {
                        currentNode.right = newNode
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
        //padre
        let padre = document.createElement('li')
        padre.setAttribute('data-indice', `${node.value}`)
        //indice
        let div = document.createElement('div')
        div.className = 'nodo-wrapper'
        let hijo = document.createElement('div')
        hijo.className = 'nodo-circulo nodo-azul'
        hijo.textContent = node.value

        //hijos
        let hijos = document.createElement('ul')
        let left = document.createElement('li')
        left.className = 'izquierda'
        let right = document.createElement('li')
        right.className = 'derecha'

        hijos.append(left)
        hijos.append(right)

        div.append(hijo)

        padre.append(div)
        padre.append(hijos)

        console.log(padre)

        arbol.append(padre)

        console.log(hijo.parentElement.parentElement)

        console.log(arbo)


        // arbol.innerHTML = `<li>
        //                         <div class="nodo-wrapper">
        //                             <div class="nodo-circulo nodo-azul">${this.root.value}</div>
        //                         </div>
        //                     </li>

        //                     <li>
        //                         <div class="nodo-wrapper">
        //                             <div class="nodo-circulo nodo-azul">${this.root.value}</div>
        //                         </div>
        //                     </li>

        //                     <li>
        //                         <div class="nodo-wrapper">
        //                             <div class="nodo-circulo nodo-azul">${this.root.value}</div>
        //                         </div>
        //                     </li>
        //                     `
    }

}

//Variables

let inputIngreso = document.querySelector('#inputIngreso')
let btnGuardar = document.querySelector('#guardar')
let posiciones = document.querySelectorAll('.nodo-wrapper')
let arbol = document.querySelector('.arbol')

const Tree = new BinarySearchTree()

btnGuardar.addEventListener('click', (event) => {

    Tree.insert(parseFloat(inputIngreso.value))
    inputIngreso.value = ''

})



