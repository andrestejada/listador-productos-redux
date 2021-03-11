import {AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_FALLO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXTIO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types'
import clienteAxios from '../config/axios'
import  Swal from 'sweetalert2'


//crear nuevos productos
export function crearNuevoProductosAction (producto){
    return async (dispatch)=>{

        dispatch(agregarProducto())
       
        try {
            //insertar en la Api
            await clienteAxios.post('/productos',producto)
            //Si todo sale bien actualizar el state
            dispatch( agregarProductoExito(producto) )
            //Alerta
            Swal.fire({
                title: 'Correcto',
                text: 'El producto se agrego correctamente',
                icon: 'success',
                
            })
        } catch (error) {
            console.log(error)
            //si hay un erro cambiar el state
            dispatch( agregarProductoError(true) )
            Swal.fire({
                title: 'Error',
                text: 'Hubo un erro intenta de nuevo',
                icon: 'Error',
                
            })
        }
    }
}

const agregarProducto= ()=> ({
    type:AGREGAR_PRODUCTO,
    payload: true
})


const agregarProductoExito = producto => ({
    type:AGREGAR_PRODUCTO_EXITO,
    payload:producto
})
const agregarProductoError = estado => ({
    type:AGREGAR_PRODUCTO_FALLO,
    payload: estado
})

//Funcion que descarga los porductos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch)=>{
        dispatch( descargarProductos() )

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch( descargaProductosExitosa(respuesta.data) )
        } catch (error) {
            console.log(error)
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = ()=>({
    type:COMENZAR_DESCARGA_PRODUCTOS,
    payload:true
})

const descargaProductosExitosa = productos =>({ 
    type:DESCARGA_PRODUCTOS_EXTIO,
    payload:productos
})
const descargaProductosError = () =>({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload:true
})


//selecciona y eliminar un producto
export function borrarProductoAction (id){
    return async (dispatch)=>{
        dispatch( obtenerProductoEliminar(id) )
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( productoEliminarExito() )

            //si se elimina mostrar alerta
            Swal.fire(
                'Eliminar!',
                'Se elimino correctamente',
                'success'
              )
        } catch (error) {
            dispatch( productoElimiarError() )
        }
    }
}

const obtenerProductoEliminar = id =>({
    type:OBTENER_PRODUCTO_ELIMINAR,
    payload:id
})

const productoEliminarExito = ()=>({
    type: PRODUCTO_ELIMINAR_EXITO,
})

const productoElimiarError = ()=>({
    type:PRODUCTO_ELIMINAR_ERROR,
    payload: true
})


//editar productos
 export function obtenerProductosEditarAction (producto){
    return (dispatch)=>{
        dispatch( obtenerProductoEditar(producto) )
    }
 }

const obtenerProductoEditar = (producto)=>({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//EDITAR UN PRODUCTO EN LA API Y STATE

export function editarProductosAction (producto){
    return async(dispatch)=>{
        
        try {
            await clienteAxios.put(`/productos/${producto.id}`,producto)
            dispatch( editarProductoExito(producto) )
            
        } catch (error) {
            dispatch( editarProductoError() )
        }
    }  
}

const editarProductoExito = producto=>({
    type:PRODUCTO_EDITAR_EXITO,
    payload:producto
})

const editarProductoError = ()=>({
    type:PRODUCTO_EDITAR_ERROR,
    payload:true
})