# Video Factory

A simple Node.js video generation pipeline that converts a script into a series of animated text scenes and concatenates them into a final video.

## Overview

The project reads a script from `topics/demo/script.txt`, generates scene metadata, renders each scene as an MP4 using `ffmpeg`, and concatenates the rendered scenes into `topics/demo/output/final_video.mp4`.

## Prerequisites

- Node.js 18+ (CommonJS project)
- `ffmpeg` installed and available in your system `PATH`
- A terminal on Windows (PowerShell or Command Prompt)

## Install

No dependencies are declared in `package.json`; the project uses only built-in Node.js modules.

1. Clone or open the repository.
2. Ensure `ffmpeg` is installed and accessible:
   ```powershell
   ffmpeg -version
   ```

## Run

From the project root:

```powershell
node index.js
```

This will:

- read `topics/demo/script.txt`
- build scenes and save `topics/demo/scenes.json`
- generate rendered scene files in `topics/demo/renders/`
- write concatenation entries to `topics/demo/concat_list.txt`
- produce `topics/demo/output/final_video.mp4`

## Project Structure

- `index.js` - main pipeline orchestration
- `engine/scene-builder.js` - splits text into scenes and assigns emotion, duration, camera, and style
- `engine/animation-engine.js` - produces `ffmpeg` commands for each scene
- `engine/renderer.js` - executes `ffmpeg` rendering commands
- `engine/concat.js` - builds the concat list and merges clips
- `assets/` - image/font assets used for rendering
- `topics/demo/` - example script, generated scene data, renders, and final output

## How It Works

1. `SceneBuilder.build(script)`
   - splits the script into sentences
   - infers `emotion` from keywords
   - computes `duration` from word count
   - selects `camera` and `style`

2. `AnimationEngine.build(scene)`
   - builds an `ffmpeg` command with `drawtext`
   - uses `assets/background.png` and `assets/Roboto.ttf`
   - supports zoom, pan, and static camera effects

3. `Renderer.render(cmd)`
   - runs `ffmpeg` via `child_process.execSync`

4. `ConcatEngine.concat(listFile, output)`
   - merges rendered MP4 files with `ffmpeg -f concat`

## Customization

- Update `topics/demo/script.txt` to change the input story.
- Modify `engine/scene-builder.js` to improve scene splitting or emotion detection.
- Adjust text styling and animation in `engine/animation-engine.js`.
- Replace `assets/background.png` and `assets/Roboto.ttf` with your own visuals.

## Notes

- The current `ffmpeg` command is built for Windows compatibility and expects a one-line `filter_complex` string.
- The scene concatenation uses relative paths in `topics/demo/concat_list.txt` to match ffmpeg's concat demuxer behavior.

## Troubleshooting

- If rendering fails, verify `ffmpeg` is installed and available on `PATH`.
- If fonts or assets are missing, ensure `assets/Roboto.ttf` and `assets/background.png` exist.
- If `topics/demo/output/final_video.mp4` is not created, inspect console output for `ffmpeg` errors.

## License

ISC
