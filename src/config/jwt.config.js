import jsonwebtoken from 'jsonwebtoken'
const signin = (payload,secKey) =>{
    try {
       return jsonwebtoken.sign(payload,secKey,{expiresIn:'30d'});
    } catch (error) {
        console.log('error sign token',error);
    }
}

const verify = (token,secKey) => {
    try {
       return jsonwebtoken.verify(token,secKey)
    } catch (error) {
        console.log('error verify token',error.message);
    }
}  

export{signin,verify}