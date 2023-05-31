import style from '@/styles/DropDown.module.scss'

import React, { useState, useEffect, ReactNode } from 'react';

type Props = {
    items: string[],
    title: string,
    val: string,
    emitVal: (val: string) => void,
}

const DropDownMenu = ({items, title, val, emitVal}: Props) => {

    const [isOpen, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(val);

    const handleOpen = () => {
        setOpen(!isOpen);
    }

    const handleSelect = (key: number) => {
        setOpen(false);
        setSelectedValue(items[key]);
    }

    useEffect(() => {
        if(selectedValue !== '') emitVal(selectedValue);
    }, [selectedValue])

    useEffect(() => {
        setSelectedValue(val);
    }, [val])

    const Label = () => {
        const label = items.length <= 0 ? 'No item to select' :
                    selectedValue === '' ? 'Select' : selectedValue;
        return <span className={`mx-3 ${style.dropdown__mainButton__title}`}>{ label }</span>
    }

    return (
        <>
            <div className={`${style.title}`}>{ title }</div>
            <div className={`mt-1 mb-4 ${style.dropdown}`}>
                <button onClick={handleOpen} className={`flex flex-row justify-between items-center ${style.dropdown__mainButton}`} disabled={ items.length === 0 } >
                    <Label />
                    <span className={`bx mx-3 ${style.dropdown__mainButton__icon} ${isOpen ? 'bxs-up-arrow' : 'bxs-down-arrow'}`}/>
                </button>
                {
                    isOpen && items.length > 0 && (
                        <div className={`flex flex-col my-1 py-2 ${style.dropdown__list}`} >
                            {
                                items.map((item, key) => {
                                    return (
                                        <button 
                                            className={`flex items-center ${item === selectedValue ? style.dropdown__list__selected : style.dropdown__list__item}`} 
                                            key={key} 
                                            onClick={() => handleSelect(key)}
                                        >
                                            <div className={`ml-5 ${style.dropdown__list__item__text}`}>{ item }</div>    
                                        </button>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default DropDownMenu;