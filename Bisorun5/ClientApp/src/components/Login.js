import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { Proxy } from './Proxy';
import { NavMenu } from './NavMenu';
import { Link } from 'react-router-dom';

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);

        this.state = {
            user: []
          
            
        };
    }

    
    login=(e)=> {
        e.preventDefault();


    const userName = e.target.elements.userName.value;  
    const userPassword = e.target.elements.userPassword.value;

    const request = new Proxy();
    request.getUser().then(data => { this.setState({ user: data.filter(i => i.userName == userName && i.userPassword == userPassword) }) });
      
}
    
    
  


    componentDidMount() {
      
    }
    componentDidUpdate() {
       
        localStorage.setItem("user", JSON.stringify(this.state.user));
       
        this.props.history.push('/');
       // window.location.reload();
    }
    



    render() {
       
        return (
            <div>
                <NavMenu />


                <div className="wrapper fadeInDown">
                    <div id="formContent" className="mt-2">
                      
                        <div className="fadeIn first mb-2">
                            <i className="fas fa-user"></i>
                        </div>

                      
                     <form onSubmit={this.login}>
                            <input type="text" id="login" name="userName" className="fadeIn second input1" id="userName" placeholder="Kullanıcı Adı giriniz..."/>
                            <input type="password" id="password" className="fadeIn third input1" name="userPassword" id="userPassword" placeholder="Parolanızı giriniz..."/>
                           
                            <button type="submit" className="fadeIn fourth btn btn-primary mb-2 mt-2">Giriş Yap</button>
                      </form>

                                <div id="formFooter">
                            <Link className="underlineHover alink" to="/register">Kayıt Ol</Link>
                                    </div>

                 </div>
                    </div>













             






              
            </div>
        );
    }
}




