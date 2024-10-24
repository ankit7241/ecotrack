import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate(); // Initialize useNavigate

	const validateForm = () => {
		if (!email || !password) {
			setError("Email and password are required");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (!validateForm()) return;

		setIsLoading(true);
		try {
			console.log("Login successful", { email, password });
			navigate("/dashboard");
		} catch (err) {
			setError("Invalid email or password. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="login-container">
			<div className="login-form">
				<h2>Login</h2>
				<p>Enter your credentials to access your account</p>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							required
						/>
					</div>
					{error && (
						<div className="error-message" role="alert">
							{error}
						</div>
					)}
					<button type="submit" disabled={isLoading}>
						{isLoading ? "Logging in..." : "Log in"}
					</button>
				</form>
				<p className="signup-link">
					Don't have an account? <a href="/signup">Sign up</a>
				</p>
			</div>
			<style jsx>{`
				.login-container {
					display: flex;
					justify-content: center;
					align-items: center;
					min-height: 100vh;
					background-color: #f0f2f5;
					font-family: Arial, sans-serif;
				}
				.login-form {
					background-color: white;
					padding: 2rem;
					border-radius: 8px;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					width: 100%;
					max-width: 400px;
				}
				h2 {
					text-align: center;
					color: #333;
					margin-bottom: 0.5rem;
				}
				p {
					text-align: center;
					color: #666;
					margin-bottom: 1.5rem;
				}
				.form-group {
					margin-bottom: 1rem;
				}
				label {
					display: block;
					margin-bottom: 0.5rem;
					color: #333;
				}
				input {
					width: 100%;
					padding: 0.75rem;
					border: 1px solid #ddd;
					border-radius: 4px;
					font-size: 1rem;
				}
				input:focus {
					outline: none;
					border-color: #0070f3;
					box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
				}
				button {
					width: 100%;
					padding: 0.75rem;
					background-color: #0070f3;
					color: white;
					border: none;
					border-radius: 4px;
					font-size: 1rem;
					cursor: pointer;
					transition: background-color 0.2s;
				}
				button:hover {
					background-color: #0051cc;
				}
				button:disabled {
					background-color: #ccc;
					cursor: not-allowed;
				}
				.error-message {
					background-color: #ffebee;
					border: 1px solid #ffcdd2;
					color: #b71c1c;
					padding: 0.75rem;
					border-radius: 4px;
					margin-bottom: 1rem;
				}
				.signup-link {
					margin-top: 1rem;
					font-size: 0.9rem;
				}
				.signup-link a {
					color: #0070f3;
					text-decoration: none;
				}
				.signup-link a:hover {
					text-decoration: underline;
				}
			`}</style>
		</div>
	);
}
