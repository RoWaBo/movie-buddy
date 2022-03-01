import { AnimatePresence, motion } from "framer-motion";
import ErrorMessage from "../components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

	return (
		<AnimatePresence>
			<motion.form onSubmit={handleSubmit(onSubmit)} layout>
				<motion.input
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
