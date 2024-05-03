import { SensorCheck } from './SensorCheck';
import { SensorData } from './SensorData';
import { SENSOR_TYPES } from './constants';
import { SensorType } from './types';

export const evaluateLogFile = (logContentsStr: string) => {
  const logs = logContentsStr.split('\n');
  const referenceValues: Map<SensorType, number> = new Map();
  const [
    ,
    referenceTemperature,
    referenceHumidity,
    referenceMonoxide,
  ] = logs[0].split(' ').map((i) => +i.trim());

  referenceValues.set('thermometer', referenceTemperature);
  referenceValues.set('humidity', referenceHumidity);
  referenceValues.set('monoxide', referenceMonoxide);

  let sensorData: SensorData | null = null;
  const sensorCheck = new SensorCheck(referenceValues);

  for (let index = 1; index < logs.length; index++) {
    const [prefix, val] = logs[index].split(' ');
    if (SENSOR_TYPES.includes(prefix as SensorType)) {
      if (sensorData) sensorCheck.runCheck(sensorData);
      sensorData = new SensorData(prefix as SensorType, val);
    } else if (sensorData && isFinite(+val)) {
      sensorData.addValue(+val);
      if (index === logs.length - 1) sensorCheck.runCheck(sensorData);
    } else {
      throw new Error(
        'line is not a valid header or no sensor data initialized'
      );
    }
  }

  return sensorCheck.resultsObj;
};
