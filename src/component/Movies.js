import React,{Component} from "react"
import {getMovies} from "../getMovies/getMovies"
import axios from "axios"
export default class Movies extends Component{
    constructor(props){
        super(props);
        this.state={
            movies:getMovies(),
            currSearchText:"",
            currPage:1,
            limit:4,
            cGenre: 'All Genres',
            genres:[{_id:'abcd',name:'All Genres'}]
        }
    }
    async componentDidMount(){
        console.log("component Did Mount");
        let promise = axios.get("https://backend-react-movie.herokuapp.com/movies");
        let promise2 = axios.get("https://backend-react-movie.herokuapp.com/genres");
        let data = await promise;
        let data2 = await promise2;
        this.setState({
            movies:data.data.movies,
            genres:[...this.state.genres,...data2.data.genres]
        })
    }
    onDelete=(id)=>{
    let moviesFilter = this.state.movies.filter(movieObj=>{
        return movieObj._id != id
    })
    this.setState({movies:moviesFilter})
    }
    handleChange =(e)=>{
        let task = e.target.value;
        this.setState({currSearchText:task})
    }
    sortByRatings = (e)=>{
        let className = e.target.className;
        // console.log(className);
        let sortedArr =[];
        if(className == "fas fa-sort-up"){
            //ascending order
            sortedArr = this.state.movies.sort((movieA,movieB)=>{
                return movieA.dailyRentalRate - movieB.dailyRentalRate
            })
        }else{
            sortedArr = this.state.movies.sort((movieA,movieB)=>{
                return movieB.dailyRentalRate - movieA.dailyRentalRate
            })
        }
        this.setState({
            movies:sortedArr
        })
    }

    sortByStock =(e)=>{
        let className = e.target.className;
        let sortedArr =[];
        if(className == "fas fa-sort-up"){
            sortedArr = this.state.movies.sort((movieA,movieB)=>{
                return movieA.numberInStock - movieB.numberInStock;
            })
        }else{
            sortedArr = this.state.movies.sort((movieA,movieB) => {
                return movieB.numberInStock - movieA.numberInStock;
            })
        }
        this.setState({
            movies:sortedArr
        })
    }
    handlePageChange = (pageNumber)=>{
        this.setState({currPage:pageNumber});
    }
    handleLimit = (e) =>{
        let num = Number(e.target.value)
        this.setState({limit:num})
    }
    handleGenreChange=(genre)=>{
        this.setState({
            cGenre:genre
        })
    }
    render(){
        let {movies,currSearchText,currPage,limit,cGenre,genres} = this.state;
        console.log(movies)
        let filterMovies =[];
        if(currSearchText != " "){
            filterMovies = movies.filter(movieObj =>{
                let title = movieObj.title.trim().toLowerCase();

                return title.includes(currSearchText.toLowerCase())
            })
        }else{
            filterMovies = movies;
        }
        if(cGenre != 'All Genres'){
          filterMovies = filterMovies.filter(function(movieObj){
              return movieObj.genre.name == cGenre;
          })
        }


        ///////////////////////////////
        // Pagination & limit
        let numberOfPages = Math.ceil(filterMovies.length/limit);
        let pageNumberArr =[];
        for(let i = 0; i<numberOfPages; i++){
            pageNumberArr.push(i+1);
        }
        let si = (currPage-1)*limit;
        let ei = si + limit;
        filterMovies = filterMovies.slice(si,ei);
        return(
            <>
            <div className = "row">
            {
             this.state.movies.length ==0?
            <div className="spinner-border text-primary" role="status">
           <span className="visually-hidden">Loading...</span>
           </div>
           :
            <div className = "row">
                <div className ="col-3">
                    <ul className ='list-group'>
                        {
                            genres.map((genreObj)=>(
                              <li onClick = {()=>this.handleGenreChange(genreObj.name)} key = {genreObj._id} className = 'list-group-item'>
                                  {genreObj.name}
                              </li>  
                            ))
                        }
                    </ul>
                    <h5>Current Genre {cGenre}</h5>
                </div>
                <div className = "col-9">
                <input value = {this.state.currSearchText} onChange={this.handleChange}type = "txt"></input>
                <input value = {this.state.limit>filterMovies.length? filterMovies.length:this.state.limit}
                onChange={this.handleLimit}min = "1" max ={movies.length}type ="number"></input>
                <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>

      <th scope="col">
          <i className ="fas fa-sort-up" onClick={this.sortByStock}></i>
          Stock
          <i className = "fas fa-sort-down" onClick={this.sortByStock}></i>
      </th>
      <th scope = "col">
          <i className ="fas fa-sort-up" onClick={this.sortByRatings}></i>
          Rate
          <i className = "fa fa-sort-down" onClick={this.sortByRatings}></i>
      </th>
    </tr>
  </thead>
  <tbody>
  {
    filterMovies.map(movieObj=>(
        <tr> 
            <td></td>
            <td>{movieObj.title}</td>
            <td>{movieObj.genre.name}</td>
            <td>{movieObj.numberInStock}</td>
            <td>{movieObj.dailyRentalRate}</td>
            <td> <button type = "button" className = "btn btn-danger" onClick={()=>this.onDelete(movieObj._id)}>Delete</button></td>
            
         </tr>
    ))
}
  </tbody>
</table>
               <nav aria-label="...">
                   <ul className = "pagination">
                       {
                           pageNumberArr.map(pageNumber=>{
                               let classStyleName = pageNumber== currPage?"page-item active":"page-item"
                               return(
                                   <li onClick={()=>this.handlePageChange(pageNumber)}className = {classStyleName}key = {pageNumber}>
                                       <span className = "page-link">{pageNumber}</span>
                                   </li>
                               )
                           })
                       }
                   </ul>
               </nav>
                </div>
            </div>
    }
            </div>
           
            </>
        )
    }
}
