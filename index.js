const fs = require("fs");
const path = require("path");

const SceneBuilder = require("./engine/scene-builder");
const AnimationEngine = require("./engine/animation-engine");
const Renderer = require("./engine/renderer");
const ConcatEngine = require("./engine/concat");

const TOPIC_DIR = "topics/demo";
const SCRIPT_FILE = path.posix.join(TOPIC_DIR, "script.txt");   // nguồn script gốc (chỉ đọc)
const SCENES_FILE = path.posix.join(TOPIC_DIR, "scenes.json");
const RENDERS_DIR = path.posix.join(TOPIC_DIR, "renders");
const OUTPUT_DIR = path.posix.join(TOPIC_DIR, "output");
const CONCAT_LIST_FILE = path.posix.join(TOPIC_DIR, "concat_list.txt"); // file riêng cho việc ghép, không đụng script.txt
const FINAL_VIDEO = path.posix.join(OUTPUT_DIR, "final_video.mp4");

// Đảm bảo các thư mục cần thiết tồn tại
fs.mkdirSync(RENDERS_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const script = fs.readFileSync(SCRIPT_FILE, "utf8");

const builder = new SceneBuilder();
const animator = new AnimationEngine();
const renderer = new Renderer();
const concat = new ConcatEngine();

const scenes = builder.build(script);

fs.writeFileSync(SCENES_FILE, JSON.stringify(scenes, null, 2));

const outputs = [];

scenes.forEach(scene => {

  const output = `${RENDERS_DIR}/${scene.id}.mp4`;

  const cmd = animator.build(scene);

  renderer.render(`${cmd} "${output}"`);

  // ffmpeg concat demuxer phân giải đường dẫn tương đối theo thư mục
  // chứa chính file danh sách (TOPIC_DIR), nên ở đây chỉ cần "renders/xxx.mp4"
  outputs.push(path.posix.relative(TOPIC_DIR, output));
});

// Ghi danh sách ghép video vào file RIÊNG, không ghi đè script.txt
fs.writeFileSync(CONCAT_LIST_FILE, concat.buildList(outputs));

concat.concat(CONCAT_LIST_FILE, FINAL_VIDEO);

console.log("✅ VIDEO FACTORY DONE ->", FINAL_VIDEO);
