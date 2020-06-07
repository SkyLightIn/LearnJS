>昨天跟着徒弟一起面试，结果发现有些题目自己回答的也很差，
>没有对于某类问题做一些有深度和>发散性的思考，
>只是表面化的“我知道”而已，我觉得我在第三层，实际我只在第一层，
>第一时间能想到一些简单的办法来解决，而没有思考当题目未限定条件时会产生的异常。
>今天花了一些时间来做了个反思，并针对该问题的解决办法进行挖掘，希望能对自己有所提升，也能对大家有点帮助助。OK，起飞~


**问题描述：Javascript数组去重**
--------
*问题思考1：*`实际在日常使用的时候第一时间会想到的最简单的办法是使用ES6的集合set来实现，毕竟互异 + 无序就是集合的基本特征，这个是最基础的，实践出真知：
```
let arr1 = [1, 2, 2, 1, 4, 5];
let set1 = new Set(arr1);
console.log(set1);
// output: Set { 1, 2, 4, 5 }

let w = Symbol("w");
let arr2 = [1, 1, 2, "3", 3, "3", w, w, null, null, undefined, undefined, true, true];
let set2 = new Set(arr2);
console.log(set2);
// output: Set { 1, 2, '3', 3, Symbol(w), null, undefined, true }
```

从结果看来，这个方法可以应付日常使用的基本数据类型，也就是：String/Number/Boolean/Symbol/undefined这几种，但是JS的数据类型不止有基本数据类型
------
*问题思考2*`：但是如果数组中有 object/function/array 为元素的时候会是什么样的结果呢，实践出真知：

```
let arr3 = [{a: 0}, {a: 0}];
let set3 = new Set(arr3);
console.log(set3);
// output: Set { { a: 0 }, { a: 0 } }


let f = function() {console.log(1);};
let f1 = new f();
let f2 = new f();
let arr4 = [f1, f2];
let set4 = new Set(arr4);
console.log(set4);
// output: Set { f {}, f {} }

let arr5 = [[1, 2], [1, 2]];
let set5 = new Set(arr5);
console.log(set5);
// output: Set { [ 1, 2 ], [ 1, 2 ] }
```
实际可以看到，这个方法并不能很好的支持对象、数组类型，当内容相同的object/function/array 类型的数据出现时，就会无法实现真正的去重功能，而实际当数组的元素为数组/对象的时候，其实数组已经在维度上发生了变化，而问题的深度也悄悄发生了一些变化，已经不再是一维数组的问题了，如果在这个情况下再想解决去重问题，我们就要针对不同类型进行处理了

*最终思考*`：这个问题单纯去做发散性思考的话，是比较复杂的，且很容易在脑子里打结，实际我们根据目标来划分的话，就比较容易实现了，真正重要的是思考的过程，首先我们要思考我们要做的事情，也就是两个步骤：**目标原子化，搞定原子**。其实不止这个问题，无论什么问题，我们按照这个思路去解决问题，就会发现问题并没有想的那么难。

>原子化：需求首先是去重，要求是能适配Javascript各种数据类型
>所以需要的就是判断（基本数据类型+引用类型）是否相等 => 去重。

实现整体去重：

```
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
                console.log("===========", type, elementI);
                for (let j = 0; j < resultArr.length; j++) {
                    console.log("+++++++++++++", resultArr[j], elementI);
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
```
