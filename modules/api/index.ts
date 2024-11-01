/* eslint-disable import/prefer-default-export */
import { katputliForWallhaven } from '@modules/api/wallhaven';
import { katputliForWallpaperflare } from '@modules/api/wallpaperflare';
import { KatputliFn } from '@project-types';

export const katputli: KatputliFn<any> = async ({ source, ...rest }) => {
  switch (source) {
    case 'wallpaperflare':
      return katputliForWallpaperflare(rest);
    case 'wallhaven':
      return katputliForWallhaven(rest);
    default:
      return katputliForWallpaperflare(rest);
  }
};
