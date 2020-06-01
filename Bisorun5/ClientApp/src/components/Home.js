import React, { Component } from 'react';
import { Proxy } from './Proxy';
import { Link } from 'react-router-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import { NavMenu } from './NavMenu';


export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            answers: [],
            categories: [],
            news:[],
            isOpen: false,
            user:null
        };

    }

    putQuestions=(e)=> {
        e.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem("user"));



        if (userInfo) {
            const usercheck = userInfo[0];
            const request = new Proxy();
            request.getUser().then(data => {
                this.setState({ user: data.filter(i => i.userName == usercheck.userName && i.userPassword == usercheck.userPassword && i.userRole == usercheck.userRole) })
            })

            const title = e.target.elements.title.value;
            const description = e.target.elements.description.value;
            const category = e.target.elements.category.value;

          //  const userid = this.state.user[0].userId;



            console.log(title)
            console.log(description);
            console.log(category)

            const item = {
                'title': title,
                'description': description,
                
                'category': category
            }
            fetch('https://bisorun.com/api/questions', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
                .then(response => response.json())
                .then(() => {
                    this.getQuestions();

                })
                .catch(error => console.log('Unable to add item.'));

            this.toggle();

        }

       
    }

    categoryFilter = () => {
        console.log("çözülecek")
       // const request = new Proxy();
       // request.getQuestion().then(data => { this.setState({ questions: data.filter(i => i.categoryId =) }) });
    }
    getNews = () => {
        const request = new Proxy();
        request.getNews().then(data => { this.setState({ news: data.articles }) });
    }
    getCategories = () => {
        const request = new Proxy();       
        request.getCategory().then(data => { this.setState({ categories: data }) });    
    }

    getQuestions = () => {
        const request = new Proxy();
        request.getQuestion().then(data => { this.setState({ questions: data }) });
    }

    getAnswers = () => {
        const request = new Proxy();
        request.getAnswer().then(data => { this.setState({ answers: data }) });
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
    
    componentDidMount() {
        this.getCategories();
        this.getQuestions();
        this.getAnswers();
        this.userControl();   
        this.getNews();
    }
    
    toggle = () => {
        if (this.state.user) {
            this.setState({ isOpen: !this.state.isOpen })
        } else if (this.state.user == []) {

            this.props.history.push('/login');
        } else {
            this.props.history.push('/login');
        }
       
    }



    render() {


    return (
        <div>
            <NavMenu />
           

           
            <div className="container">
           
            <div className="row">
                <div className="col-md-3">
                    <div className="sticky mb-4">
                  
                       
                    <ul className="list-group">
                        <li className="list-group-item"><b>Bizi Takip Edin</b></li>
                        <li className="list-group-item"><i className="fab fa-instagram"></i> Instagram</li>
                        <li className="list-group-item"><i className="fab fa-facebook-square"></i>  Facebook</li>
                        <li className="list-group-item"><i className="fab fa-twitter-square"></i>  Twitter</li>

                    </ul>
                    </div>
                   
                </div>
                <div className="col-md-6">



                        
                    <div className="mb-4">
                        <Button className="SoruToggle btn btn-primary" onClick={this.toggle}>Kendi haberini yayımla :) [Bak bu da bir fikir :)]</Button>
                        <Collapse isOpen={this.state.isOpen}>
                            <Card>
                                <CardBody>

                                    <form onSubmit={this.putQuestions}>

                                       
                                        <div className="form-group">
                                                <label htmlFor="title">Soru Başlığı</label>
                                            <input type="text" name="title" className="form-control" id="title" placeholder="Soru başlığını giriniz..." />
                                        </div>                                          
                                    
                                        <div className="form-group">
                                                <label htmlFor="description">Soru</label>
                                            <textarea className="form-control soruText" id="description" rows="3" name="description"></textarea>
                                        </div>
                                            <div className="form-group">
                                                <label htmlFor="category">Soru Kategorisi</label>
                                            <select className="form-control" id="category" name="category">
                                                <option>Teknoloji</option>
                                                <option>Spor</option>
                                                <option>Bilim</option>
                                                <option>Tarih</option>
                                                <option>Eğlence</option>
                                            </select>
                                        </div>
                                        <button type="submit">Sor</button>
                                        </form>

                                   



                              </CardBody>
                            </Card>
                        </Collapse>
                    </div>


                        {this.state.news.map((news) => {
                            return (
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <p className="card-title"> <b>{news.title}</b></p>
                                        <p className="card-text">{news.description.slice(0, 150)}...</p>

                                        <div className="row">
                                          
                                       
                                            <div className="col-md-4">
                                                <i className="fas fa-user"></i> {news.source.name}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            )

                        })}

                    {this.state.questions.map((question) => {
                        return (
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p className="card-title">  <Link className="questitle" to={`/soru/${question.questionId}-${question.title.replace(/ /g, "-")}`}><b>{question.title}</b></Link></p>
                                    <p className="card-text">{question.description.slice(0,150)}...</p>
                                 
                                    <div className="row">
                                        <div className="col-md-4">
                                          Cevap Gör
                                        </div>
                                        <div className="col-md-4">
                                            <i className="fas fa-envelope-open-text"></i> {this.state.answers.filter(i => i.questionId == question.questionId).length} cevap
                                        </div>
                                        <div className="col-md-4">
                                            <i className="fas fa-user"></i> {question.userId}
                                        </div>
                                    </div>

                                </div>
                            </div>
                           
                            )

                    }).reverse()}
                   

                    
                </div>
                <div className="col-md-3">
                    <div className="sticky">
                    <ul className="CategoryList">
                                <li><i className="far fa-folder-open"></i> <b>Kategoriler</b></li>
                                <hr />
                                < li >
                                    <h5 className="mt-1 CategoryText"><a href="#" className="categoryLink"> Tümü</a></h5>
                                </li>
                        {this.state.categories.map((category) => {
                            return (
                                < li >
                                    <h5 className="mt-1 CategoryText categoryLink" onClick={this.categoryFilter}> {category.name}</h5>                                                                     
                                </li>
                               
                                )
                                
              })}
             
           
                        </ul>
                    </div>
                </div>
              
                </div>
            </div>
      </div>
    );
  }
}

