import React, { Component } from 'react';
import { Proxy } from './Proxy';
import { NavMenu } from './NavMenu';

export class Register extends Component {
    static displayName = Register.name;
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }


    putUsers = (e) => {
        e.preventDefault();


        const userName = e.target.elements.userName.value;
        const firstName = e.target.elements.firstName.value;
        const lastName = e.target.elements.lastName.value;
        const userMail = e.target.elements.userMail.value;
        const bornDate = e.target.elements.bornDate.value;
        const userlocation = e.target.elements.userlocation.value;
        const userPassword = e.target.elements.userPassword.value;

        const item = {
            'userName': userName,
            'userPassword': userPassword,
            'userRole': "User",
            'userMail': userMail,
            'userFirstName': firstName,
            'userLastName': lastName,
            'userBorn': bornDate,
            'userLocation': userlocation


        }
        fetch('https://bisorun.com/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(() => {
                this.getUsers();

            })
            .catch(error => console.log('Unable to add item.'));

        console.log(this.state.users);

        
        this.props.history.push('/login');


    }


    getUsers = () => {
        const request = new Proxy();
        request.getUser().then(data => { this.setState({ users: data }) });
    }


    componentDidMount() {
        this.getUsers();

    }





    render() {


        return (
            <div>
                <NavMenu />
                <div className="container">

                    
                    <div className="wrapperRegister fadeInDown">
                        <div id="formContentRegister" className="">

                            <div className="fadeIn first mb-2">
                                <i className="fas fa-user"></i>
                            </div>

                            <form onSubmit={this.putUsers}>
                                <input type="text" id="login" name="userName" className="fadeIn second input1" placeholder="Kullanıcı Adı giriniz..." />

                                <input type="text" id="login" name="firstName" className="fadeIn second input1" placeholder="İsminizi giriniz..." />
                                <input type="text" id="login" name="lastName" className="fadeIn second input1" placeholder="Soyisminizi giriniz..." />
                                <input type="text" id="login" name="userMail" className="fadeIn second input1" placeholder="Email adresinizi giriniz..." />
                              
                                <input type="password" id="password" className="fadeIn third input1" name="userPassword" placeholder="Parolanızı giriniz..." />

                                <input type="date" id="login" name="bornDate" className="fadeIn second input1" placeholder="Doğum Tarihinizi giriniz..." />
                                <input type="text" id="login" name="userlocation" className="fadeIn second input1" placeholder="Konumunuzu giriniz..." />

                              
                                <div id="formFooter">
                                    <button type="submit" className="underlineHover alink fadeIn fourth radius" href="#">Kayıt Ol</button>
                                </div>
                            </form>

                          

                        </div>
                    </div>



                  


                </div>
            </div>
        );
    }
}




