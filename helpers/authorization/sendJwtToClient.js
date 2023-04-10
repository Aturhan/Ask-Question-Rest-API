const sendJwt= (user,res)=> {

    const token = user.generateJwtfromUser()
    const {JWT_COOKIE,NODE_ENV} = process.env

    return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 6000 * 60),
        secure: NODE_ENV === 'development' ? false : true
    })
    .json({
        success : true,
        message: "Login successful",
        access_token: token,
        data:{
            name: user.name,
            email: user.email,
            password: user.password
        }
    })


}

const isTokenTrue = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith(('Bearer'))
    
  
}


const getAccessTokenHeader = (req) => {

    const authorization = req.headers.authorization
    const access_token = authorization.split(" ")[0]
    return access_token
  
}

module.exports = {sendJwt,isTokenTrue,getAccessTokenHeader}