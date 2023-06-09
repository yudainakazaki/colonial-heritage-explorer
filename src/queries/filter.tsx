import { SearchQueries } from "@/Types";

export default function filterSearch(queries: SearchQueries, useLocation: boolean) {

    const hasFilter = !!queries.title || 
                        !!queries.artform ||
                        !!queries.location ||
                        !!queries.material;
    
    const hasBounds = !!queries.bounds || !!useLocation;
    
    var query =
    `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX cidoc-crm: <http://www.cidoc-crm.org/cidoc-crm/>
    PREFIX schema: <https://schema.org/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX sdo: <https://schema.org/>
    PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX float: <http://www.w3.org/2001/XMLSchema#float>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    select * { {
        select distinct ?id ?title ?creator ?image ?artform ?geonames 
        (GROUP_CONCAT(DISTINCT ?keywords; SEPARATOR=", ") as ?keywords) 
        (GROUP_CONCAT(DISTINCT ?material; SEPARATOR=", ") as ?materials) 
        (GROUP_CONCAT(DISTINCT ?loc_content; SEPARATOR=", ") as ?loc_content) 
        (GROUP_CONCAT(DISTINCT ?loc_created; SEPARATOR=", ") as ?loc_created) 
        (sample(float:(?lat)) as ?lat) (sample(float:(?lng)) as ?lng)
        where {`;
    
    if (hasFilter){
        var filter = ''.concat(
            queries.title ?
                `?object sdo:identifier ?id; sdo:title ?title0
                filter (contains(?title0, "${queries.title}") || contains("${queries.title}", ?title0))` : '',
            queries.material ? 
                `?object sdo:identifier ?id; sdo:material ?material0
                filter (contains(?material0, "${queries.material}"))` : '',
            queries.artform ? 
                `?object sdo:identifier ?id; sdo:artform ?artform0
                filter (?artform0 = "${queries.artform}")` : '',
            queries.location ? 
                `?object sdo:identifier ?id; sdo:locationCreated/sdo:name ?loc_created0.
                filter(contains(lcase(str("${queries.location}")), lcase(str("${queries.location}"))))` : '')
        query += filter
    }
    
    query += `optional {?object sdo:identifier ?id.}
            optional {?object dct:title ?title.}
            optional {?object dct:creator ?creator.}
            optional {?object foaf:depiction ?image.}
            optional {?object sdo:artform ?artform.}
            optional {?object sdo:locationCreated/sdo:name ?loc_created .}
            optional {?object sdo:locationCreated/sdo:name ?loc_content .}
            optional {?object sdo:keywords ?keywords .}
      		optional {?object sdo:material ?material .}
            optional {
                ?object sdo:locationCreated/skos:closeMatch ?geonames.
                SERVICE <http://factforge.net/repositories/ff-news> {
                    ?geonames 
                        wgs84:lat ?lat ;
                        wgs84:long ?lng .
                }
            } } group by ?id ?object ?title ?creator ?image ?artform ?geonames } `;

    console.log('hasFilter: ' + hasFilter);
    if(hasBounds){
        var filter = 'filter ('.concat(
            useLocation && queries.bounds ? `
                xsd:float(?lat) > ${queries.bounds?._southWest?.lat} && 
                xsd:float(?lat) < ${queries.bounds?._northEast?.lat} &&
                xsd:float(?lng) > ${queries.bounds?._southWest?.lng} && 
                xsd:float(?lng) < ${queries.bounds?._northEast?.lng}
            ` : ''
        );
        
        if (filter.slice(-3) == '&& ') filter = filter.slice(0, -3);
                    
        query = query.concat(filter, ') . ');
    }
    query = query.concat('} limit 100');
    //query = query.concat('} group by ?id ?object ?title ?creator ?image ?artform ?geonames ');

    console.log(query);
    query = query.replace(/[\r\n\t]/g, " ");
    
    return encodeURIComponent(query);
}