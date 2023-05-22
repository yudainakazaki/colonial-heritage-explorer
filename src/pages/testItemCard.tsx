import ItemCard from '@/components/ItemCard'
import { CardAttributes } from "@/Types"
import image from '@/images/johnmanjiro.png'

export default function TestFilterModal() {

    const testItem: CardAttributes = {
        title: "Portrait of John",
        location: "Mexico",
        creator: "John Manjiro",
        material: "Oil paint",
        keyword: "painting, portrait",
        image: image
    }

    return (
        <ItemCard 
            { ...testItem }
        />
    );
}  