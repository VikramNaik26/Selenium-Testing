#!/usr/bin/bash

# Run registration tests first
npx cucumber-js --tags "@register"

# If registration tests pass, run login tests
if [ $? -eq 0 ]; then
  npx cucumber-js --tags "@login"
else
  echo "Registration tests failed. Skipping login tests."
  exit 1
fi

