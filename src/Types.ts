export type SearchQueries = {
    title?: string | undefined,
    artform?: string | undefined,
    location?: string | undefined,
    material?: string | undefined,
    coordinates?: Bounds,
}

export type CardAttributes = {
    id: string,
    title: string,
    location: string,
    creator: string,
    material: string,
    keyword: string,
    image: string | any,
    geoLocation: [number, number]
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
    geoLocation: [number, number]
}

export type Dimension = {
    height: number,
    width: number,
    depth: number
}

export type State = 'search' | 'result' | 'resultDetail' | 'loading';

export type Filters = {
    title: string,
    artform: string,
    location: string,
    material: string,
    useLocation: boolean,
}

export type Bounds = {
    southWest: {
        lat: number,
        long: number,
    },
    northEast: {
        lat: number,
        long: number,
    },
} | undefined