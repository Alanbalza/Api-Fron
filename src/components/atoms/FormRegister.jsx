import React, { useState } from "react";
import Swal from "sweetalert2";
import "../../assets/styles/FormRegister.css";

function RegisterForm() {
  const formDataF = React.useRef();
  const [registeredEmails, setRegisteredEmails] = useState([]);

  const handlerClick = (e) => {
    e.preventDefault();
    const formData = new FormData(formDataF.current);
    const userEmail = formData.get("correo");

    if (!validateEmail(userEmail)) {
      Swal.fire("Error", "Por favor ingresa un correo electrónico válido.", "error");
      return;
    }

    if (isEmailRegistered(userEmail)) {
      Swal.fire("Error", "El correo electrónico ya está en uso.", "error");
      return;
    }

    let URI = "http://localhost:3000/Users";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nombre: formData.get("name"),
        Telefono: formData.get("telefono"),
        Correo: userEmail,
      }),
    };
    fetch(URI, options)
      .then((response) => response.json())
      .then((name) => {
        setRegisteredEmails([...registeredEmails, userEmail]);
        alert(JSON.stringify(name));
      });

    Swal.fire({
      position: "top-end",
      width: 200,
      icon: "success",
      title: "Usuario Registrado",
      text: "Gracias",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isEmailRegistered = (email) => {
    return registeredEmails.includes(email);
  };

  return (
    <div className="formulario">
      <div className="form_Register">
        <form ref={formDataF}>
          <div className="Colm">
            <div className="text">
              <label className="caption" htmlFor="name">
                Nombre
              </label>
              <input className="inp" type="text" id="name" name="name" />
            </div>
            <div className="text">
              <label className="caption" htmlFor="telefono">
                Telefono
              </label>
              <input className="inp" type="number" id="telefono" name="telefono" />
            </div>
            <div className="text">
              <label className="caption">Correo</label>
              <input className="inp" type="text" name="correo" />
            </div>
          </div>
          <div>
            <button className="boton" onClick={handlerClick}>
              Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function DeleteUserView() {
  const [Correo, setCorreoUsuario] = useState("");
  const eliminarUsuario = () => {
    if (Correo.trim() === "") {
      Swal.fire("Error", "Por favor ingresa un correo válido.", "error");
      return;
    }

    Swal.fire({
      title: "Eliminar Usuario",
      text: `¿Estás seguro de eliminar al usuario con correo ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        let URI = `http://localhost:3000/USERS/${Correo}`;
        let options = {
          method: "DELETE",
        };
        fetch(URI, options)
          .then((response) => response.json())
          .then((data) => {
            Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
          })
          .catch((error) => {
            console.error("Error al eliminar el usuario:", error);
            Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
          });
      }
    });
  };

  return (
    <div className="formulario">
      <div className="form_Register">
        <div>
          <h2>Eliminar Usuario</h2>
          <div className="text">
            <label className="caption" required >Correo del Usuario</label>
            <input
              className="inp"
              type="text"
              value={Correo}
              onChange={(e) => setCorreoUsuario(e.target.value)}
            />
          </div>
          <div>
            <button className="boton" onClick={eliminarUsuario}>
              Eliminar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <RegisterForm />
      <DeleteUserView />
    </div>
  );
}

export default App;
