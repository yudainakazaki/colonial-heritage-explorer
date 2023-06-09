export default function object(id: string){
    
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
        select * { {
            select distinct ?id ?title ?creator ?image ?artform
            (GROUP_CONCAT(DISTINCT ?keywords; SEPARATOR=", ") as ?keywords) 
            (GROUP_CONCAT(DISTINCT ?material; SEPARATOR=", ") as ?materials) 
            (GROUP_CONCAT(DISTINCT ?loc_content; SEPARATOR=", ") as ?loc_content) 
            (GROUP_CONCAT(DISTINCT ?loc_created; SEPARATOR=", ") as ?loc_created) 
            (sample(float:(?lat)) as ?lat) (sample(float:(?lng)) as ?lng) (sample(float:(?geonames)) as ?geonames)
        where {
            ?object sdo:identifier ?id . filter (?id = "${id}")
            optional {?object sdo:identifier ?id;}
            optional {?object dct:title ?title;}
            optional {?object dct:creator ?creator;}
            optional {?object sdo:locationCreated/sdo:name ?loc_created;}
            optional {?object sdo:contentLocation/sdo:name ?loc_content;}
            optional {?object foaf:depiction ?image;}
            optional {?object sdo:artform ?artform;}
            optional {?object sdo:provider ?provider;}
            optional {
                ?object sdo:locationCreated/skos:closeMatch ?geonames.
                SERVICE <http://factforge.net/repositories/ff-news> {
                    ?geonames 
                        wgs84:lat ?lat;
                        wgs84:long  ?lng.
                }
            }
            optional {
                ?object
                    sdo:height/sdo:value ?height;
                    sdo:depth/sdo:value ?depth;
                    sdo:width/sdo:value ?width .
            }
            {
                select ?object (GROUP_CONCAT(DISTINCT ?keywords; SEPARATOR=", ") AS ?keywords_list)
                where { ?object sdo:keywords ?keywords .}
                group by ?object
            }
            {
                select ?object (GROUP_CONCAT(DISTINCT ?material; SEPARATOR=", ") AS ?material_list)
                where { ?object sdo:material ?material .}
                group by ?object
            }
            
        } group by ?id ?object ?title ?creator ?image ?artform } } limit 1`

    console.log(query);

    query = query.replace(/[\r\n\t]/g, " ");

    return encodeURIComponent(query);
}