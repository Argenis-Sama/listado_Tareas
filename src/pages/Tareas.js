/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
export default function Tareas(props) {
  const {tareas, sett}=props;
  const url="http://192.168.100.32/php/tareas.php";
  
  const getdata = async ()=>{
    const data ={
      accion:"r",
    }
    const api= await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data),
    })
    const datos=await api.json();
    sett(datos["datos"]);
  }

  const eliminar = async (tarea)=>{

    Swal.fire({
      title:"¿Seguro que quiere eliminar esta tarea?",
      text:"Esta accion no se pude revertir",
      icon:"warning",
      showCancelButton: true,
      confirmButtonText:"Eliminar Tarea"
    }).then(async (result)=>{
      if(result.isConfirmed){
        const data ={
          accion:"d",
          id:tarea
        }
        const api=await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(data),
        });
        if(api.ok){
          Swal.fire({
            title: "Eliminado!",
            text: "La tarea fue eliminada Correctamente",
            icon: "success"
          });
          getdata();
        }
        
      }
    })
  }

  const completar =async(tarea,tipo)=>{
    const marcar = tipo===2?"Completado":"Incompleto"
    Swal.fire({
      title:"Marcar esta tarea como: "+marcar,
      text:"Esto actualizara la tarea",
      icon:"question",
      showCancelButton: true,
      confirmButtonText:"Actualizar Tarea"
    }).then(async (result)=>{
      if(result.isConfirmed){
        const data ={
          accion:"uf",
          id:tarea,
          estado:tipo===2?1:2
        }
        const api=await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(data),
        });
        if(api.ok){
          Swal.fire({
            title: "Actualizado!",
            text: "La tarea fue actulizada Correctamente",
            icon: "success"
          });
          getdata();
        }
        
      }
    })
  }

  useEffect(()=>{
    getdata();
  },[])

  return(
      <div className="card text-center w-75">
        <div className="card-header">
          <div className="row">
            <div className="col-6 ">
            <h5>Tareas asignadas</h5>
            </div>
            <div className="col-6">
            <Link to="/nueva"><i class="fa fa-plus-square" title="Nueva Tarea"></i></Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          {tareas&&tareas.length>0?(<>
            <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#Tarea</th>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Estado</th>
                  <th>Fecha Creacion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {(tareas.map((tareas,index)=>(
                  <tr>
                    <td>
                      <p>{index+1}</p>
                    </td>
                    <td>
                      <p>{tareas.title}</p>
                    </td>
                    <td>
                      <p>{tareas.description}</p>
                    </td>
                    <td>
                      <p>{tareas.status}</p>
                    </td>
                    <td>
                      <p>{tareas.fecha}</p>
                    </td>
                    <td>
                      <Link to={`/actualizar/${tareas.id}`}>
                      <i className='fa fa-pencil-square-o' title="Editar" aria-hidden="true"></i></Link>
                      <i className="fa fa-trash-o hover-text p-2" aria-hidden="true" title="Borrar" onClick={()=>{eliminar(tareas.id)}}></i>
                      {tareas.estado===2?(<i className="fa fa-check-circle hover-text" aria-hidden="true" title="Completar" onClick={()=>{completar(tareas.id,2)}}></i>):
                      (<i className="fa fa-question-circle hover-text" aria-hidden="true" title="Incompleto" onClick={()=>{completar(tareas.id,1)}}></i>)}
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
          </>):(<p>Sin Tareas Asignadas</p>)}
        </div>
          
      </div>
  )
};
