const Node = require('./node');

class LinkedList {
    constructor() {
        this._tail = new Node();
        this._head = new Node();
        this.length = 0;
    }
  
    append(data) {
        if(this.length == 0){
            this._tail.data = data;
            this._head.data = data;
        }
        else{
            var newElement = new Node();
            var tailBeforeAppending = this._tail;
            tailBeforeAppending.next = newElement;
            newElement.data = data;
            newElement.prev = tailBeforeAppending;
            this._tail = newElement; 
            if(this.length == 1)
              this._head.next = newElement;
        }
  
        this.length++;
        
    }
  
    head() {
        return this._head.data;
    }
  
    tail() {
        return this._tail.data;
    }
  
    at(index) {
        if(index >= this.length)
          return false;
        var result;
        if(index >= this.length / 2){
            result = this._tail;
            for(var i = 0; i < this.length - index - 1; i++){
                result = result.prev;
            }
        }
        else{
            result = this._head;
            for(var i = 0; i < index; i++)
                result = result.next;
        }
        return result.data;
    }
  
    insertAt(index, data) {
      
    if(index == 1){
        var element = new Node();
        element.data = data;
        element.prev = this._tail.prev;
        element.next = this._tail;
        this._tail.prev.next = element;
        this._head.next = element;
        this._tail.prev = element;
        
        
        this.length++;
        return;
    }

    var left = this._tail;
    var right = this._head;

    if(index >= this.length / 2){
    for(var i = 0; i < this.length - index - 1; i++)
        right = right.prev;
    left = right.prev;
    }
    else{
    for(var i = 0; i < index ; i++){
        left = left.next;
    }
    right = left.next;
    }
    var element = new Node(data, left, right);
    left.next = element;
    right.prev = element;
    this.length++;
    }
  
    isEmpty() {
      return (this.length == 0);
    }
  
    clear() {
      this._tail = new Node();
      this._head = new Node();
      this.length = 0;
    }
  
    deleteAt(index) {
      if(index >= 0 && index < this.length){
        var right = this._tail;
        var left = this._head;
        if(index > this.length / 2){
          for(var i = 0; i < this.length - index - 2; i++)
            right = right.prev;
          left = right.prev.prev;
        }
        else{
          for(var i = 0; i < index - 1; i++)
            left = left.next;
          right = left.next.next;
        }
        left.next = right;
        right.prev = left;
        this.length--;
      }
    }
  
    reverse() {
      const next = this._tail.prev;
      const prev = this._head.next;
      this._head.next = next;
      this._head.prev = undefined;
      this._head.data = next.next.data;
      
      this._tail.next = undefined;
      this._tail.prev = prev;
      this._tail.data = prev.prev.data;
  
      var element = this._head.next;
      for(var i = 0; i < this.length - 2; i++){
          var temp = new Node();
          temp = element.next;
          element.next = element.prev;
          element.prev = temp;
          element = element.next;
      } 
  
    }
  
    indexOf(data) {
        var count = 0;
        var element = this._head;
        while(count < this.length){
            if(element.data == data)
                return count;
            element = element.next;
            count++;
        }
        return -1;
    }
  }
  

module.exports = LinkedList;
