




export class Proxy{

getCategory() {
    return new Promise((resolve, reject) => {
        fetch('http://bisorun.com/api/categories')
            .then(response => response.json())
            .then(data => resolve(data) )
            .catch(error => reject('Unable to get items.'));
    })   
    }

    getNews() {
        return new Promise((resolve, reject) => {
            fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=43d705ee1e5649f5b54e96a3e5d1546b')
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject('Unable to get items.'));
        })
    }
    


    
getQuestion() {
    return new Promise((resolve, reject) => {
        fetch('https://bisorun.com/api/questions')
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject('Unable to get items.'));
    })
    }

    getUser() {
        return new Promise((resolve, reject) => {
            fetch('https://bisorun.com/api/users')
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject('Unable to get items.'));
        })
    }

    getNews() {
        return new Promise((resolve, reject) => {
            fetch('https://newsapi.org/v2/top-headlines?country=tr&apiKey=43d705ee1e5649f5b54e96a3e5d1546b')
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject('Unable to get items.'));
        })
    }



getAnswer() {
    return new Promise((resolve, reject) => {
        fetch('https://bisorun.com/api/answers')
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject('Unable to get items.'));
    })
    }

}

