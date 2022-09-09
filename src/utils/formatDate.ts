function formatDate(uglyDate: string): string {
  let niceDate = uglyDate.replace("T", " ");
  niceDate = niceDate.substring(0, niceDate.indexOf("."));
  return niceDate;
}

export default formatDate;
