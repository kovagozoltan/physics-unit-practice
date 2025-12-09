
import { convert, UNITS, CATEGORIES } from './src/logic/UnitConversion.js';

console.log("Starting Unit Conversion Tests...");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    // console.log(`✅ ${message}`);
  } else {
    failed++;
    console.error(`❌ ${message}`);
  }
}

function testConversion(val, from, to, expected, tolerance = 1e-3) {
  try {
    const result = convert(val, from, to);
    const diff = Math.abs(result - expected);
    const isClose = diff < tolerance || (diff / expected) < tolerance;
    assert(isClose, `${val} ${from} -> ${to}: Expected ~${expected}, got ${result}`);
  } catch (e) {
    failed++;
    console.error(`❌ Error converting ${from} to ${to}: ${e.message}`);
  }
}

// 1. Basic Length (Metric)
testConversion(1, 'km', 'm', 1000);
testConversion(100, 'cm', 'm', 1);
testConversion(1, 'nm', 'm', 1e-9);

// 2. Mass
testConversion(1, 'kg', 'g', 1000);
testConversion(1, 't', 'kg', 1000);

// 3. Temperature (The tricky one)
// C -> K
testConversion(0, 'C', 'K', 273.15);
testConversion(100, 'C', 'K', 373.15);
// K -> C
testConversion(273.15, 'K', 'C', 0);
// F -> C (32F = 0C)
testConversion(32, 'F', 'C', 0);
// C -> F (100C = 212F)
testConversion(100, 'C', 'F', 212);

// 4. Pressure
testConversion(1, 'kPa', 'Pa', 1000);
testConversion(1, 'bar', 'Pa', 100000);
testConversion(1, 'atm', 'Pa', 101325);

// 5. Scientific Notation Parsing (Simulation)
// This logic is in the UI/Game hook, but we can test the JS number behavior
const sciInput = "1.5e3";
assert(parseFloat(sciInput) === 1500, "Scientific notation string parsing");

console.log(`\nTests Complete. Passed: ${passed}, Failed: ${failed}`);
if (failed > 0) process.exit(1);
