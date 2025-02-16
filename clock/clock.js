document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document
    .getElementById("dynamicTable")
    .getElementsByTagName("tbody")[0];
  const addRowBtn = document.getElementById("addRowBtn");
  const newTableBtn = document.getElementById("newTableBtn");
  const maxCharsPerLine = 50;

  // Funksjon som lagrer tabellens innhold i localStorage
  function saveTableData() {
    localStorage.setItem("tableData", tableBody.innerHTML);
  }

  // Ved lasting av siden, les lagret data (hvis finnes)
  if (localStorage.getItem("tableData")) {
    tableBody.innerHTML = localStorage.getItem("tableData");
  }

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

  // Legg til ny rad ved klikk på knappen
  addRowBtn.addEventListener("click", function () {
    addNewRow();
  });

  // Knapp for å starte en ny tabell (tømmer lagret innhold)
  newTableBtn.addEventListener("click", function () {
    if (confirm("Er du sikker på at du vil slette den eksisterende tabellen?")) {
      localStorage.removeItem("tableData");
      tableBody.innerHTML = "";
      addNewRow();
    }
  });

  // Automatisk linjeskift i cellene etter 50 tegn
  tableBody.addEventListener("input", function (event) {
    const cell = event.target;
    if (cell.tagName === "TD") {
      autoWrapText(cell);
      saveTableData();
    }
  });

  function addNewRow() {
    const newRow = tableBody.insertRow();
    for (let i = 0; i < 4; i++) {
      const cell = newRow.insertCell();
      cell.contentEditable = "true";
    }
    newRow.cells[0].focus();
    saveTableData();
  }

  function autoWrapText(cell) {
    // Fjerner alle linjeskift for å få en ren tekststreng
    const rawText = cell.innerText.replace(/\n/g, "");
    let newText = "";
    let pos = 0;
    while (pos < rawText.length) {
      newText += rawText.substring(pos, pos + maxCharsPerLine);
      pos += maxCharsPerLine;
      if (pos < rawText.length) {
        newText += "\n";
      }
    }
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