import React, { useEffect, useState } from "react";
import { Button, SearchBar } from "antd-mobile";
import { Space, Swiper } from 'antd-mobile';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import styles from './demo.module.less';
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac', '#ffd6e7'];
const DATA_COUNT = 5;

export default function Search() {
    const navigate = useNavigate()
    const [keyword, setkeyword] = useState('')
    const [list, setList] = useState([])
    const [searchlist, setsearch] = useState(JSON.parse(localStorage.getItem('searchlist')) || []);
    const [hot, sethot] = useState(['打蛋器', '打蛋器1', '百强电器', '超值9.9好货', '打蛋器2', '面包'])
    const [newlist, setNewlist] = useState([])
    const [is_show, setIsshow] = useState(false)

    const getList = async () => {
        await axios.get('http://localhost:3000/list')
            .then(res => {
                setList(res.data)
            })
    }

    useEffect(() => {
        getList()
    }, [])

    const handleSearch = async (keywords = keyword) => {
        await axios.get(`http://localhost:3000/list?name_like=` + keywords)
            .then(res => {
                setList(res.data)
                setkeyword(keywords)
                navigate('/result', { state: res.data })
                const updatedSearchlist = [keywords, ...searchlist.filter(item => item !== keywords)];
                setsearch(updatedSearchlist);
                localStorage.setItem('searchlist', JSON.stringify(updatedSearchlist))
            })
    }

    const handlekeyword = async () => {
        await axios.get(`http://localhost:3000/list?name_like=` + keyword)
            .then(res => {
                if (keyword.trim()!=='') {
                    const newResult = res.data.map(item => {
                        const name = item.name;
                        const regex = new RegExp(keyword, 'gi');
                        const highlightedName = name.replace(regex, (match) => `<span style="color: red; font-weight: bold;">${match}</span>`);
                        return { ...item, highlightedName };
                    });
                    setNewlist(newResult);
                    setIsshow(true);
                }else{
                    setNewlist([])
                    setIsshow(false)
                    return
                }

            })
    }

    return (
        <div>
            <div style={{ display: 'flex', height: '50px', alignItems: 'center' }}>
                <Button onClick={() => window.history.back()}>返回</Button>
                <h1 style={{ marginLeft: '90px' }}>商品搜索</h1>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <SearchBar placeholder='请输入内容' onChange={(e) => setkeyword(e)} onSearch={() => handlekeyword()} />
                <Button onClick={() => handleSearch()}>搜索</Button>
            </div>
            {is_show && <div>
                {
                    newlist.map(item => {
                        return (
                            <div key={item.id} dangerouslySetInnerHTML={{ __html: item.highlightedName }} />
                        )
                    })
                }
            </div>}
            <div>
                <h2>最近搜索</h2>
                {
                    searchlist.map(item => {
                        return (
                            <Button key={item}>{item}</Button>
                        )
                    })
                }
            </div>
            <div>
                <h2>热门搜索</h2>
                {
                    hot.map(item => {
                        return (
                            <Button key={item} style={{ color: 'red' }} onClick={() => { handleSearch(item) }}>{item}</Button>
                        )
                    })
                }
            </div>
            <div style={{ marginTop: '40px' }}>
                <Space direction='vertical' block>
                    <Swiper className={styles.root} slideSize={60} trackOffset={20} stuckAtBoundary={false} total={20} indicator={false} defaultIndex={2}>
                        {index => (<Swiper.Item key={index}>
                            <div className={styles.scaleContent} style={{ background: colors[index % DATA_COUNT] }}>
                                {index + 1}
                            </div>
                        </Swiper.Item>)}
                    </Swiper>
                </Space>
            </div>
        </div>
    )
}