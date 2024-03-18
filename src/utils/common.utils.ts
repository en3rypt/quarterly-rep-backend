export function toRoman(num: number) {
  const romanMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let result = "";
  for (const [romanNumeral, decimalValue] of Object.entries(romanMap)) {
    while (num >= decimalValue) {
      result += romanNumeral;
      num -= decimalValue;
    }
  }

  return result;
}

export function formatDateString(startDate: string, endDate: string) {
  let sd: Date | undefined;
  let ed: Date | undefined;

  if (typeof startDate === 'string') {
      sd = new Date(startDate);
  }
  if (typeof endDate === 'string') {
      ed = new Date(endDate);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startYear = sd ? sd.getUTCFullYear() : "";
  const startMonth = sd ? months[sd.getUTCMonth()] : "";

  const endYear = ed ? ed.getUTCFullYear() : "";
  const endMonth = ed ? months[ed.getUTCMonth()] : "";

  const formattedString = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;

  return formattedString;
}
