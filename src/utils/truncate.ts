const truncate = (fullStr: string, strLen: number, separator: string = '...'): string => {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  let sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars);
};

export default truncate;
