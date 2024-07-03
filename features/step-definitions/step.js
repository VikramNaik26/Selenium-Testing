import { When, Then } from '@cucumber/cucumber';
import { expect } from "chai"

let sum = 0

When('I add {int} and {int}', function(int, int2) {
  sum = int + int2
});


Then('the result should be {int}', function(int) {
  return expect(sum).to.equal(int);
});
