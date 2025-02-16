document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("dynamicTable").getElementsByTagName("tbody")[0];
  const addRowBtn = document.getElementById("addRowBtn");
  const maxCharsPerLine = 50;

  // Legg til ny rad med Tab-tast i siste celle
  tableBody.addEventListener("keydown", function (event) {
    const activeElement = document.activeElement;
    if (!activeElement || activeElement.tagName !== "TD") return;

    const lastRow = tableBody.rows[tableBody.rows.length - 1];
    const lastCell = lastRow.cells[lastRow.cells.length - 1];

    if (event.key === "Tab" && activeElement === lastCell) {
      event.preventDefault();
      addNewRow();
    }
  });

  // Legg til ny rad ved å klikke på knappen
  addRowBtn.addEventListener("click", function () {
    addNewRow();
  });

  // Automatisk linjeskift i cellene etter 50 tegn
  tableBody.addEventListener("input", function (event) {
    const cell = event.target;
    if (cell.tagName === "TD") {
      autoWrapText(cell);
    }
  });

  function addNewRow() {
    const newRow = tableBody.insertRow();
    for (let i = 0; i < 4; i++) {
      const cell = newRow.insertCell();
      cell.contentEditable = "true";
    }
    newRow.cells[0].focus();
  }

  function autoWrapText(cell) {
    // Fjern alle linjeskift for å få en "ren" tekststreng
    const rawText = cell.innerText.replace(/\n/g, "");
    let newText = "";
    let pos = 0;

    // Sett inn linjeskift for hver blokk med maxCharsPerLine tegn
    while (pos < rawText.length) {
      newText += rawText.substring(pos, pos + maxCharsPerLine);
      pos += maxCharsPerLine;
      if (pos < rawText.length) {
        newText += "\n";
      }
    }

    // Oppdater kun hvis teksten har endret seg (for å unngå unødvendige oppdateringer)
    if (cell.innerText !== newText) {
      cell.innerText = newText;
      placeCursorAtEnd(cell);
    }
  }

  function placeCursorAtEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});