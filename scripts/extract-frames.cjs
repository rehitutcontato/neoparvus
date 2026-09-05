const { execSync } = require('child_process');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const fs = require('fs');

const input = process.argv[2];
const outFolder = process.argv[3] || 'sequence';
const outputDir = path.join(__dirname, '..', 'public', outFolder);
const fps = 30;
const width = 1920;
const quality = 75;

if (!input) {
  console.error("❌ Usage: node extract-frames.js <video_file> [output_folder]");
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clean previous frames
const files = fs.readdirSync(outputDir);
for (const file of files) {
  if (file.startsWith('frame_') && file.endsWith('.webp')) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

console.log(`🎬 Extracting frames from: ${input}`);
console.log(`   → Output: ${outputDir}`);
console.log(`   → FPS: ${fps} | Quality: ${quality} | Width: ${width}px\n`);

const cmd = `"${ffmpegPath}" -i "${input}" -vf "fps=${fps},scale=${width}:-1:flags=lanczos" -compression_level 4 -quality ${quality} -y -loglevel warning "${path.join(outputDir, 'frame_%04d.webp')}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  const finalFiles = fs.readdirSync(outputDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp'));
  console.log(`\n✅ Done! Extracted ${finalFiles.length} frames.`);
  console.log(`📝 Update ScrollSequence in App.jsx: frameCount={${finalFiles.length}}`);
} catch (error) {
  console.error("❌ Error extracting frames:", error.message);
}
