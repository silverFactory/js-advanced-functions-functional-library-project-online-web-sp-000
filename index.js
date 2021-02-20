const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      let collectionClone = Object.assign({}, collection)
      if (Object.keys(collectionClone).length > 0){
        callback(collectionClone[Object.keys(collectionClone)[0]], 0, collectionClone)
        delete collectionClone[Object.keys(collectionClone)[0]]
        fi.each(collectionClone, callback)
      }
      return collection
    },

    map: function(collection, callback, acc = []) {
      let collectionClone = Object.assign({}, collection)
      if (Object.keys(collectionClone).length === 0){
        return acc
      } else {
        acc.push(callback(collectionClone[Object.keys(collectionClone)[0]]))
        delete collectionClone[Object.keys(collectionClone)[0]]
        return fi.map(collectionClone, callback, acc)
      }

    },
     reduce: function(collection, callback, memo = 0) {
       let collectionClone = Object.assign({}, collection)
       if (Object.keys(collectionClone).length === 0){
         return memo
       } else if(memo === 0) {
         memo = collectionClone[Object.keys(collectionClone)[0]]
         delete collectionClone[Object.keys(collectionClone)[0]]
         return fi.reduce(collectionClone, callback, memo)
       } else {
         memo = callback(memo, collectionClone[Object.keys(collectionClone)[0]], collectionClone)
         delete collectionClone[Object.keys(collectionClone)[0]]
         return fi.reduce(collectionClone, callback, memo)
       }
    },

    find: function(collection, predicate) {
      let collectionClone = Object.assign({}, collection)
      if (Object.keys(collectionClone).length === 0){
        return undefined
      } else if (predicate(collectionClone[Object.keys(collectionClone)[0]])){
        return collectionClone[Object.keys(collectionClone)[0]]
      } else {
        delete collectionClone[Object.keys(collectionClone)[0]]
        return fi.find(collectionClone, predicate)
      }
    },
    filter: function(collection, predicate, acc = []){
      let collectionClone = Object.assign({}, collection)
      if (Object.keys(collectionClone).length === 0){
        return acc
      } else {
        if (predicate(collectionClone[Object.keys(collectionClone)[0]])){
          acc.push(collectionClone[Object.keys(collectionClone)[0]])
        }
        delete collectionClone[Object.keys(collectionClone)[0]]
        return fi.filter(collectionClone, predicate, acc)
      }
    },
    size: function(collection){
      return Object.keys(collection).length

    },
    first: function(array, n = 0){
      if (n == 0){
        return array[0]
      } else {
        return array.slice(0, n)
      }
    },
    last: function(array, n = 1){
      if (n == 1){
        return array[array.length-n]
      } else {
        return array.slice(array.length-n)
      }
    },
    compact: function(array){
      return fi.filter(array, function(element){
        if (!!element)
        {return element}
      })
    },
    sortBy: function(array, callback){
      return fi.map(array, x => x).sort(function(a, b){return callback(a)-callback(b)})
    },
    flatten: function(collection, shallow = false, acc = []){
      function isObject(x){
        return typeof x === "object"
      }
      let arrayClone = collection
      if (arrayClone.length === 0){
        if (shallow == false && !!fi.find(acc, isObject)){
          return fi.flatten(acc, shallow, [])
        } else {
          return acc
        }
      } else {
        if (typeof arrayClone[0] == "object"){
          acc.push(...arrayClone.shift())
        } else {
        acc.push(arrayClone.shift())
        }
        return fi.flatten(arrayClone, shallow, acc)
      }

    },
    uniq: function(array, isSorted = false, callback = (x => x), acc = []){
     let arrayClone = array
       if (arrayClone.length == 0){
         return acc
       } else {
         if (fi.map(arrayClone.slice(0, arrayClone.length-1), callback).includes(callback(arrayClone[arrayClone.length-1]))){
           arrayClone.pop()
         } else {
           acc.unshift(arrayClone.pop())
         }
         return fi.uniq(arrayClone, isSorted, callback, acc)
       }
    },
    keys: function(object){
      return Object.keys(object)
    },
    values: function(object){
      return fi.map(object, x => x)
    },
    functions: function(object){
      return fi.sortBy(fi.filter(object, val => (typeof val === "function")), val => val)
    }
}
})()

fi.libraryMethod()
