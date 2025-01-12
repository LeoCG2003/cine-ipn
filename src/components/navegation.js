// Mostrar la navegación básica al cargar la página
let navigationHTML = `
  <nav class="navbar navbar-expand-lg navbar-custom py-3">
    <div class="container-fluid px-5">
      <a class="navbar-brand" href="#">🎥 Cines Independientes</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="cartelera.html">Cartelera</a>
          </li>
          <div class="separator"></div> <!-- Separador visual -->
          <li class="nav-item">
            <a class="nav-link" href="verification.html">Iniciar Sesión</a>
          </li>
          <div class="separator"></div> <!-- Separador visual -->
          <li class="nav-item">
            <a class="nav-link" href="#">Contacto</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;

// Inyectar navegación inicial
document.getElementById('navigation').innerHTML = navigationHTML;
