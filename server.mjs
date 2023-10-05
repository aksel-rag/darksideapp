import express from 'express';
import fs from 'fs/promises';

const app = express();
app.use(express.static('website'));
app.set('trust proxy', true);

let downloadsFile = "./downloads.txt";

async function getDownloads(req, res) {
  try {
    const data = await fs.readFile(downloadsFile, 'utf-8');
    const downloadsCount = parseInt(data, 10);
    res.json({ downloads: downloadsCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading downloads file');
  }
}

async function increment(req, res) {
    try {
      const downloadsData = await fs.readFile(downloadsFile, 'utf-8');
      const downloadsCount = parseInt(downloadsData, 10);
      const updatedCount = downloadsCount + 1;

      await fs.writeFile(downloadsFile, updatedCount.toString());
      res.json({ downloads: updatedCount});
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating downloads count');
    }
  }

app.get('/getDownloads', getDownloads);
app.post('/increment', increment);
app.listen(5500);
