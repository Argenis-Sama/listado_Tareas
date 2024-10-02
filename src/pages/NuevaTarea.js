import Swal from 'sweetalert2';
import { useState } from 'react';
import 'sweetalert2/src/sweetalert2.scss'

export default function NuevaTarea(props) {
    const[titulo, setTitulo] = useState("");
    const[descripcion, setDescripcion] = useState("");
    const[estado, setEstado] = useState(0);

    const enviarFormulario = async (event) => {
        event.preventDefault();
        if(estado === 0){
            Swal.fire({
                title: 'Error',
                text: 'Debe seleccionar un estado',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
            return;
        }
        const data = {
            titulo: titulo, 
            descripcion: descripcion,
            estado: estado,
            accion:"c",
        }
        try {
            const reponse= await fetch('http://192.168.100.32/php/tareas.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if(reponse.ok){
                Swal.fire({
                    title: 'Tarea creada',
                    text: 'La tarea ha sido creada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'http://192.168.100.32:3000/';
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al crear la tarea '+error,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'http://192.168.100.32:3000/';
                }
            });
        }
    }

    return(
        <form onSubmit={enviarFormulario} className='container mt-4'>
            <div className="form-group">
                <label htmlFor="titulo">Titulo</label>
                <input type="text" className="form-control" id="titulo" placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="descripcion">Descripcion</label>
                <textarea className="form-control" id="descripcion" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select className="form-control" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="0">Selecione el estado</option>
                    <option value="1">Completada</option>
                    <option value="2">En progreso</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
        </form>
    )
};
