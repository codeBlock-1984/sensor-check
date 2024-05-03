import { LOG_CONTENT_STR, OUTPUT } from './fixtures/data';
import { evaluateLogFile } from './index';

describe('evaluateLogFile', () => {
  const result = evaluateLogFile(LOG_CONTENT_STR);

  it('returns correct results', () => {
    expect(result).toEqual(OUTPUT);
  });
});
