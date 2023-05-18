import Map from '@/components/Map'
import ResultPane from '@/components/ResultPane';
import SearchBar from '@/components/SearchBar';
import IndexPage from '@/pages/IndexPage';
import Document from '@/pages/_document';
import '@/styles/browse.scss'
import React, { useState } from 'react'

export default function Browse() {	

	const [showResult, setShowResult] = useState(false);

	const handleClick = () => {
		setShowResult(!showResult);
	}

    return (
		<>
			<IndexPage />
			<main className="w-full h-full browse flex flex-row relative">
				<SearchBar />
				{ showResult && <ResultPane /> }
				<Map />
				<button onClick={handleClick} className="button">btn</button>
			</main>
		</>
    )
}
