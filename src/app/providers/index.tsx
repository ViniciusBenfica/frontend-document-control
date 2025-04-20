"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ToastContainer />
			{children}
		</>
	);
}
