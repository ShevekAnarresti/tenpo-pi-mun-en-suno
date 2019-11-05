/**********************************************************\
*                                                          *
*                jan Sepeku li pali e ni                   *
*                                                          *
* https://github.com/ShevekAnarresti/tenpo-pi-mun-en-suno/ *
*                                                          *
\**********************************************************/
function tenpoPiSunoMoli(tenpo,lat,lng){
	var tenpoPiSunoMoliPini=new Date(tenpo);
	var tenpoPiSunoMoliKama=new Date(tenpo);
	if (SunCalc.getTimes(tenpo,lat,lng)['sunset']>tenpo){
		tenpoPiSunoMoliPini.setDate(tenpoPiSunoMoliPini.getDate()-1);
		tenpoPiSunoMoliPini=SunCalc.getTimes(tenpoPiSunoMoliPini,lat,lng)['sunset'];
		tenpoPiSunoMoliKama=SunCalc.getTimes(tenpoPiSunoMoliKama,lat,lng)['sunset'];
	}else{
		tenpoPiSunoMoliPini=SunCalc.getTimes(tenpoPiSunoMoliPini,lat,lng)['sunset'];
		tenpoPiSunoMoliKama.setDate(tenpoPiSunoMoliPini.getDate()+1);
		tenpoPiSunoMoliKama=SunCalc.getTimes(tenpoPiSunoMoliKama,lat,lng)['sunset'];
	}
	return [tenpoPiSunoMoliPini,tenpoPiSunoMoliKama];
}
function tenpoSeme(tenpoNi,lat,lng){
	var tenpoPiMunWan=new Date('2001-02-20T07:00:26Z'),
		tenpoPiSikeWan=new Date('2001-03-20T13:31:00Z'),
		tenpoPiSunoMoliPini,
		tenpoPiSunoMoliKama,
		tenpoPiMunSinPini,
		tenpoPiMunSinKama,
		tenpoPiSikeSinPini,
		tenpoPiSikeSinKama,
		nanpaPiMunNi,
		nanpaPiSikeNi,
		tenpo,
		suno,
		mun;
	[tenpoPiSunoMoliPini,tenpoPiSunoMoliKama]=tenpoPiSunoMoli(tenpoNi,lat,lng);
	tenpoPiMunSinPini=tenpoPiSunoMoli(new Date(
		tenpoPiSunoMoliKama.getTime()-
		(((tenpoPiSunoMoliKama.getTime()-tenpoPiMunWan.getTime())/(1000*3600*24))%29.530587981*(1000*3600*24)))
		,lat,lng)[0];
	tenpoPiMunSinKama=tenpoPiSunoMoli(new Date(
		tenpoPiSunoMoliKama.getTime()+
		29.530587981*(1000*3600*24)-
		(((tenpoPiSunoMoliKama.getTime()-tenpoPiMunWan.getTime())/(1000*3600*24))%29.530587981*(1000*3600*24)))
		,lat,lng)[0];
	tenpoPiSikeSinPini=tenpoPiSunoMoli(new Date(
		tenpoPiMunSinKama.getTime()-
		((tenpoPiMunSinKama.getTime()-tenpoPiSikeWan.getTime())/(1000*3600*24))%365.2421897*(1000*3600*24))
		,lat,lng)[0];
	tenpoPiSikeSinPini=tenpoPiSunoMoli(new Date(
		tenpoPiSikeSinPini.getTime()-
		(((tenpoPiSikeSinPini.getTime()-tenpoPiMunWan.getTime())/(1000*3600*24))%29.530587981*(1000*3600*24)))
		,lat,lng)[0];
	tenpoPiSikeSinKama=tenpoPiSunoMoli(new Date(
		tenpoPiMunSinKama.getTime()+
		365.2421897*(1000*3600*24)-
		((tenpoPiMunSinKama.getTime()-tenpoPiSikeWan.getTime())/(1000*3600*24))%365.2421897*(1000*3600*24))
		,lat,lng)[0];
	nanpaPiMunNi=Math.round((tenpoPiSunoMoliKama.getTime()-tenpoPiMunSinPini.getTime())/(1000*3600*24));
	nanpaPiSikeNi=tenpoPiSikeSinKama<=tenpoPiMunSinPini?1:Math.round((tenpoPiMunSinKama.getTime()-tenpoPiSikeSinPini.getTime())/(1000*3600*24*29.530587981));
	tenpo=tenpoNi<SunCalc.getTimes(tenpoPiSunoMoliKama,lat,lng)['sunrise']?'pimeja':'pi suno '+(SunCalc.getPosition(tenpoNi,lat,lng).azimuth<0?'sewi':'anpa');
	suno='mun '+
		['pimeja','uta','sewi','suli','anpa','moli'][Math.floor((nanpaPiMunNi-1)/5)]+
		[' open',' kama','',' tawa',' pini'][(nanpaPiMunNi-1)%5];
	mun='mun '+
		(nanpaPiSikeNi<13?['open pi tenpo ','awen pi tenpo ','pini pi tenpo '][(nanpaPiSikeNi-1)%3]:'')+
		(lat>0?['kasi','seli','pan','lete','namako']:['pan','lete','kasi','seli','namako'])[Math.floor((nanpaPiSikeNi-1)/3)];
	return [tenpo,suno,mun];
}