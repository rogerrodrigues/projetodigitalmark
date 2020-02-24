import React, { Component } from 'react';
import { FaSpinner, FaPlus } from 'react-icons/fa';
import InputMask from 'react-input-mask';

import { Container } from '../../styles/Container';
import { SubmitButton } from './styles';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup';

const schema = Yup.object().shape({
  nome: Yup.string()
    .required('Campo obrigatório')
    .max(50),
  cpf: Yup.string()
    .required('Campo obrigatório'),
  dataNascimento: Yup.string()
    .required('Campo obrigatório'),
  coren: Yup.string()
    .required('Campo obrigatório'),
});

export default class Enfermeiro extends Component {
  state = {
    enfermeiro: this.getEmptyEnfermeiro(),
    loading: false,
    isUpdate: false,
    hospitalId: ''
  };
  constructor(props) {
    super()
  }

  getEmptyEnfermeiro() {
    return {
      nome: '',
      cpf: '',
      coren: '',
      dataNascimento: '',
      hospitalId: '',
      id: '00000000-0000-0000-0000-000000000000'
    }
  }

  //Mount
  componentDidMount() {
    // let id = 'b9340432-4f96-4ea6-2548-08d7b7d96b08';
    // this.get(id);
    var params = this.props.match.params;
    if (!!params.id) {
      this.get(params.id);
    }

  }

  get = async (id) => {
    //loading
    this.setState({ loading: true });
    //Request
    var response = await api.get(`Enfermeiro/${id}`)
      //FOI
      .then((response) => {
        console.log('get enfermeiro', response);
        if (!!response.data) {
          // var hospital = response.data;
          var keys = Object.keys(response.data);
          var enfermeiro = {};
          keys.map((value, index) => {
            var key = keys[index];
            console.log(key);
            enfermeiro[key] = response.data[key];
          });

          console.log('hospital', enfermeiro);

          this.setState({ enfermeiro: enfermeiro, isUpdate: true, loading: false });
        }
      })
      //Nao FOI
      .catch((response) => {
        this.setState({ loading: false });
      });
  }

  handleChangeNested = e => {
    const { name, value } = e.target;
    var enfermeiro = Object.assign({}, this.state.enfermeiro);
    // var enfermeiro = { ...this.state.enfermeiro }

    enfermeiro[name] = value;
    this.setState({ enfermeiro })
  }


  submit = async e => {
    var enfermeiro = Object.assign({}, this.state.enfermeiro);

    schema.validate(enfermeiro).then(
      (valid) => {
        console.log("form", valid);
        if (valid) {
          
          var enfermeiro = Object.assign({}, this.state.enfermeiro);
          var dataArray = enfermeiro.dataNascimento.split('/');
          enfermeiro.dataNascimento = `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
          
          enfermeiro.hospitalId = this.props.match.params.hospitalId;
          console.log("Enfermeiro", enfermeiro);
          this.setState({ loading: true });
          if (this.state.enfermeiro.id == this.getEmptyEnfermeiro().id) {
            this.addEnfermeiro(enfermeiro);
          } else {
            this.updateEnfermeiro(enfermeiro);
          }
        }
      }
    )
  };

  addEnfermeiro = async (enfermeiro) => {
    var response = await api.post(`/Enfermeiro`, enfermeiro)
      .then((data) => {
        console.log("Sucesso", data);
        toast.success("Enfermeiro cadastrado com sucesso");
        this.props.history.goBack();

        this.setState({
          enfermeiro: this.getEmptyEnfermeiro(),
          loading: false
        });
      })
      .catch((data) => {
        console.log("Erro", data);
        toast.error("Ocorreu um erro");
        this.setState({
          loading: false
        });
      });
  }

  updateEnfermeiro = async (enfermeiro) => {
    var response = await api.put(`/Enfermeiro`, enfermeiro)
      .then((data) => {
        console.log("Sucesso", data);
        toast.success("Enfermeiro alterado com sucesso");
        this.props.history.goBack()
        this.setState({
          // enfermeiro: this.getEmptyHospital(),
          loading: false,
          // isUpdate: false
        });
      })
      .catch((data) => {

        console.log("Erro", data);
        toast.error("Ocorreu um erro");
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const { enfermeiro, loading, isUpdate } = this.state;
    const { history } = this.props;

    return (
      <Container>
        {
          isUpdate ?
            <h1>Alterar Enfermeiro - {enfermeiro.nome}</h1>
            :
            <h1>Cadastro de Enfermeiro</h1>
        }
        <Form schema={schema} onSubmit={this.submit}>

          {/* <input type="text" placeholder="Nome" name="nome" value={enfermeiro.nome} onChange={this.handleChangeNested} /><br />
          <input type="text" placeholder="CNPJ" name="cnpj" value={enfermeiro.cnpj} onChange={this.handleChangeNested} /><br />
          <input type="text" placeholder="Endereço" name="endereco" value={enfermeiro.endereco} onChange={this.handleChangeNested} /><br />
           */}
          <Input type="text" placeholder="Nome" name="nome" value={enfermeiro.nome} onChange={this.handleChangeNested} /><br />
          <InputMask mask="999.999.999-99" type="text" placeholder="CPF" name="cpf" value={enfermeiro.cpf} onChange={this.handleChangeNested} >
          </InputMask>
          <Input type="hidden" placeholder="CPF" name="cpf" value={enfermeiro.cpf} />
          <InputMask mask="99/99/9999" type="text" placeholder="Data de Nascimento" name="dataNascimento" value={enfermeiro.dataNascimento} onChange={this.handleChangeNested} >
          </InputMask>
          <Input type="hidden" placeholder="Data de Nascimento" name="dataNascimento" value={enfermeiro.dataNascimento} /><br />
          <Input type="text" placeholder="COREN" name="coren" value={enfermeiro.coren} onChange={this.handleChangeNested} /><br />

          <div className="form-bottom">
            <SubmitButton loading2={!!loading} className="rotate">
              {loading ?
                <><FaSpinner color="#fff" size={14}></FaSpinner> </>
                :
                <>
                  {isUpdate ?
                    <>
                      Salvar
                  </>
                    :
                    <>
                      <FaPlus color="#fff" size={14}></FaPlus> Cadastrar
                  </>}
                </>
              }
            </SubmitButton>
            <button type="button" className="btn-secondary" onClick={() => history.goBack()}>voltar</button>
          </div>
        </Form>
      </Container >
    );
  }
}
