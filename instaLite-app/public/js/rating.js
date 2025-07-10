let selected=0;
function rate(n){
  selected=n;
  document.getElementById('rating').value=n;
  document.querySelectorAll('.stars span').forEach((s,i)=> s.style.color= i<n ? '#ff0' : '#ccc');
}
(async ()=>{
  const res=await fetch('/average-rating');
  const data=await res.json();
  document.getElementById('avg').textContent=data.average.toFixed(1);
})();
