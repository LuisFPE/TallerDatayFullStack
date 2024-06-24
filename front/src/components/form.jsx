import "./form.css";


const Form = ()=>{

    return (
        <div id='nuevo-propiedad'>
            <div id='nuevo-rotulo'>
                <h1>Añadir nueva propiedad</h1>
                <h3>{nuevaPropiedad}</h3>
            </div>
            <div id='nuevo-div-form'>
                <form id='nuevo-form'>
                    <input type="text" id='form-tipo' placeholder='Metros' />
                    <input type="text" id='form-ciudad' placeholder='Ciudad' />
                    <input type="text" id='form-descripcion' placeholder='Descripcion' />
                    <input id='nuevo-button' type="button" value="Dar de alta" onClick={enviarPropiedad}/>
                </form>
            </div>
        </div>
    )
}

export default Form;

















