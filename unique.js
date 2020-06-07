/**
 * 几点思考：
 * 1. 如果数组中有元素是对象呢？
 * 2. 如果数组中有元素是function呢？ 
 * 3. a = {a:0}; b = {a:0}  a === b 吗？
 * 4. 如果数组中有数组呢？（数组维度）
 * 
 * @param {Array} targetArr the target array need to unique
 * @returns {Array} result array
 */
function unique(targetArr) {
    console.log("unique targetArr:", targetArr);
    if (targetArr.length === 0) {
        return "no element!";
    }
    let type;
    let resultArr = [targetArr[0]];
    let elementI;
    
    for (let i = 0; i < targetArr.length; i++) {
        elementI = targetArr[i];
        type = typeof elementI;
        switch (type) {
            case "function":
                // resultArr = uniqueFun(resultArr, targetArr[i]);
                for (let k = 0; k < resultArr.length; k++) {
                    if (typeof resultArr[k] === "function") {
                        if(equalFun(elementI, resultArr[k])) {
                            break;
                        }
                    }
                    if (k === resultArr.length - 1) {
                        resultArr.push(elementI);
                    }
                }

                break;
            case "object":
                for (let j = 0; j < resultArr.length; j++) {
                    if (typeof resultArr[j] === "object") {
                        if (equalObj(resultArr[j], elementI)) {
                            break;
                        }
                    }
                    if (j === resultArr.length - 1) {
                        resultArr.push(elementI);
                    }
                }
                break;
            default:
                if (resultArr.indexOf(elementI) < 0) {
                    resultArr.push(elementI);
                }
                break;
        }
    }
    console.log("result array: -----\n", resultArr);
    
    return resultArr;
}

function equalFun(fun1, fun2) {
    console.log("equalFun");
    
    return fun1.toString() === fun2.toString();
}

function equalObj(obj1, obj2) {
    console.log("equalObj", obj1, obj2);
    let propsArr1 = Object.getOwnPropertyNames(obj1);
    let propsArr2 = Object.getOwnPropertyNames(obj2);
    if (obj1.constructor !== obj2.constructor) {
        return false;
    }
    if (propsArr1.length !== propsArr2.length) {
        return false;
    }
    if (obj1 instanceof Array && obj2 instanceof Array) {
        return equalArr(obj1, obj2);
    }
    for (const p in obj1) {
        if (!obj2.hasOwnProperty(p)) {
            return false;            
        }
        if (obj1[p] instanceof Array && obj2[p] instanceof Array) {
            let arr1 = obj1[p];
            let arr2 = obj2[p];
            if (!equalArr(arr1, arr2)) {
                return false;
            }
        }
        let pType1 = typeof obj1[p];
        let pType2 = typeof obj2[p];
        if (pType1 !== pType2) {
            return false;
        }
        if (pType1 === "object") {
            if (!equalObj(obj1[p], obj2[p])) {
                return false;
            };
        }
        if (pType1 === "function") {
            if (!equalFun(obj1[p], obj2[p])) {
                return false;
            }
        }
    }
    return true;
}

function equalArr(arr1, arr2) {
    console.log("equalArr:", arr1, arr2);
    
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        let elementI = arr1[i];
        let iType = typeof arr1[i];
        switch (iType) {
            case "object":
                for (let j = 0; j < arr2.length; j++) {
                    if (typeof arr2[j] === "object") {
                        return equalObj(arr1[i], arr2[j]);
                    }
                }
                break;
            case "function":
                for (let j = 0; j < arr2.length; j++) {
                    if (typeof arr2[j] === "function") {
                        return equalFun(arr2[j], elementI);
                    }
                }
                break;
            default:
                if (arr2.indexOf(elementI) < 0) {
                    return false;
                }
                break;
        }
    }
    return true;
    // return array.toString() === array1.toString();
}

let a = Symbol("sdk");
let arr = [equalObj, {a: 0}, [1, 2, equalArr], 3, "2", a];
let  arr1 = [equalObj, {a: 0}, [1, 2, equalArr, "2"], "3", a];
let arr3 = [equalObj, {a: 0}, [1, 2, equalArr], 3, a, equalObj, {a: 0}, [1, 2, equalArr], 3, a, {a: [1, 2, 3, 4]}, {a: [1, 2, 3, 4]}];
unique(arr3);
