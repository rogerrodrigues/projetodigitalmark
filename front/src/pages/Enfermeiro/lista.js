import React, { Component } from 'react';

import { Container } from '../../styles/Container';
import { List, Form } from '../Main/styles';
import { FaEdit, FaPlus, FaTrash, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default class ListaEnfermeiro extends Component {

  state = {
    enfermeiros: [],
    loading: false,
    showModal: false,
    idRemoveEnfermeiro: '',
    idHospital: ''
  }

  constructor(props) {
    super();
   
  }

  handleOpenModal(id) {
    console.log("remove",id);
    this.setState({ showModal: true, idRemoveEnfermeiro: id });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    console.log("p", this.props);
    // var params = props.match.params;
    let props = this.props;
    if (!!props.idHospital) {
      this.getEnfermeiros(props.idHospital);
      this.setState({idHospital: props.idHospital})
    }
    Modal.setAppElement("#root");

    

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  getEnfermeiros = async (id) => {
    //loading
    this.setState({ loading: true });
    //Request
    var response = await api.get(`/Enfermeiro/Hospital/${id}`)
      //FOI
      .then((response) => {
        if (!!response.data) {
          var enfermeiros = response.data;
          console.log('hospitais', enfermeiros);

          this.setState({ enfermeiros: enfermeiros, loading: false });
        }
      })
      //Nao FOI
      .catch((response) => {
        this.setState({ loading: false });
      });
  }

  remove = async (id) => {
    //loading
    this.setState({ loading: true });
    // console.log("id hospital",this.state.idHospital);

    //Request
    var response = await api.delete(`/Enfermeiro/${this.state.idRemoveEnfermeiro}`)
      //FOI
      .then((response) => {
        toast.success("Enfermeiro removido com sucesso");
        this.handleCloseModal();
        this.getEnfermeiros(this.state.idHospital);
        this.setState({ loading: false });
      })
      //Nao FOI
      .catch((response) => {
        this.setState({ loading: false });
        this.handleCloseModal();
      });
  }

  render() {
    const { enfermeiros, loading } = this.state;
    const { idHospital } = this.props;

    return (
      <>
        <br />
        <hr />
        <Form>
          <br />
          <h3>Lista de Enfermeiros</h3>
          <Link className="btn-primary " to={`/enfermeiro/${idHospital}`}><FaPlus color="#fff" size={14}></FaPlus> Adicionar Enfermeiro</Link>
        </Form>

        <List isLoading={loading}>
          <div className="loading">
            <FaSpinner className="rotate" size={40}></FaSpinner>
          </div>
          {!!enfermeiros.length ?
            <>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                    <th>CPF</th>
                    <th>Coren</th>
                    <th width="20%"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    enfermeiros.map((enfermeiro) => (
                      <tr key={enfermeiro.id}>
                        <td>{enfermeiro.nome}</td>
                        <td>{enfermeiro.dataNascimento}</td>
                        <td>{enfermeiro.cpf}</td>
                        <td>{enfermeiro.coren}</td>
                        <td>
                          <Link to={`/enfermeiro/${idHospital}/${enfermeiro.id}`}><FaEdit color="#fff" size={14}></FaEdit> </Link>
                          <a href='#' onClick={() => this.handleOpenModal(enfermeiro.id)}><FaTrash color="#fff" size={14}></FaTrash> </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </>
            :
            <>
              <p>Nenhum enfermeiro cadastrado ainda</p>
            </>
          }
        </List>

        <Modal
          isOpen={this.state.showModal}
          contentLabel="Excluir Enfermeiro"
          className="Modal"
        >
          <p>
            Deseja realmente remover o enfermeiro?
          </p>

          <div className="modal-bottom">
            <button className="btn-secondary" onClick={this.handleCloseModal}>Cancelar</button>
            <button className="btn-primary" onClick={this.remove}>Remover</button>
          </div>
        </Modal>
      </>
    );
  }
}
