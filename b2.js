// danh sach ho so hanh khach
const passengers = [];

// danh sach ghe trong
const seatList = [
  "12A",
  "12B",
  "12C",
  "13A",
  "13B",
  "13C",
  "14A",
  "14B",
  "14C",
];

// tim hanh khach theo ma PNR
function findPassengerByPnr(pnrCode) {
  return passengers.find((passenger) => passenger.pnrCode === pnrCode);
}

// kiem tra dinh dang giay to
function validateIdNumber(idType, idNumber) {
  if (idType === "1") {
    return /^\d{12}$/.test(idNumber);
  }

  if (idType === "2") {
    return /^[A-Za-z]\d{7,8}$/.test(idNumber);
  }

  return false;
}

// kiem tra so giay to da ton tai
function isIdNumberExists(idNumber) {
  return passengers.some((passenger) => passenger.idNumber === idNumber);
}

// tim ghe con trong tren chuyen bay
function findAvailableSeat(flightNumber) {
  for (let i = 0; i < seatList.length; i++) {
    let seatNumber = seatList[i];

    let seatExists = passengers.some(
      (passenger) =>
        passenger.flightNumber === flightNumber &&
        passenger.seatNumber === seatNumber,
    );

    if (!seatExists) {
      return seatNumber;
    }
  }

  return null;
}

// them ho so hanh khach
function addPassenger() {
  console.log("\n========== THEM HO SO ==========");

  let pnrCode = prompt("Nhap ma PNR:");

  if (pnrCode === null) {
    return;
  }

  pnrCode = pnrCode.trim().toUpperCase();

  if (!/^[A-Z0-9]{5,10}$/.test(pnrCode)) {
    console.log("Ma PNR khong hop le!");
    return;
  }

  if (findPassengerByPnr(pnrCode)) {
    console.log("Ma PNR da ton tai!");
    return;
  }

  let passengerName = prompt("Nhap ho ten hanh khach:");

  if (passengerName === null || passengerName.trim() === "") {
    console.log("Ho ten khong duoc de trong!");
    return;
  }

  passengerName = passengerName.trim();

  let idType = prompt("Chon loai giay to:\n1. CCCD\n2. Ho chieu");

  if (idType === null) {
    return;
  }

  if (idType !== "1" && idType !== "2") {
    console.log("Loai giay to khong hop le!");
    return;
  }

  let idNumber = prompt("Nhap so CCCD/Ho chieu:");

  if (idNumber === null) {
    return;
  }

  idNumber = idNumber.trim().toUpperCase();

  if (!validateIdNumber(idType, idNumber)) {
    console.log("Giay to khong dung dinh dang!");
    return;
  }

  if (isIdNumberExists(idNumber)) {
    console.log("So giay to da ton tai trong he thong!");
    return;
  }

  let flightNumber = prompt("Nhap ma chuyen bay:");

  if (flightNumber === null || flightNumber.trim() === "") {
    console.log("Ma chuyen bay khong duoc de trong!");
    return;
  }

  flightNumber = flightNumber.trim().toUpperCase();

  passengers.push({
    pnrCode: pnrCode,
    passengerName: passengerName,
    idNumber: idNumber,
    flightNumber: flightNumber,
    seatNumber: "",
    isCheckedIn: false,
  });

  console.log("Them ho so thanh cong!");
  console.log("Ma PNR: " + pnrCode);
  console.log("Hanh khach: " + passengerName);
  console.log("Chuyen bay: " + flightNumber);
}

// check-in va cap ghe
function checkInPassenger() {
  let pnrCode = prompt("Nhap ma PNR can check-in:");

  if (pnrCode === null) {
    return;
  }

  pnrCode = pnrCode.trim().toUpperCase();

  let passenger = findPassengerByPnr(pnrCode);

  if (!passenger) {
    console.log("Khong tim thay ho so hanh khach!");
    return;
  }

  if (passenger.isCheckedIn) {
    console.log("Hanh khach da check-in truoc do!");
    return;
  }

  let seatNumber = findAvailableSeat(passenger.flightNumber);

  if (seatNumber === null) {
    console.log("Chuyen bay da het ghe!");
    return;
  }

  passenger.seatNumber = seatNumber;
  passenger.isCheckedIn = true;

  console.log("\nXAC THUC HANH KHACH");
  console.log("Ma PNR: " + passenger.pnrCode);
  console.log("Ho ten: " + passenger.passengerName);
  console.log("So giay to: " + passenger.idNumber);
  console.log("Chuyen bay: " + passenger.flightNumber);
  console.log("So ghe: " + passenger.seatNumber);
  console.log("Ket qua: Xac thuc dinh dang thanh cong");
  console.log("Trang thai: CHECKED IN");
}

// hien thi danh sach hanh khach
function listPassengers() {
  console.log("\n========== DANH SACH HANH KHACH ==========");

  if (passengers.length === 0) {
    console.log("Chua co ho so hanh khach!");
    return;
  }

  console.log(
    "PNR".padEnd(12) +
      "HO TEN".padEnd(24) +
      "CHUYEN BAY".padEnd(14) +
      "GHE".padEnd(8) +
      "CHECK-IN",
  );

  passengers.forEach((passenger) => {
    console.log(
      passenger.pnrCode.padEnd(12) +
        passenger.passengerName.padEnd(24) +
        passenger.flightNumber.padEnd(14) +
        (passenger.seatNumber || "Chua co").padEnd(8) +
        (passenger.isCheckedIn ? "YES" : "NO"),
    );
  });
}

// tra cuu hanh khach
function searchPassenger() {
  let keyword = prompt("Nhap ma PNR hoac ten hanh khach:");

  if (keyword === null || keyword.trim() === "") {
    console.log("Du lieu tim kiem khong hop le!");
    return;
  }

  keyword = keyword.trim().toLowerCase();

  let foundPassengers = passengers.filter(
    (passenger) =>
      passenger.pnrCode.toLowerCase() === keyword ||
      passenger.passengerName.toLowerCase().includes(keyword),
  );

  if (foundPassengers.length === 0) {
    console.log("Khong tim thay hanh khach!");
    return;
  }

  foundPassengers.forEach((passenger) => {
    console.log("------------------------------");
    console.log("PNR: " + passenger.pnrCode);
    console.log("Ho ten: " + passenger.passengerName);
    console.log("Giay to: " + passenger.idNumber);
    console.log("Chuyen bay: " + passenger.flightNumber);
    console.log("So ghe: " + (passenger.seatNumber || "Chua cap"));
    console.log(
      "Trang thai: " +
        (passenger.isCheckedIn ? "CHECKED IN" : "NOT CHECKED IN"),
    );
  });
}

// in the len may bay
function displayBoardingPass() {
  let pnrCode = prompt("Nhap ma PNR de in Boarding Pass:");

  if (pnrCode === null) {
    return;
  }

  pnrCode = pnrCode.trim().toUpperCase();

  let passenger = findPassengerByPnr(pnrCode);

  if (!passenger) {
    console.log("Khong tim thay ho so hanh khach!");
    return;
  }

  if (!passenger.isCheckedIn) {
    console.log("Hanh khach chua check-in!");
    return;
  }

  console.log("\n==============================================");
  console.log("              BOARDING PASS");
  console.log("==============================================");
  console.log("PASSENGER : " + passenger.passengerName);
  console.log("BOOKING  : " + passenger.pnrCode);
  console.log("FLIGHT   : " + passenger.flightNumber);
  console.log("SEAT     : " + passenger.seatNumber);
  console.log("DOCUMENT : " + passenger.idNumber);
  console.log("STATUS   : CHECKED IN");
  console.log("----------------------------------------------");
  console.log(" ||||| || |||| | ||| |||| || ||||| |||| |");
  console.log("==============================================");
  console.log("     PLEASE PROCEED TO SECURITY CHECK");
  console.log("==============================================");
}

// menu chinh
function main() {
  let choice;

  do {
    console.log("\n========== PASSENGER MANAGEMENT ==========");
    console.log("1. Them ho so hanh khach");
    console.log("2. Check-in va cap ghe");
    console.log("3. Hien thi danh sach");
    console.log("4. Tra cuu hanh khach");
    console.log("5. In Boarding Pass");
    console.log("6. Thoat chuong trinh");
    console.log("==========================================");

    let input = prompt("Nhap lua chon (1-6):");

    if (input === null) {
      choice = "6";
    } else {
      choice = input.trim();
    }

    switch (choice) {
      case "1":
        addPassenger();
        break;

      case "2":
        checkInPassenger();
        break;

      case "3":
        listPassengers();
        break;

      case "4":
        searchPassenger();
        break;

      case "5":
        displayBoardingPass();
        break;

      case "6":
        console.log("Da thoat chuong trinh!");
        break;

      default:
        console.log("Lua chon khong hop le!");
    }
  } while (choice !== "6");
}

// khoi chay chuong trinh
main();
