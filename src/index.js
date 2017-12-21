import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Form, Modal, Input, InputGroup, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Project extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modal : false,
            data : {
                id: '',
                name: '',
                surname: '',
                old: '',
                gender: '',
                phone : '',
                address : ''
            }
        };

        this.FormSubmit = this.FormSubmit.bind(this);
        this.toggleButton = this.toggleButton.bind(this);
        this.editModalOpen = this.editModalOpen.bind(this);
        this.addModalOpen = this.addModalOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // table datas
        this.datas = [
            {name:'Ahmet', surname:'Celebi', old: 30, gender:'Erkek', phone:'0534 000 00 00', address:'deneme adres'},
            {name:'Mehmet', surname:'Uysal', old: 30, gender:'Erkek', phone:'0534 000 00 00', address:'deneme adres'},
            {name:'Kerim', surname:'Abbas', old: 30, gender:'Erkek', phone:'0534 000 00 00', address:'deneme adres'}
        ];

    };

    // add modal
    addModalOpen(){
        this.toggleButton();
        this.setState({ title : 'Veri Ekle', buttonText: 'Ekle' });
    }

    // edit modal
    editModalOpen(event){
        this.toggleButton();
        this.state.data = Object.assign({}, this.datas[event.target.id]);
        this.setState({
            title : 'Veri Düzenle',
            buttonText : 'Düzenle',
            id: event.target.id,
            data: this.state.data
        });
    }

    // form submit
    FormSubmit(e){
        e.preventDefault();
        if(this.state.id){
            this.datas[this.state.id] = this.state.data;
            console.log('edited');
        }else {
            this.datas.push(this.state.data);
            console.log('added');
        }
        this.toggleButton();
    }

    // for open and close
    toggleButton(){
        this.setState({ modal: !this.state.modal });
    }

    // input handle
    handleChange = function(e){
        this.state.data[e.target.name] = e.target.value;
        this.setState({ data: this.state.data });
    };


    render() {

        return (
            <div>
            <Button color="success" size="sm" onClick={this.addModalOpen}>Ekle</Button>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Ad</th>
                    <th>Soyad</th>
                    <th>Yaş</th>
                    <th>Cinsiyet</th>
                    <th>Telefon</th>
                    <th>Adres</th>
                    <th>İşlem</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.datas.map((v, k) => <tr>
                        <td>{k + 1}</td>
                        <td>{v.name}</td>
                        <td>{v.surname}</td>
                        <td>{v.old}</td>
                        <td>{v.gender}</td>
                        <td>{v.phone}</td>
                        <td>{v.address}</td>
                        <td><Button color="primary" onClick={this.editModalOpen} id={k} size="sm">Düzenle</Button></td>
                    </tr>)
                }
                </tbody>
            </Table>
            <Modal isOpen={this.state.modal}>
                <ModalHeader>{this.state.title}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.FormSubmit}>
                        <InputGroup>
                            <Input placeholder="Ad" name="name" onChange={this.handleChange} value={this.state.data.name}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <Input placeholder="Soyad" name="surname" onChange={this.handleChange} value={this.state.data.surname}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <Input placeholder="Yaş" name="old" onChange={this.handleChange} value={this.state.data.old}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <Input placeholder="Cinsiyet" name="gender" onChange={this.handleChange} value={this.state.data.gender}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input placeholder="Telefon" name="phone" onChange={this.handleChange} value={this.state.data.phone}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input placeholder="Adres" name="address" onChange={this.handleChange} value={this.state.data.address}/>
                        </InputGroup>
                        <br />
                        <Button color="success" size="sm" type="submit">{this.state.buttonText}</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleButton}>Kapat</Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
}

ReactDOM.render(<Project/>, document.getElementById('root'));