import puppeteer, { Browser } from 'puppeteer';

var browserInstance: Browser | null = null;

export const getBrowser = async () => {
  if (!browserInstance || !browserInstance?.connected) {
    browserInstance = await puppeteer.launch({
      headless: true,
      defaultViewport: { height: 1080, width: 1920 },
    });
  }
  return browserInstance;
};

export const euric = (str: string, usePlus: boolean = true) => {
  const uriComponent = encodeURIComponent(str);
  return usePlus ? uriComponent.replace(/\%20/gm, '+') : uriComponent;
};

export const getLoopEnd = (numOfImages: string | undefined, length: number) => {
  if (!numOfImages) return length;
  const num = +numOfImages;
  return isNaN(num) ? length : num;
};
