 //cada reducer tiene su propio state
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

 const initialState = {
     productos: [],
     error:null,
     loading:false,
     productoseliminar:null,
     productoeditar: null
 }

 const productosReducer = (state = initialState , action)=>{
     switch(action.type){
         case AGREGAR_PRODUCTO :
         case COMENZAR_DESCARGA_PRODUCTOS:
         case PRODUCTO_ELIMINAR_ERROR:
         case PRODUCTO_EDITAR_ERROR:
         case DESCARGA_PRODUCTOS_ERROR:
             return{
                 ...state,
                 loading: action.payload
             }
         case AGREGAR_PRODUCTO_EXITO:
             return{
                 ...state,
                 loading:false,
                 productos: [...state.productos , action.payload]
             }
        case AGREGAR_PRODUCTO_FALLO:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_EXTIO:
      
            return{
                ...state,
                loading:false,
                error:null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                productoseliminar: action.payload
            }
        case PRODUCTO_ELIMINAR_EXITO:
            return{
                ...state,
                productos: state.productos.filter( producto=> producto.id !== state.productoseliminar ) ,
                productoseliminar: null
            }
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoeditar: action.payload
            }
        case PRODUCTO_EDITAR_EXITO:
            return{
                ...state,
                productoeditar:null,                
                productos: state.productos.map( producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto )
            }
         default:
            return state
     }
 }

 export default productosReducer;