import production from "./prod-config.json"; 
import development from "./dev-config.json"; 
import beta from "./beta-config.json"; 

const env = {
    production,
    development,
    beta,
}
// console.log("env", process.env, development)

export default env[process.env.REACT_APP_ENVIRONMENT] || development;