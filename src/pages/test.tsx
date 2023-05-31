import React, { useEffect, useState } from 'react'
import ItemCard from '@/components/ItemCard'
import DetailCard from '@/components/DetailCard'
import FileModal from '@/components/FilterModal'
import { CardAttributes, DetailAttributes } from "@/Types"

export default function test() {

    const [ data, setData ] = useState({} as CardAttributes);

    const style = {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    };

    const getFilter = (filter: any) => {
        console.log(filter);
    }

    return (
        <div style={style}>
            <FileModal emitSearch={getFilter}/>
            {/* <DetailCard 
                id={'AB15398'}
            /> */}
            {/* <ItemCard 
                { ...data }
            /> */}
        </div>
    );
}  