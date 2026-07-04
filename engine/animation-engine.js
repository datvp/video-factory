class AnimationEngine {

  build(scene) {

    // ffmpeg drawtext cần escape theo thứ tự: backslash trước, rồi dấu ':' và dấu nháy đơn.
    const text = scene.text
      .replace(/\\/g, '\\\\')
      .replace(/:/g, '\\:')
      .replace(/'/g, "\\'");

    let fontSize = 48;
    if (scene.style === "highlight") fontSize = 60;

    // Số frame cho zoompan phải là số nguyên
    const frames = Math.round(scene.duration * 25);

    const base =
      `[0:v]scale=1920:1080,format=rgba[bg];` +
      `[bg]drawtext=fontfile=assets/Roboto.ttf:text='${text}':fontsize=${fontSize}:fontcolor=black:x=(w-text_w)/2:y=(h-text_h)/2[txt];`;

    let camera = "";

    if (scene.camera === "zoom_in") {
      camera = `[txt]zoompan=z='min(zoom+0.0015,1.2)':d=${frames}[out]`;
    } else if (scene.camera === "pan") {
      camera = `[txt]crop=iw/1.1:ih/1.1,scale=1920:1080[out]`;
    } else {
      camera = `[txt]null[out]`;
    }

    // Toàn bộ filter_complex nằm trên MỘT dòng duy nhất (không chứa newline)
    // để tương thích với cmd.exe trên Windows (cmd.exe cắt lệnh theo từng dòng
    // ngay cả khi nằm trong dấu ngoặc kép, khác với bash trên Linux/macOS).
    const filterComplex = base + camera;

    return `ffmpeg -y -loop 1 -i assets/background.png -t ${scene.duration} -filter_complex "${filterComplex}" -map "[out]" -c:v libx264 -pix_fmt yuv420p -r 25`;
  }
}

module.exports = AnimationEngine;
