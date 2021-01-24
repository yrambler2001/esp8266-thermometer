const resistanceToCelsius = (RT) => {
  const RT0 = 10000; // Thermoresistor Ω
  const B = 3950; // Thermoresistor K
  const T0 = 25 + 273.15; // Temperature T0 from datasheet, conversion from Celsius to kelvin
  const ln = Math.log(RT / RT0);
  let TX = (1 / ((ln / B) + (1 / T0))); // Temperature from thermistor

  TX -= 273.15; // Conversion to Celsius

  console.log(`Temperature: ${TX.toFixed(2)}C\n`);
};
const readAnalog = () => analogRead() * 3.1 + 0.013; // read calibrated voltage
const readAnalogVoltageAverage = () => {
  let i = 0;
  new Array(100).fill(null).forEach(() => { i += readAnalog(); });
  return i / 100;
};
const readTemp = (value) => {
  const R = 9750; // measured: 9.75KΩ, R=10KΩ
  const VCC = 3.28; // measured
  const VRT = value; // Acquisition analog value of VRT // Conversion to voltage
  const VR = VCC - VRT;
  const RT = VRT / (VR / R); // Resistance of RT
  console.log(`Resistance: \t${RT.toFixed(0)} Ohm`);
  resistanceToCelsius(RT);
};
const logTemp = () => {
  digitalWrite(14, 1);
  setTimeout(() => {
    const voltage = readAnalogVoltageAverage();
    digitalWrite(14, 0);
    console.log(`Voltage:     ${voltage.toFixed(4)} V`);
    readTemp(voltage);
  }, 10);
};
setInterval(logTemp, 5000);
// console.log(resistanceToCelsius(10700))

//  digitalWrite(14, 0);
