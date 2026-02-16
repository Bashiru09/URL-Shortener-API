
const prisma = require("../utils/client");
const UrlService = require('./url.service'); 

async function runTest() {
  try {
    const result = await UrlService.createShortUrl(
      "https://google.com",
      "test1234"
    );

    console.log("Created URL:");
    console.log(result);

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
