let pairs = [];
let results = {};
let matchTime = '';
let matchLocation = '';
const colors = ["Xanh", "Cam"];

// Lưu thông tin cặp người và màu từ Admin
function saveData() {
    let peopleInput = document.getElementById("people-input").value.split(',');
    let timeInput = document.getElementById("match-time").value;
    let locationInput = document.getElementById("match-location").value;

    if (!matchTime && !matchLocation && timeInput && locationInput) {
        matchTime = timeInput;
        matchLocation = locationInput;
    }

    if (peopleInput.length === 2) {
        pairs.push(peopleInput.map(person => person.trim()));

        // Cập nhật danh sách lựa chọn cho người dùng
        let select = document.getElementById("pair-select");
        let option = document.createElement("option");
        option.value = pairs.length - 1;
        option.text = peopleInput.join(", ");
        select.add(option);

        alert("Thông tin đã được lưu!");
    } else {
        alert("Vui lòng nhập đúng định dạng 2 người.");
    }

    // Xóa ô nhập liệu sau khi lưu
    document.getElementById("people-input").value = '';
    document.getElementById("match-time").value = '';
    document.getElementById("match-location").value = '';

    updateResultTable();
    updateMatchInfo();
}

// Quay xổ số và chọn kết quả ngẫu nhiên
function spinLottery() {
    let selectedPairIndex = document.getElementById("pair-select").value;

    if (selectedPairIndex !== "") {
        if (results[selectedPairIndex]) {
            alert("Cặp này đã được bốc thăm.");
            return;
        }

        let selectedPair = pairs[selectedPairIndex];

        // Trộn ngẫu nhiên thứ tự người và màu
        let shuffledColors = shuffleArray([...colors]);
        results[selectedPairIndex] = [shuffledColors[0], shuffledColors[1]];

        // Hiển thị kết quả cho người dùng
        let result = `${selectedPair[0]} - ${shuffledColors[0]}, ${selectedPair[1]} - ${shuffledColors[1]}`;
        document.getElementById("user-result").innerText = result;

        updateResultTable();
    } else {
        alert("Vui lòng chọn cặp người trước khi quay xổ số.");
    }
}

// Hàm trộn ngẫu nhiên mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Cập nhật bảng kết quả cho Admin
function updateResultTable() {
    let tableBody = document.querySelector("#result-table tbody");
    tableBody.innerHTML = ''; // Xóa nội dung cũ

    let color1Group = [];
    let color2Group = [];

    pairs.forEach((pair, index) => {
        if (results[index]) {
            if (results[index][0] === colors[0]) {
                color1Group.push(pair[0]);
                color2Group.push(pair[1]);
            } else {
                color1Group.push(pair[1]);
                color2Group.push(pair[0]);
            }
        }
    });

    let maxRows = Math.max(color1Group.length, color2Group.length);
    for (let i = 0; i < maxRows; i++) {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${color1Group[i] || ''}</td><td>${color2Group[i] || ''}</td>`;
        tableBody.appendChild(row);
    }
}

// Cập nhật thông tin trận đấu
function updateMatchInfo() {
    document.getElementById("match-info").innerText = `Thời gian thi đấu: ${matchTime}\nĐịa điểm: ${matchLocation}`;
}

// Hàm reset toàn bộ kết quả
function resetLottery() {
    results = {}; // Xóa toàn bộ kết quả
    pairs = []; // Xóa các cặp người
    matchTime = ''; // Xóa thời gian thi đấu
    matchLocation = ''; // Xóa địa điểm thi đấu

    document.getElementById("user-result").innerText = ''; // Xóa kết quả của người dùng
    document.getElementById("match-info").innerText = ''; // Xóa thông tin trận đấu
    let select = document.getElementById("pair-select");
    select.innerHTML = '<option value="" disabled selected>Chọn cặp</option>'; // Reset danh sách cặp người

    updateResultTable(); // Cập nhật lại bảng kết quả
    alert("Kết quả đã được reset!");
}
