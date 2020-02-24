import React, { Component, Fragment } from 'react';
import { Form, List } from './styles';
import { Container } from '../../styles/Container';
import { FaEdit, FaPlus, FaTrash, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default class Main extends Component {
  state = {
    hospitais: [],
    loading: false,
    showModal: false,
    idRemoveHospital: ''
  }
  constructor() {
    super();
    Modal.setAppElement("#root");
    // this.state = {
    //   showModal: false
    // };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(id) {

    this.setState({ showModal: true, idRemoveHospital: id });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    this.getHospital();
  }

  getHospital = async (id) => {
    //loading
    this.setState({ loading: true });
    //Request
    var response = await api.get(`/Hospital`)
      //FOI
      .then((response) => {
        if (!!response.data) {
          var hospitais = response.data;
          console.log('hospitais', hospitais);

          this.setState({ hospitais: hospitais, loading: false });
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
    //Request
    var response = await api.delete(`/Hospital/${this.state.idRemoveHospital}`)
      //FOI
      .then((response) => {
        toast.success("Hospital removido com sucesso");
        this.handleCloseModal();
        this.getHospital();
      })
      //Nao FOI
      .catch((response) => {
        this.setState({ loading: false });
        this.handleCloseModal();

      });
  }

  render() {
    const { hospitais, loading } = this.state;

    return (
      <Container>
        <h1>HospitalPrime</h1>
        <Form>

          <Link className="btn-primary " to="/hospital"><FaPlus color="#fff" size={14}></FaPlus> Adicionar Hospital</Link>
        </Form>

        <List isLoading={loading}>
          <div className="loading">
            <FaSpinner className="rotate" size={40}></FaSpinner>
          </div>
          {!!hospitais.length  ?  
            <>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CNPJ</th>
                    <th>Endereço</th>
                    <th width="20%"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    hospitais.map((hospital) => (
                      <tr key={hospital.id}>
                        <td>{hospital.nome}</td>
                        <td>{hospital.cnpj}</td>
                        <td>{hospital.endereco}</td>
                        <td>
                          <Link to={`/hospital/${hospital.id}`}><FaEdit color="#fff" size={14}></FaEdit> </Link>
                          <a href='#' onClick={() => this.handleOpenModal(hospital.id)}><FaTrash color="#fff" size={14}></FaTrash> </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </>
            :
            <>
              <p>Nenhum hospital cadastrado ainda</p>
            </>
          }
        </List>


        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="Modal"
        >
          <p>
            Deseja realmente remover o hospital?
          </p>

          <div className="modal-bottom">
            <button className="btn-secondary" onClick={this.handleCloseModal}>Cancelar</button>
            <button className="btn-primary" onClick={this.remove}>Remover</button>
          </div>
        </Modal>

      </Container>
    );
  }
}
