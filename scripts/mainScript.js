document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById('home')
  const shop = document.getElementById('shop');
  const pcBuild = document.getElementById('pcBuild');
  const darkMode = document.getElementById('darkMode');
  const cart = document.getElementById('cart');
  const user = document.getElementById('user');
  const main = document.getElementById('main');


  shop.addEventListener('click',()=>{
      fetch('/shop')           // Fetch HTML rendered from server-side template
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();  // Extract response as text (HTML)
    })
    .then(html => {
      main.innerHTML = html;   // Inject HTML into your container
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  
});
});

