const invoice = {
	firstName: 'Node',
	lastName : 'Developer',
	createdAt: '2022-10-31T22:50:59.305Z',
	amount   : 150,
	currency : 'USD',
};

/**
 * 1. Write a funcion that accepts your firstName and lastName
 * Should return 'I'm firstName lastName'
 */

function sayWho(obj) {
	return `${obj.firstName} ${obj.lastName}`;
}

function sayWhoTest(first = '', last = '') {
	return first + ' ' + last;
}

console.log(sayWho(invoice));
console.log(sayWhoTest(invoice.firstName, invoice.lastName));

/**
 * 2. Write a function that accepts numbers and return their sum
 * No limits for arguments count
 */

function countSum(...params) {
	let result = 0;
	for (const param of params) {
		if (typeof +param === 'number') {
			result += parseFloat(param);
		}
	}
	return result;
}

console.log(countSum(4, 5, 23));
console.log(countSum(10, 50, 212, 300, 22));
console.log(countSum(1, 2));
console.log(countSum(1, 2, 3.56, '2.44'));

/**
 * 3. Write a function that count number of letters in provided string
 */

function countLetters(string = '', letter = '') {
	return string.split(letter).length - 1;
}

console.log(countLetters('Node developer', 'd'));

/**
 *  4. Write function that will return random integer in range that you provided
 */

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandom(0, 10));
console.log(getRandom(5,15));
console.log(getRandom(90, 200));
