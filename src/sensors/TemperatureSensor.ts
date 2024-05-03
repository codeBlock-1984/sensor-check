import { SensorData } from '../SensorData';
import { ISensor } from '../types';

export enum TemperatureSensorCategory {
  ULTRA_PRECISE = 'ultra precise',
  VERY_PRECISE = 'very precise',
  PRECISE = 'precise',
}

export class TemperatureSensor
  implements ISensor<TemperatureSensorCategory>
{
  constructor() {}

  evaluate(sensorData: SensorData, sensorRef: number) {
    let response: [string, TemperatureSensorCategory];
    const mean = this.calculateMean(sensorData.values);
    const standardDeviation = this.calculateStandardDeviation(
      sensorData.values
    );
    const result = this.getResult(mean, standardDeviation, sensorRef);
    response = [sensorData.deviceName, result];
    return response;
  }

  private calculateMean(values: number[]) {
    const mean =
      values.reduce((acc, val) => acc + val, 0) / values.length;
    return mean;
  }

  private calculateStandardDeviation(values: number[]) {
    const mean = this.calculateMean(values);
    const variance =
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      values.length;
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
  }

  private getResult(
    mean: number,
    standardDeviation: number,
    sensorRef: number
  ) {
    const meanDiff = Math.abs(sensorRef - mean);
    if (meanDiff <= 0.5 && standardDeviation < 3) {
      return TemperatureSensorCategory.ULTRA_PRECISE;
    }
    if (meanDiff <= 0.5 && standardDeviation < 5) {
      return TemperatureSensorCategory.VERY_PRECISE;
    }
    return TemperatureSensorCategory.PRECISE;
  }
}
