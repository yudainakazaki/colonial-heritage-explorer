//query to get a distinct list of art forms
export function artforms() {
    const query =  
        `prefix sdo: <https://schema.org/>
            select distinct ?artform {
                ?object sdo:artform ?artform;
            }
        order by asc(?artform)`
        .replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}

//query to get a distinct list of locations of creation
export function locations() {
    const query =  
        `prefix sdo: <https://schema.org/>
            select distinct ?locationCreatedName {
                ?object sdo:locationCreated/sdo:name ?locationCreatedName .
            }
        order by asc(?locationCreatedName)`
        .replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}

//query to get a distinct list of materials
export function materials() {
    const query =  
        `prefix sdo: <https://schema.org/>
            select distinct ?material {
                ?object sdo:material ?material.
            }
        order by asc(?material)`
        .replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}