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

export function formatDateString(startDate: Date, endDate: Date) {
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

  const startYear = startDate ? startDate.getUTCFullYear() : "";
  const startMonth = startDate ? months[startDate.getUTCMonth()] : "";

  const endYear = endDate ? endDate.getUTCFullYear() : "";
  const endMonth = endDate ? months[endDate.getUTCMonth()] : "";

  const formattendDateString = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;

  return formattendDateString;
}
