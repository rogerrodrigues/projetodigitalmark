import React, { Component } from 'react';
import { FaSpinner, FaPlus } from 'react-icons/fa';

import { Container } from '../../styles/Container';
import { SubmitButton } from './styles';
import { Form, Input } from '@rocketseat/unform'
import InputMask from 'react-input-mask';

import api from '../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ListaEnfermeiro from '../Enfermeiro/lista';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  nome: Yup.string()
    .required('Campo obrigatório')
    .max(50),
  cnpj: Yup.string()
    .required('Campo obrigatório'),
  endereco: Yup.string()
    .required('Campo obrigatório')
});

export default class Hospital extends Component {
  constructor(props) {
    super();

  }

  state = {
    newHospital: this.getEmptyHospital(),
    loading: false,
    isUpdate: false
  };


  getEmptyHospital() {
    return {
      nome: '',
      endereco: '',
      cnpj: '',
      id: '00000000-0000-0000-0000-000000000000'
    }
  }

  //Mount
  componentDidMount() {
    // let id = 'b9340432-4f96-4ea6-2548-08d7b7d96b08';
    // this.get(id);
    console.log("p", this.props);
    var params = this.props.match.params;
    if (!!params.id) {
      this.get(params.id);
    }
  }

  get = async (id) => {
    //loading
    this.setState({ loading: true });
    //Request
    var response = await api.get(`Hospital/${id}`)
      //FOI
      .then((response) => {
        console.log('get hospital', response);
        if (!!response.data) {
          // var hospital = response.data;
          var keys = Object.keys(response.data);
          var hospital = {};
          keys.map((value, index) => {
            var key = keys[index];
            console.log(key);
            hospital[key] = response.data[key];
          });

          console.log('hospital', hospital);

          this.setState({ newHospital: hospital, isUpdate: true, loading: false });
        }
      })
      //Nao FOI
      .catch((response) => {
        this.setState({ loading: false });
      });
  }

  handleChangeNested = e => {
    const { name, value } = e.target;
    var newHospital = Object.assign({}, this.state.newHospital);
    // var newHospital = { ...this.state.newHospital }

    newHospital[name] = value;
    this.setState({ newHospital })
  }

  submit = async e => {
    console.log("Hospital", this.state.newHospital);

    this.setState({ loading: true });
    if (this.state.newHospital.id == this.getEmptyHospital().id) {
      this.addHospital();
    } else {
      this.updateHospital();
    }
  };

  addHospital = async e => {
    var response = await api.post(`/Hospital`, this.state.newHospital)
      .then((data) => {
        console.log("Sucesso", data);
        toast.success("Hospital cadastrado com sucesso");
        this.props.history.goBack();

        this.setState({
          newHospital: this.getEmptyHospital(),
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

  updateHospital = async e => {
    var response = await api.put(`/Hospital`, this.state.newHospital)
      .then((data) => {
        console.log("Sucesso", data);
        toast.success("Hospital alterado com sucesso");
        this.props.history.goBack();

        this.setState({
          // newHospital: this.getEmptyHospital(),
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
    const { newHospital, loading, isUpdate } = this.state;


    return (
      <Container>
        {
          isUpdate ?
            <h1>Alterar Hospital - {newHospital.nome}</h1>
            :
            <h1>Cadastro de Hospital</h1>
        }
         
        <Form schema={schema} onSubmit={this.submit}>

          <Input type="text" placeholder="Nome" name="nome" value={newHospital.nome} onChange={this.handleChangeNested} />
          <InputMask mask="999.999.999/9999" type="text" placeholder="CNPJ" name="cnpj" value={newHospital.cnpj} onChange={this.handleChangeNested} >
          </InputMask>
          <Input mask="999.999.999/9999" type="hidden" placeholder="CNPJ" name="cnpj" value={newHospital.cnpj} />
          <Input type="text" placeholder="Endereço" name="endereco" value={newHospital.endereco} onChange={this.handleChangeNested} />
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
            <Link to="/" className="btn-secondary" >voltar</Link>
          </div>
        </Form>
        {isUpdate &&
          <ListaEnfermeiro idHospital={newHospital.id}></ListaEnfermeiro>
        }
      </Container >
    );
  }
}
