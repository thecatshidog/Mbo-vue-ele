export function urlParse() {
  const url: string = window.location.search;
  const obj: {[key: string]: string} = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr: string[] | null = url.match(reg);

  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=');
      const key: string = decodeURIComponent(tempArr[0]);
      const value: string = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    });
  }
  return obj;
}
export default urlParse;
