import {app} from "./app"

app.listen({
    host: "0.0.0.0", // Mais acessível para frontends
    port: 3333
}).then(()=>{
    console.log("🚀 HTTP server Running!")
})