function Button({ onClick, children, color, textColor}) {
	return (
		<button
			onClick={onClick}
			className={`bg-[${color}] text-${textColor}  py-2 px-4	font-bold  rounded-2xl ease-out transition-all`}
		>
			{children}
		</button>
	);
}
export default Button;