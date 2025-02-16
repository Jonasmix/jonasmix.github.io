document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.querySelector('#dynamicTable tbody');
  const addRowBtn = document.getElementById('addRowBtn');
  const newTableBtn = document.getElementById('newTableBtn');
  const maxCharsPerLine = 50;

  // Legg til event listeners for knappene
  addRowBtn.addEventListener('click', addNewRow);
  newTableBtn.addEventListener('click', resetTable);

  // Last inn tidligere lagret tabell
  loadTable();

  function loadTable() {
    if (localStorage.getItem('tableData')) {
      tableBody.innerHTML = localStorage.getItem('tableData');
      tableBody.querySelectorAll('td').forEach(cell => {
        cell.contentEditable = "true";
        cell.addEventListener('input', handleInput);
      });
    }
  }

  function saveTableData() {
    localStorage.setItem('tableData', tableBody.innerHTML);
  }

  function addNewRow() {
    const newRow = tableBody.insertRow();
    for (let i = 0; i < 4; i++) {
      const cell = newRow.insertCell();
      cell.contentEditable = "true";
      cell.addEventListener('input', handleInput);
    }
    saveTableData();
  }

  function resetTable() {
    if (confirm("Er du sikker på at du vil slette tabellen?")) {
      localStorage.removeItem('tableData');
      tableBody.innerHTML = "";
      addNewRow();
    }
  }

  function handleInput(e) {
    autoWrapText(e.target);
    saveTableData();
  }

  function autoWrapText(cell) {
    let rawText = cell.innerText.replace(/\n/g, "");
    let newText = "";
    for (let i = 0; i < rawText.length; i += maxCharsPerLine) {
      newText += rawText.substr(i, maxCharsPerLine);
      if (i + maxCharsPerLine < rawText.length) {
        newText += "\n";
      }
    }
    if (cell.innerText !== newText) {
      cell.innerText = newText;
      placeCaretAtEnd(cell);
    }
  }

  function placeCaretAtEnd(el) {
    let range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  tableBody.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      const activeCell = document.activeElement;
      if (activeCell && activeCell.tagName === "TD") {
        const lastRow = tableBody.rows[tableBody.rows.length - 1];
        const lastCell = lastRow.cells[lastRow.cells.length - 1];
        if (activeCell === lastCell) {
          e.preventDefault();
          addNewRow();
        }
      }
    }
  });
});