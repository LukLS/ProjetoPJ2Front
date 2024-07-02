import React from "react";
import "./CreateCliente.css";
import FormGroup from "../../components/FormGroup";
import axios from "axios";

export default class CreateCliente extends React.Component{

    state ={
        nome: ' ',
        cartel:' ',
      }
      cadastrar = async() => {
    
       await axios.post('http://localhost:8080/api/lutador',
       {
        nome: this.state.nome,
        cartel: this.state.cartel
       }
       ).then(response => 
        {
          console.log(response);
        }
        ).catch(error => 
          {
            console.log(error.response);
          });
          console.log('request finished');
      }
   
      cancel = () =>{
        console.log('cancel');
      }

      render(){
        return(
        <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome *" htmlFor="inputNome">
                                <input type="Text" 
                                id="inputNome"
                                className="form-control"
                                nome="Nome"
                                onChange={e => this.setState({nome: e.target.value})}>
                                </input>
                            </FormGroup>
                            <FormGroup label="Cartel: *" htmlFor="inputCartel">
                                <input type="Text" 
                                id="inputCartel"
                                className="form-control"
                                edicao="Cartel"
                                onChange={e => this.setState({cartel: e.target.value})}>
                                </input>
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                <i className="pi pi-save"></i> Cadastrar
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