import {MOSTRAR_ALERTA,
    OCULTAR_ALERTA} from '../types'

//muestra la alerta
export const mostrarAlertaAction = alerta => (dispatch)=>{
    dispatch( crearAlertar(alerta) )
}

const crearAlertar =  alerta=>({
    type:MOSTRAR_ALERTA,
    payload:alerta
})

export const ocultarAlertaAction = ()=> (dispatch)=>{
    dispatch( ocultarAlerta() )
}
const ocultarAlerta = ()=>({
    type:OCULTAR_ALERTA
})
