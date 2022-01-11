import React, { Component } from 'react'
import {getMovies} from "./getMovies/getMovies"

export default class Movies1 extends Component {
    constructor(props){
        super(props);
        this.state={
        movies:getMovies(),
        currSearchText:"",
        currPage:"1",
        limit:4
        
        }
    }
    handleDelete=(id)=>{
        // let cval = e.taget.value;
        let ROE = this.state.movies.filter(Obj=>{
            // console.log(ROE);
            return Obj._id != id;
        })
        this.setState({
            movies:ROE
        })
    }
    handleChange=(e)=>{
        let task = e.target.value;
        this.setState({currSearchText:task})
     }
     handleLimit=(e)=>{
         let val = Number(e.target.value)
         this.setState({limit:val})
     }
     handlePageChange=(pageNumber)=>{
        //  let num = e.target.value;
        //  console.log(num);
         this.setState({currPage:pageNumber})
     }
    render() {
        let {movies,currSearchText,limit,currPage} = this.state;
          
            let filterMovies = [];
            if(currSearchText != "")
            {
                 filterMovies = movies.filter(Obj=>{
                    let title = Obj.title.trim().toLowerCase();
                    return title.includes(currSearchText.toLowerCase());

                 })
                 
                         
          }else{
              filterMovies = movies;
          }
          let numberOfPages = Math.ceil(filterMovies.length/limit);
          let pagesOfArr = [];
          for(let i = 0; i < numberOfPages; i++){
              pagesOfArr.push(i+1);
          }
          let si = (currPage-1)*limit;
          let li = si+limit;
          filterMovies = filterMovies.slice(si,li);
        
        // console.log(this.state.currSearchText);
        return (

            <div className = "row">
                <div className = "col-3">
                    <h1>Helllo</h1>
                    </div> 
                <div className = "col-9">
                <input value = {this.state.currSearchText} onChange= {this.handleChange} type = "text"></input>
                <input value ={this.state.limit>filterMovies.lenght?limit:filterMovies.length} 
                onChange={this.handleLimit} type = "number" min="1" max = {movies.length}></input>
               <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">Stock1
      <i className="fa fa-sort-up" ></i>
      </th>
      <th scope="col">Rate</th>
    </tr>
  </thead>
  <tbody>
  {
    filterMovies.map(movieObj=>(
        <tr>
        <td></td>
        <td >{movieObj.title}</td>
        <td >{movieObj.genre.name}</td>
        <td >{movieObj.numberInStock}</td>
        <td >{movieObj.dailyRentalRate}</td>
       <td> <button className=" btn-danger" onClick={()=>this.handleDelete(movieObj._id)}>Delete</button></td>
        
      </tr>
 )) 
}
  
  </tbody>
  
 <nav aria-label="...">
  <ul class="pagination pagination-lg">
    
   {
      pagesOfArr.map(pageObj=>{
          let classStyleName = currPage == pageObj?"page-item active":"page-item";
          return(
              <li onClick={()=>this.handlePageChange(pageObj)} className ={classStyleName} key = {pageObj}>
                  <span className="page-link">{pageObj}</span>

              </li>
          )
      })
  }
  </ul>
</nav>
  
</table>
                </div>
               
            </div>
        )
        // console.log(input.value);
    }
}

