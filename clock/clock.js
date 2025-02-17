function addRow() {
    let table = document.getElementById("editableTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    let columns = table.rows[0].cells.length;

    for (let i = 0; i < columns; i++) {
        let cell = newRow.insertCell();
        cell.contentEditable = "true";
        cell.addEventListener("click", selectCell);
    }
}

function addColumn() {
    let table = document.getElementById("editableTable").getElementsByTagName('tbody')[0];

    for (let row of table.rows) {
        let cell = row.insertCell();
        cell.contentEditable = "true";
        cell.addEventListener("click", selectCell);
    }
}

let selectedCell = null;

function selectCell(event) {
    selectedCell = event.target;
}

function changeCellColor() {
    if (selectedCell) {
        let colorPicker = document.getElementById("colorPicker");
        selectedCell.style.backgroundColor = colorPicker.value;
    }
}

// Legger til klikkhendelse på eksisterende celler
document.querySelectorAll("td").forEach(cell => {
    cell.addEventListener("click", selectCell);
});
