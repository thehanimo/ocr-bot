const core = require("@actions/core");
const { createWorker } = require("tesseract.js");

const imgTagRegEx = /<img [^>]*src=("[^"]*"|'[^']*')[^>]*>/gm;
const urlRegEx =
  /(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})(.png|.jpg|.jpeg|.bmp|.pbm)/gi;

async function getTextFromImage(url) {
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(url);
  await worker.terminate();
  return text;
}

function extractImageURLs(text) {
  const urls = (text.match(imgTagRegEx) || [])
    .map((tag) => (tag.match(urlRegEx) || [])[0])
    .filter((url) => url !== null && url !== undefined);
  return urls;
}

async function addComment({
  octokit,
  owner,
  repo,
  texts,
  issueNumber,
  comment,
}) {
  const body = `${comment}\n\n<details>
<summary>OCR Keywords</summary>
${texts.join("\n\n")}
</details>`;
  await octokit.issues.update({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  });
  core.info(`Added OCR Keywords`);
}

module.exports = {
  addComment,
  extractImageURLs,
  getTextFromImage,
};
