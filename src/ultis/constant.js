/* eslint-disable no-mixed-operators */
// format like number
export const formatLike = (like) => {
  if (like < 1000) {
    return `${like} người yêu thích`;
  } else if (1000 <= like < 10000) {
    return `${(like / Math.pow(10, 3)).toPrecision(2)}K người yêu thích`;
  } else if (10000 <= like < 100000) {
    return `${(like / Math.pow(10, 3)).toPrecision(3)}K người yêu thích`;
  }
};

// format follow number
export const formatFollow = (num) => {
  if (num > 1000000) {
    return `${Math.round((num * 10) / Math.pow(10, 6)) / 10}M quan tâm`;
  } else if (num > 10000) {
    return `${Math.round((num * 10) / Math.pow(10, 3)) / 10}k quan tâm`;
  } else {
    return `${num} quan tâm`;
  }
};

// format number
export const formatNumber = (x) => {
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
  return x;
};
