/* eslint-disable */
import apiWala from '@modules/api/axios';
import { euric, getLoopEnd } from '@modules/api/utils';
import { KatputliFn } from '@project-types';
import { JSDOM } from 'jsdom';

export const katputliForWallpaperflare: KatputliFn<'wallpaperflare'> = async ({
  q = 'anime',
  onlyMobile = false,
  minHeight,
  minWidth,
  numOfImages,
}) => {
  const url = new URL('https://wallpaperflare.com/search');
  url.searchParams.append('wallpaper', euric(q));
  if (onlyMobile) {
    url.searchParams.append('mobile', 'ok');
  }
  if (minHeight) {
    url.searchParams.append('height', minHeight);
  }
  if (minWidth) {
    url.searchParams.append('width', minWidth);
  }
  const { data } = await apiWala.get(url.toString());
  const dom = new JSDOM(data);
  const anchors = dom.window.document.querySelectorAll('ul#gallery li a');
  const downloadUrls = Array.from(anchors).map(
    (anchor) => `${anchor.getAttribute('href')}/download`,
  );
  const urls: string[] = [];
  for (let i = 0; i < getLoopEnd(numOfImages, downloadUrls.length); i += 1) {
    if (!downloadUrls[i]) continue;
    const { data } = await apiWala.get(downloadUrls[i]!);
    const downloadDom = new JSDOM(data);
    const imgUrl = downloadDom.window.document
      .querySelector('img#show_img')
      ?.getAttribute('src');
    if (!imgUrl) continue;
    urls.push(imgUrl);
  }
  return { urls };
};
