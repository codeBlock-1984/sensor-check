import { HumiditySensor } from './sensors/HumiditySensor';
import { MonoxideSensor } from './sensors/MonoxideSensor';
import { SensorData } from './SensorData';
import { TemperatureSensor } from './sensors/TemperatureSensor';
import { ISensor, SensorType } from './types';

export class SensorCheck {
  private readonly referenceValues: Map<SensorType, number> =
    new Map();
  private readonly results: Map<string, unknown> = new Map();

  private readonly SENSOR_EVALUATORS: Record<SensorType, ISensor> = {
    thermometer: new TemperatureSensor(),
    humidity: new HumiditySensor(),
    monoxide: new MonoxideSensor(),
  };

  constructor(referenceValues: Map<SensorType, number>) {
    this.referenceValues = referenceValues;
  }

  public runCheck(sensorData: SensorData) {
    const sensorRef = this.referenceValues.get(sensorData.sensorType);
    if (!sensorRef) throw new Error('sensor ref was not found');
    const checkResult = this.SENSOR_EVALUATORS[
      sensorData.sensorType
    ].evaluate(sensorData, sensorRef);
    this.results.set(checkResult[0], checkResult[1]);
  }

  public get resultsObj() {
    return Object.fromEntries(this.results);
  }
}
