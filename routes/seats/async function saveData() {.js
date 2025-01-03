async function saveData() {
  try {
    const response = await fetch('http://localhost:3000/saveSeats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seats: seatData }),
    });
    const result = await response.json();
    alert('Datos guardados correctamente');
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
}
