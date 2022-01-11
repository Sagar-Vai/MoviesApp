
import Movies from "./component/Movies.js"
import Movies1 from "./Movies1.js"
import Home from "./component/Home.js"
import About from "./component/About"
import Signup from "./component/Signup"
import Login from "./component/Login"
import Nav from "./Nav.js"
import AuthProvider from "./Context/AuthProvider.js"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"



function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <Nav/> */}
        <Switch>
          <Route exact path='/' component={Signup} />
          {/* <Route path='/Signup' component={Signup} /> */}
          <Route path='/Login' component={Login} />
          <Route path='/Movies' render={(props)=>(
            <>
            <Nav/>
            <Movies/>
            </>
          )} />
          <Route path='/About' render={(props)=>(
            <>
            <Nav/>
            <About/> 
            </>
          )} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
