const { execSync } = require("child_process");
const fs = require("fs");

class ConcatEngine {

  buildList(files) {
    return files.map(f => `file '${f}'`).join("\n");
  }

  concat(listFile, output) {
    const cmd = `ffmpeg -y -f concat -safe 0 -i ${listFile} -c copy ${output}`;
    execSync(cmd, { stdio: "inherit" });
  }
}

module.exports = ConcatEngine;