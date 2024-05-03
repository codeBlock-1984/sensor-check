import { SensorData } from '../SensorData';
import { GenericSensorCategory, ISensor } from '../types';

export class HumiditySensor
  implements ISensor<GenericSensorCategory>
{
  constructor() {}

  evaluate(sensorData: SensorData, sensorRef: number) {
    let response: [string, GenericSensorCategory];
    const result = this.getResult(sensorData.values, sensorRef);
    response = [sensorData.deviceName, result];
    return response;
  }

  private getResult(values: number[], sensorRef: number) {
    for (let index = 0; index < values.length; index++) {
      const value = values[index];
      const valueDiff = Math.abs(value - sensorRef);

      if (valueDiff > 1) {
        return GenericSensorCategory.DISCARD;
      }
    }

    return GenericSensorCategory.KEEP;
  }
}
