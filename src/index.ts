import { StringReader } from './StringReader';
import { SensorCheck } from './SensorCheck';
import { SensorData } from './SensorData';
import { SENSOR_TYPES } from './constants';
import { SensorType } from './types';

export const evaluateLogFile = (logContentsStr: string) => {
  const stringReader = new StringReader(logContentsStr);
  const referenceLine = stringReader.getLine();
  const referenceValues: Map<SensorType, number> = new Map();
  const [
    ,
    referenceTemperature,
    referenceHumidity,
    referenceMonoxide,
  ] = referenceLine.split(' ').map((i) => +i.trim());

  referenceValues.set('thermometer', referenceTemperature);
  referenceValues.set('humidity', referenceHumidity);
  referenceValues.set('monoxide', referenceMonoxide);

  let sensorData: SensorData | null = null;
  const sensorCheck = new SensorCheck(referenceValues);
  let logLine: string | null = stringReader.getLine();

  while (logLine) {
    const [prefix, val] = logLine.split(' ');
    if (SENSOR_TYPES.includes(prefix as SensorType)) {
      if (sensorData) sensorCheck.runCheck(sensorData);
      sensorData = new SensorData(prefix as SensorType, val);
    } else if (sensorData && isFinite(+val)) {
      sensorData.addValue(+val);
      if (stringReader.isFinished) sensorCheck.runCheck(sensorData);
    } else {
      throw new Error(
        'line is not a valid header or no sensor data initialized'
      );
    }
    const nextLine = stringReader.getLine();
    logLine = nextLine ? nextLine : null;
  }

  return sensorCheck.resultsObj;
};
