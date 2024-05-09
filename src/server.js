const express = require('express')
const app = express();

// Konfiguracja portu serwera
const PORT = 8000

// Obsługa żądania GET na głównym adresie
app.get('/', (req, res) => {

    // Pobranie adresu IP klienta
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const clientIP = data.ip;

            // Pobranie strefy czasowej klienta względem adresu IP
            fetch(`http://ip-api.com/json/${clientIP}`)
                .then(response => response.json())
                .then(data => {
                    const timeZone = data.timezone

                    // Pobranie daty i godziny w strefie czasowej klienta
                    const clientTime = new Date().toLocaleString('pl-PL', { timeZone: timeZone })

                    // Tworzenie odpowiedzi HTML
                    const htmlResponse = `
                        <html>
                        <head>
                            <title>Informacje dla klienta</title>
                        </head>
                        <body>
                            <h1>Adres IP klienta: ${clientIP}</h1>
                            <p>Data i godzina w Twojej strefie czasowej: ${clientTime}</p>
                        </body>
                        </html>
                    `

                    // Wysłanie odpowiedzi do klienta
                    res.send(htmlResponse)
                })
        })
        .catch(error => {
            console.error('Error fetching IP:', error);
            res.status(500).send('Wystąpił błąd podczas pobierania adresu IP.')
        })
})

// Nasłuchiwanie na określonym porcie
app.listen(PORT, () => {
    console.log(`[${new Date().toLocaleString()}] Serwer uruchomiony przez: Kamil Sadowski`)
    console.log(`[${new Date().toLocaleString()}] Serwer nasłuchuje na porcie: ${PORT}`)
})