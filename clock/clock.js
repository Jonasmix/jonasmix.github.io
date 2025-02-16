document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("dynamicTable").getElementsByTagName("tbody")[0];
    const maxCharsPerLine = 50;

    tableBody.addEventListener("keydown", function (event) {
        let activeElement = document.activeElement;
        
        if (!activeElement || activeElement.tagName !== "TD") return;
        
        let row = activeElement.parentElement;
        let lastRow = tableBody.rows[tableBody.rows.length - 1];
        let lastCell = lastRow.cells[lastRow.cells.length - 1];

        // Legg til ny rad hvis Enter eller Tab trykkes i siste celle
        if ((event.key === "Tab" || event.key === "Enter") && activeElement === lastCell) {
            event.preventDefault();
            addNewRow();
        }
    });

    tableBody.addEventListener("input", function (event) {
        let cell = event.target;
        if (cell.tagName === "TD") {
            autoWrapText(cell);
        }
    });

    function addNewRow() {
        let newRow = tableBody.insertRow();
        for (let i = 0; i < 4; i++) {
            let cell = newRow.insertCell();
            cell.contentEditable = "true";
        }
        newRow.cells[0].focus();
    }

    function autoWrapText(cell) {
        let text = cell.innerText.replace(/\n/g, ""); // Fjern eksisterende linjeskift
        let formattedText = "";

        for (let i = 0; i < text.length; i++) {
            formattedText += text[i];
            if ((i + 1) % maxCharsPerLine === 0) {
                formattedText += "\n"; // Legger til linjeskift etter 50 tegn
            }
        }

        cell.innerText = formattedText; 
        placeCursorAtEnd(cell);
    }

    function placeCursorAtEnd(element) {
        let range = document.createRange();
        let selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});