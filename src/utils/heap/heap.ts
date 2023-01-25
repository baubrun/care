class Heap {
    items: any[]
    constructor() {
        this.items = []
    }

    swap(index1: any, index2: any) {
        const temp = this.items[index1]
        this.items[index1] = this.items[index2]
        this.items[index2] = temp
    }


    parentIndex(index: number) {
        return Math.floor((index - 1) / 2)
    }

    leftChildIndex(index: number) {
        return index * 2 + 1
    }

    rightChildIndex(index: number) {
        return index * 2 + 2
    }

    parent(index: number) {
       return this.items[this.parentIndex(index)]
    }

    leftChild(index: number) {
        return this.items[this.leftChildIndex(index)]
    }

    rightChild(index: number) {
        return this.items[this.rightChildIndex(index)]
    }

    peek() {
        return this.items[0]
    }

    size() {
        return this.items.length
    }

    isEmpty(){
        return this.items.length < 1
    }

}



export default Heap