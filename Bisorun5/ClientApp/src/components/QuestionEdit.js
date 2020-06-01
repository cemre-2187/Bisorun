import React, { Component } from 'react';
import { Proxy } from './Proxy';

import { NavMenu } from './NavMenu';


export class QuestionEdit extends Component {
    static displayName = QuestionEdit.name;
    constructor(props) {
        super(props);

        this.state = {
            questions: []            
          
        };

    }
    deleteQuestions = (e) => {
        e.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem("user"));



        if (userInfo) {
            const usercheck = userInfo[0];
            const request = new Proxy();
            request.getUser().then(data => {
                this.setState({ user: data.filter(i => i.userName == usercheck.userName && i.userPassword == usercheck.userPassword && i.userRole == usercheck.userRole) })
            })
        
            const quesId = e.target.elements.quesId.value;
            const questionId = Number(quesId)          
          
            const uri = "https://bisorun.com/api/questions/"

            fetch(uri+questionId, {           
                method: 'DELETE'
            })
                .then(() => this.getQuestions())
                .catch(error => console.error('Unable to delete item.', error));
        
    }
    }



    updateQuestions = (e) => {
        e.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem("user"));



        if (userInfo) {
            const usercheck = userInfo[0];
            const request = new Proxy();
            request.getUser().then(data => {
                this.setState({ user: data.filter(i => i.userName == usercheck.userName && i.userPassword == usercheck.userPassword && i.userRole == usercheck.userRole) })
            })

            const title = e.target.elements.title.value;
            const description = e.target.elements.body.value;
            const category = e.target.elements.category.value;
            const image = e.target.elements.image.value;
            const date = e.target.elements.date.value;
            const userId = e.target.elements.userId.value;
            const isLikeQ = e.target.elements.isLikeQ.value;        
            const quesId = e.target.elements.quesId.value;
            const questionId = Number(quesId)
            console.log(title)
            const item = {
                "questionId": questionId,
                "title": title,

                "description": description,
                "image": image,
                "date": date,
                "isLikeQ": isLikeQ,
                "categoryId": Number(category),
                "category": null,
                "answers": null,
                "userId": Number(userId),
                "user": null
            }

            const uri = "http://bisorun.com/api/questions/"


            fetch(uri + questionId, {
                method: 'PUT',
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
                .catch(error => console.error('Unable to add item.', error));

        }
        window.location.reload();
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
    }





    render() {


        return (
            <div>
                <NavMenu />
                {this.state.questions.map((question) => {
                    return (
                        <div className="container">
                        <div className="card mb-4">
                            
                            


                                <form onSubmit={this.updateQuestions}>


                                    <div className="form-group">
                                      
                                         

                                        <label htmlFor="title">Soru Başlığı</label>
                                         
                                        <input type="text" name="title" className="form-control" id="title" placeholder="Soru başlığını giriniz..."  />
                                        <p className="card-title"><b>{question.title}</b></p>   
                                    </div>
                                    <div className="form-group">
                                       
                                        <label htmlFor="body">Soru Gövde</label>
                                       
                                        <textarea type="text" name="body" className="form-control" id="body" placeholder="Soruyu giriniz..." ></textarea>
                                        <p className="card-text">{question.description}</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Image</label>
                                        <input type="text" name="image" className="form-control" id="title" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input type="text" name="date" className="form-control" id="date"  />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="isLikeQ">isLikeQ</label>
                                        <input type="text" name="isLikeQ" className="form-control" id="isLikeQ"  />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="categoryId">categoryId</label>
                                        <input type="text" name="categoryId" className="form-control" id="categoryId"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="userId">userId</label>
                                        <input type="text" name="userId" className="form-control" id="userId"/>
                                    </div>
                                 
                                    <div className="form-group displayclose">
                                        <label htmlFor="quesId">QuesId</label>
                                        <input type="text" name="quesId" className="form-control" value={question.questionId} id="quesId" placeholder="userId başlığını giriniz..." />
                                    </div>

                                  
                                    <button type="submit">Düzelt</button>
                                </form>

                            <form onSubmit={this.deleteQuestions}>                              
                                    <div className="form-group displayclose">
                                    <label htmlFor="quesId">QuesId</label>
                                        <input type="text" name="quesId" className="form-control" value={question.questionId} id="quesId" placeholder="userId başlığını giriniz..." />
                                    </div>
                                <button type="submit">Sil</button>
                            </form>

                        </div>
                        </div>
                    )
                })
                }

            </div>
        );
    }
}

