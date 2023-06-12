//query to get a distinct list of art forms
export function artformsQuery() {
    const query =  
        `prefix sdo: <https://schema.org/>
        select distinct ?artform {
          ?object sdo:artform ?artform;
        }
        order by asc(lcase(?artform))`
        .replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}

//query to get a distinct list of locations of creation
export function locationsQuery() {
    const query =  
		`prefix sdo: <https://schema.org/>
		select distinct ?loc_created {
			?object sdo:locationCreated/sdo:name ?loc_created;
		}
		order by asc(?loc_created)`
      	.replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}

//query to get a distinct list of materials
export function materialsQuery() {
    const query =  
		`prefix sdo: <https://schema.org/>
		select distinct ?material {
			?object
			sdo:material ?material;
		}
		order by asc(lcase(?material))`
		.replace(/[\r\n\t]/g, " ");
    return encodeURIComponent(query);
}