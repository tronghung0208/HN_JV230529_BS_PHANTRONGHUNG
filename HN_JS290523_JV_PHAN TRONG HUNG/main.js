let studentList = [
  {
    id: crypto.randomUUID(),
    fullName: "Peter",
    email: "Peter@gmail.com",
    tellNumber: "0963999999",
    address: "Japan",
    gender: "Female",
  },
  {
    id: crypto.randomUUID(),
    fullName: "Jerry",
    email: "Jerry@gmail.com",
    tellNumber: "0963876888",
    address: "Englern",
    gender: "Male",
  },

  {
    id: crypto.randomUUID(),
    fullName: "Taylor",
    email: "Taylor@gmail.com",
    tellNumber: "0963876666",
    address: "California",
    gender: "Male",
  },
  {
    id: crypto.randomUUID(),
    fullName: "Elon Must",
    email: "Elon@gmail.com",
    tellNumber: "0963876868",
    address: "USA",
    gender: "Female",
  },
];

// PHẦN KHAI BÁO DỮ LIỆU

const bodySelector = document.querySelector("tbody");

const nameSelector = document.querySelector("#name");
const emailSelector = document.querySelector("#email");
const telNumberSelector = document.querySelector("#telNumber");
const addressSelector = document.querySelector("#address");
const genderSelector = document.querySelector(".gender-radio:checked");
const submitSelector = document.querySelector(".save-student");

const searchSelector = document.querySelector(".search");
const inputSearchSelector = document.querySelector(".search-value");

const sortSelector = document.querySelector(".sort");

//PHẦN HÀM THỰC THI

// render dữ liệu
function renderStudentList(seachStudent) {
  let newStudentLists = studentList;
  if (seachStudent) {
    newStudentLists = seachStudent;
  }
  let result = "";
  for (let i = 0; i < newStudentLists.length; i++) {
    result =
      result +
      `<tr>
        <td>${i + 1}</td>
        <td>${newStudentLists[i].fullName}</td>
        <td>${newStudentLists[i].email}</td>
        <td>${newStudentLists[i].tellNumber}</td>
        <td>${newStudentLists[i].address}</td>
        <td>${newStudentLists[i].gender}</td>
        <td>
            <button class="btn-edit" data-id="${
              newStudentLists[i].id
            }">Edit</button>
            <button class="btn-denger" data-id="${
              newStudentLists[i].id
            }">Delete</button>
</td>
    </tr>`;
  }
  bodySelector.innerHTML = result;
}

// phần thêm student+ update
function handleAddUpdateStudentList() {
  let namevalue = nameSelector.value;
  let emailValue = emailSelector.value;
  let telNumberValue = telNumberSelector.value;
  let addressValue = addressSelector.value;
  let genderValue = genderSelector.value;
  let emailTest =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let phoneTestVn = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  // validate Name
  if (!namevalue) {
    alert("Tên không được để trống");
    return;
  }

  // validate Email
  if (!emailTest.test(emailValue)) {
    alert("Email không đúng định dạng");
    return;
  }
  // validate phone
  if (!phoneTestVn.test(telNumberValue)) {
    alert("Số điện thoại không đúng định dạng(phải có 10 số)");
    return;
  }

  // validate địa chỉ
  if (!addressValue) {
    alert("Địa chỉ không được để trống");
    return;
  }

  if (submitSelector.classList.contains("update")) {
    let idUpdate = submitSelector.getAttribute("data-id");
    let indexUpdate = studentList.findIndex((item) => item.id === idUpdate);
    studentList[indexUpdate].fullName = namevalue;
    studentList[indexUpdate].email = emailValue;
    studentList[indexUpdate].tellNumber = telNumberValue;
    studentList[indexUpdate].address = addressValue;
    studentList[indexUpdate].gender = genderValue;

    submitSelector.innerText = "Submit";
    submitSelector.classList.remove("update");
    submitSelector.removeAttribute("data-id");
  } else {
    let objStudent = {
      id: crypto.randomUUID(),
      fullName: namevalue,
      email: emailValue,
      tellNumber: telNumberValue,
      address: addressValue,
      gender: document.querySelector(".gender-radio:checked").value,
    };
    studentList.push(objStudent);
    document.querySelector(".styled-table").classList.remove("hide");
    document.querySelector(".none-student").classList.add("noneList");
  }
  document.querySelector("form").reset();

  renderStudentList();
}

// Phần delete+ edit
function handleProcessStudent(event) {
  event.preventDefault();
  let clicked = event.target;

  if (clicked.classList.contains("btn-denger")) {
    if (confirm("Bạn muốn xóa không")) {
      let idDelete = clicked.getAttribute("data-id");
      let indexDelete = studentList.findIndex((item) => item.id === idDelete);
      console.log(indexDelete);
      studentList.splice(indexDelete, 1);

      submitSelector.innerText = "Submit";
      submitSelector.classList.remove("update");
      submitSelector.removeAttribute("data-id");
    }
    document.querySelector("form").reset();
    if (studentList.length === 0) {
      document.querySelector(".styled-table").classList.add("hide");
      document.querySelector(".none-student").classList.remove("noneList");
    }
  } else if (clicked.classList.contains("btn-edit")) {
    let idEdit = clicked.getAttribute("data-id");
    let indexEdit = studentList.findIndex((item) => item.id === idEdit);

    nameSelector.value = studentList[indexEdit].fullName;
    emailSelector.value = studentList[indexEdit].email;
    telNumberSelector.value = studentList[indexEdit].tellNumber;
    addressSelector.value = studentList[indexEdit].address;
    document.querySelector(
      `input[value =${studentList[indexEdit].gender}]`
    ).checked = true;

    submitSelector.innerText = "Update";
    submitSelector.classList.add("update");
    submitSelector.setAttribute("data-id", idEdit);
  }
  renderStudentList();
}

// search student
function handlerSearchStudent() {
  let inputSearchValue = inputSearchSelector.value.toLowerCase();
  let studenListsSeach = studentList.filter(function (studentItem) {
    return studentItem.fullName.toLocaleLowerCase().includes(inputSearchValue);
  });
  renderStudentList(studenListsSeach);
}

// Sắp xếp anphab
function handlerSortStudents() {
  studentList.sort(function (a, b) {
    let nameStudentA = a.fullName.toLocaleLowerCase();
    let nameStudentB = b.fullName.toLocaleLowerCase();
    if (nameStudentA > nameStudentB) {
      return 1;
    } else if (nameStudentA < nameStudentB) {
      return -1;
    } else {
      return 0;
    }
  });
  renderStudentList();
}

// PHẦN TẠO SỰ KIỆN
renderStudentList();
// theem student
submitSelector.addEventListener("click", handleAddUpdateStudentList);
// xóa +edit

bodySelector.addEventListener("click", handleProcessStudent);

// tìm kiếm học viên
searchSelector.addEventListener("click", handlerSearchStudent);
inputSearchSelector.addEventListener("keyup", handlerSearchStudent);

// sắp xếp anpha b

sortSelector.addEventListener("click", handlerSortStudents);
