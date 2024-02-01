const express = require('express');
const { toFile } = require('qrcode');
const path = require('path');
const app = express();
const port = 3000;

// Adjust the public folder path based on the new location
app.use(express.static(path.join(__dirname, 'src', 'public')));

function generateQRCodeHTML(data) {
    // Adjust the qrCodeImagePath based on the new location
    const qrCodeImagePath = path.join(__dirname, 'src', 'public', 'qr.png');

    toFile(qrCodeImagePath, data, {
        color: {
            dark: '#000',
            light: '#fff'
        }
    }, function (err) {
        if (err) throw err;
        console.log('QR Code generated and saved at:', qrCodeImagePath);
    });

    return `<img src="qr.png" alt="QR Code"/><br/><br/>`;
}

app.get('/', (req, res) => {
    const qrData = JSON.stringify({
        putraa: "kyu nahi hoo rahi padhiii haaa....kyu?"
    });
    const qrCodeHTML = generateQRCodeHTML(qrData);

    res.setHeader('Content-Type', 'text/html');

    // Adjust the index.html path based on the new location
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
