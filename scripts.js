const grid = document.getElementById('grid');
const buttons = document.querySelectorAll('.button');

// Create 20x20 grid, initially empty
for (let i = 0; i < 400; i++) {
  const cell = document.createElement('div');
  cell.classList.add('grid-cell');
  cell.setAttribute('data-id', i);
  cell.setAttribute('draggable', 'false'); // Prevent grid cells from being dragged
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

    // If the cell is empty, create a new button
    if (!cell.hasChildNodes()) {
      const newButton = draggedButton.cloneNode(true);
      newButton.setAttribute('draggable', 'true');
      cell.appendChild(newButton);

      // Enable moving the newly created button
      newButton.addEventListener('dragstart', e => {
        draggedButton = e.target;
      });

      newButton.addEventListener('dragend', () => {
        draggedButton = null;
      });
    } else {
      // Move the existing button to the new cell
      const currentButton = cell.querySelector('button');
      if (currentButton) {
        currentButton.parentElement.appendChild(draggedButton);
      }
    }
  }
});
