export default function keywordsearch(keyword: string) {
    const query = `
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX cidoc-crm: <http://www.cidoc-crm.org/cidoc-crm/>
    PREFIX schema: <https://schema.org/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX sdo: <https://schema.org/>
    PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX dct: <http://purl.org/dc/terms/>
    select distinct ?id ?title ?creator ?image ?artform ?keywords ?materials (sample(?lat) as ?lat) (sample(?long) as ?long) ?loc_content ?loc_created
    where {
        ?object
            sdo:identifier ?id;
            dct:title ?title;
            dct:creator ?creator;
            foaf:depiction ?image;
            sdo:artform ?artform;
            sdo:locationCreated/skos:closeMatch ?geonames.
          
            SERVICE <http://factforge.net/repositories/ff-news> {
                ?geonames 
                      wgs84:lat ?lat ;
                      wgs84:long ?long .
            }
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
            {
                select ?id (GROUP_CONCAT(DISTINCT ?loc_content; SEPARATOR=", ") AS ?loc_content)
                where {
                    ?object 		
                        sdo:identifier ?id;
                        sdo:contentLocation/sdo:name ?loc_content .
                }
                group by ?id
            }
            {
                select ?id (GROUP_CONCAT(DISTINCT ?loc_created; SEPARATOR=", ") AS ?loc_created)
                where {
                    ?object 		
                        sdo:identifier ?id;
                        sdo:locationCreated/sdo:name ?loc_created .
                }
                group by ?id
            }
        filter (
            contains(lcase(?title), lcase("${keyword}")) || contains(lcase("${keyword}"), lcase(?title)) || 
            contains(lcase(?creator), lcase("${keyword}")) || contains(lcase("${keyword}"), lcase(?creator)) || 
            contains(lcase(?artform), lcase("${keyword}")) || contains(lcase("${keyword}"), lcase(?artform)) || 
            contains(lcase(?loc_created), lcase("${keyword}")) || contains(lcase("${keyword}"), lcase(?loc_created))
          ) .
    } 
    group by ?id ?title ?creator ?image ?artform ?keywords ?materials ?loc_content ?loc_created
    `.replace(/[\r\n\t]/g, " ");

    return encodeURIComponent(query);
}