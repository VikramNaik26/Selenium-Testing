import { When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from "chai"

let sum = 0

Before(function() {
  console.log("Before")
})

After(function() {
  console.log("After")
})

When('I add {int} and {int}', function(int, int2) {
  sum = int + int2
});


Then('the result should be {int}', function(int) {
  return expect(sum).to.equal(int);
});
