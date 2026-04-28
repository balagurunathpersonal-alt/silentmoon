const nodeMajor = Number(process.versions.node.split('.')[0]);

if (nodeMajor < 20 || nodeMajor >= 25) {
  console.error(
    `\nEnvironment setup check failed:\n` +
      `This project should be run with Node.js 20.x, 22.x, or 24.x. Detected ${process.version}.\n` +
      `Node.js 25 is not an LTS release and can break React Native/Metro tooling.\n`
  );
  process.exit(1);
}

console.log(`Environment setup check passed. Node ${process.version}`);
