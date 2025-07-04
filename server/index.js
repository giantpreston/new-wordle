const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 80;

app.use(cors());

const filePath = path.join(__dirname, "targetWords.json");

let targetWords = [];

try {
  const data = fs.readFileSync(filePath, "utf-8");
  targetWords = JSON.parse(data);
} catch (err) {
  console.error("💥 Failed to load targetWords.json:", err.message);
  process.exit(1);
}

app.get("/daily-word", (req, res) => {
  const now = new Date(); // get the current date and store it in the variable. not utc.
  const utcRef = Date.UTC(2025, 0, 1); // sets a utc reference so we can compare it later. boring math stuff.

  let targetDate; // make a new empty targetDate variable so we can set it later. query-related.
  const { on } = req.query; // get the query and store it into the on variable.
  if (on) { // if on is defined
    const dateParsed = new Date(`${on}T00:00:00Z`); // attempt to parse it, and assume midnight
    if (isNaN(dateParsed.getTime())) { // if it isn't a number or a valid time
      return res.status(400).json({error: "Invalid date format. Please use YYYY-MM-DD."}); // return 400 bad request and give a little tip
    }
    targetDate = dateParsed; // if everything does succeed then set the targetDate to the date that we just parsed.
  } else { // else, if it isnt defined
    targetDate = new Date(); // assume the client wants now
  }

  // calculate utc midnight timestamp for the targetDate (important: use targetDate here, not now)
  const utcTarget = Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate());
  const msDiff = utcTarget - utcRef; // difference in milliseconds from reference date
  const dayIndex = Math.floor(msDiff / (1000 * 60 * 60 * 24)) % targetWords.length; // convert msDiff to days, then mod word list length

  const wordOfTheDay = targetWords[dayIndex]; // get the word at the computed index

  res.json({ word: wordOfTheDay, index: dayIndex, reference: utcRef }); // send back word, index, and reference date timestamp
});


app.listen(port, () => {
  console.log(`🚀 Wordle server running on port ${port}`);
});

// 🔍 Trap everything just in case something evil is lurking
process.on('SIGINT', () => {
  console.log('❌ Caught SIGINT');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('❌ Caught SIGTERM');
  process.exit();
});

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('exit', (code) => {
  console.log(`🔚 Process is exiting with code ${code}`);
});

