import { DetailAttributes, CardAttributes, Dimension } from "@/Types";

type DataType = 'card' | 'detail'

export const processData = (data: any, type: DataType) => {

    if (type === 'detail')
        return {
            id: data?.id || undefined,
            title: data?.title || undefined,
            locationCreated: data?.loc_created || undefined,
            locationContent: data?.loc_content || undefined,
            artform: data?.artform || undefined,
            creator: data?.creator || undefined,
            dimension: {
                height: data?.height,
                width: data?.width,
                depth: data?.depth,
            },
            material: data?.material_list || undefined,
            keyword: data?.keywords_list || undefined,
            provider: data?.provider || undefined,
            url: data?.object || undefined,
            image: data?.image || undefined,
            latlng: data?.lat !== null && data?.lng !== null ? {lat: parseFloat(data?.lat), lng: parseFloat(data?.lng)} : undefined,
        } as DetailAttributes;
    
    else
        return {
            id: data.id || ' - ',
            object: data.object || '',
            title: data.title || ' - ',
            location: data.loc_created || ' - ',
            creator: data.creator || ' - ',
            material: data.materials || ' - ',
            keyword: data.keywords || ' - ',
            image: data.image || undefined,
            latlng: data?.lat !== null && data?.lng !== null ? {lat: parseFloat(data?.lat), lng: parseFloat(data?.lng)} : undefined,
        } as CardAttributes;
}

export const processDimension = (d: Dimension) => {
    const val = `${d?.height || '--'}cm x ${d?.width || '--'}cm x ${d?.depth || '--'}cm`;
    const msg = 'height x width x depth';

    return {val, msg}
}

export const processArtforms = (list: any[]) => {
    var array: string[] = [];
    list.map((item) => {
        array.push(item.artform);
    })
    return array;
}

export const processLocations = (list: any[]) => {
    var array: string[] = [];
    list.map((item) => {
        array.push(item.loc_created);
    })
    return array;
}

export const processMaterials = (list: any[]) => {
    var array: string[] = [];
    list.map((item) => {
        array.push(item.material);
    })
    return array;
}
