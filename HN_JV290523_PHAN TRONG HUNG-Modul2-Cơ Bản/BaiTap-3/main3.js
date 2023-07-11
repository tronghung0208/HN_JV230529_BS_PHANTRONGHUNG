let input = prompt("Nhập tháng và năm(aa/bbbb)");
let [month, year] = input.split("/");

month = +month;
year = +year;

let theLastDayOfTheMonth;

switch (month) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    theLastDayOfTheMonth = 31;
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    theLastDayOfTheMonth = 30;
    break;
  case 2:
    if (
      (year % 4 === 0 && year % 100 !== 0) ||
      (year % 400 === 0 && year % 100 === 0)
    ) {
      theLastDayOfTheMonth = 29;
    } else {
      theLastDayOfTheMonth = 28;
    }
    break;
  default:
    alert("Nhập năm không hợp lệ");
}

if (theLastDayOfTheMonth) {
  alert(`Số ngày trong tháng (${month}/${year}) : ${theLastDayOfTheMonth} ngày.`);
}