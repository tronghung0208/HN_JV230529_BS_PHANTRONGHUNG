//Dùng hàm sort
let arr = [3, -6, 100, 38, 49, 12, 8, -1];

arr.sort(function (a, b) {
  return b - a;
});

console.log("Dãy số giảm dần: " + arr);

// không dùng hàm sort

// let arr = [3, -6, 100, 38, 49, 12, 8, -1];
// for (i = 0; i < arr.length; i++) {
//   for (j = i; j < arr.length; j++) {
//     if (arr[i] < arr[j]) {
//       let compareWith = arr[i];
//       arr[i] = arr[j];
//       arr[j] = compareWith;
//     }
//   }
// }
// console.log("Dãy số giảm dần: " + arr);
