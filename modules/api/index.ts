import { katputliForWallhaven } from '@modules/api/wallhaven';
import { katputliForWallpaperflare } from '@modules/api/wallpaperflare';
import { KatputliFn } from '@project-types';

export const katputli: KatputliFn<any> = async ({ source, ...rest }) => {
  switch (source) {
    case 'wallpaperflare':
      return await katputliForWallpaperflare(rest);
    case 'wallhaven':
      return await katputliForWallhaven(rest);
    default:
      return await katputliForWallpaperflare(rest);
  }
};
