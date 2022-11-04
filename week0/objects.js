const invoice = {
	firstName: 'Node',
	lastName : 'Developer',
	createdAt: '2022-10-31T22:50:59.305Z',
	amount   : 150,
	currency : 'USD',
};

/**
 * 1. Log firstName and lastName in dot notation and bracket notation
 */

console.log('Name: ('+invoice.firstName+'.'+invoice.lastName+')');
console.log(`Name: (${invoice.firstName}.${invoice.lastName})`);
console.log("Name: ("+Object.values(invoice).slice(0, 2).join('.')+")"); // )))


/**
 * 2. Log Object Keys
 */

Object.prototype.getKeys = function () {
	return Object.keys(this);
}
const keys = invoice.getKeys();

console.log({
	keys,
});

/**
 * 3. Log Object values
 */

Object.prototype.getValues = function () {
	return Object.values(this);
}
const values = invoice.getValues();

console.log({
	values,
});

/**
 * 4. Log Object entries
 */

Object.prototype.getEntries = function () {
	return Object.entries(this);
}
const entries = invoice.getEntries();

console.log({
	entries,
});

/**
 * 5. Create second variable invoce from original
 * Please, use more than one solution
 */

const copiedInvoice = Object.assign({}, invoice);
const copiedInvoiceTest = Object.assign({}, invoice, {firstName: 'NO React'});
copiedInvoice.firstName = 'React';

console.log({
	invoice,
	copiedInvoice,
	copiedInvoiceTest,
});

/**
 * 6. Modify copiedInvoice amount value
 * Important: original invoice amount shouldnt be modified
 */

copiedInvoice.amount = 300;
copiedInvoiceTest.amount = 2000;

console.log({
	invoice,
	copiedInvoice,
	copiedInvoiceTest,
});

/**
 * 7. Loop through object and log key-values
 */

keys.forEach((key) => {
	console.log(`${key}-${invoice[key]}`);
});

for (const [key, value] of entries) {
	console.log(`${key}: ${value}`);
}
