import Heap from "./heap";

class MaxHeap extends Heap {
  bubbleDown() {
    let index: number = 0;
    while (
      this.leftChild(index) &&
      this.leftChild(index).care_level > this.items[index].care_level ||

      this.rightChild(index) &&
      this.rightChild(index).care_level > this.items[index].care_level
    ) {
      let biggerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) &&
        this.rightChild(index)?.care_level > this.items[biggerIndex].care_level
      ) {
        biggerIndex = this.rightChildIndex(index);
      }
      this.swap(biggerIndex, index);
      index = biggerIndex;
    }
  }

  bubbleUp() {
    let index = this.items.length - 1;
    while (
      this.parent(index)?.care_level < this.items[index].care_level
    ) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }

  add<T>(items: T[]) {
    items.forEach((item) => {
      this.items[this.items.length] = item;
      this.bubbleUp();
    });
  }

  poll() {
    if (this.isEmpty()) return;
    let item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }
}

export default MaxHeap;
