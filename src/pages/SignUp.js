import { AnimatePresence, motion } from "framer-motion";
import ErrorMessage from "../components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [errorMessage, setErrorMessage] = useState();
	const { signUp } = useAuth();
	const navigate = useNavigate();

	const onSubmit = form => {
		if (form.password !== form.confirmPassword) {
			return setErrorMessage("Passwords must match");
		}
		(async () => {
			try {
				await signUp(form.email, form.password);
				navigate("/profile");
			} catch (error) {
				setErrorMessage(error.message);
			}
		})();
	};

	// === STYLE ===
	const formStyle = css`
		width: 100%;
		padding: 2rem;
		.input {
			display: block;
		}
	`;

	return (
		<AnimatePresence>
			<motion.form
				key="form"
				css={formStyle}
				onSubmit={handleSubmit(onSubmit)}
				layout>
				<motion.input
					className="input"
					layout
					type="text"
					placeholder={"email"}
					onFocus={() => setErrorMessage(false)}
					whileFocus={{ scale: 1.02 }}
					{...register("email", {
						required: "email is required",
					})}
				/>
				<motion.input
					className="input"
					layout
					type="password"
					placeholder="password"
					onFocus={() => setErrorMessage(false)}
					whileFocus={{ scale: 1.02 }}
					{...register("password", {
						required: "password is required",
					})}
				/>
				<motion.input
					className="input"
					layout
					type="password"
					placeholder="confirm password"
					onFocus={() => setErrorMessage(false)}
					whileFocus={{ scale: 1.02 }}
					{...register("confirmPassword", {
						required: "Confirm password is required",
					})}
				/>
				{(errors.username ||
					errors.password ||
					errors.confirmPassword ||
					errorMessage) && (
					<ErrorMessage icon>
						{errorMessage ? errorMessage : "Email and password is required"}
					</ErrorMessage>
				)}
				<motion.button layout type="submit">
					Sign up
				</motion.button>
			</motion.form>
			<motion.div key="linkContainer" layout>
				<p>Already have an account?</p>
				<Link to="/login">Log In</Link>
			</motion.div>
		</AnimatePresence>
	);
};

export default SignUp;
