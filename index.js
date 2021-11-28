const core = require("@actions/core");
const github = require("@actions/github");
const { getTextFromImage, addComment, extractImageURLs } = require("./utils");
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const { Octokit } = require("@octokit/action");
const octokit = new Octokit();

// most @actions toolkit packages have async methods
async function run() {
  try {
    const comment = github.context.payload.issue.body;
    const issueNumber = github.context.payload.issue.number;
    if (!comment) {
      core.info("No image URLs found");
      return;
    }
    const urls = extractImageURLs(comment);
    if (!urls.length) {
      core.info("No image URLs found");
      return;
    }
    const promises = urls.map(async (url) => await getTextFromImage(url));
    const texts = (await Promise.allSettled(promises))
      .filter(({ status }) => status === "fulfilled")
      .map(({ value }) => value);
    addComment({ octokit, owner, repo, texts, issueNumber, comment });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
