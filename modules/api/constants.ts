export const wallhavenSortingOptions = {
  relevance: 'relevance',
  random: 'random',
  date_added: 'date_added',
  views: 'views',
  favorites: 'favorites',
  toplist: 'toplist',
  hot: 'hot',
};

export const wallhavenOrderOptions = {
  desc: 'desc',
  asc: 'asc',
};

export const wallhaven: {
  possibleRatios: Record<string, string>;
  validResolutionRegex: RegExp;
  sortingOptions: typeof wallhavenSortingOptions;
  orderingOptions: typeof wallhavenOrderOptions;
} = {
  possibleRatios: {
    landscape: 'landscape',
    portrait: 'portrait',
    '16x9': '16x9',
    '16x10': '16x10',
    '21x9': '21x9',
    '9x16': '9x16',
  },
  validResolutionRegex: /^\d+x\d+$/,
  sortingOptions: wallhavenSortingOptions,
  orderingOptions: wallhavenOrderOptions,
};
