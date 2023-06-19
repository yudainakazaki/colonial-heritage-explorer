import IconLabel from "./IconLabel";
import style from '@/styles/DetailCard.module.scss'
import { DetailAttributes } from "@/Types/Types";
import { NoImage } from "@/components";
import { processDimension } from "@/utils/processData";

type Props = {
    data: DetailAttributes,
    emitClose: () => void,
}

export default function DetailCard({data, emitClose}: Props) {

    return (
        <div
            className={`flex flex-col relative ${style.card}`}
        >   
            <div>
                <div className={style.card__img}>
                    {data.image ? <img className={style.card__img__body} src={data.image} alt={`Image of ${data.title}`} /> : <NoImage />}
                </div>
                <div className={`flex flex-col ${style.card__info}`}>
                    <div className='flex justify-between mb-2'>
                        <span className="text-xl">{ data?.title }</span>
                        <a href={data.url} target="_blank" title='external link to the object detail'>
                            <span className={`bx bx-link-external text-xl w-5 h-5 icon ${style.icon}`} />
                        </a>
                    </div>
                    <div className={style.card__info__detail}>
                        {!!data.description && 
                            <div className="text-sm mt-1 mb-3">{data.description}</div>}
                        {!!data.creator && <IconLabel size='l' icon='user' text={data.creator} msg='Creator of the object.'/>}
                        {!!data.locationCreated && <IconLabel size='l' icon='map' text={data.locationCreated} msg='Location where the object was originally created.' />}
                        {!!data.locationContent && <IconLabel size='l' icon='edit-location' text={data.locationContent} msg='Location depicted by the object.' />}
                        {!!data.artform && <IconLabel size='l' icon='palette' text={data.artform} msg='Artform of the object.'/>}
                        {!!data.material && <IconLabel size='l' icon='cube' text={data.material} msg='Material of the object.'/>}
                        {(!!data.dimension?.height || !!data.dimension?.width || !!data.dimension?.depth) && 
                            <IconLabel size='l' icon='ruler' text={processDimension(data.dimension).val} msg={processDimension(data.dimension).msg}/> }
                        {!!data.keyword && <IconLabel size='l' icon='key' text={data.keyword} msg='Keywords related the object.'/>}
                        {!!data.provider && <IconLabel size='l' icon='bank' text={data.provider} showLink msg='Provider of the object.'/>}
                        {!!data.comment && <IconLabel size='l' icon='comment-dots' text={data.comment} msg='Comment on the object.'/>}
                        {!data.latlng && 
                            <>
                                <hr className="my-2"/>
                                <IconLabel size='l' icon='error-alt' text='Map data is not available.' msg='Map does not show the location of this object.'/>
                            </>
                        }
                    </div>
                </div>
                <button className={`${style.card__close}`} onClick={emitClose}>
                    <span className='bx bx-x text-xl' />
                </button>
            </div>
        </div>
    );
}  