import { SENSOR_TYPES } from './constants';
import { SensorData } from './SensorData';

export type SensorType = (typeof SENSOR_TYPES)[number];

export enum GenericSensorCategory {
  DISCARD = 'discard',
  KEEP = 'keep',
}

export interface ISensor<TResult = unknown> {
  evaluate: (
    sensorData: SensorData,
    sensorRef: number
  ) => [string, TResult];
}
