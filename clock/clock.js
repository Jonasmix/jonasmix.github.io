document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.querySelector('#dynamicTable tbody');
  const addRowBtn = document.getElementById('addRowBtn');
  const newTableBtn = document.getElementById('newTableBtn');
  const maxCharsPerLine = 50;

  // Les lagret data fra localStorage (dersom det finnes)
  if (localStorage.getItem('tableData')) {
    tableBody.innerHTML = localStorage.getItem('tableData');
    // Gjenopprett innstilling av contenteditable og input-event for hver celle
    tableBody.querySelectorAll('td').forEach(cell => {
      cell.contentEditable = "true";
      cell.addEventListener('input', handleInput);
    });
  }

  // Lagrer tabellens innhold til localStorage
  function saveTableData() {
    localStorage.setItem('tableData', tableBody.innerHTML);
  }

  // Legger til en ny rad med fire celler
  function addNewRow() {
    const newRow = tableBody.insertRow();
    for (let i = 0; i < 4; i++) {
      const cell = newRow.insertCell();
      cell.contentEditable = "true";
      // Legg til input-event slik at vi får auto-linjeskift og lagring
      cell.addEventListener('input', handleInput);
    }
    newRow.cells[0].focus();
    saveTableData();
  }

  // Håndterer input i en celle: auto-wrap og lagring
  function handleInput(e) {
    autoWrapText(e.target);
    saveTableData();
  }

  // Funksjon som setter inn et linjeskift (\n) for hver 50 tegn
  function autoWrapText(cell) {
    // Fjern eksisterende linjeskift for å få en "ren" streng
    let rawText = cell.innerText.replace(/\n/g, "");
    let newText = "";
    for (let i = 0; i < rawText.length; i += maxCharsPerLine) {
      newText += rawText.substr(i, maxCharsPerLine);
      // Legg til linjeskift hvis det ikke er slutten av teksten
      if (i + maxCharsPerLine < rawText.length) {
        newText += "\n";
      }
    }
    // Oppdater kun cellen dersom teksten har endret seg
    if (cell.innerText !== newText) {
      cell.innerText = newText;
      placeCaretAtEnd(cell);
    }
  }

  // Setter markøren til slutten av teksten i en contenteditable celle
  function placeCaretAtEnd(el) {
    let range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Legg til ny rad via TAB: sjekk om den aktive cellen er siste celle i siste rad
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

  // "Ny tabell"-knappen: sletter lagret data og starter med en tom tabell
  newTableBtn.addEventListener('click', function() {
    if (confirm("Er du sikker på at du vil starte en ny tabell?")) {
      localStorage.removeItem('tableData');
      tableBody.innerHTML = "";
      addNewRow();
    }
  });
});