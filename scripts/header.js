function goToShop(){
    const shop = document.getElementById();
    const container = document.getElementById(main);
    shop.addEventListener('click',()=>{
        container.innerHTML = `
            <%- include('partials/sections/shopBlock') %>
        `;
    });
}