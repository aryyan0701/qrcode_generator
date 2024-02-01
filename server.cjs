const express = require('express');
const { toFile } = require('qrcode');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

function generateQRCodeHTML(data) {
    const qrCodeImagePath = path.join(__dirname, 'public', 'qr.png');

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


    res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});




