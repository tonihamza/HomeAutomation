const grid = document.getElementById('grid');
const buttons = document.querySelectorAll('.button');

// Create 20x20 grid, initially empty
for (let i = 0; i < 400; i++) {
  const cell = document.createElement('div');
  cell.classList.add('grid-cell');
  cell.setAttribute('data-id', i);
  grid.appendChild(cell);
}

// Add drag-and-drop functionality for buttons
let draggedButton = null;

buttons.forEach(button => {
  button.addEventListener('dragstart', e => {
    draggedButton = e.target;
  });

  button.addEventListener('dragend', () => {
    draggedButton = null;
  });
});

grid.addEventListener('dragover', e => {
  e.preventDefault();
  const cell = e.target;
  if (cell.classList.contains('grid-cell')) {
    cell.classList.add('hover');
  }
});

grid.addEventListener('dragleave', e => {
  const cell = e.target;
  if (cell.classList.contains('grid-cell')) {
    cell.classList.remove('hover');
  }
});

grid.addEventListener('drop', e => {
  e.preventDefault();
  const cell = e.target;

  if (cell.classList.contains('grid-cell') && draggedButton) {
    cell.classList.remove('hover');

    // Find the starting position of the drop
    const cellIndex = Array.from(grid.children).indexOf(cell);

    // Determine how many columns and rows the button will span based on the size of the button
    const buttonWidthInCells = Math.ceil(draggedButton.offsetWidth / cell.offsetWidth);
    const buttonHeightInCells = Math.ceil(draggedButton.offsetHeight / cell.offsetHeight);

    // If the cell is empty, place the button and span over multiple cells
    if (!cell.hasChildNodes()) {
      const newButton = draggedButton.cloneNode(true);
      newButton.setAttribute('draggable', 'true');
      newButton.style.gridColumn = `${cellIndex % 20 + 1} / span ${buttonWidthInCells}`;
      newButton.style.gridRow = `${Math.floor(cellIndex / 20) + 1} / span ${buttonHeightInCells}`;
      cell.appendChild(newButton);

      // Enable moving the newly created button
      newButton.addEventListener('dragstart', e => {
        draggedButton = e.target;
      });

      newButton.addEventListener('dragend', () => {
        draggedButton = null;
      });
    }
  }
});
