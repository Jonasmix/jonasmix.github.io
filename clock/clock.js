let selectedCell = null;

function addRow() {
    let table = document.getElementById("tableBody");
    let newRow = table.insertRow();
    let colCount = table.rows[0].cells.length; // Antall kolonner i første rad

    for (let i = 0; i < colCount; i++) {
        let cell = newRow.insertCell();
        cell.contentEditable = "true";
        cell.addEventListener("click", selectCell);
    }
}

function addColumn() {
    let table = document.getElementById("tableBody");

    for (let row of table.rows) {
        let cell = row.insertCell();
        cell.contentEditable = "true";
        cell.addEventListener("click", selectCell);
    }
}

function selectCell(event) {
    selectedCell = event.target;
}

function changeCellColor() {
    if (selectedCell) {
        let colorPicker = document.getElementById("colorPicker");
        selectedCell.style.backgroundColor = colorPicker.value;
    }
}
