export type SearchQueries = {
    title?: string | undefined,
    artform?: string | undefined,
    location?: string | undefined,
    material?: string | undefined,
    coordinates?: {
        latnorth?: number | undefined,
        latsouth?: number | undefined,
        longeast?: number | undefined,
        longwest?: number | undefined,
    }
}

export type CardAttributes = {
    title: string,
    location: string,
    creator: string,
    material: string,
    keyword: string,
    image: string | any
}