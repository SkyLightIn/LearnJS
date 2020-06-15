/**
 * 1.数组扁平化，不确定的多维数组，打平为一个数组
 * 要求：使用ES5方法
 */

function flatten(targetArr) {
    let fun1 = (arr) => {
        return arr.toString().split(",");
    }
    console.log("fun1", fun1(targetArr));
    
    let fun2 = (arr) => {
        return (arr + "").split(",");
    }
    console.log("fun2", fun2(targetArr));

    let fun3 = (arr) => {
        return arr.join("").split(",");
    };

    console.log("fun3", fun3(targetArr));
    
}


let a = [0, 1, [1, 2, 3, [1, 2 ,3, 4, 5, 6]]];

flatten(a);

