const myArray = [1, 10, 6, 'ArrayElement', {}, 3, { name: 'date', val: 20221104 }, null, false, ['date', 20221104]];
const myArrayTest = [1, 2, 4, 3];

/**
 * 1. Log 3 and 6 elements from myArray to console
 * Please, use more than on solution
 */

// console.log(`3: ${}`);
// console.log(`6: ${}`);

console.log(myArray);
console.log(myArrayTest);
console.log(3); // Smile)
console.log('{}'); // Smile)
console.log(`${myArray[3]}`);
console.log(`${myArray[6]}`);
console.log(`${myArray[6].name}`);
console.log(`${myArray[25]}`);

/**
 *  2. Log type of each element
 */

myArray.forEach((element) => {
    console.log(typeof element);
});

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */

const isNumber = myArray.every((element) => typeof element === 'number');
const isNumberTest = myArrayTest.every((element) => typeof element === 'number');

console.log({
    isNumber,
    isNumberTest,
});

/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */

const isBiggerThanNumber = myArray.some((element) => element > 5);
const isBiggerThanNumberTest = myArrayTest.some((element) => element > 5);

console.log({
    isBiggerThanNumber,
    isBiggerThanNumberTest,
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

const elementsBiggerThanNumber = myArray.filter((element) => element > 5);
const elementsBiggerThanNumberTest = myArrayTest.filter((element) => element > 5);

console.log({
    elementsBiggerThanNumber,
    elementsBiggerThanNumberTest,
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

const multiplied = myArray.filter((element) => typeof element === 'number').map((element) => element * 2);
const multipliedTest = myArrayTest.filter((element) => typeof element === 'number').map((element) => element * 2);
const multipliedEmpty = [].filter((element) => typeof element === 'number').map((element) => element * 2);

console.log({
    multiplied,
    multipliedTest,
    multipliedEmpty,
});

/**
 * 7. Calculate array sum
 */

const sum = myArray.filter((element) => typeof element === 'number').reduce((prevElement, element) => prevElement + element, 0);
const sumTest = myArrayTest.filter((element) => typeof element === 'number').reduce((prevElement, element) => prevElement + element, 0);
const sumEmpty = [].filter((element) => typeof element === 'number').reduce((prevElement, element) => prevElement + element, 0);

console.log({
    sum,
    sumTest,
    sumEmpty,
});

/**
 * 8. Sort array in ascending and descending order
 */

function forCompareNumbers(a, b) {
    return a - b;
}
const asc = myArray.slice().sort(forCompareNumbers);
const ascTest = myArray.slice().sort();
const desc = myArray.slice().sort(forCompareNumbers).reverse();
const descTest = myArray.slice().sort().reverse();

console.log({
    asc,
    ascTest,
    desc,
    descTest,
});
