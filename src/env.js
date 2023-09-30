const configur = {
    envDev:true,
    dev:{
        api:{
            //base:"http://3.23.166.218:3000",
            base:"http://localhost:4000",
            version:"/v1",
            ruta:{
                login:"/login",
                auth:"/checkAuth",
                logout:"/logout",
                expedientes:"/expedientes",
            }
        }
    },
    prod:{
        api:{
            base:"http://api.sgd.local/api",
            version:"/v1",
            ruta:{
                login:"/auth/login",
                logout:"/auth/logout"
            }
        }
    }
};

export default configur;
