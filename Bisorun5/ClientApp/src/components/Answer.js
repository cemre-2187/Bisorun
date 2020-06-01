import React, { Component } from 'react';
import { Proxy } from './Proxy';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Helmet } from 'react-helmet'

export class Answer extends Component {
    static displayName = Answer.name;

    constructor(props) {
        super(props);
        this.state = {
            question: [],
            answers: [],
            categories:[],
            isOpen:false
        };
      
    }

    getQuestionId = () => {
       

        const idcount = this.props.match.params.id.indexOf("-");

        const url = this.props.match.params.id;
        const stringId = url.slice(0, idcount);
        const id = Number(stringId);

        const request = new Proxy();
        request.getQuestion().then(data => { this.setState({ question: data.filter(i => i.questionId==id) }) });

        
    }
    getCategories = () => {
        const request = new Proxy();
        request.getCategory().then(data => { this.setState({ categories: data }) });
    }
    putAnswer = (e) => {
        e.preventDefault();
        const idcount = this.props.match.params.id.indexOf("-");

        const url = this.props.match.params.id;
        const stringId = url.slice(0, idcount);
        const id = Number(stringId);

        

        const username = e.target.elements.username.value;
        const email = e.target.elements.email.value;
        const answer = e.target.elements.answer.value;
        console.log(username);
        console.log(email);
        console.log(answer);
        console.log(id);
        console.log(typeof id);

        const item = {
            'answerBody': answer,
            'userName': "Cemre",
            'userMail': email,
            'questionId': id
        }
        fetch('https://bisorun.com/api/answers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(() => {
                this.getAnswers();

            })
            .catch(error => console.log('Unable to add item.'));

        this.toggle();
    }


    getAnswers = () => {
        const idcount = this.props.match.params.id.indexOf("-");

        const url = this.props.match.params.id;
        const stringId = url.slice(0, idcount);
        const id = Number(stringId);

        const request = new Proxy();
        request.getAnswer().then(data => { this.setState({ answers: data.filter(i => i.questionId == id) }) });
    }

    
    componentDidMount() {
        this.getQuestionId();
        this.getAnswers();
        this.getCategories();
    }
  
        
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }


    render() {
        return (
            <div>

                <Helmet>
                    <title>deneme</title>
                </Helmet>
                <NavMenu />
                <div className="container">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <ul className="list-group">
                            <li className="list-group-item">Bizi Takip Edin</li>
                            <li className="list-group-item"><i class="fab fa-instagram"></i> Instagram</li>
                            <li className="list-group-item"><i class="fab fa-facebook-square"></i>  Facebook</li>
                            <li className="list-group-item"><i class="fab fa-twitter-square"></i>  Twitter</li>

                        </ul>

                    </div>
                    <div className="col-md-6">
                     {this.state.question.map((question) => {
                            return (
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <p className="card-title"><b>{question.title}</b></p>
                                        <p className="card-text">{question.description}</p>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <i className="fas fa-user"></i> {question.user}
                                            </div>
                                            <div className="col-md-4">
                                                <i className="fas fa-envelope-open-text"></i> {this.state.answers.length} cevap
                                        </div>
                                            <div className="col-md-4">
                                                <i className="fas fa-clock"></i>   Saat
                                    </div>
                                        </div>

                                    </div>
                                </div>

                            )
                     })}   




                        {this.state.answers.map((answer) => {
                            return (
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <p className="card-title"><b>{answer.user}</b></p>
                                        <p className="card-text">{answer.answerBody}</p>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <i className="fas fa-envelope-open-text"></i>
                                            </div>
                                            <div className="col-md-4">
                                                <i className="far fa-eye"></i>   beğen
                                        </div>
                                            <div className="col-md-4">
                                                <i className="fas fa-clock"></i>Tarih
                                    </div>
                                        </div>

                                    </div>
                                </div>

                            )
                        })}   


                            <Button className="SoruToggle btn btn-primary" onClick={this.toggle}>Cevap Yaz</Button>
                            <Collapse isOpen={this.state.isOpen}>
                                <Card>
                                    <CardBody>

                                        <form onSubmit={this.putAnswer}>


                                            <div className="form-group">
                                                <label htmlFor="username">İsim</label>
                                                <input type="text" name="username" className="form-control" id="username" placeholder="İsminizi giriniz..." />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" name="email" className="form-control" id="email" placeholder="Emailinizi giriniz..." />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="answer">Cevap</label>
                                                <textarea className="form-control soruText" id="answer" rows="3" name="answer" placeholder="Cevabınızı giriniz..."></textarea>
                                            </div>
                                            <button className="btn btn-primary" type="submit">Cevapla</button>
                                        </form>





                                    </CardBody>
                                </Card>
                            </Collapse>

                    </div>
                    <div className="col-md-3">
                            <div className="sticky">
                                <ul className="CategoryList">
                                    <li><i className="far fa-folder-open"></i> <b>Kategoriler</b></li>
                                    <hr />
                                    {this.state.categories.map((category) => {
                                        return (
                                            < li >
                                                <h5 className="mt-1 CategoryText"><a href="#" className="categoryLink"> {category.name}</a></h5>
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


function getItems() {
    fetch('Answers/GetAnswers')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log('Unable to get items.'));
}
function postItem() {
    const item = {
        AnswerBody : "Cevap",     
       
    }

    fetch('Answers/PostAnswer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();

        })
        .catch(error => console.log('Unable to add item.'));

}
