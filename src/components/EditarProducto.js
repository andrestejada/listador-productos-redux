import React , {useState , useEffect} from 'react'
import {  useHistory }  from 'react-router-dom'
//redux
import {useDispatch , useSelector} from 'react-redux';
import {editarProductosAction} from '../actions/productoActions'


const EditarProducto = () => {
    //redireccion
    const history = useHistory()

    //State de editar Producto
    const [producto,guardarProducto] = useState({
        nombre:'',
        precio:''
    })
    
    const productoEditar = useSelector( state=> state.productos.productoeditar)
    const dispatch = useDispatch()
    //llenar el state automaticamente
    useEffect(()=>{
        guardarProducto(productoEditar)
    },[productoEditar])

    
    const  {nombre , precio} = producto
    
    //submit editar producto
    const submitEditarProducto = e=>{
        e.preventDefault();

        dispatch( editarProductosAction(producto) )
        history.push('/')

    }

    //lee el valor cuando cambie cada campo
    const onChangeFormulario = e=>{
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })

    }

    return ( 
        <div className='row justify-content-center '>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-bold-weight' >Editar Producto</h2>
                    <form 
                        onSubmit={submitEditarProducto}
                        className='form-group'
                    >
                        <div className='form-group'>
                            <label>Nombre del Producto</label>
                            <input
                                type='text'
                                placeholder='Nombre Producto'
                                className='form-control'
                                name='nombre'
                                onChange={onChangeFormulario}
                                value={nombre}
                                
                            />
                        </div>
                        <div className='form-group'>
                            <label>Precio del Producto</label>
                            <input
                                type='number'
                                placeholder='Precio Producto'
                                className='form-control'
                                name='precio'
                                onChange={onChangeFormulario}
                                value={precio}
                                
                            />
                        </div>

                        <button
                            className='btn btn-primary font-weight-bold b-block w-100'
                            type='submit'
                        >Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default EditarProducto;