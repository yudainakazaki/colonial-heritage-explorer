export default function keywordsearch(keyword: string) {
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
    select distinct ?id ?title ?object ?creator ?image ?artform
    (GROUP_CONCAT(DISTINCT ?keywords; SEPARATOR=", ") as ?keywords) 
    (GROUP_CONCAT(DISTINCT ?material; SEPARATOR=", ") as ?materials) 
    (GROUP_CONCAT(DISTINCT ?loc_content; SEPARATOR=", ") as ?loc_content) 
    (GROUP_CONCAT(DISTINCT ?loc_created; SEPARATOR=", ") as ?loc_created) 
    (sample(float:(?lat)) as ?lat) (sample(float:(?lng)) as ?lng)
    (sample(?geonames) as ?geonames)
    where {
        optional {?object sdo:identifier ?id.}
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
        }
        filter (
            contains(lcase(?title), lcase("${keyword}")) || contains(lcase("${keyword}"), lcase(?title)) || 
            contains(lcase(?creator), lcase("${keyword}")) || contains(lcase("${keyword}"), lcase(?creator)) || 
            contains(lcase(?artform), lcase("${keyword}")) || contains(lcase("${keyword}"), lcase(?artform)) || 
            contains(lcase(?loc_created), lcase("${keyword}")) || contains(lcase("${keyword}"), lcase(?loc_created)) ||
            contains(lcase(?keywords), lcase("${keyword}"))
          ) .
    } 
    group by ?id ?object ?title ?creator ?image ?artform limit 50`
    
    query = query.replace(/[\r\n\t]/g, " ");

    return encodeURIComponent(query);
}