export const wallhaven: {
  possibleRatios: Record<string, string>;
  validResolutionRegex: RegExp;
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
};
