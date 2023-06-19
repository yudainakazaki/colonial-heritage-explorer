import style from '@/styles/FilterModal.module.scss'
import DropDownMenu from './DropDownMenu';
import { artformsQuery, locationsQuery, materialsQuery } from '@/queries/selectList';
import React, { useState, useEffect } from 'react';
import { processArtforms, processLocations, processMaterials } from '@/utils/processData';
import { Filters } from '@/Types/Types';
import axios from 'axios';
import { Info } from '@/components';

type Props = {
    emitClose() : void,
    emitSearch(filter: Filters) : void
}

type selectableAttributes = 'artforms' | 'locations' | 'materials';

const queryGen = (attribute: selectableAttributes) => {
    switch(attribute){
        case 'artforms': return artformsQuery(); 
        case 'locations': return locationsQuery();
        case 'materials': return materialsQuery();
    }
}

const fetchData = async (attribute: selectableAttributes) => {
    try {
        const res = await axios.get(`${process.env.API_URL}?query=${queryGen(attribute)}`, {
            headers: {
                'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
            }
        });
    
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const FilterModal = ({emitClose, emitSearch}: Props) => {

    const initState = {
        title: '',
        artform: '',
        location: '',
        material: '',
        useLocation: false,
    } as Filters

    const initDisabledStatus = {
        art: false,
        loc: false,
        mat: false
    }

    const [artforms, setArtforms] = useState([] as string[]);
    const [locations, setLocations] = useState([] as string[]);
    const [materials, setMaterials] = useState([] as string[]);
    const [filter, setFilter] = useState(initState)
    const [disableDropDown, setDisableDropDown] = useState(initDisabledStatus)

    const fetchSelectList = async () => {
        
        try {
            const res = await Promise.all([fetchData('artforms'), fetchData('locations'), fetchData('materials')]);
            setArtforms(processArtforms(res[0]));
            setLocations(processLocations(res[1])); 
            setMaterials(processMaterials(res[2]));   
        } catch(e) {
            console.error(e);
        }
    }

    const handleChange = (e: any) => {
        setFilter({...filter, title: e.target.value});
    }

    const handleSwitch = () => {
        setFilter({...filter, useLocation: !filter.useLocation});
    }

    const handleDropDown = (status: any, type: any) => { 
        switch(type){
            case 'art':
                if(status === 'open') setDisableDropDown({...disableDropDown, art: false, loc: true, mat: true})
                else setDisableDropDown(initDisabledStatus)
                break;
            case 'loc':
                if(status === 'open') setDisableDropDown({...disableDropDown, art: true, loc: false, mat: true})
                else setDisableDropDown(initDisabledStatus)
                break;
            case 'mat':
                if(status === 'open') setDisableDropDown({...disableDropDown, art: true, loc: true, mat: false})
                else setDisableDropDown(initDisabledStatus)
                break;
        }
    }

    const handleSetVal = (val : string, index: number) => {
        switch (index) {
            case 0: setFilter({...filter, artform: val}); break;
            case 1: setFilter({...filter, location: val}); break;
            case 2: setFilter({...filter, material: val}); break;
        }
    }

    const handleReset = () => {
        setFilter(initState);
        setDisableDropDown(initDisabledStatus);
    }

    const handleSend = () => {
        emitSearch(filter);
    }

    const handleClose = () => {
        emitClose();
    }

    useEffect(() => {
        fetchSelectList();
    }, [])

    return (
        <div className={style.bg}>
            <div className={style.modal}>
                <button className={`mb-4 ${style.modal__close}`} onClick={handleClose}>close</button>
                <div className={`mb-4 mt-2 ${style.modal__header}`}>
                    Filters 
                    <Info msg='All the select fields are optinal. You can execute a search only with attributes of your interest.' />
                </div>
                <div className={`${style.modal__title}`}>
                    <div className={`${style.modal__title__title}`}>Title</div>
                    <div className={`mt-1 mb-4 flex ${style.modal__title__body}`}>
                        <input 
                            className='mx-3 outline-none w-full'
                            type="text" 
                            value={filter.title}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <DropDownMenu title='Art form' items={artforms} val={filter.artform} emitVal={(e) => handleSetVal(e, 0)} emitOpen={(status) => handleDropDown(status, 'art')} disabled={disableDropDown.art}/>
                <DropDownMenu title='Location of creation' items={locations} val={filter.location} emitVal={(e) => handleSetVal(e, 1)} emitOpen={(status) => handleDropDown(status, 'loc')} disabled={disableDropDown.loc}/>
                <DropDownMenu title='Material' items={materials} val={filter.material} emitVal={(e) => handleSetVal(e, 2)} emitOpen={(status) => handleDropDown(status, 'mat')} disabled={disableDropDown.mat} />
                <div className={`flex justify-between mt-6 mb-4 ${style.modal__checkbox}`}>
                    <span className='flex items-center'>
                        Search in the selected area
                        <Info msg='The map of the area shown in your screen is the range of the search.' />
                    </span>
                    <input 
                        className='mx-2'
                        type="checkbox" 
                        checked={filter.useLocation} 
                        onChange={handleSwitch}
                    />
                </div>
                <div className='flex mt-8 mb-4'>
                    <button 
                        onClick={handleReset}
                        className={`flex justify-center items-center m-2 ${style.modal__button} ${style.modal__button__reset}`}
                        value='Reset'
                    > Reset </button>
                    <button 
                        onClick={handleSend}
                        className={`flex justify-center items-center m-2 ${style.modal__button} ${style.modal__button__search}`}
                    > Search </button>
                </div>
            </div>
        </div>
    )
}

export default FilterModal;