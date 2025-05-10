import React from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Index from "./compon/Index";
import All from "./compon/All";
import Car from './compon/Car';
import User from './compon/User';
import Cate from "./compon/Cate";
import Search from "./compon/Search";
import Result from "./compon/Result";
export default function App(){
    return(
            <Router>
                <Routes>
                <Route path='/search' element={<Search/>}></Route>
                <Route path='/result' element={<Result/>}></Route>
                    <Route path='/all' element={<All/>}>
                        <Route path='/all/index' element={<Index/>}></Route>
                        <Route path='/all/car' element={<Car/>}></Route>
                        <Route path='/all/user' element={<User/>}></Route>
                        <Route path='/all/cate' element={<Cate/>}></Route>
                    </Route>
                    <Route path='/' element={<Navigate to='/all/index'></Navigate>}></Route>
                </Routes>
            </Router>
    )
}