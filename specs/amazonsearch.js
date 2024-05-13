import { browser , expect , $ } from '@wdio/globals';

 describe('Amazon homepage', ()=>{
    it('Access the url, verify the url & title', async () => {
        await browser.url('/');
        await expect(browser).toHaveUrl('https://www.amazon.com/');
        await expect(browser).toHaveTitle('Amazon.com. Spend less. Smile more.')
    })

    it('Search Apperal, verify the text', async () => {
        const searchInput= await $('#twotabsearchtextbox');
        const searchButton= await $('#nav-search-submit-button');
        const expectedSearchText= await ($('.a-color-state.a-text-bold'));

        searchInput.addValue('Apparel');
        searchButton.click();
        expect(expectedSearchText).toHaveTextContaining('Apparel');

    })
    it('Choose a product, add to cart & select size M ', async () => {
        const chooseProduct= await $('(//div[@class="a-section aok-relative s-image-square-aspect"])[1]')
        const selectSize= await $('#native_dropdown_selected_size_name');

        chooseProduct.click();
        
        selectSize.selectByVisibleText("Small");
    
        await browser.pause(5000)
    
     })

     it('Navigate to the shopping cart & change the size to Large ', async () => {
        const addToCartButton= await $('#add-to-cart-button');
        const verifyproductadded=  await $('//h1[normalize-space()="Added to Cart"]')
        const goToShoppingCartButton= await $('#nav-cart-count');
        const shoppingCartHeader= await $('//h1[normalize-space()="Shopping Cart"]');

        await addToCartButton.click();
        await browser.pause(5000)
        await expect(verifyproductadded).toBeDisplayed();
        await goToShoppingCartButton.click();
        await expect(shoppingCartHeader).toBeDisplayed();
    
     })

});