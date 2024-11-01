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
  exactResolution?: string | string[];
  atLeastResolution?: string;
  sort?:
    | 'relevance'
    | 'random'
    | 'date_added'
    | 'views'
    | 'favorites'
    | 'toplist'
    | 'hot';
  order?: 'desc' | 'asc';
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
