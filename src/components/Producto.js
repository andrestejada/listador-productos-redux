import React from 'react'
import { useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'
//REDUX
import {borrarProductoAction , obtenerProductosEditarAction} from '../actions/productoActions'
import {useDispatch} from 'react-redux'

const Proyecto = ({producto}) => {

    const {nombre,precio,id} = producto

    const dispatch = useDispatch()
    const history = useHistory()//habilitar history para redireccionar

    //confirmar si desea eliminar el producto
    const confirmarEliminar  = id=>{
        //preguntar al usuario
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Si lo Eliminas no puedes recuperarlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //pasarlo al action
                dispatch( borrarProductoAction(id) )
            }
          })
      
    }

    //funcion que redirige de forma programada
    const redireccionarEdicion = producto =>{
        history.push(`/productos/editar/${producto.id}`)
        dispatch( obtenerProductosEditarAction(producto) )
    }
    return ( 
        <tr>
            <td>{nombre}</td>
            <td> <span className={'font-weight-bold'} > $ {precio}</span> </td>
            <td className='acciones'>
            <button 
                onClick={ ()=> redireccionarEdicion(producto) }
                className='btn btn-primary mr-2'
            >Editar</button>
            <button
                type='button'
                className='btn btn-danger'
                onClick={ ()=> confirmarEliminar(id) }
            >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Proyecto;