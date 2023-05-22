import { CardAttributes } from "@/Types";
import image from '@/images/johnmanjiro.png'

export default function TestFilterModal(props: CardAttributes) {

    return (
        <div>
            <h1>{ props.title }</h1>
            <h2>{ props.location }</h2>
            <h2>{ props.creator }</h2>
            <h2>{ props.material }</h2>
            <h2>{ props.keyword }</h2>
            <img src={props.image.src} alt={props.title} />
        </div>
    );
}  