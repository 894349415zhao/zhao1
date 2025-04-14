import React, { useState }  from "react";
import { Outlet,useNavigate } from "react-router-dom";
import { Badge, TabBar } from 'antd-mobile';
import { AppOutline, MessageOutline, MessageFill, UnorderedListOutline, UserOutline, } from 'antd-mobile-icons';
export default function All() {
    const navigate=useNavigate()
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
            path: '/all/index'
        },
        {
            key: 'todo',
            title: '分类',
            icon: <UnorderedListOutline />,
            path: '/all/cate'
        },
        {
            key: 'message',
            title: '消息',
            icon: (active) => active ? <MessageFill /> : <MessageOutline />,
            path: '/all/car'
        },
        {
            key: 'personalCenter',
            title: '我的',
            icon: <UserOutline />,
            path: '/all/user'
        },
    ];
    const [activeKey, setActiveKey] = useState('home');
    return (
        <div>
            <div>
                <Outlet></Outlet>
            </div>
            <div style={{position:'fixed',bottom:0,left:0,right:0}}>
            <TabBar>
                {tabs.map(item => (<TabBar.Item key={item.key} icon={item.icon}  onClick={()=>navigate(item.path)} title={item.title} />))}
            </TabBar>
            </div>
        </div>
    )
}