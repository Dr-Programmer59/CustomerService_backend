const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const AsyncErrorHandler = require("../middleware/AsyncErrorHandler");

exports.getaudio = AsyncErrorHandler(async (req, res, next) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const audioFile = files.audio;

      // Define the path where you want to store the audio file in the public folder
      const publicFolderPath = path.join(__dirname, '../public/audio'); // Change the path according to your folder structure

      // Create the directory if it doesn't exist
      if (!fs.existsSync(publicFolderPath)) {
        fs.mkdirSync(publicFolderPath, { recursive: true });
      }

      // Move the audio file to the public folder
      const oldPath = audioFile.path;
      const newPath = path.join(publicFolderPath, audioFile.name);
      
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('Error moving file:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        console.log('File moved successfully');
        res.status(200).json({ message: 'Audio received and saved successfully' });
      });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
});
