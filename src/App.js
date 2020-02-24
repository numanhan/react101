import React, {Component, useState, useEffect} from 'react';



//build hacker news client

const App = () =>{  //fonksiyonel component oluşturduk

// ilk ihtiyacımız bir state

  const [news, setNews] = useState([]) // burada state içi boş 
  const [searchQuery, setSearchQuery] = useState('react')
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false)


  //fetch news adında bir method oluşturuyoruz
  const fetchNews = () =>{

    // set loading true. loading i true hale getiriyoruz
    setLoading(true)


    fetch(url) //fetch javascripttin bir api fonksiyon yapısı
    .then(result => result.json()) // buradaki istekten bir result dönecek. 
    .then(data => (setNews(data.hits), setLoading(false)))
    //.then(data => console.log(data))
    .catch(error => console.log(error))
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = e => {

    setSearchQuery(e.target.value)

  }

  const handleSubmit = e => {
 
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)

  }

  const showLoading = () => (
    loading ? <h2>loading....</h2> : " "
  )
  

    
  


  const searchForm = () => (
    <form onSubmit={handleSubmit}>
    <input type = 'text' value={searchQuery} onChange={handleChange}></input>
    <button>Search</button>
  </form>
  )
  

   const showNews = () => {
    {
     return news.map((n, i) => (
    <p key={i}> {n.title} </p>)
    )}

   }


  return (

    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
      
    </div>


  ) // bu kısım api ile verileri sayfada görüntülememize yaradı. sırada implement search var


};






/*
const App = () => {

  const [count, setCount] = useState(0)

//useEffect bir fonksiyon ve argüman alarak hareket ediyor
  useEffect(() => {

    document.title = `Clicked ${count} times`; // hook olayında aşağıdaki gibi this methodunu kullanmaya gerek kalmadı

  })

  const increment = () => {

    setCount(count + 1  )

  };

 // componentdidmount ve update i hook kullanarak gerçekleştirilmesi
  return (

    <div>

            <h2>counter app</h2>
        <button onClick={tincrement}>Count It</button>
        <p>clicked {count} times</p>
   
    </div>
  )


}
*/

/*

class App extends Component {

  state = {
    count : 0
  };

  increment = () => {

  this.setState({

    count: this.state.count +1
  });

  };

  componentDidMount(){
    document.title = `Clicked ${this.state.count} times`;
  }

  componentDidUpdate (){
    document.title = `Clicked ${this.state.count} times`;  //componentdidmount ve didupdate dokuman title ında görünen tarafta etki eder
  } // tarayıcı üst sekmede belirtilmek istenen içeriği burada belirtmiş olduk

 render(){
  
  return (

    <div>

    <h2>counter app</h2>
  <button onClick={this.increment}>Count It</button>
  <p>clicked {this.state.count} times</p>
    </div>
  );
   
 }

} 

*/

export default App;
