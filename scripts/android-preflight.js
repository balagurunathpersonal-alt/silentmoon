const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const androidDir = path.join(rootDir, 'android');
const localPropertiesPath = path.join(androidDir, 'local.properties');

function fail(message) {
  console.error(`\nAndroid setup check failed:\n${message}\n`);
  process.exit(1);
}

function warn(message) {
  console.warn(`\nAndroid setup warning:\n${message}\n`);
}

function readJavaVersion() {
  const result = spawnSync('java', ['-version'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const output = `${result.stdout || ''}${result.stderr || ''}`;
  if (output.trim()) {
    return output;
  }

  if (result.error || result.status !== 0) {
    fail(
      'Java was not found. Install JDK 17 or use Android Studio\'s bundled JDK, then set JAVA_HOME if needed.'
    );
  }

  return output;
}

function parseJavaMajor(versionOutput) {
  const match = versionOutput.match(/version "(\d+)(?:\.(\d+))?/);
  if (!match) {
    return null;
  }

  const first = Number(match[1]);
  const second = Number(match[2]);
  return first === 1 ? second : first;
}

function hasAndroidSdkPath() {
  if (process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT) {
    return true;
  }

  if (!fs.existsSync(localPropertiesPath)) {
    return false;
  }

  const localProperties = fs.readFileSync(localPropertiesPath, 'utf8');
  return /^sdk\.dir\s*=.+$/m.test(localProperties);
}

const javaVersionOutput = readJavaVersion();
const javaMajor = parseJavaMajor(javaVersionOutput);

if (!javaMajor) {
  warn(`Could not parse Java version from:\n${javaVersionOutput.trim()}`);
} else if (javaMajor < 17 || javaMajor > 24) {
  fail(
    `This project should be built with JDK 17. Detected Java ${javaMajor}.\n` +
      'Java versions newer than Gradle supports can fail with "Unsupported class file major version".\n' +
      'Set JAVA_HOME to JDK 17, or configure Android Studio to use its bundled JDK.'
  );
} else if (javaMajor !== 17) {
  warn(`Detected Java ${javaMajor}. JDK 17 is the safest version for this project.`);
}

if (!hasAndroidSdkPath()) {
  fail(
    'Android SDK path was not found.\n' +
      'Open the project in Android Studio once, or create android/local.properties with sdk.dir.\n' +
      'Windows example: sdk.dir=C:\\\\Users\\\\<user>\\\\AppData\\\\Local\\\\Android\\\\Sdk\n' +
      'macOS example: sdk.dir=/Users/<user>/Library/Android/sdk'
  );
}

console.log('Android setup check passed.');
