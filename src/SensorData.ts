import { SensorType } from './types';

export class SensorData {
  public readonly sensorType: SensorType;
  public readonly deviceName: string;
  public readonly values: number[];

  constructor(
    sensorType: SensorType,
    deviceName: string,
    values: number[] = []
  ) {
    this.sensorType = sensorType;
    this.deviceName = deviceName;
    this.values = values;
  }

  public addValue(value: number) {
    this.values.push(value);
  }
}
