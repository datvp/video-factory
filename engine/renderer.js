const { execSync } = require("child_process");

class Renderer {

  // Nhận vào một chuỗi lệnh ffmpeg đầy đủ (đã có output path) và thực thi nó.
  render(cmd) {
    console.log("Rendering:", cmd.split(" ").pop());
    execSync(cmd, { stdio: "inherit" });
  }
}

module.exports = Renderer;
