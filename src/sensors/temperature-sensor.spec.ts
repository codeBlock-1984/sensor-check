import { SensorData } from '../SensorData';
import {
  TemperatureSensorCategory,
  TemperatureSensor,
} from './TemperatureSensor';

describe('TemperatureSensor', () => {
  const sensorData = new SensorData(
    'thermometer',
    'example temp device',
    [64, 65, 64.2, 64.5]
  );
  const temperatureSensor = new TemperatureSensor();

  it('returns correct results', () => {
    expect(temperatureSensor.evaluate(sensorData, 67)).toEqual([
      'example temp device',
      TemperatureSensorCategory.PRECISE,
    ]);
    expect(temperatureSensor.evaluate(sensorData, 64.5)).toEqual([
      'example temp device',
      TemperatureSensorCategory.ULTRA_PRECISE,
    ]);
  });
});
