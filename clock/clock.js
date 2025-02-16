document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.querySelector('#dynamicTable tbody');
  const addRowBtn = document.getElementById('addRowBtn');
  const newTableBtn = document.getElementById('newTableBtn');
  const maxCharsPerLine = 50;

  // Les lagret data fra localStorage (dersom det finnes)
  if (localStorage.getItem('tableData')) {
    tableBody.innerHTML = localStorage.getItem('tableData');
    // Gjenopprett input-listeners for alle cellene i den innlastede tabellen
    tableBody.querySelectorAll('td').forEach(cell => {
      cell.contentEditable = "true";
      cell.addEventListener('input', handleInput);
    });
  }

  // Lagrer tabellens innhold til localStorage
  function saveTableData() {
    localStorage.setItem('tableData', tableBody.innerHTML);
  }

  // Funksjon for å legge til en ny rad
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

  // Input-håndtering: auto-wrap og lagring
  function handleInput(e) {
    autoWrapText(e.target);
    saveTableData();
  }

  // Funksjon som setter inn linjeskift i cellen for hver 50 tegn
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
      placeCursorAtEnd(cell);
    }
  }

  // Setter markøren til slutten i en contenteditable celle
  function placeCursorAtEnd(el) {
    let range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Legg til ny rad via TAB: sjekk om den aktive cellen er siste celle i siste rad
  tableBody.addEventListener('keydown', function(e) {
    if (e.key === "Tab") {
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

  // Legg til ny rad med knappen
  addRowBtn.addEventListener('click', function() {
    addNewRow();
  });

  // Knapp for å starte en ny tabell (tømmer lagret data og tabellens innhold)
  newTableBtn.addEventListener('click', function() {
    if (confirm("Er du sikker på at du vil slette den eksisterende tabellen?")) {
      localStorage.removeItem('tableData');
      tableBody.innerHTML = "";
      addNewRow();
    }
  });
});