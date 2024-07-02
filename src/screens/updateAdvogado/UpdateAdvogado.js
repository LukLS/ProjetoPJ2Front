import React from "react";
import "./UpdateAdvogado.css";
import FormGroup from "../../components/FormGroup";
import axios from "axios";

export default class UpdateAdvogado extends React.Component{

    state = {
        id: ' ',
        nome: ' ',
        cartel: ' ',
    }

    
update = async() => {
    await axios.put(`http://localhost:8080/api/lutador/${this.state.id}`,
    {
    nome: this.state.nome,
    cartel: this.state.cartel
    }
    ).then(response =>
        {
            console.log(response)
        }
        ).catch(error =>
            {
                console.log(error.response)
            }
            );
            console.log("request finished")
}

cancel = () =>{
    this.props.history.push("/");
  }

        render(){
            return(
                <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                            <FormGroup label="Id *" htmlFor="inputId">
                              <input type="Number" 
                               id="inputId"
                              className="form-control"
                              edicao="id"
                              onChange={e => this.setState({id: e.target.value})}>
                            </input>
                            </FormGroup>
                            <FormGroup label="Nome *" htmlFor="inputName">
                             <input type="Text" 
                              id="inputName"
                              className="form-control"
                              edicao="name"
                              onChange={e => this.setState({nome: e.target.value})}>
                            </input>
                            </FormGroup>
                            <FormGroup label="Cartel: *" htmlFor="inputCartel">
                            <input type="Text" 
                               id="inputCartel"
                               className="form-control"
                              edicao="cartel"
                              onChange={e => this.setState({cartel: e.target.value})}>
                            </input>
                            </FormGroup>
                            <button onClick={this.update} type="button" className="btn btn-success">
                            <i className="pi pi-update"></i> Atualizar
                            </button>
                            <button onClick={this.cancel} type="button" className="btn btn-danger">
                            <i className="pi pi-cancel"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
    </div>
    )
  }

}
