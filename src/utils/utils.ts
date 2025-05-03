export const random = (len: number): string => {
  let options: string =
    "fasdfhiuwehjqwhussdnfiauhfuhsahashdfhdaF665548646841003598";
  let answer = "";
  for (let i = 0; i < len; i++) {
    answer += options[Math.trunc(Math.random() * options.length)];
  }
  return answer;
};
