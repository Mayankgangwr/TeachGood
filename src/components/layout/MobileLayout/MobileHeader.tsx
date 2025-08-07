import React from "react";
import Logo from "../../../assets/Icons/Logo";
const MobileHeader: React.FC = () => {
	return (
		<div className="w-full px-4 py-3 bg-white shadow-sm flex items-center justify-between fixed">
			{/* Left Section */}
			<div className="flex items-center gap-2">
				{/* Hamburger Icon */}
				{/* <div
					className="w-6 h-6 text-gray-700 cursor-pointer"
					onClick={() => alert("Open Menu")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-full h-full"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</div> */}

				<Logo className=" text-2xl" />
			</div>

			{/* Right Section */}
			<div className="flex items-center gap-4">
				{/* Alert Icon */}
				<div className="relative text-gray-600 w-6 h-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
						className="w-full h-full"
					>
						<path d="M12 2a7 7 0 00-7 7v4.586l-.707.707A1 1 0 005 17h14a1 1 0 00.707-1.707L19 13.586V9a7 7 0 00-7-7zm0 20a2.5 2.5 0 002.45-2h-4.9A2.5 2.5 0 0012 22z" />
					</svg>
					{/* Notification Dot */}
					<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
				</div>

				{/* Avatar */}
				<img
					src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
					alt="User Avatar"
					className="w-9 h-9 rounded-full object-cover"
				/>
			</div>
		</div>
	);
};

export default MobileHeader;
