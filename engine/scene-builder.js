class SceneBuilder {

  build(script) {

    const sentences = script
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean);

    return sentences.map((text, i) => {

      const emotion = this.emotion(text);
      const duration = this.duration(text);

      return {
        id: `scene_${String(i+1).padStart(3,'0')}`,
        text,
        emotion,
        duration,
        camera: this.camera(emotion),
        style: this.style(emotion)
      };
    });
  }

  emotion(text) {
    text = text.toLowerCase();

    if (text.includes("alone") || text.includes("lonely")) return "sad";
    if (text.includes("but") || text.includes("however")) return "contrast";
    if (text.includes("realize") || text.includes("discover")) return "insight";

    return "neutral";
  }

  duration(text) {
    const words = text.split(" ").length;
    return Math.max(3, Math.min(10, words / 2.3));
  }

  camera(emotion) {
    if (emotion === "sad") return "zoom_in";
    if (emotion === "contrast") return "pan";
    return "static";
  }

  style(emotion) {
    if (emotion === "sad") return "soft_whiteboard";
    if (emotion === "insight") return "highlight";
    return "basic";
  }
}

module.exports = SceneBuilder;