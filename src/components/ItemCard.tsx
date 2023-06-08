import { CardAttributes } from "@/Types";
import IconLabel from "./IconLabel";
import style from '@/styles/ItemCard.module.scss'
import { NoImage } from "@/components";
import { LatLng } from "leaflet";

type Props = {
    emit: (id: string, latlng: {lat: number, lng: number}) => void;
    data: CardAttributes;
}

export default function ItemCard({emit, data}: Props) {

    const onClick = () => {
        emit(data.id, data.latlng);
    }

    return (
        <div
            className={`${style.card} flex cursor-pointer`}
            onClick={ onClick }
        >
            <div className={`flex flex-col font-bold ${style.card__info}`}>
                <span className="text-s mb-1">{ data.title || '-' }</span>
                <IconLabel size='s' icon='user' text={data.creator || '-'} msg='Creator of the object.'/>
                <IconLabel size='s' icon='map' text={data.location || '-'} msg='Location where the object was originally created.' />
                <IconLabel size='s' icon='cube' text={data.material || '-'} msg='Material of the object.'/>
                <IconLabel size='s' icon='key' text={data.keyword || '-'} msg='Keywords of the object.'/>
            </div>
            <div className={style.card__img}>
                { data.image ? 
                    <img className={style.card__img__body} src={data.image} alt={data.title} /> :
                    <NoImage />
                }
            </div>
        </div>
    );
}  