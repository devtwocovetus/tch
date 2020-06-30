export const environment = {
  production: true
};
export interface Environment 
{
	endPoint:string;
	siteLink:string;
	// addv2:string;
	image:string;
	// cpxLinks:string;
}

export const PROD: Environment = {
	endPoint:'https://api.tchdemo.com/api/',
	siteLink:'https://dev.tchdemo.com',
	// socket:'localhost:3002',
	// addv2:'https://admin.vegsphere.com/api/v2/',
	image:'https://api.tchdemo.com/',
	// cpxLinks:'https://cpx.covetus.com/admin.vegsphere/api/v2/'
}

export const environment1: Environment= PROD;
