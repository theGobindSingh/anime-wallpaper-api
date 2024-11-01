import {
  wallhavenOrderOptions,
  wallhavenSortingOptions,
} from '@modules/api/constants';

export interface ApiResponse {
  isSuccessful: boolean;
  data?: {
    urls: string[];
    currentPage?: number;
    hasNextPage?: boolean;
  };
  message?: string;
  err?: string;
}

export interface WallpaperflareQuery {
  onlyMobile?: boolean;
  minWidth?: string;
  minHeight?: string;
}

export interface WallhavenQuery {
  categories?: ('general' | 'anime' | 'people')[];
  isAi?: string;
  nsfw?: string;
  exactResolution?: string;
  atLeastResolution?: string;
  ratios?: string;
  sort?: keyof typeof wallhavenSortingOptions;
  order?: keyof typeof wallhavenOrderOptions;
}

interface QueryMap {
  wallpaperflare: WallpaperflareQuery;
  wallhaven: WallhavenQuery;
}

export type Query<S extends keyof QueryMap = keyof QueryMap> = {
  source?: S;
  page?: string;
  q?: string;
  numOfImages?: string;
} & QueryMap[S];

export type QueryWithoutSource<S extends keyof QueryMap> = Omit<
  Query<S>,
  'source'
>;

export type KatputliFn<S extends keyof QueryMap> = (
  props: QueryWithoutSource<S>,
) => Promise<NonNullable<ApiResponse['data']>>;
