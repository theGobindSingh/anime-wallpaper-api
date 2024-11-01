import axios from 'axios';
import UserAgent from 'user-agents';

const proxies: {
  protocol: string;
  host: string;
  port: number;
}[] = [
  // { protocol: 'http', host: '8.212.151.166', port: 9080 },
  // { protocol: 'http', host: '169.56.21.242', port: 8080 },
  // { protocol: 'http', host: '114.156.77.107', port: 8080 },
  // { protocol: 'http', host: '200.174.198.86', port: 8888 },
  // { protocol: 'http', host: '41.204.53.27', port: 80 },
  // { protocol: 'http', host: '47.91.110.148', port: 8080 },
  // { protocol: 'http', host: '222.252.194.29', port: 8080 },
  // { protocol: 'http', host: '43.134.121.40', port: 3128 },
  // { protocol: 'http', host: '174.94.228.163', port: 80 },
];

const apiWala = axios.create({});

apiWala.interceptors.request.use(
  (config) => {
    const userAgent = new UserAgent({ deviceCategory: 'desktop' }); // Generate a new User-Agent
    config.headers['User-Agent'] = userAgent.toString(); // Set the User-Agent header
    const randomProxyIndex = Math.floor(Math.random() * proxies.length);
    config.proxy = proxies[randomProxyIndex]!; // Set the proxy
    return config;
  },
  (error: Error) => Promise.reject(error),
);

export default apiWala;

const commonHeaders = {
  'accept-language': 'en-US,en;q=0.9,en-IN;q=0.8',
  'cache-control': 'no-cache',
  dnt: '1',
  pragma: 'no-cache',
  'sec-ch-ua':
    '"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-site': 'same-origin',
};

export const wallhavenHeaders = {
  ...commonHeaders,
  accept: 'text/html, */*; q=0.01',
  priority: 'u=1, i',
  referer: 'https://wallhaven.cc/search',
  'sec-ch-ua-arch': '"x86"',
  'sec-ch-ua-bitness': '"64"',
  'sec-ch-ua-full-version': '"130.0.2849.46"',
  'sec-ch-ua-full-version-list':
    '"Chromium";v="130.0.6723.59", "Microsoft Edge";v="130.0.2849.46", "Not?A_Brand";v="99.0.0.0"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-model': '""',
  'sec-ch-ua-platform-version': '"6.8.0"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'x-requested-with': 'XMLHttpRequest',
};

export const wallpaperflareHeaders = {
  ...commonHeaders,
  accept:
    // eslint-disable-next-line max-len
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  cookie: 'cookieconsent_status=dismiss',
  priority: 'u=0, i',
  referer: 'https://www.wallpaperflare.com/',
  'sec-ch-ua-mobile': '?0',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
};
