function FormGroup({ onChange, onKeyDown }) {
	return (
		<div className='form-group flex justify-between '>
			<input
				className='form-control focus:outline-0 rounded-md py-1 px-3 mr-2 bg-[#3B3B3B] text-[#646464] placeholder-[#646464]'
				type='input'
				placeholder='Search for Artist'
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</div>
	);
}

export default FormGroup;
