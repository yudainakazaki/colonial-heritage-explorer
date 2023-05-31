import React from 'react'
import '@/styles/resultpane.scss'
import { CardAttributes } from '@/Types'
import { ItemCard, NoData } from '@/components'

type Props = {
    data: CardAttributes[],
    emitId: (id: string) => void;
}

const ResultPane = ({data, emitId}: Props) => {

    const handleEmit = (id: string) => {
        emitId(id);
        console.log(id);
    }

    return (
        <div className='resultpane'>
            <div className='resultpane__spacer' />
            <div className='resultpane__container'>
                {data.length === 0 ? 
                <NoData /> :
                Array.isArray(data) && data.map((item: CardAttributes, i: any) => {
                    return (
                        <ItemCard 
                            key={i}
                            data={item}
                            emit={handleEmit}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ResultPane;