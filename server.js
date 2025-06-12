import ordersRouter from "./api/orders.js";
import usersRouter from "./api/users.js";



app.use("/api/orders", ordersRouter); 
app.use("/api/users", usersRouter); 