import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract YouTube video ID from various URL formats
function extractYouTubeId(url) {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Determine if URL is YouTube or Instagram
function getLinkType(url) {
  if (url.includes("youtu.be") || url.includes("youtube.com")) return "youtube";
  if (url.includes("instagram.com")) return "instagram";
  return null;
}

// Check if URL exists using HEAD request
async function checkUrl(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

// Fetch Instagram thumbnail via oEmbed API
async function fetchInstagramThumbnail(url) {
  try {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://api.instagram.com/oembed?url=${encodedUrl}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`oEmbed API returned ${response.status}`);
    const data = await response.json();
    return data.thumbnail_url || null;
  } catch (error) {
    console.warn(`Instagram oEmbed failed for ${url}:`, error.message);
    return null;
  }
}

async function main() {
  const dataPath = path.join(__dirname, "..", "lib", "projects-data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const projects = data;
  let resolved = 0;
  let failed = 0;

  for (const project of projects) {
    const linkType = getLinkType(project.link);

    if (linkType === "youtube") {
      const videoId = extractYouTubeId(project.link);
      if (videoId) {
        // Try maxresdefault first
        const maxResUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const hqUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        const hasMaxRes = await checkUrl(maxResUrl);
        project.thumbnail = hasMaxRes ? maxResUrl : hqUrl;
        resolved++;
        console.log(`✓ ${project.id}: ${project.thumbnail}`);
      } else {
        console.warn(`✗ Could not extract YouTube ID from ${project.link}`);
        failed++;
      }
    } else if (linkType === "instagram") {
      const thumbnailUrl = await fetchInstagramThumbnail(project.link);
      if (thumbnailUrl) {
        project.thumbnail = thumbnailUrl;
        resolved++;
        console.log(`✓ ${project.id}: ${project.thumbnail}`);
      } else {
        console.warn(`✗ Instagram thumbnail not available for ${project.id} — add manually`);
        project.thumbnail = "";
        failed++;
      }
    } else {
      console.warn(`✗ Unknown link type for ${project.id}: ${project.link}`);
      failed++;
    }
  }

  // Write updated data back
  fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));

  console.log("\n--- Summary ---");
  console.log(`Resolved: ${resolved} thumbnails`);
  console.log(`Failed: ${failed} (see warnings above)`);
}

main().catch(console.error);
