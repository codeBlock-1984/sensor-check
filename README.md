# sensor-check

sensor-check is a library for testing sensors and ensuring they meet prescribe quality assurance standards.

## Prerequisites

- Node and NPM versions should match the ones specified in the package.json file.

## Local Setup

- Clone the repository using git clone ...
- From the root directory run:
  ```bash
    npm install
  ```
- To build the app for production run:
  ```bash
    npm run build
  ```
- To run automated tests run:
  ```bash
    npm test
  ```

## Usage

### Basic Usage

```typescript
const logFileContent = '...'; // Provide your log file content here
const result = evaluateLogFile(logFileContent);
```
