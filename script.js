// Lista de cursos de ejemplo con prerrequisitos
const cursos = [
  { id: "MAT1920", nombre: "Números", prerreq: [] },
  { id: "MAT1930", nombre: "Geometría", prerreq: ["MAT1920"] },
  { id: "EDU0310", nombre: "Aprendizaje y Desarrollo", prerreq: [] },
  { id: "EDU0315", nombre: "Desarrollo del Escolar", prerreq: ["EDU0310"] },
  { id: "EDU0318", nombre: "Currículum en la Educación Básica", prerreq: [] },
  { id: "EDU0330", nombre: "Didáctica de la Lectura", prerreq: ["EDU0318"] }
];

// Estado guardado en el navegador
let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

// Muestra los cursos en pantalla
function renderCursos() {
  const container = document.getElementById("cursos-container");
  container.innerHTML = "";

  cursos.forEach(curso => {
    const aprobado = aprobados.includes(curso.id);
    const desbloqueado = curso.prerreq.every(pr => aprobados.includes(pr));

    const div = document.createElement("div");
    div.className = "curso " + (aprobado ? "aprobado" : desbloqueado ? "desbloqueado" : "bloqueado");
    div.innerHTML = `
      <strong>${curso.nombre}</strong><br/>
      <em>${curso.id}</em><br/>
      Prerrequisitos: ${curso.prerreq.length ? curso.prerreq.join(", ") : "Ninguno"}<br/>
      <button ${aprobado || !desbloqueado ? "disabled" : ""}>
        ${aprobado ? "Aprobado" : "Aprobar"}
      </button>
    `;
    if (!aprobado && desbloqueado) {
      div.querySelector("button").addEventListener("click", () => aprobar(curso.id));
    }
    container.appendChild(div);
  });
}

// Marcar como aprobado y guardar
function aprobar(id) {
  aprobados.push(id);
  localStorage.setItem("aprobados", JSON.stringify(aprobados));
  renderCursos();
}

// Mostrar al cargar
renderCursos();
