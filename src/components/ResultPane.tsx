import React, { useEffect } from 'react'
import '@/styles/resultpane.scss'
import { CardAttributes } from '@/Types/Types'
import { ItemCard, Msg } from '@/components'
import { LatLng } from '@/Types/Types'

type Props = {
    isError: Boolean,
    data: CardAttributes[],
    emitId: (id: string) => void;
    emitPoint: (latlng: LatLng) => void;
}

const ResultPane = ({data, emitId, emitPoint, isError}: Props) => {

    const handleEmit = (id: string, latlng: LatLng) => {
        emitId(id);
        emitPoint(latlng);
    }

    return (
        <div className='resultpane'>
            <div className='resultpane__spacer' />
            <div className='resultpane__container'>
                {
                    isError ? <Msg type='error'/> :
                    data.length === 0 ? <Msg type='nodata' /> :
                    Array.isArray(data) && data.map((item: CardAttributes, i: any) => {
                        return (
                            <ItemCard 
                                key={i}
                                data={item}
                                emit={handleEmit}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ResultPane;