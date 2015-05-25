// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine           = require('famous/core/Engine');
var Easing           = require('famous/transitions/Easing');
var Transform        = require('famous/core/Transform');
var page = require('page');

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var KaollaSu = require('./lib/KaollaSu')(mainContext);
var _computeContextWidth = KaollaSu.computeContextWidth;
var _resizeComputation   = KaollaSu.resizeComputation;

var obj = require('./starters/index')(mainContext);

var sidebar2 = obj.mobileMenu.node;
var menuMod  = obj.mobileMenu.mod;
var mainMod  = obj.containerShell.mod;
var bodyRC   = obj.bodyRC;
var navbar   = obj.navbar;
var containerShell = obj.containerShell.node;

var searchAry      = require('./starters/search')(navbar);
var searchInput    = searchAry[0];
var searchFlexGrid = searchAry[1];
var sfgScrollView  = searchAry[2];
var companyAds     = searchAry[3];

//Routing
require('./routes/index')(page, mainContext, obj, sfgScrollView);
require('./routes/payment')(page, obj);
require('./routes/ad_details')(page, obj, companyAds);
require('./routes/dashboard')(page, obj);
require('./routes/registration')(page, obj);
require('./routes/login')(page, obj);
require('./routes/developers')(page, obj);
require('./routes/works')(page, obj)

page.show('/');


