import { SearchQueries } from "@/Types";

export default function keyword(queries: SearchQueries) {
    var query = `
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX cidoc-crm: <http://www.cidoc-crm.org/cidoc-crm/>
        PREFIX schema: <https://schema.org/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX sdo: <https://schema.org/>
        PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX float: <http://www.w3.org/2001/XMLSchema#float>
        
        select distinct *
        where {
            ?object
                sdo:identifier ?id;
                dct:title ?title;
                dct:creator ?creator;
                sdo:locationCreated/sdo:name ?loc_created;
                sdo:contentLocation/sdo:name ?loc_content;
                foaf:depiction ?image;
                sdo:artform ?artform;
                sdo:locationCreated/skos:closeMatch ?geonames.
        
                SERVICE <http://factforge.net/repositories/ff-news> {
                    ?geonames 
                        wgs84:lat ?lat;
                        wgs84:long  ?long.
                }
                
                {
                    select ?id (GROUP_CONCAT(DISTINCT ?keywords; SEPARATOR=", ") AS ?keywords_list)
                    where {
                        ?object sdo:identifier ?id;
                                sdo:keywords ?keywords .
                    }
                    group by ?id
                }
        
                {
                    select ?id (GROUP_CONCAT(DISTINCT ?material; SEPARATOR=", ") AS ?material_list)
                    where {
                        ?object sdo:identifier ?id;
                                sdo:material ?material .
                    }
                    group by ?id
                }
            filter (`;
    
    var filter = ''.concat(
        queries.title ? `(contains(?title, "${queries.title}") || contains("${queries.title}", ?title)) && ` : '',
        queries.material ? `contains(?material_list, "${queries.material}") && ` : '',
        queries.artform ? `?artform = "${queries.artform}" && ` : '',
        queries.location ? `?loc_created = "${queries.location}" && ` : '',
        queries.coordinates ? `
            float:(?lat) > ${queries.coordinates?.latsouth} && 
            float:(?lat) < ${queries.coordinates?.latnorth} &&
            float:(?long) > ${queries.coordinates?.longwest} && 
            float:(?long) < ${queries.coordinates?.longeast}
        ` : ''
    );
    
    if (filter.slice(-3) == '&& ') filter = filter.slice(0, -3);
                
    query = query.concat(filter, `) .}`).replace(/[\r\n\t]/g, " ");

    return encodeURIComponent(query);
}