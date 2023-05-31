import { Map, ResultPane, SearchBar, FilterModal, DetailCard } from '@/components';
import IndexPage from '@/pages/IndexPage';
import '@/styles/browse.scss';
import React, { useState, useEffect } from 'react'
import { CardAttributes, State, Filters, Bounds } from '@/Types';
import { processData } from '@/utils/processData'
import keywordsearch from '@/queries/keyword'
import filterSearch from '@/queries/filter';
import { DetailAttributes, SearchQueries } from '@/Types';
import object from '@/queries/object';
import axios from 'axios';

export default function Browse() {	

	const initState = {
        title: '',
        artform: '',
        location: '',
        material: '',
        useLocation: false,
    } as Filters

	const config = {
		headers: {
			'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
		}
	}

	const [state, setState] = useState('search' as State);
	const [keyword, setKeyword] = useState('');
	const [isListLoading, setListLoading] = useState(false);
	const [isDataLoading, setDataLoading] = useState(false);
	const [selectedId, setSelectedId] = useState('');
	const [list, setList] = useState([] as CardAttributes[])
	const [data, setData] = useState({} as DetailAttributes)
	const [center, setCenter] = useState({lat: 30, lng: 90} as {lat: number, lng: number})
	const [filterOpen, setFilterOpen] = useState(false);
	const [searchQueries, setSearchQueries] = useState(initState);
	const [bounds, setBounds] = useState(undefined as Bounds);

	const fetchList = async () => {
		
		setListLoading(true);
		var res = {} as CardAttributes | any;

		try {

            res = (await axios.get(`${process.env.API_URL}?query=${keywordsearch(keyword)}`, config)).data;
            res = res.map((item: any) => {
                return processData(item, 'card')
            })

        } catch(e) {
            console.error(e);
        }
		
		setListLoading(false);
		setState('result');
		setList(res);
		setCenter(res[0]?.geoLocation || center);
	}

	const fetchObject = async () => {

		setDataLoading(true);
        var res = {} as DetailAttributes | any;
        try {
			
            res = (await axios.get(`${process.env.API_URL}?query=${object(selectedId)}`, config)).data;
            res = processData(await res[0], 'detail')
                
        } catch(e) {
            console.error(e);
        }

		setDataLoading(false);
        setData(res);
    }

	const fetchListByFilter = async () => {

		setListLoading(true);

		var res = {} as CardAttributes | any;

		const query: SearchQueries = {
			title: searchQueries.title || undefined,
			artform: searchQueries.artform || undefined,
			location: searchQueries.location || undefined,
			material: searchQueries.material || undefined,
			coordinates: bounds || undefined
		}

		try {

			const q = filterSearch(query);
			console.log(q);

            res = (await axios.get(`${process.env.API_URL}?query=${q}`, config)).data;
            res = res.map((item: any) => {
                return processData(item, 'card')
            })

        } catch(e) {
            console.error(e);
        }
		
		setListLoading(false);
		setState('result');
		setList(res);
		setCenter({lat: res[0]?.geoLocation[0], lng: res[0]?.geoLocation[1]} || center);
	}

	const getKeyword = (query: string) => {
		setKeyword(query);
	}

	const clearSearch = () => {
		setState('search');
		setKeyword('');
		setSelectedId('');
		setList([]);
	}

	const handleId = (id: string) => {
		setSelectedId(id);
	}

	const handleCloseDetail = () => {
		setSelectedId('')
	}

	const handleFilter = () => {
		setFilterOpen(true);
	}

	const handleSearch = (filters: Filters) => {
		setSearchQueries(filters);
	}

	const getBoundary = (bounds: Bounds) => {
		//setBounds(bounds);
	}

	useEffect(() => {
		if(filterOpen){
			fetchListByFilter();
			setFilterOpen(false);
		}
	}, [searchQueries])

	useEffect(() => {
		if(keyword !== '') fetchList();
	}, [keyword])

	useEffect(() => {
        if(selectedId !== '') {
			fetchObject();
			setState('resultDetail');
		}
    }, [selectedId])
	
    return (
		<>
			<IndexPage />
			<main className="w-full h-full browse flex flex-row relative">
				<SearchBar 
					emitSearch={getKeyword} 
					state={state} 
					clearSearch={clearSearch} 
					isLoading={isListLoading || isDataLoading}
					emitFilterClick={ handleFilter }
				/>
				{ !isListLoading && (state === 'result' || state === 'resultDetail') && 
					<ResultPane data={list} emitId={handleId} /> }
				{ !isDataLoading && selectedId !=='' && state === 'resultDetail' &&
					<div className='detail-modal'>
						<DetailCard data={data} emitClose={handleCloseDetail} />
					</div> }
				<Map 
					data={list} 
					originalCenter={center} 
					emitBounds={getBoundary} 
				/>
				{ filterOpen && 
					<FilterModal 
						emitClose={ () => setFilterOpen(false) } 
						emitSearch={ handleSearch } 
					/>
				}
			</main>
		</>
    )
}
