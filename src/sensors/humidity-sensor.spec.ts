import { SensorData } from '../SensorData';
import { GenericSensorCategory } from '../types';
import { HumiditySensor } from './HumiditySensor';

describe('HumiditySensor', () => {
  const sensorData = new SensorData(
    'humidity',
    'example device',
    [4, 5, 4.2, 4.5]
  );
  const humiditySensor = new HumiditySensor();

  it('returns correct results', () => {
    expect(humiditySensor.evaluate(sensorData, 5)).toEqual([
      'example device',
      GenericSensorCategory.KEEP,
    ]);
    expect(humiditySensor.evaluate(sensorData, 3.5)).toEqual([
      'example device',
      GenericSensorCategory.DISCARD,
    ]);
  });
});
