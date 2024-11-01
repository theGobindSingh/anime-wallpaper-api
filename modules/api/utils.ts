import puppeteer, { Browser } from 'puppeteer';

let browserInstance: Browser | null = null;

export const getBrowser = async () => {
  if (!browserInstance?.connected) {
    browserInstance = await puppeteer.launch({
      headless: true,
      defaultViewport: { height: 1080, width: 1920 },
    });
  }
  return browserInstance;
};

export const euric = (str: string, usePlus = true) => {
  const uriComponent = encodeURIComponent(str);
  return usePlus ? uriComponent.replace(/%20/gm, '+') : uriComponent;
};

export const getLoopEnd = ({
  numOfImages = '10',
  length,
}: {
  numOfImages: string | undefined;
  length: number;
}) => {
  if (!numOfImages) return length;
  const num = +numOfImages;
  return Number.isNaN(num) ? length : Math.min(num, length);
};
