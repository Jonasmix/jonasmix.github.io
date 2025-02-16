document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("dynamicTable").getElementsByTagName("tbody")[0];

    tableBody.addEventListener("keydown", function (event) {
        // Sjekker om tastetrykket er Tab eller Enter
        if (event.key === "Tab" || event.key === "Enter") {
            let activeElement = document.activeElement;
            
            if (activeElement && activeElement.tagName === "TD") {
                let row = activeElement.parentElement;
                let lastRow = tableBody.rows[tableBody.rows.length - 1];
                let lastCell = lastRow.cells[lastRow.cells.length - 1];

                // Dersom det aktive elementet er siste cellen, legg til en ny rad
                if (activeElement === lastCell) {
                    event.preventDefault();
                    addNewRow();
                }
            }
        }
    });

    function addNewRow() {
        let newRow = tableBody.insertRow();
        for (let i = 0; i < 4; i++) {
            let cell = newRow.insertCell();
            cell.contentEditable = "true";
        }
        // Sett fokus på den første cellen i den nye raden
        newRow.cells[0].focus();
    }
});