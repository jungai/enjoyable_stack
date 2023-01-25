import "dotenv/config";
import { app } from "./express";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
	console.log(`server start on port ${PORT}`);
});
