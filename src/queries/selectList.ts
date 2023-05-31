//query to get a distinct list of art forms
export function artformsQuery() {
    const query =  
        `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX sdo: <https://schema.org/>
        PREFIX dct: <http://purl.org/dc/terms/>
        select distinct ?artform
        where {
            ?object
                sdo:identifier ?id;
                  dct:title ?title;
                dct:creator ?creator;
                sdo:locationCreated/sdo:name ?loc_created;
                sdo:contentLocation/sdo:name ?loc_content;
                foaf:depiction ?image;
                sdo:artform ?artform;
                {
                      select ?id (GROUP_CONCAT(DISTINCT ?keywords; SEPARATOR=", ") AS ?keywords)
                    where {
                        ?object sdo:identifier ?id;
                                sdo:keywords ?keywords .
                    }
                    group by ?id
                  }
                {
                      select ?id (GROUP_CONCAT(DISTINCT ?material; SEPARATOR=", ") AS ?materials)
                    where {
                        ?object sdo:identifier ?id;
                                sdo:material ?material .
                    }
                    group by ?id
                  }
        }
        order by ?artform`
        .replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}

//query to get a distinct list of locations of creation
export function locationsQuery() {
    const query =  
        `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX sdo: <https://schema.org/>
        PREFIX dct: <http://purl.org/dc/terms/>
        select distinct ?loc_created
        where {
            ?object
                sdo:identifier ?id;
                  dct:title ?title;
                dct:creator ?creator;
                sdo:locationCreated/sdo:name ?loc_created;
                sdo:contentLocation/sdo:name ?loc_content;
                foaf:depiction ?image;
                sdo:artform ?artform;
                {
                      select ?id (GROUP_CONCAT(DISTINCT ?keywords; SEPARATOR=", ") AS ?keywords)
                    where {
                        ?object sdo:identifier ?id;
                                sdo:keywords ?keywords .
                    }
                    group by ?id
                  }
                {
                      select ?id (GROUP_CONCAT(DISTINCT ?material; SEPARATOR=", ") AS ?materials)
                    where {
                        ?object sdo:identifier ?id;
                                sdo:material ?material .
                    }
                    group by ?id
                  }
        }
        order by ?loc_created`
        .replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}

//query to get a distinct list of materials
export function materialsQuery() {
    const query =  
        `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX sdo: <https://schema.org/>
        PREFIX dct: <http://purl.org/dc/terms/>
        select distinct ?material
        where {
            ?object
                sdo:identifier ?id;
                  dct:title ?title;
                dct:creator ?creator;
                sdo:locationCreated/sdo:name ?loc_created;
                sdo:contentLocation/sdo:name ?loc_content;
                foaf:depiction ?image;
                sdo:artform ?artform;
                sdo:material ?material .
                {
                      select ?id (GROUP_CONCAT(DISTINCT ?keywords; SEPARATOR=", ") AS ?keywords)
                    where {
                        ?object sdo:identifier ?id;
                                sdo:keywords ?keywords .
                    }
                    group by ?id
                  }
        }
        order by ?material`
        .replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}