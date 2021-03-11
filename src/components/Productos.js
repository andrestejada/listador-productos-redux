import React, { Fragment , useEffect } from 'react'
import Producto from './Producto'
//redux
import {obtenerProductosAction} from '../actions/productoActions'
import { useDispatch, useSelector} from 'react-redux'
const Productos = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        const cargarProductos = ()=> dispatch( obtenerProductosAction() )
        cargarProductos()
         // eslint-disable-next-line
    },[])
    //obtener el state

    const productos = useSelector( state=> state.productos.productos)
    const error = useSelector( state => state.productos.error )
    const cargando = useSelector( state => state.productos.loading)

    return ( 
        <Fragment>
            {error ? <p className='alert alert-danger text-center font-weight-bold' >Hubo un error</p> :null}
            {cargando ? <p className='text-center' >Cargando....</p> : null}
            <h2 className='text-center my-5' >Listado de Productos</h2>
            <table className='table table-striped' >
                <thead className='bg-primary table-dark' >
                    <tr>
                        <th scope='col' >Nombre</th>
                        <th scope='col' >Precio</th>
                        <th scope='col' >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length===0 ? 'NO hay porductos ' 
                    : productos.map( producto=> ( <Producto key={producto.id} producto={producto}  /> )) }
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Productos;