const myArray = [1, 10, 6, 'ArrayElement', {}, 3, {'name': 'date', 'val': 20221104}, null, false, ['date', 20221104]];
const myArrayTest = [1, 2, 4, 3];

/**
 * 1. Log 3 and 6 elements from myArray to console
 * Please, use more than on solution
 */

// console.log(`3: ${}`);
// console.log(`6: ${}`);
Array.prototype.last = function () {
	return this[this.length - 1];
}

console.log(myArray);
console.log(myArrayTest);
console.log(3); // Smile)
console.log('{}'); // Smile)
console.log(`${myArray[3]}`);
console.log(`${myArray[6]}`);
console.log(`${myArray[6].name}`);
console.log(`${myArray[25]}`);
console.log(typeof myArray.last());

/**
 *  2. Log type of each element
 */

myArray.forEach(element => {
	console.log(typeof element);
});

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */

/**
 * @returns {boolean}
 */
Array.prototype.isAllElementsNumbers = function () {
	return this.every(element => typeof element === 'number');
}

const isNumber = myArray.isAllElementsNumbers();
const isNumberTest = myArrayTest.isAllElementsNumbers();

console.log({
	isNumber,
	isNumberTest,
});

/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */

/**
 * @param num number
 * @returns {boolean}
 */
Array.prototype.isOneElementMoreNumber = function (num = 5) {
	if (typeof num !== 'number') {
		throw '"num" is not are number';
	}
	return this.some(element => element > num);
	/**
	 * OR return typeof this.find(element => element > num) !== 'undefined';
	 */
}

const isBiggerThanNumber = myArray.isOneElementMoreNumber(5);
const isBiggerThanNumberTest = myArrayTest.isOneElementMoreNumber();

console.log({
	isBiggerThanNumber,
	isBiggerThanNumberTest,
	//'error': myArrayTest.isOneElementMoreNumber('5'),
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

/**
 *
 * @param num number
 * @returns {*[]}
 */
Array.prototype.isFilterElementMoreNumber = function (num = 5) {
	if (typeof num !== 'number') {
		throw '"num" is not are number';
	}
	return this.filter(element => element > num);
}

const elementsBiggerThanNumber = myArray.isFilterElementMoreNumber(3);
const elementsBiggerThanNumberTest = myArrayTest.isFilterElementMoreNumber();

console.log({
	elementsBiggerThanNumber,
	elementsBiggerThanNumberTest,
	//'error': myArrayTest.isFilterElementMoreNumber('5')
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

/**
 *
 * @returns []
 */
Array.prototype.allElementsDouble = function () {
	return this
		.filter(element => typeof element === 'number')
		.map(element => element * 2);
}

const multiplied = myArray.allElementsDouble();
const multipliedTest = myArrayTest.allElementsDouble();
const multipliedEmpty = [].allElementsDouble();

console.log({
	multiplied,
	multipliedTest,
	multipliedEmpty,
});

/**
 * 7. Calculate array sum
 */

/**
 *
 * @returns {*}
 */
Array.prototype.isAllElementsNumbersSum = function () {
	let result = 0;
	return this
		.filter(element => typeof element === 'number')
		.reduce((prevElement, element) => prevElement + element, result);
}

// TODO: @VitaliyDanchul: Don't type answer in question)))
const sum = myArray.isAllElementsNumbersSum();
const sumTest = myArrayTest.isAllElementsNumbersSum();
const sumEmpty = [].isAllElementsNumbersSum();

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
