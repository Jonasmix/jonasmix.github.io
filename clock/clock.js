document.addEventListener("DOMContentLoaded", () => {
    ensureTableHasContent();
});

function ensureTableHasContent() {
    let table = document.getElementById("editableTable").getElementsByTagName("tbody")[0];
    if (table.rows.length === 0) {
        addRow(); // Legger til en rad hvis tabellen er tom
    }
}

function addRow() {
    let table = document.getElementById("editableTable").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow();
    
    let colCount = table.rows[0] ? table.rows[0].cells.length : 2; // Standard 2 kolonner hvis tom
    
    for (let i = 0; i < colCount; i++) {
        let cell = newRow.insertCell();
        cell.contentEditable = "true";
        cell.addEventListener("click", selectCell);
    }
}

function addColumn() {
    let table = document.getElementById("editableTable").getElementsByTagName("tbody")[0];

    if (table.rows.length === 0) {
        addRow(); // Sørger for minst én rad før vi legger til kolonner
    }

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
