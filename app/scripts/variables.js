//-------------Constants-------------
var HOME_PAGE = 0;
var PORTFOLIO_PAGE = 1;
var ABOUT_PAGE = 2;
var CONTACT_PAGE = 3;
//===================================

var winFocus, siteLoading = true;
var isCtrlDown, disableGoto, pageChanging, viewingProject = false;
var keyCode, currentProj = null;
var pageCount = $('.page').length;
var prevPage = -1;
var currentPage = 0;