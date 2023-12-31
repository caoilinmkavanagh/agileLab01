const Catalogue = require("../src/productCatalogue");
const Product = require("../src/product");
// Setup
let cat = new Catalogue("Test Catalogue");
const p123 = new Product("A123", "Product 1", 100, 10, 10.0);
const p124 = new Product("A124", "Widget 1", 100, 10, 10.0);
const p125 = new Product("A125", "A Product 2", 100, 10, 10.0);
const p126 = new Product("A126", "A Widget 2", 100, 10, 10.0);
const p127 = new Product("A127", "Bracket 1", 100, 10, 10.0)
const p128 = new Product("A128", "Another Product 3", 100, 10, 10.0);
let response

console.log('Test addProduct')
console.log("\tWhen we add a product, then it will return true")
response = cat.addProduct(p123);
// Expectation
if (response === true)
  console.log('\tPassed')
else
  console.log('\tfailed')

console.log("\tWhen we add a product whose id matches an existinf one, then it will return false")
response = cat.addProduct(new Product("A123", "Product X", 100, 10, 10.0));
// Expectation
if (response === false)
  console.log('\tPassed')
else
  console.log('failed')

//=====Test Find Product By Name =========

cat = new Catalogue("Test Catalogue");
console.log('Test findProductByNameLike')

cat.addProduct(p123);
cat.addProduct(p124);
cat.addProduct(p125);
cat.addProduct(p126);
cat.addProduct(p127);
cat.addProduct(p128);

let substring = "Product";
console.log("\tGiven the catalogue has some products, when we provide a substring that has matches, then it returns the correct products")
let matches = cat.findProductsByNameLike(substring);
// Expectation
if (matches.length !== 3)
  console.log('\tFailed')
if (matches[0].name === p123.name && matches[1].name === p125.name && matches[2].name === p128.name)
  console.log('\tPassed')
else
  console.log('\tFailed')

substring = "No match";
console.log("\tGiven the catalogue has some products, when we provide a substring that has no matches, then it returns an empty array")
matches = cat.findProductsByNameLike(substring);
// Expectation
if (matches.length === 0)
  console.log('\tPassed')
else
  console.log('\tFailed')

cat = new Catalogue("Test Catalogue");
substring = "Product";
console.log("\tGiven the catalogue is empty, when we provide a substring, then it returns an empty array")
matches = cat.findProductsByNameLike(substring);
if (matches.length === 0)
  console.log('\tPassed')
else
  console.log('\tFailed')

//=====Test Remove by Id =========

// Initialize Catalogue with products
cat = new Catalogue("Test Catalogue");
cat.addProduct(p123);
cat.addProduct(p124);
cat.addProduct(p125);
cat.addProduct(p126);
cat.addProduct(p127);
cat.addProduct(p128);

console.log('Test removeProductById');

console.log("\tGiven the catalogue has some products, when we remove a product by its existing id, then it returns true");
response = cat.removeProductById("A123");
// Expectation
if (response === true)
  console.log('\tPassed');
else
  console.log('\tFailed');

console.log("\tGiven we remove a product by a non-existing id, then it returns false");
response = cat.removeProductById("A999");
// Expectation
if (response === false)
  console.log('\tPassed');
else
  console.log('\tFailed');

console.log("\Given an attempt to remove a product that was already removed by its id, then it returns false");
response = cat.removeProductById("A123");
// Expectation
if (response === false)
  console.log('\tPassed');
else
  console.log('\tFailed');

//=====Test Reordering =========

console.log("Given the catalogue has products with low stock, it returns an object with the product ids that need reordering");

// Setup products with quantities equal to or below their reorder levels
cat = new Catalogue("Test Catalogue");
cat.addProduct(new Product("A123", "Product 1", 9, 10, 10.0));
cat.addProduct(new Product("A124", "Widget 1", 9, 10, 10.0));
cat.addProduct(new Product("A125", "Product 2", 9, 10, 10.0));
cat.addProduct(new Product("A126", "Widget 2", 9, 10, 10.0));
cat.addProduct(new Product("A127", "Bracket 1", 9, 10, 10.0));
cat.addProduct(new Product("A128", "Product 3", 9, 10, 10.0));

let reorderResponse = cat.checkReorder();

// Expectation
if (reorderResponse.type === "Reorder" &&
    reorderResponse.productIds.length === 6 &&
    reorderResponse.productIds.includes('A123') &&
    reorderResponse.productIds.includes('A124') &&
    reorderResponse.productIds.includes('A125') &&
    reorderResponse.productIds.includes('A126') &&
    reorderResponse.productIds.includes('A127') &&
    reorderResponse.productIds.includes('A128'))
  console.log('\tPassed');
else
  console.log('\tFailed', reorderResponse);

console.log("Given the catalogue has no products that need reordering, it returns an object with an empty array");

// reset catalogue and test when no products need reordering
cat = new Catalogue("Test Catalogue");
cat.addProduct(new Product("A123", "Organes", 110, 100, 10.0));
cat.addProduct(new Product("A125", "Apples", 110, 100, 10.0));
cat.addProduct(new Product("A126", "Bananas", 110, 100, 10.0));
cat.addProduct(new Product("A128", "Grapes", 110, 100, 10.0));

reorderResponse = cat.checkReorder();

// Expectation
if (reorderResponse.type === "Reorder" && reorderResponse.productIds.length === 0)
  console.log('\tPassed');
else
  console.log('\tFailed', reorderResponse);
