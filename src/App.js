import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ApplianceScanner from "./pages/ApplianceScanner";
import CarbonFootprint from "./pages/CarbonFootprint";
import Recommendations from "./pages/Recommendations";
import ManageAppliances from "./pages/ManageAppliances";
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="app">
				<Sidebar />
				<main className="main-content">
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/scan" element={<ApplianceScanner />} />
						<Route path="/footprint" element={<CarbonFootprint />} />
						<Route path="/recommendations" element={<Recommendations />} />
						<Route path="/manageappliances" element={<ManageAppliances />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
