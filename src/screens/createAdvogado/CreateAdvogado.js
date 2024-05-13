import React from "react";
import "./CreateAdvogado.css";
import TextField from '@mui/material/TextField';
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default class CreateAdvogado extends React.Component{

  

    constructor(props) {
      super(props);
      this.state = {
        login: '',
        senha:'',
        nome:'',
        cpf:'',
        inscricao:'',
        estadoDeEmissao:'',
        filiacao:'',
        dataDeNascimento:''
      };
      this.handleChange = this.handleChange.bind(this);
    }
  
    // Método para lidar com a mudança de valor do campo de texto
    handleChange = (campo) => (event) => {
      this.setState({ [campo]: event.target.value });
    }
          
   salvar = async() => {
        axios.post('http://localhost:8080/api/advogado',{
          login: this.state.login,
          senha: this.state.senha,
          nome: this.state.nome,
          cpf: this.state.cpf,
          inscricao: this.state.inscricao,
          estadoDeEmissao: this.state.estadoDeEmissao,
          filiacao: this.state.filiacao,
          dataDeNascimento: this.state.dataDeNascimento
         }).then(response => 
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
                        <div style={{marginTop: '70px'}}>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button style={{ backgroundColor: 'white', color: 'grey' }}>Cliente</Button>
                            <Button style={{ backgroundColor: 'grey' }}>Advogado</Button>
                            <Button style={{ backgroundColor: 'white', color: 'grey' }}>Associado</Button>
                        </ButtonGroup>
                        <div style={{width: 1100, height: 470, background: 'white', border: '2px #838383 solid'}}>
                        <div style={{width: 325, height: 50, color: '#838383', fontSize: 27, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word',fontWeight: 'bold', marginTop: '15px', marginLeft: '90px'}}>Dados pessoais</div>
                        <div style={{width: 325, height: 50, color: '#838383', fontSize: 27, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word',fontWeight: 'bold',marginTop: '-50px' ,marginLeft: '780px'}}>OAB</div>
                        <div style={{marginTop: '35px', marginLeft: '50px'}}>


        <div style={{width: 461, height: 50, color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>LOGIN</div>
        <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue=""
        variant="filled"
        size="small"
        style={{ marginTop: '-15px', width: '250px' }}
        value={this.state.login}
        onChange={this.handleChange('login')} 
      />

      <div style={{  marginTop: '12px' ,width: 461, height: 50, color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>SENHA</div>

        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue=""
          variant="filled"
          size="small"
          style={{ marginTop: '-15px', width: '250px' }}
          type="password"
          value={this.state.senha}
          onChange={this.handleChange('senha')} 
        />
                      
          <div style={{ marginTop: '12px', width: 461, height: 50, color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>NOME</div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue=""
            variant="filled"
            size="small"
            style={{marginTop: '-15px', width: '250px'}}
            value={this.state.nome}
            onChange={this.handleChange('nome')} 
/>

          <div style={{ marginTop: '12px', width: 461, height: 50, color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>CPF</div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue=""
            variant="filled"
            size="small"
            style={{marginTop: '-15px', width: '250px'}}
            value={this.state.cpf}
            onChange={this.handleChange('cpf')}    
/>        

          <div style={{ position: 'relative', left: 680, top: -340, color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400'}}>INSCRIÇÃO</div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue=""
            variant="filled"
            size="small"
            style={{marginTop: '-15px', width: '250px',  left: 680, top: -310}}
            value={this.state.inscricao}
            onChange={this.handleChange('inscricao')} 
/>    

          <div style={{ position: 'relative', left: 680, top: -300, color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400'}}>ESTADO DE EMISSAO</div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue=""
            variant="filled"
            size="small"
            style={{marginTop: '-15px', width: '250px',  left: 680, top: -270}}
            value={this.state.estadoDeEmissao}
            onChange={this.handleChange('estadoDeEmissao')} 
/>    

          <div style={{ position: 'relative', left: 680, top: -260, color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400'}}>FILIAÇÃO</div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue=""
            variant="filled"
            size="small"
            style={{marginTop: '-15px', width: '250px',  left: 680, top: -230}}
            value={this.state.filiacao}
            onChange={this.handleChange('filiacao')} 
/>    

          <div style={{ position: 'relative', left: 680, top: -220, color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400'}}>DATA DE NASCIMENTO</div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue=""
            variant="filled"
            size="small"
            type="date"
            style={{marginTop: '-15px', width: '250px',  left: 680, top: -190}}
            value={this.state.dataDeNascimento}
            onChange={this.handleChange('dataDeNascimento')} 
          />
</div>                

                        <div style={{ marginTop: '-140px' }}>
                        <Button onClick={this.cancel} variant="contained" style={{width: 120, height: 40, backgroundColor: 'grey'}}>Cancelar</Button>
                        <Button onClick={this.salvar} variant="contained" style={{width: 120, height: 40, backgroundColor: 'grey', marginLeft: '850px'}}>Salvar</Button>

                          </div>
                            </div>
                        </div>
                    </div>
                </div>

              </div>  
        </div>
        )
      }

}
