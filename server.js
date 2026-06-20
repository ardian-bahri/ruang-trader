const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Serve index.html explicitly on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to create Xendit Invoice
app.post('/api/checkout', async (req, res) => {
    try {
        const { packageType, email } = req.body;
        
        let amount = 0;
        let description = '';

        if (packageType === 'basic') {
            amount = 300000;
            description = 'Paket IDR 300K/LIFETIME Ruang Trader';
        } else if (packageType === 'vip') {
            amount = 450000;
            description = 'Paket IDR 450K/LIFETIME Ruang Trader';
        } else {
            return res.status(400).json({ message: 'Paket tidak valid' });
        }

        // Generate unique external ID for the invoice
        const externalId = `invoice-${packageType}-${Date.now()}`;

        // Setup Xendit API request
        const xenditSecretKey = process.env.XENDIT_SECRET_KEY;
        const encodedKey = Buffer.from(xenditSecretKey + ':').toString('base64');

        const response = await axios.post(
            'https://api.xendit.co/v2/invoices',
            {
                external_id: externalId,
                amount: amount,
                description: description,
                payer_email: email || 'member@ruangtrader.com',
                success_redirect_url: 'http://localhost:3000/index.html?payment=success',
                failure_redirect_url: 'http://localhost:3000/index.html?payment=failed'
            },
            {
                headers: {
                    'Authorization': `Basic ${encodedKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Return the invoice URL to the frontend
        res.json({
            checkout_url: response.data.invoice_url
        });

    } catch (error) {
        console.error('Xendit Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            message: 'Gagal membuat tagihan pembayaran',
            error: error.response ? error.response.data : error.message
        });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}

module.exports = app;
