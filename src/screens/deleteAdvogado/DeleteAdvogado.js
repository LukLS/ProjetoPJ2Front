import React from "react";
import "./DeleteAdvogado.css";
import Card from "../../components/Card";
import FormGroup from "../../components/FormGroup";
import axios from "axios";

export default class DeleteAdvogado extends React.Component{

    state = {
        id: ' ',
    }

    DeleteUFC = async() => { await axios.delete(`http://localhost:8080/api/ufc/${this.state.id}`,
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
                <Card title="Delete UFC">
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
                        <button onClick={this.DeleteUFC} type="button" className="btn btn-success">
                        <i className="pi pi-delete"></i> Deletar
                        </button>
                        <button onClick={this.cancel} type="button" className="btn btn-danger">
                        <i className="pi pi-cancel"></i> Cancelar
                    </button>
                </div>
            </div>
        </div>
    </Card>
</div>
)
}


}