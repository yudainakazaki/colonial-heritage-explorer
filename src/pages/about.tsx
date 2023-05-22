import { SearchQueries } from "@/Types";
import keyword from "@/queries/filter";

export default function About() {
    const queries: SearchQueries = {
        title: 'Sirihkistje (met sleuteltje)',
        material: 'zilver',
        artform: 'sirihkistje',
        // location: 'Batavia',
        // coordinates: {
        //     latnorth: 130,
        //     latsouth: -10,
        //     longeast: 130,
        //     longwest: -10,
        // }
    }



    const query = keyword(queries);

    return (
        <div>
            <pre>
                { query }
            </pre>
        </div>
    );
}  