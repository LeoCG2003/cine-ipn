const form = document.getElementById('seatForm');
const container = document.getElementById('seatContainer');

let seatData = []; // Estado de los asientos (1 = ocupado, 0 = vacío)

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const width = parseInt(document.getElementById('width').value);
  const height = parseInt(document.getElementById('height').value);

  generateSeats(width, height);
});

function generateSeats(width, height) {
  container.innerHTML = ''; // Limpiar matriz previa
  seatData = Array.from({ length: height }, () => Array(width).fill(1));

  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
  container.classList.add('grid');

  seatData.forEach((row, y) => {
    row.forEach((seat, x) => {
      const seatDiv = document.createElement('div');
      seatDiv.classList.add('seat');
      seatDiv.dataset.x = x;
      seatDiv.dataset.y = y;

      seatDiv.addEventListener('click', () => toggleSeat(seatDiv, x, y));
      container.appendChild(seatDiv);
    });
  });
}

function toggleSeat(element, x, y) {
  seatData[y][x] = seatData[y][x] === 1 ? 0 : 1;
  element.classList.toggle('empty');
}
