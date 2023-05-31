import React, { useState } from "react";
import style from '@/styles/IconLabel.module.scss'

type Props = {msg: string}

const Info = ({msg}: Props) => {

    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(true);
    };

    const onLeave = () => {
        setHover(false);
    };

    return (
        <>
            <span
                className='bx bx-info-circle ml-2 text-base' 
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            />
            {hover && <div className={`${style.msg} absolute`}>{ msg }</div>}
        </>
    )
}

export default Info;