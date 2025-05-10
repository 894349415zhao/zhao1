import React, { useState } from "react";
import { Button, SearchBar, Space, Toast } from 'antd-mobile'
import { useNavigate } from "react-router-dom";
export default function Index(){
    const [keyword,setkeyword]=useState('')
    const navigate=useNavigate()
    console.log(keyword);
    
    return(
        <div>
             <SearchBar placeholder='请输入内容' onChange={(e)=>setkeyword(e)} onSearch={()=>navigate('/search')}/>
        </div>
    )
}