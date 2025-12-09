
// Unit Definitions and Conversion Logic

export const CATEGORIES = {
  LENGTH: 'Length',
  MASS: 'Mass',
  TIME: 'Time',
  AREA: 'Area',
  VOLUME: 'Volume',
  SPEED: 'Speed',
  FORCE: 'Force',
  ENERGY: 'Energy',
  POWER: 'Power',
  PRESSURE: 'Pressure',
  TEMPERATURE: 'Temperature',
};

// Base units: m, kg, s, m^2, m^3, m/s, N, J, W, Pa, K
// All conversions defined relative to the Base Unit of that category.
// factor: multiply by this to get to Base. (e.g. km factor is 1000)
// offset: add this to get to Base (used for Temp).

export const UNITS = [
  // LENGTH (Base: m)
  { id: 'mm', symbol: 'mm', name: 'Millimeter', category: CATEGORIES.LENGTH, factor: 0.001, level: 1 },
  { id: 'cm', symbol: 'cm', name: 'Centimeter', category: CATEGORIES.LENGTH, factor: 0.01, level: 1 },
  { id: 'm', symbol: 'm', name: 'Meter', category: CATEGORIES.LENGTH, factor: 1, level: 1 },
  { id: 'km', symbol: 'km', name: 'Kilometer', category: CATEGORIES.LENGTH, factor: 1000, level: 1 },
  { id: 'nm', symbol: 'nm', name: 'Nanometer', category: CATEGORIES.LENGTH, factor: 1e-9, level: 5 },
  { id: 'um', symbol: 'µm', name: 'Micrometer', category: CATEGORIES.LENGTH, factor: 1e-6, level: 5 },

  // MASS (Base: kg)
  { id: 'mg', symbol: 'mg', name: 'Milligram', category: CATEGORIES.MASS, factor: 0.000001, level: 1 }, // 1 mg = 10^-6 kg
  { id: 'g', symbol: 'g', name: 'Gram', category: CATEGORIES.MASS, factor: 0.001, level: 1 },
  { id: 'kg', symbol: 'kg', name: 'Kilogram', category: CATEGORIES.MASS, factor: 1, level: 1 },
  { id: 't', symbol: 't', name: 'Tonne', category: CATEGORIES.MASS, factor: 1000, level: 2 },

  // TIME (Base: s)
  { id: 'ms', symbol: 'ms', name: 'Millisecond', category: CATEGORIES.TIME, factor: 0.001, level: 2 },
  { id: 's', symbol: 's', name: 'Second', category: CATEGORIES.TIME, factor: 1, level: 1 },
  { id: 'min', symbol: 'min', name: 'Minute', category: CATEGORIES.TIME, factor: 60, level: 2 },
  { id: 'h', symbol: 'h', name: 'Hour', category: CATEGORIES.TIME, factor: 3600, level: 2 },
  { id: 'day', symbol: 'd', name: 'Day', category: CATEGORIES.TIME, factor: 86400, level: 3 },

  // AREA (Base: m^2)
  { id: 'cm2', symbol: 'cm²', name: 'Square Centimeter', category: CATEGORIES.AREA, factor: 0.0001, level: 4 },
  { id: 'm2', symbol: 'm²', name: 'Square Meter', category: CATEGORIES.AREA, factor: 1, level: 4 },
  { id: 'km2', symbol: 'km²', name: 'Square Kilometer', category: CATEGORIES.AREA, factor: 1e6, level: 4 },
  { id: 'ha', symbol: 'ha', name: 'Hectare', category: CATEGORIES.AREA, factor: 10000, level: 5 },

  // VOLUME (Base: m^3)
  { id: 'ml', symbol: 'mL', name: 'Milliliter', category: CATEGORIES.VOLUME, factor: 1e-6, level: 4 }, // 1 ml = 1 cm^3 = 10^-6 m^3
  { id: 'l', symbol: 'L', name: 'Liter', category: CATEGORIES.VOLUME, factor: 0.001, level: 4 },
  { id: 'cm3', symbol: 'cm³', name: 'Cubic Centimeter', category: CATEGORIES.VOLUME, factor: 1e-6, level: 4 },
  { id: 'm3', symbol: 'm³', name: 'Cubic Meter', category: CATEGORIES.VOLUME, factor: 1, level: 4 },

  // SPEED (Base: m/s)
  { id: 'mps', symbol: 'm/s', name: 'Meters per Second', category: CATEGORIES.SPEED, factor: 1, level: 3 },
  { id: 'kmh', symbol: 'km/h', name: 'Kilometers per Hour', category: CATEGORIES.SPEED, factor: 1/3.6, level: 3 }, // 1 km/h = 1000m / 3600s = 1/3.6 m/s

  // FORCE (Base: N)
  { id: 'N', symbol: 'N', name: 'Newton', category: CATEGORIES.FORCE, factor: 1, level: 6 },
  { id: 'kN', symbol: 'kN', name: 'Kilonewton', category: CATEGORIES.FORCE, factor: 1000, level: 6 },
  { id: 'MN', symbol: 'MN', name: 'Meganewton', category: CATEGORIES.FORCE, factor: 1e6, level: 6 },

  // ENERGY (Base: J)
  { id: 'J', symbol: 'J', name: 'Joule', category: CATEGORIES.ENERGY, factor: 1, level: 7 },
  { id: 'kJ', symbol: 'kJ', name: 'Kilojoule', category: CATEGORIES.ENERGY, factor: 1000, level: 7 },
  { id: 'MJ', symbol: 'MJ', name: 'Megajoule', category: CATEGORIES.ENERGY, factor: 1e6, level: 7 },
  { id: 'kWh', symbol: 'kWh', name: 'Kilowatt-hour', category: CATEGORIES.ENERGY, factor: 3.6e6, level: 8 }, // 1 kWh = 1000 W * 3600 s = 3.6e6 J

  // POWER (Base: W)
  { id: 'mW', symbol: 'mW', name: 'Milliwatt', category: CATEGORIES.POWER, factor: 0.001, level: 7 },
  { id: 'W', symbol: 'W', name: 'Watt', category: CATEGORIES.POWER, factor: 1, level: 7 },
  { id: 'kW', symbol: 'kW', name: 'Kilowatt', category: CATEGORIES.POWER, factor: 1000, level: 7 },
  { id: 'MW', symbol: 'MW', name: 'Megawatt', category: CATEGORIES.POWER, factor: 1e6, level: 7 },
  { id: 'hp', symbol: 'hp', name: 'Horsepower (Metric)', category: CATEGORIES.POWER, factor: 735.5, level: 8 },

  // PRESSURE (Base: Pa)
  { id: 'Pa', symbol: 'Pa', name: 'Pascal', category: CATEGORIES.PRESSURE, factor: 1, level: 9 },
  { id: 'kPa', symbol: 'kPa', name: 'Kilopascal', category: CATEGORIES.PRESSURE, factor: 1000, level: 9 },
  { id: 'bar', symbol: 'bar', name: 'Bar', category: CATEGORIES.PRESSURE, factor: 1e5, level: 9 },
  { id: 'atm', symbol: 'atm', name: 'Atmosphere', category: CATEGORIES.PRESSURE, factor: 101325, level: 10 },
  { id: 'mmHg', symbol: 'mmHg', name: 'Millimeters of Mercury', category: CATEGORIES.PRESSURE, factor: 133.322, level: 10 },

  // TEMPERATURE (Base: K) - Special case handling in logic needed for offsets
  { id: 'C', symbol: '°C', name: 'Celsius', category: CATEGORIES.TEMPERATURE, factor: 1, offset: 273.15, level: 11 },
  { id: 'K', symbol: 'K', name: 'Kelvin', category: CATEGORIES.TEMPERATURE, factor: 1, offset: 0, level: 11 },
  { id: 'F', symbol: '°F', name: 'Fahrenheit', category: CATEGORIES.TEMPERATURE, special: 'fahrenheit', level: 12 },
];

/**
 * Converts a value from one unit to another.
 * @param {number} value 
 * @param {string} fromUnitId 
 * @param {string} toUnitId 
 * @returns {number}
 */
export function convert(value, fromUnitId, toUnitId) {
  const from = UNITS.find(u => u.id === fromUnitId);
  const to = UNITS.find(u => u.id === toUnitId);

  if (!from || !to) throw new Error("Invalid units");
  if (from.category !== to.category) throw new Error("Incompatible units");

  // Handle Temperature specifically due to offsets
  if (from.category === CATEGORIES.TEMPERATURE) {
    let kelvin;
    // To Kelvin
    if (from.id === 'C') kelvin = value + 273.15;
    else if (from.id === 'K') kelvin = value;
    else if (from.id === 'F') kelvin = (value - 32) * 5/9 + 273.15;

    // From Kelvin to Target
    if (to.id === 'C') return kelvin - 273.15;
    if (to.id === 'K') return kelvin;
    if (to.id === 'F') return (kelvin - 273.15) * 9/5 + 32;
  }

  // Standard Linear Conversion
  // Value * FromFactor = BaseValue
  // BaseValue / ToFactor = TargetValue
  const baseValue = value * from.factor;
  return baseValue / to.factor;
}

/**
 * Generates a random question based on current level cap.
 * @param {number} maxLevel 
 */
export function generateQuestion(maxLevel) {
  // Filter units available at this difficulty level or below
  // We want to ensure we don't just pick two units from level 1 when we are at level 10.
  // Strategy: Pick at least one unit that is close to the maxLevel (maxLevel, maxLevel-1, maxLevel-2)
  
  const effectiveMaxLevel = Math.max(1, maxLevel);
  const validUnits = UNITS.filter(u => u.level <= effectiveMaxLevel);
  
  if (validUnits.length < 2) return null;

  // Pick a random category first, to ensure we don't just pick random compatible units
  // Weight categories towards the higher levels available?
  // Let's just pick a random unit from the valid set, then find a compatible one.
  
  // Refined Strategy: Pick 'From' unit. Then pick 'To' unit from same category.
  // Prefer units that are unlocked recently.
  
  const fromUnit = validUnits[Math.floor(Math.random() * validUnits.length)];
  const compatibleUnits = validUnits.filter(u => u.category === fromUnit.category && u.id !== fromUnit.id);
  
  if (compatibleUnits.length === 0) {
     // Retry if only one unit in category exists (shouldn't happen with our data)
     return generateQuestion(maxLevel);
  }

  const toUnit = compatibleUnits[Math.floor(Math.random() * compatibleUnits.length)];

  // Generate a random value. 
  // Avoid 0. 
  // Make numbers "nice" sometimes (integers) but "scientific" others.
  let value;
  const isScientific = Math.random() > 0.7; // 30% chance of scientific notation input
  
  if (isScientific) {
    // Generate something like 1.5e-9 or 5e6
    const exponent = Math.floor(Math.random() * 18) - 9; // -9 to +9
    const mantissa = (Math.random() * 10).toFixed(1);
    value = parseFloat(`${mantissa}e${exponent}`);
  } else {
    // Standard number 1-1000
    value = Math.floor(Math.random() * 1000) + 1;
    if (Math.random() > 0.5) value = parseFloat((Math.random() * 100).toFixed(2));
  }

  return {
    value: value,
    from: fromUnit,
    to: toUnit,
    answer: convert(value, fromUnit.id, toUnit.id)
  };
}

export function generateDistractors(answer, count = 3) {
  const distractors = new Set();
  distractors.add(answer); // Ensure the correct answer is in the set initially to handle duplicates

  while (distractors.size < count + 1) {
    // Generate logical wrong answers:
    // 1. Inverse conversion (divide instead of multiply or vice versa)
    // 2. Off by power of 10
    // 3. Random close number
    
    const type = Math.floor(Math.random() * 3);
    let wrong;
    
    if (type === 0) {
      wrong = answer * Math.pow(10, Math.floor(Math.random() * 3) + 1);
    } else if (type === 1) {
      wrong = answer / Math.pow(10, Math.floor(Math.random() * 3) + 1);
    } else {
      wrong = answer * (0.5 + Math.random());
    }

    if (Math.abs(wrong - answer) > 1e-10) { // Ensure it's not the same
        distractors.add(wrong);
    }
  }
  
  // Remove correct answer if it was added solely for set uniqueness logic, 
  // but we actually want to return a list of options INCLUDING the correct one? 
  // Usually the UI handles shuffling. Let's return just wrong answers here or a mixed set?
  // Let's return just the wrong answers.
  distractors.delete(answer);
  return Array.from(distractors).slice(0, count);
}
