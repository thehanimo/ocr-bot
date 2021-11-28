const { extractImageURLs } = require("./utils");

test("empty comment", async () => {
  await expect(extractImageURLs("")).toEqual([]);
});

test("links outside img tag", async () => {
  await expect(
    extractImageURLs("<img /> https://picsum.photos/id/237/200/300.jpg")
  ).toEqual([]);
});

test("extract text", async () => {
  await expect(
    extractImageURLs(
      "<img src='https://picsum.photos/id/237/200/300.jpg'/> <img src=\"https://picsum.photos/id/237/200/300.jpg\"/> <img alt='' height='20px' width='90px' src=\"https://picsum.photos/id/237/200/300.jpg\"/>"
    )
  ).toEqual([
    "https://picsum.photos/id/237/200/300.jpg",
    "https://picsum.photos/id/237/200/300.jpg",
    "https://picsum.photos/id/237/200/300.jpg",
  ]);
});
