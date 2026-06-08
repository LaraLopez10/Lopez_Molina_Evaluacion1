const API = "http://localhost:3000/libros";

// POST
async function cargarLibro(event) {
  event.preventDefault();

  const libro = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    stock: Number(document.getElementById("stock").value) || 0
  };

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(libro)
    });

    if (!res.ok) throw new Error("Error al guardar");

    alert("Libro agregado");

    document.querySelector("form").reset();

    getLibros();

  } catch (error) {
    console.error(error);
  }
}

// GET ALL
async function getLibros() {
  try {

    const res = await fetch(API);
    const libros = await res.json();

    const contenedor = document.getElementById("libros");
    contenedor.innerHTML = "";

libros.forEach(l => {

  // Guarda el libro completo para usarlo después
  window["libro_" + l.id] = l;

  let col = document.createElement("div");
  col.className = "col-md-4";

  col.innerHTML = `
    <div class="card shadow-sm mb-4">

      <div class="card-body">

        <span class="badge bg-secondary mb-2">
          ID: ${l.id}
        </span>

        <h5 class="card-title">
          ${l.titulo}
        </h5>

        <p class="card-text">
          Autor: ${l.autor}
        </p>

        <p class="card-text">
          Stock: ${l.stock}
        </p>

        <button
          class="btn btn-warning btn-sm"
          onclick="actualizarLibro(${l.id})">
          Editar
        </button>

        <button
          class="btn btn-danger btn-sm"
          onclick="eliminarLibro(${l.id})">
          Eliminar
        </button>

        <button
          class="btn btn-primary btn-sm mt-2"
          onclick="irAPrestamo(${l.id})">
          Prestar Libro
        </button>

      </div>

    </div>
  `;

  contenedor.appendChild(col);

});

  } catch (error) {
    console.error(error);
  }
}

window.onload = getLibros;

// GET BY ID
async function buscarLibro() {

  const id = document.getElementById("buscarId").value;

  if (!id) {
    alert("Ingrese un ID");
    return;
  }

  try {

    const res = await fetch(`${API}/${id}`);

    if (!res.ok) {
      throw new Error();
    }

    const l = await res.json();

    const contenedor = document.getElementById("libros");

    contenedor.innerHTML = `
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>${l.titulo}</h5>
            <p>Autor: ${l.autor}</p>
            <p>Stock: ${l.stock}</p>
          </div>
        </div>
      </div>
    `;

  } catch (error) {
    alert("Libro no encontrado");
  }
}

// DELETE
async function eliminarLibro(id) {

  if (!confirm("¿Seguro que querés eliminar este libro?")) return;

  try {

    const res = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error();
    }

    alert("Libro eliminado");

    getLibros();

  } catch (error) {
    console.error(error);
  }
}

// PUT
async function actualizarLibro(id) {

  const titulo = prompt("Nuevo título:");
  const autor = prompt("Nuevo autor:");
  const stock = prompt("Nuevo stock:");

  if (!titulo || !autor || !stock) {
    alert("Complete todos los campos");
    return;
  }

  const libroActualizado = {
    titulo,
    autor,
    stock: Number(stock)
  };

  try {

    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(libroActualizado)
    });

    if (!res.ok) {
      throw new Error();
    }

    alert("Libro actualizado");

    getLibros();

  } catch (error) {
    console.error(error);
  }
}

//LOGIN
// LOGIN

async function login(event) {

    event.preventDefault();

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    try {

        const res = await fetch(
            "http://localhost:3000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuario,
                    password
                })
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.mensaje);
            return;
        }

        localStorage.setItem(
    "usuario",
    JSON.stringify({
        id: data.id,
        usuario: data.usuario
    })
);

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

    }
}


// REGISTRO

async function registrar(event) {

    event.preventDefault();

    const usuario =
        document.getElementById("nuevoUsuario").value;

    const password =
        document.getElementById("nuevoPassword").value;

    try {

        const res = await fetch(
            "http://localhost:3000/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuario,
                    password
                })
            }
        );

        const data = await res.json();

        alert(data.mensaje);

    } catch (error) {

        console.error(error);

    }
}


//PRESTAMO
function irAPrestamo(id) {

    const libro = window["libro_" + id];

    localStorage.setItem(
        "libroSeleccionado",
        JSON.stringify(libro)
    );

    window.location.href = "./prestamo.html";
}

async function confirmarPrestamo() {

    const libro = JSON.parse(
        localStorage.getItem(
            "libroSeleccionado"
        )
    );

    if (!libro) {

        alert(
            "No se encontró el libro seleccionado"
        );

        return;
    }

    const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuario")
);

if (!usuarioLogueado) {

    alert("Debe iniciar sesión");

    window.location.href = "login.html";

    return;
}

const usuario_id = usuarioLogueado.id;

    const tipo =
        document.getElementById(
            "tipoPrestamo"
        ).value;

    let fechaPrestamo =
        new Date();

    let fechaDevolucion =
        new Date();

    if (tipo === "premium") {

        fechaDevolucion.setDate(
            fechaDevolucion.getDate() + 30
        );

    } else {

        fechaDevolucion.setDate(
            fechaDevolucion.getDate() + 7
        );

    }

    const prestamo = {

        libro_id: libro.id,

        usuario_id: usuario_id,

        fecha_prestamo:
            fechaPrestamo
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),

        fecha_devolucion:
            fechaDevolucion
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),

        estado: "prestado",

        tipo: tipo

    };

    console.log(prestamo);

    try {

        const respuesta =
            await fetch(
                "http://localhost:3000/prestamos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify(
                        prestamo
                    )
                }
            );

        const datos =
            await respuesta.json();

        if (!respuesta.ok) {

            alert(
                datos.mensaje ||
                datos.error
            );

            return;
        }

        alert(
            " Préstamo realizado con éxito"
        );

        window.location.href =
            "Index.html";

    } catch (error) {

        console.error(error);

        alert(
            "Error al conectar con el servidor"
        );

    }

}

window.addEventListener("load", () => {

    const nombreLibro =
        document.getElementById(
            "nombreLibro"
        );

    if (!nombreLibro) return;

    const libro =
        JSON.parse(
            localStorage.getItem(
                "libroSeleccionado"
            )
        );

    if (!libro) return;

    document.getElementById(
        "nombreLibro"
    ).textContent =
        libro.titulo;

    document.getElementById(
        "autorLibro"
    ).textContent =
        "Autor: " + libro.autor;

    const usuarioLogueado =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    if (usuarioLogueado) {

        document.getElementById(
            "usuarioPrestamo"
        ).textContent =
            usuarioLogueado.usuario;
    }

});

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}