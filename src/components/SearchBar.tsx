import React, { useState } from 'react'
import '@/styles/search-bar.scss'
import '@/styles/_utils.scss'

const SearchBar = () => {

    const [keyword, setKeyword] = useState('');

    const handleChange = (e: any) => {
        setKeyword(e.target.value);
    }

    const handleClick = (e: any) => {
        console.log(keyword);
    }

    return (
        <div className='search-bar flex'>
            <input 
                type="text" 
                placeholder='Search by keyword' 
                className='search-bar__textarea'
                value={keyword}
                onChange={handleChange}
            />
            <button className='icon-btn' onClick={handleClick}>
                <i className='bx bx-search icon-main'></i>
            </button>
            <span className='search-bar__bar'></span>
            <button className='icon-btn'>
                <i className='bx bx-filter icon-blue'></i>
            </button>
        </div>
    )
}

export default SearchBar;