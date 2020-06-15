function doSomeThing(callback) {
    let value = 42;
    callback(value);
}
doSomeThing(function (value) {
    console.log("get value1", value);
});
// to be this, need: then function, 
doSomeThing1().then(function (value) {
    console.log("getValue1: ", value);
});

function doSomeThing1() {
    return {
        then: function (callback) {
            let value = 42;
            callback(value);
        }
    }
}


const Promise = require("./Promise");

function doSomeThing2() {
    return new Promise(function(resolve) {
        let value = 32;
        resolve(value);
    })
}

doSomeThing2().then(function (value) {
    console.log("value is:", value);
})