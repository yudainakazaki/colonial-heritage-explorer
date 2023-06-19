export type SearchQueries = {
    title?: string | undefined,
    artform?: string | undefined,
    location?: string | undefined,
    material?: string | undefined,
    bounds?: Bounds,
}

export type CardAttributes = {
    id: string,
    object: string,
    title: string,
    location: string,
    creator: string,
    material: string,
    keyword: string,
    image: string | any,
    latlng: {
        lat: number, 
        lng: number
    }
}

export type DetailAttributes = {
    id: string,
    title: string,
    creator: string,
    locationCreated: string,
    locationContent: string,
    artform: string,
    dimension: {
        height: number,
        width: number,
        depth: number,
    },
    material: string,
    keyword: string,
    image: string | any,
    provider: string,
    url: string,
    latlng: {
        lat: number, 
        lng: number
    },
    description: string,
    comment: string,
}

export type Dimension = {
    height: number,
    width: number,
    depth: number
}

export type State = 'search' | 'result' | 'resultDetail' | 'loading' | 'error';

export type Filters = {
    title: string,
    artform: string,
    location: string,
    material: string,
    useLocation: boolean,
}

export type Bounds = {
    _southWest: {
        lat: number,
        lng: number,
    },
    _northEast: {
        lat: number,
        lng: number,
    },
} | undefined

export type LatLng = {
    lat: number, 
    lng: number,
}