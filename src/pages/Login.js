import { AnimatePresence, motion } from "framer-motion";
import ErrorMessage from "../components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loginErrorMessage, setloginErrorMessage] = useState();

	const onSubmit = userLogin => {
		(async () => {
			try {
				console.log("userLogin: ", userLogin);
			} catch (error) {
				console.log(error);
				setloginErrorMessage("User name or password is incorrect");
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
			<motion.form css={formStyle} onSubmit={handleSubmit(onSubmit)} layout>
				<motion.input
					className="input"
					layout
					type="text"
					placeholder={"username"}
					onFocus={() => setloginErrorMessage(false)}
					whileFocus={{ scale: 1.02 }}
					{...register("username", {
						required: "Write valid username",
					})}
				/>
				<motion.input
					className="input"
					layout
					type="password"
					placeholder="password"
					onFocus={() => setloginErrorMessage(false)}
					whileFocus={{ scale: 1.02 }}
					{...register("password", {
						required: "Write valid password",
					})}
				/>
				{(errors.username || errors.password || loginErrorMessage) && (
					<ErrorMessage icon>
						{loginErrorMessage
							? loginErrorMessage
							: "Username and password is required"}
					</ErrorMessage>
				)}
				<motion.button layout type="submit">
					Login
				</motion.button>
			</motion.form>
		</AnimatePresence>
	);
};

export default Login;
