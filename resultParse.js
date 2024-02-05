const params= new URLSearchParams(location.search);
result="";
results +='Name is '+params.get('name');
results +='<p> Age is '+params.get('age');
results +='<p> Gender is '+params.get('gender');

document.getElementById('results').innerHTML= results;