import React,{useState} from 'react'
import {useDispatch,useSelector } from 'react-redux'
//action de redux

import { crearNuevoProductosAction } from '../actions/productoActions'
import { mostrarAlertaAction ,ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProducto = ({history}) => {
    //definir el state del componenete
    const [nombre,guardarNombre]= useState('')
    const [precio,guardarPrecio]=useState(0)

    //utiliza use dispatch y te crea una nueva funcion 
    const dispatch = useDispatch()

    //acceder al state del store
    const cargando = useSelector( state => state.productos.loading )
    const error = useSelector( state => state.productos.error )
    const alerta = useSelector( state => state.alerta.alerta )
    
    //manda llarmar el action de productos action
    const agregarProducto = producto => dispatch( crearNuevoProductosAction(producto) )

    
    //cuando el usuario haga submit
    const submitNuevoUsuario = e =>{
        e.preventDefault();

        //validar el nuevo formulario
        if(nombre.trim()===''||precio <= 0){
            const alerta={
                msg:'Ambos campos son obligatorios',
                clases:'alert alert-danger text-center text-uppercase p-3'
            }
            dispatch( mostrarAlertaAction(alerta) )
            return
        }

        //si no hay errores
        dispatch( ocultarAlertaAction() )

        //crear el nuevo porducto
        agregarProducto({
            nombre,
            precio
        })
        //redireccionar al componente principal
        history.push('/')
    
    }
    return ( 
        <div className='row justify-content-center '>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-bold-weight' >Agregar Nuevo Producto</h2>
                        {alerta ? <p className={alerta.clases}>{alerta.msg}</p> :null}
                        <form 
                            onSubmit={submitNuevoUsuario}
                            className='form-group'>
                            <div className='form-group'>
                                <label>Nombre del Producto</label>
                                <input
                                    type='text'
                                    placeholder='Nombre Producto'
                                    className='form-control'
                                    name='nombre'
                                    value={nombre}
                                    onChange={ e=> guardarNombre(e.target.value) }
                                />
                            </div>
                            <div className='form-group'>
                                <label>Precio del Producto</label>
                                <input
                                    type='number'
                                    placeholder='Precio Producto'
                                    className='form-control'
                                    name='precio'
                                    value={precio}
                                    onChange={ e=> guardarPrecio(  Number( e.target.value) ) }
                                />
                            </div>

                            <button
                                className='btn btn-primary font-weight-bold b-block w-100'
                                type='submit'
                            >AGREGAR</button>
                        </form>
                        {cargando ? <p>Cargando...</p> : null }
                        {error ? <p className='alert alert-danger p2 mt-4 text-center' >Hubo un error</p> :null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;