const ep = new String(
    `PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX cidoc-crm: <http://www.cidoc-crm.org/cidoc-crm/>
    PREFIX schema: <https://schema.org/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX sdo: <https://schema.org/>
    PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    SELECT * WHERE {
        ?object sdo:locationCreated/sdo:name 'Mexico';
                foaf:depiction ?image;
                sdo:locationCreated/skos:closeMatch ?geonames.

        SERVICE <http://factforge.net/repositories/ff-news> {
            ?geonames 
            wgs84:lat ?lat;
            wgs84:long  ?long. 
        }                                                 
    }`).replace(/[\r\n\t]/g, " ");

const url = "https://api.colonial-heritage.triply.cc/datasets/yn/rce-colonial-objects/services/rce-colonial-objects/sparql"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1bmtub3duIiwiaXNzIjoiaHR0cHM6Ly9hcGkuY29sb25pYWwtaGVyaXRhZ2UudHJpcGx5LmNjIiwianRpIjoiZTA5ZDczNDEtZWRkMy00MmQ0LWE2NTktNThlN2E5NzBjY2YyIiwidWlkIjoiNjQ0MTJiYmQxYjVhYTAwYzA3Njg5ZTA5IiwiaWF0IjoxNjg0MzI3Mzg0fQ.K2liT2MqTOP1RoQE9_DzICunpN6_GFR9tIJ98OGktVc"
const query = encodeURIComponent(ep)

const callAPI = async () => {
    console.log(query);
    try {
        const res = await fetch(`${url}?query=${query}`, {
            method: "GET",
            headers: {
                Authentication: `Bearer ${token}`
            }
        });
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};
