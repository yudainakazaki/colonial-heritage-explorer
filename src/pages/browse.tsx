import { Map, ResultPane, SearchBar, FilterModal, DetailCard } from '@/components';
import IndexPage from '@/pages/IndexPage';
import '@/styles/browse.scss';
import React, { useState, useEffect } from 'react'
import { CardAttributes, State, Filters, Bounds, LatLng } from '@/Types';
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
	const [selectedPoint, setSelectedPoint] = useState(undefined as LatLng | undefined)
	const [list, setList] = useState([] as CardAttributes[])
	const [data, setData] = useState({} as DetailAttributes)
	const [center, setCenter] = useState({lat: 30, lng: 15} as {lat: number, lng: number})
	const [filterOpen, setFilterOpen] = useState(false);
	const [searchQueries, setSearchQueries] = useState(initState);
	const [bounds, setBounds] = useState({
		_southWest: {
			lat: -60,
			lng: 0
		},
		_northEast: {
			lat: 120,
			lng: 180
		}
	} as Bounds);

	const fetchList = async () => {
		
		setListLoading(true);
		var res = {} as CardAttributes | any;

		try {
            res = (await axios.get(`${process.env.API_URL}?query=${keywordsearch(keyword)}`, config)).data;
            res = res.map((item: any) => processData(item, 'card'))
			setState('result');
        } catch(e) {
            console.error(e);
			setState('error')
        } finally {
			setListLoading(false);
			setList(res);
			setCenter(res.length > 0 && res[0].latlng !== undefined ? {lat: res[0].latlng?.lat, lng: res[0].latlng?.lng} : center);
		}
	}

	const fetchObject = async () => {

		setDataLoading(true);
        var res = {} as DetailAttributes | any;
        try {
            res = (await axios.get(`${process.env.API_URL}?query=${object(selectedId)}`, config)).data;
            res = processData(await res[0], 'detail')   
        } catch(e) {
            console.error(e);
        } finally {
			setDataLoading(false);
        	setData(res);
		}
    }

	const fetchListByFilter = async () => {

		setListLoading(true);

		var res = {} as CardAttributes | any;

		const query: SearchQueries = {
			title: searchQueries.title || undefined,
			artform: searchQueries.artform || undefined,
			location: searchQueries.location || undefined,
			material: searchQueries.material || undefined,
			bounds: searchQueries.useLocation ? bounds : undefined,
		}

		try {
			const q = filterSearch(query, searchQueries.useLocation);
            res = (await axios.get(`${process.env.API_URL}?query=${q}`, config)).data;
            res = res.map((item: any) => processData(item, 'card'))
			setState('result');
        } catch(e) {
            console.error(e);
			setState('error');
			setListLoading(false);
			return;
        } finally {
			setListLoading(false);
			setList(res);
			setCenter(res.length > 0 && res[0].latlng !== undefined ? {lat: res[0].latlng?.lat, lng: res[0].latlng?.lng} : center);
		}
	}

	const getKeyword = (query: string) => {
		setKeyword(query);
		setState('search');
	}

	const clearSearch = () => {
		setState('search');
	}

	const handleId = (id: string) => {
		setSelectedId(id);
	}

	const handleCloseDetail = () => {
		setSelectedId('');
		setState('result');
	}

	const handleFilter = () => {
		setFilterOpen(true);
	}

	const handleSearch = (filters: Filters) => {
		setSearchQueries(filters);
	}

	const getBoundary = (bounds: Bounds) => {
		setBounds(bounds);
	}

	const handleSelectedPoint = (latlng: LatLng) => {
		setSelectedPoint(latlng !== undefined && latlng.lat !== undefined && latlng.lng !== undefined ? latlng : undefined);
		setCenter(latlng !== undefined && latlng.lat !== undefined && latlng.lng !== undefined ? latlng : center);
	}

	useEffect(() => {
		if (state === 'search'){
			setKeyword('');
			setSearchQueries(initState);
			setSelectedId('');
			setList([]);
		}
		if (state !== 'resultDetail') setSelectedPoint(undefined);
	}, [state])

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
			<main className="w-full h-full browse flex flex-col relative">
				<SearchBar 
					emitSearch={getKeyword} 
					state={state} 
					clearSearch={clearSearch} 
					isLoading={isListLoading || isDataLoading}
					emitFilterClick={ handleFilter }
				/>
				{ !isListLoading && (state === 'result' || state === 'resultDetail' || state === 'error') && 
					<ResultPane data={list} emitId={handleId} emitPoint={handleSelectedPoint} isError={ state === 'error' }/> }
				{ !isDataLoading && selectedId !== '' && state === 'resultDetail' &&
					<div className='detail-modal'>
						<DetailCard data={data} emitClose={handleCloseDetail} />
					</div> }
				<Map 
					data={list} 
					selectedPoint={selectedPoint}
					originalCenter={center} 
					emitBounds={getBoundary} 
				/>
				{ filterOpen && 
					<FilterModal 
						emitClose={ () => setFilterOpen(false) } 
						emitSearch={ handleSearch } 
					/>
				}
				<div className='browse__footer'>Powered by <a href="https://triply.cc/" target='_blank'>Triply</a></div>
			</main>
		</>
    )
}
