// Lab 01
var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var birthday = new Date('05/13/1972');
console.log('I was born on ' + weekDays[birthday.getDay()]);


// Lab 02
var birthdate = prompt("What is your brthdate?");
var bdate = new Date( birthdate );
var bdateMonth = bdate.getMonth();
var bdateDate = bdate.getDate();

function heresYourSign( sign )
{
  alert('Your Zodiac sign is ' + sign );
}
console.log( bdateMonth + " " + bdateDate );
var signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
var yourSign = '';
if(( bdateMonth == 0 && bdateDate <= 19 ) || ( bdateMonth == 11 && bdateDate >= 22))
{ heresYourSign(signs[0]); } // Capricorn
else if(( bdateMonth == 0 && bdateDate >= 20) || ( bdateMonth == 1 && bdateDate <= 18))
{ heresYourSign(signs[1]); } // Aquarius
else if(( bdateMonth == 1 && bdateDate >= 19) || ( bdateMonth == 2 && bdateDate <= 20))
{ heresYourSign(signs[2]); } // Pisces
else if(( bdateMonth == 2 && bdateDate >= 21) || ( bdateMonth == 3 && bdateDate <= 19))
{ heresYourSign(signs[3]); } // Aries
else if(( bdateMonth == 3 && bdateDate >= 20) || ( bdateMonth == 4 && bdateDate <= 20))
{ heresYourSign(signs[4]); } // Taurus
else if(( bdateMonth == 4 && bdateDate >= 21) || ( bdateMonth == 5 && bdateDate <= 20))
{ heresYourSign(signs[5]); } // Gemini
else if(( bdateMonth == 5 && bdateDate >= 21) || ( bdateMonth == 6 && bdateDate <= 22))
{ heresYourSign(signs[6]); } // Cancer
else if(( bdateMonth == 6 && bdateDate >= 23) || ( bdateMonth == 7 && bdateDate <= 22))
{ heresYourSign(signs[7]); } // Leo
else if(( bdateMonth == 7 && bdateDate >= 23) || ( bdateMonth == 8 && bdateDate <= 22))
{ heresYourSign(signs[8]); } // Virgo
else if(( bdateMonth == 8 && bdateDate >= 23) || ( bdateMonth == 9 && bdateDate <= 22))
{ heresYourSign(signs[9]); } // Libra
else if(( bdateMonth == 9 && bdateDate >= 23) || ( bdateMonth == 10 && bdateDate <= 21))
{ heresYourSign(signs[10]); } // Scorpio
else if(( bdateMonth == 10 && bdateDate >= 22) || ( bdateMonth == 11 && bdateDate <= 21))
{ heresYourSign(signs[11]); } // Sagittarius


/*
Aries: March 21 - April 19
Taurus: April 20 - May 20
Gemini: May 21 - June 20
Cancer: June 21 - July 22
Leo: July 23 - August 22
Virgo: August 23 - Sept. 22
Libra: Sept. 23 - October 22
Scorpio: October 23 - Nov. 21
Sagittarius: Nov. 22 - Dec. 21
Capricorn: Dec. 22 - Jan. 19
Aquarius: Jan. 20 - Feb. 18
Pisces: Feb. 19 - March 20
*/
