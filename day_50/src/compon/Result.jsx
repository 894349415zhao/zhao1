import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, SearchBar } from "antd-mobile";
export default function Result(){
    const location=useLocation()
    const [list,setList]=useState(location.state)
    console.log(location.state);
    return(
        <div>
            <Button onClick={() => window.history.back()}>返回</Button>
            {list.map(item=>{
                return(
                    <div>
                    {item.name}
                </div>
                )
               
            })}
            111
        </div>
    )
}