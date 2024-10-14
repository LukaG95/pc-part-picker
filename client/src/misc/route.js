let route;
if (process.env.NODE_ENV === "production") route = "https://card-game-deploy-9177bef6cdc3.herokuapp.com";
else route = "http://localhost:5000";
export default route;