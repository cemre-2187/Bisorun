import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Proxy } from './Proxy'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true,
        user: null,
        modal:false
    };
  }

    userControl = () => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
      

       
        if (userInfo) {
            const usercheck = userInfo[0];
            const request = new Proxy();
            request.getUser().then(data => {
                this.setState({ user: data.filter(i => i.userName == usercheck.userName && i.userPassword == usercheck.userPassword && i.userRole == usercheck.userRole) })
            })
        }
     

    }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }
    logout = () => {
        localStorage.clear();
       this.props.history.push('/')
   
    }

    componentDidMount() {
        this.userControl();
    }
   
    toggle=()=> {
        this.setState({
            modal: !this.state.modal
        });
    }



  render () {
    return (
        <header>
           
            {

                this.state.user && this.state.user.map((user) => {

                    if (user.userRole == "Admin") {
                        return (
                            <div className="pos-f-t">
                                <Collapse isOpen={this.state.collapsed} id="navbarToggleExternalContent">
                                    <div className="bg-dark p-4">
                                        <h5 className="text-white h4">Panel Yönetimi</h5>

                                        <ul className="list-group list-group-horizontal bg-dark">
                                            <li className="list-group-item AdminList"><Link className="btn btn-dark" to="/questionedit">Soru Düzenle</Link></li>
                                            <li className="list-group-item AdminList"><a className="btn btn-dark" >Cevap Düzenle</a></li>
                                            <li className="list-group-item AdminList"><a className="btn btn-dark" >Kategori Düzenle</a></li>
                                            <li className="list-group-item AdminList"><a className="btn btn-dark" >Kullanıcı Düzenle</a></li>
                                        </ul>

                                    </div>
                                </Collapse>
                                <nav className="navbar navbar-dark bg-dark">
                                    <button onClick={this.toggleNavbar} id="AdminPanel" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon Panel"></span> Admin Paneli
                                  </button>
                                </nav>
                            </div>
                        )
                    } 
                }
                )

            }







        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-5" light>
          <Container>
            <NavbarBrand tag={Link} to="/"><b>Bihaber</b></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Ana Sayfa</NavLink>
                </NavItem>
              
                            {
                                this.state.user && this.state.user.map((user) => {
                                    if (user.userName) {
                                        return (
                                        <div>
                                                <NavItem>
                                                    <NavLink tag={Link} className="text-dark" to="/">Merhaba {user.userName} </NavLink>
                                                </NavItem>                                          
                                          </div>
                                                              
                                        )                  
                                    }                                                   
                                })
                                
                            }
                            {
                                this.state.user && this.state.user.map((user) => {
                                    if (user.userName) {
                                        return (
                                            <div>
                                                <NavItem>
                                                    <NavLink onClick={this.logout} tag={Link} className="text-dark" to="/">Çıkış</NavLink>
                                                </NavItem>   
                                            </div>

                                        )
                                    }
                                })                               

                            }
                            {!this.state.user && 
                                <div>
                                    <NavItem>
                                        <NavLink  tag={Link} className="text-dark" to="/register">Kayıt Ol</NavLink>
                                    </NavItem>
                                </div>                           
                            
                            }
                            {!this.state.user &&
                                <div>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login">Giriş</NavLink>
                                        
                                    </NavItem>
                                </div>

                            }
                       

                            
            
              </ul>
            </Collapse>
          </Container>
            </Navbar>


            
          
        
      </header>
    );
  }
}
