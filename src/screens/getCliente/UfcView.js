import React from "react";
import axios from 'axios';
import Card from "../../components/Card";
import FormGroup from "../../components/FormGroup";
import UsersTable from "./UfcTable";

class ViewUfc extends React.Component {

    state = {
        edicao: '',
        id: '',
        ufc: []
    }

    find = () => {
        let params = '';
      
        if (this.state.id !== '') {
          params += `id=${this.state.id}&`;
        }
      
        if (this.state.edicao !== '') {
          params += `edicao=${this.state.edicao}&`;
        }
      
        axios
          .get(`http://localhost:8080/api/ufc/${params}`)
          .then((response) => {
            const ufc = response.data;
            this.setState({ ufc });
            console.log(ufc);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }

    delete = (userId) => {
        axios.delete(`http://localhost:8080/api/ufc/${userId}`)
            .then(response => {
                this.find();
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    edit = (userId) => {
        this.props.history.push('/updateUfc/');
    }

    render() {
        return (
            <Card title="Consulta UFC">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputId" label="Id: *">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputId"
                                    value={this.state.id}
                                    onChange={e => this.setState({ id: e.target.value })}
                                    placeholder="Digite o Id" />
                            </FormGroup>

                            <FormGroup htmlFor="inputName" label="Edição: *">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    value={this.state.edicao}
                                    onChange={e => this.setState({ edicao: e.target.value })}
                                    placeholder="Digite a edição" />
                            </FormGroup>


                            <button
                                onClick={this.find}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <UsersTable ufc={this.state.ufc}
                            delete={this.delete}
                            edit={this.edit} />
                    </div>
                </div>
            </Card>
        );
    }
}

export default ViewUfc;
