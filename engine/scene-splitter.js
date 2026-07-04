class SceneSplitter {

  split(script) {

    return script
      .split(".")
      .filter(Boolean)
      .map((s, i) => ({
        id: `scene_${String(i+1).padStart(3,'0')}`,
        text: s.trim(),
        duration: 5 + Math.floor(Math.random() * 3)
      }));
  }
}

module.exports = SceneSplitter;