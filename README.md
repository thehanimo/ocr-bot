# OCR Bot :robot:

<a href="https://github.com/thehanimo/ocr-bot/actions"><img alt="javscript-action status" src="https://github.com/thehanimo/ocr-bot/workflows/units-test/badge.svg"></a>

This action uses [naptha/tesseract.js](https://github.com/naptha/tesseract.js) to extract text from images attached to issue comments.

The extracted text is appended to the issue body.

This allows extracted text to be searchable via Github's searchbox.

Inspired by [imjasonh/ideas/issues/76](https://github.com/imjasonh/ideas/issues/76)

## Usage

Create a workflow (eg: `.github/workflows/ocr-bot.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)) with the following content:

```yaml
name: "OCR Bot"
on:
  issues:
    types: [opened, edited]

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: thehanimo/ocr-bot@v1.0.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Done! You should see OCR keywords being added to issues that contain images. Something like this:

<details>
<summary>OCR Keywords</summary>
Mild Splendour of the various-vested Night!
Mother of wildly-working visions! haill
I watch thy gliding, while with watery light
Thy weak eye glimmers through a fleecy veil;
And when thou lovest thy pale orb to shroud
Behind the gather’d blackness lost on high;
And when thou dartest from the wind-rent cloud
Thy placid lightning o’er the awaken’d sky.
</details>

## Development

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ empty comment (3 ms)
  ✓ links outside img tag (1 ms)
  ✓ extract text (1 ms)
...
```
