document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("dynamicTable").getElementsByTagName("tbody")[0];

    table.addEventListener("keydown", function (event) {
        if (event.key === "Tab") {
            let activeElement = document.activeElement;
            
            if (activeElement && activeElement.tagName === "TD") {
                let row = activeElement.parentElement;
                let lastRow = table.rows[table.rows.length - 1];
                let lastCell = lastRow.cells[lastRow.cells.length - 1];

                if (activeElement === lastCell) {
                    event.preventDefault();
                    addNewRow();
                }
            }
        }
    });

    function addNewRow() {
        let newRow = table.insertRow();
        for (let i = 0; i < 4; i++) {
            let cell = newRow.insertCell();
            cell.contentEditable = "true";
        }
        newRow.cells[0].focus();
    }
});