document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.querySelector('#dynamicTable tbody');
  const addRowBtn = document.getElementById('addRowBtn');
  const newTableBtn = document.getElementById('newTableBtn');
  const maxCharsPerLine = 50;

  // Laster inn lagret tabell fra localStorage
  function loadTable() {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      tableBody.innerHTML = savedData;
      tableBody.querySelectorAll('td').forEach(cell => {
        cell.contentEditable = "true";
        cell.addEventListener('input', handleInput);
      });
    } else {
      addNewRow(); // Start med én tom rad hvis det ikke er lagret data
    }
  }

  // Lagrer tabellen til localStorage
  function saveTableData() {
    localStorage.setItem('tableData', tableBody.innerHTML);
  }

  // Legger til en ny rad med fire celler
  function addNewRow() {
    const newRow = tableBody.insertRow();
    for (let i = 0; i < 4; i++) {
      const cell = newRow.insertCell();
      cell.contentEditable = "true";
      cell.addEventListener('input', handleInput);
    }
    newRow.cells[0].focus();
    saveTableData();
  }

  // Auto-wrap tekst etter 50 tegn
  function autoWrapText(cell) {
    let rawText = cell.innerText.replace(/\n/g, ""); // Fjern eksisterende linjeskift
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

  // Plasser markøren til slutten av cellen
  function placeCaretAtEnd(el) {
    let range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Håndterer input og lagrer data
  function handleInput(e) {
    autoWrapText(e.target);
    saveTableData();
  }

  // Legg til ny rad via TAB i siste celle
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

  // Legg til ny rad via knappen
  addRowBtn.addEventListener('click', function() {
    addNewRow();
  });

  // "Ny tabell"-knappen: sletter tabellen og lagret data
  newTableBtn.addEventListener('click', function() {
    if (confirm("Er du sikker på at du vil starte en ny tabell?")) {
      localStorage.removeItem('tableData');
      tableBody.innerHTML = "";
      addNewRow();
    }
  });

  // Last inn tabellen ved start
  loadTable();
});