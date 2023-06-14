import React, { useState } from "react";
import style from '@/styles/IconLabel.module.scss'

type Size = 's' | 'l';

type IconLabelProps = {
    size: Size,
    icon: string,
    text: string,
    showLink?: boolean,
    msg: string
}

export default function IconLabel(props: IconLabelProps) {

    const { size, icon, text, msg } = props;

    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(true);
    };

    const onLeave = () => {
        setHover(false);
    };

    const textColor = hover ? {
        color: '#438FC1',
    } : {}

    const sizeFont = size === 's' ? 'text-xs mr-0.5' : 'text-sm mr-1 font-normal'
    const sizeIcon = size === 's' ? 'text-xs mr-0.5' : 'text-xl mr-1 font-normal'

    return (
        <div className={`relative overflow-visible ${size === 'l' ? 'my-0.5' : 'my-0'}`}>
            <div 
                className='flex justify-left items-center my-0.5 cursor-pointer'
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            >
                <span className={ `bx bxs-${icon} ${sizeIcon} mr-2` } style={{ color: '#438FC1' }}/>
                <span className={ sizeFont } style={ textColor }>{ props.showLink ? (<a href={text} target="_blank" className="underline-offset-4">{text.split('/').slice(-1)}</a>) : text }</span>
            </div>
            {hover && <div className={`${style.msg} absolute`}>{ msg }</div>}
        </div>
    )
}