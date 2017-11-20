

// expose our config directly to our application using module.exports
var config ={

    production:{

        'facebookAuth' : {
            'clientID'      : '132823070755229', // your App ID
            'clientSecret'  : 'f6d11784f5d32307cb099f0475d1ff14', // your App Secret
            'callbackURL'   : 'whispering-ravine-12625.herokuapp.com/auth/facebook/callback'
        },

        'twitterAuth' : {
            'consumerKey'       : 'ioocTHWwGBOcQypgltHK61cel',
            'consumerSecret'    : 'yBVQjM2w4o7g4pilFoF1JOONdv2RaA4u7gTjYeRg1SoN4wOwxD',
            'callbackURL'       : 'http://www.puzzlemaster.org/auth/twitter/callback'
        },

        'googleAuth' : {
            'clientID'      : '597384415679-o0i0ko1qepdm92n5mqnia8ecavuft3mt.apps.googleusercontent.com',
            'clientSecret'  : '4i-SSRBDiTup874bLhuSdLCD',
            'callbackURL'   : 'http://www.puzzlemaster.org/auth/google/callback'
        }
    },
    default:{
        'facebookAuth' : {
            'clientID'      : '336554796778464', // your App ID
            'clientSecret'  : '5c79a7bfd7a259b0b2a0b030e18d8f14', // your App Secret
            'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
        },

        'twitterAuth' : {
            'consumerKey'       : 'ioocTHWwGBOcQypgltHK61cel',
            'consumerSecret'    : 'yBVQjM2w4o7g4pilFoF1JOONdv2RaA4u7gTjYeRg1SoN4wOwxD',
            'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
        },

        'googleAuth' : {
            'clientID'      : '597384415679-o0i0ko1qepdm92n5mqnia8ecavuft3mt.apps.googleusercontent.com',
            'clientSecret'  : '4i-SSRBDiTup874bLhuSdLCD',
            'callbackURL'   : 'http://localhost:8080/auth/google/callback'
        }
    }

};
exports.get = function get(env) {
  return config[env] || config.default;
}