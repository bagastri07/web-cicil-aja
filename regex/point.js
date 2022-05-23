export const point = (num) => {
  let str = num.toString().split(",");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(",");
};

export const bankNum = (num) => {
  if (num) {
    return num.replace(num.substring(7, 0), "xxxxxx");
  } else {
    return "";
  }
};

export const phoneNum = (num) => {
  if (num) {
    return num.replace(num.substring(0, 11), "+62xxxxxxx");
  } else {
    return "";
  }
};
