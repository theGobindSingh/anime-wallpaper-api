import apiWala, { wallhavenHeaders } from '@modules/api/axios';
import { euric, getLoopEnd } from '@modules/api/utils';
import { KatputliFn, QueryWithoutSource } from '@project-types';
import { JSDOM } from 'jsdom';

const getUrl = ({
  categories,
  isAi,
  nsfw,
  page = '1',
  q = 'anime',
}: QueryWithoutSource<'wallhaven'>) => {
  const url = new URL('https://wallhaven.cc/search');
  url.searchParams.append('page', page);
  url.searchParams.append('q', euric(q));
  if (categories) {
    let general = 0;
    let anime = 0;
    let people = 0;
    if (categories.includes('general')) {
      general = 1;
    }
    if (categories.includes('anime')) {
      anime = 1;
    }
    if (categories.includes('people')) {
      people = 1;
    }
    url.searchParams.append('categories', `${general}${anime}${people}`);
  }
  if (isAi === 'true') {
    url.searchParams.append('ai_art_filter', '0');
  }
  if (nsfw === 'true') {
    url.searchParams.append('nsfw', '010');
  }
  // few more filters to be added later
  return url.toString();
};

export const katputliForWallhaven: KatputliFn<'wallhaven'> = async ({
  numOfImages,
  ...props
}) => {
  const url = getUrl(props);
  const { data } = await apiWala.get(url, { headers: wallhavenHeaders });
  const dom = new JSDOM(data);
  const rawImgs = Array.from(dom.window.document.querySelectorAll('img') ?? []);
  const urls: string[] = [];
  const loopEnd = getLoopEnd(numOfImages, rawImgs.length);
  for (let i = 0; i < loopEnd; i += 1) {
    const imgUrl = rawImgs[i]?.getAttribute('data-src');
    if (!imgUrl) continue;
    const urlSplit = imgUrl.split('/');
    const id = urlSplit?.[urlSplit.length - 1]?.split('.')?.[0];
    if (!id) continue;
    const downloadUrl = `https://wallhaven.cc/w/${id}`;
    const { data: downloadData } = await apiWala.get(downloadUrl, {
      headers: wallhavenHeaders,
    });
    const downloadDom = new JSDOM(downloadData);
    const downloadImgUrl = downloadDom.window.document
      .querySelector('img#wallpaper')
      ?.getAttribute('src');
    if (!downloadImgUrl) continue;
    urls.push(downloadImgUrl);
  }
  return { urls };
};
