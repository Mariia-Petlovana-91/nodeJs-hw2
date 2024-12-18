import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEvtVar } from "./utils/getEnvVar.js";

export const startServer = () => {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(pino({
		transport: {
			target: "pino-pretty"
		}
	}));

	app.get("/", (req, res) => {
		res.json({
			message: "Start work"
		});
	});

	app.use((req, res) => {
		res.status(404).json({
			message: `${req.url} not found`
		});
	});

	const port = Number(getEvtVar("PORT", 3000));

	app.listen(port, () => console.log("Server running on 3000 port"));
};
