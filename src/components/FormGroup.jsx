import { useEffect, useState } from 'react';
import Button from './Button';
import FormGroup from './SearchBox';
// App.jsx
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function Container() {
	const [searchInput, setSearchInput] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		let authParams = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body:
				'grant_type=client_credentials&client_id=' +
				clientId +
				'&client_secret=' +
				clientSecret,
		};

		fetch('https://accounts.spotify.com/api/token', authParams)
			.then((result) => result.json())
			.then((data) => {
				setAccessToken(data.access_token);
			});
	}, []);

	async function search() {
		let artistParams = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		};

		const artistID = await fetch(
			'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
			artistParams
		)
			.then((result) => result.json())
			.then((data) => {
				return data.artists.items[0].id;
			});
		console.log('Search input: ', searchInput);
		console.log('Artist ID:', artistID);

		await fetch(
			'https://api.spotify.com/v1/artists/' +
				artistID +
				'/albums?include_groups=album&market=US&limit=50',
			artistParams
		)
			.then((result) => result.json())
			.then((data) => {
				setAlbums(data.items);
			});
	}

	return (
		<>
			<div className='flex justify-center flex-col items-center p-5 place-items-center bg-[#242424]'>
				<div className='flex'>
					<FormGroup
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								search();
							}
						}}
						onChange={(event) => {
							setSearchInput(event.target.value);
						}}
					/>
					<Button color='#1A1A1A' textColor='white' onClick={search}>
						Search
					</Button>
				</div>
				{/* Albums */}
				<div className=' place-items-center mt-5 grid grid-cols-2 sm:grid-cols-4 md:grid-col-3 gap-y-5 grid-wrap-wrap h-auto'>
					{albums.map((album) => {
						return (
							<div
								key={album.id}
								// className='card m-4 bg-white p-2 rounded-lg  w-auto h-auto'
								className='
								w-32
								md:w-32
								lg:w-48
								h-42 m-4 
								max-w-md p-2 flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out bg-white text-[#646464] gap-3 text-center'
							>
								<img
									className='
									w-32
									md:w-32
									lg:w-48 rounded-md'
									src={album.images[0].url}
									alt={album.name}
								/>
								<h3 className=' font-bold text-md md:text-sm truncate'>
									{album.name}
								</h3>
								<span className='text-sm'>
									Release date: <br />
									{album.release_date}
								</span>

								<Button color='#1ED760' textColor='black'>
									<a href={album.uri}>Link</a>
								</Button>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Container;
