import React, { useState } from 'react'
import '@/styles/search-bar.scss'
import '@/styles/_utils.scss'
import { BeatLoader } from 'react-spinners'
import { State } from '@/Types/Types'

type Props = {
    emitSearch: (keyword: string) => void;
    emitFilterClick: () => void;
    clearSearch: () => void;
    isLoading: boolean;
    state: State;
}

const SearchBar = ({emitSearch, clearSearch, emitFilterClick, isLoading, state}: Props) => {

    const [keyword, setKeyword] = useState('');

    const handleChange = (e: any) => {
        setKeyword(e.target.value);
    }

    const handleClickSearch = () => {       
        emitSearch(keyword);
    }

    const handleClickClear = () => {
        clearSearch(); 
        setKeyword('');
    }

    const clickEnter = (e: any) => {
        if (e.key === 'Enter') handleClickSearch();
    }

    return (
        <div className='search-bar flex'>
            <input 
                type="text" 
                placeholder='Search by keyword' 
                className='search-bar__textarea'
                value={keyword}
                onChange={handleChange}
                onKeyUp={clickEnter}
            />
            <button className='icon-btn' onClick={handleClickSearch}>
                <i className='bx bx-search icon-main' />
            </button>
            <span className='search-bar__bar' />
            {
                isLoading ? 
                    <div className='icon-btn icon-hover'>
                        <BeatLoader size={8} speedMultiplier={0.6} color='grey'/> 
                    </div> : 
                !isLoading && (state === 'result' || state === 'resultDetail' || state === 'error') ? 
                    <button className='icon-btn icon-hover' onClick={handleClickClear}>
                        <i className='bx bx-x grey' />
                    </button> : 
                !isLoading && state === 'search' ? 
                <button className='icon-btn' onClick={emitFilterClick}>
                    <i className='bx bx-filter icon-blue' />
                </button> : null
            }
        </div>
    )
}

export default SearchBar;