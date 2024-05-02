document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch data from the API
    function fetchData(category) {
        fetch('https://cdn.shopify.com/' + category + '/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayData(data);
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    }

    // Function to display the fetched data
    function displayData(data) {
        const dataContainer = document.getElementById('data-container');
        dataContainer.innerHTML = ''; // Clear previous data

        // Assuming data is an array of objects, you can customize this part based on your actual data structure
        data.forEach(item => {
            const listItem = document.createElement('div');
            listItem.textContent = item.name; // Assuming there's a 'name' property in each item
            dataContainer.appendChild(listItem);
        });
    }

    // Event listeners for category selection
    document.getElementById('men').addEventListener('click', function() {
        fetchData('men');
    });

    document.getElementById('women').addEventListener('click', function() {
        fetchData('women');
    });

    document.getElementById('kids').addEventListener('click', function() {
        fetchData('kids');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const categoryContainers = document.querySelectorAll('.category-container');
    const productCardsContainer = document.getElementById('productCardsContainer');

    // Function to fetch products from the API
    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    // Function to randomly select a badge
    function getRandomBadge() {
        const badges = ['Special', 'On Offer', 'New', ''];
        return badges[Math.floor(Math.random() * badges.length)];
    }

    // Function to randomly select a vendor
    function getRandomVendor() {
        const vendors = ['Myntra', 'Ajio', 'Nike', 'Puma'];
        return vendors[Math.floor(Math.random() * vendors.length)];
    }

    // Function to create a product card
    function createProductCard(product) {
        const mainCard = document.createElement('div');
        mainCard.classList.add('maincard');

        const card = document.createElement('div');
        card.classList.add('card');

        const badgeText = getRandomBadge();
        if (badgeText) {
            const badge = document.createElement('div');
            badge.classList.add('badge');
            if (badgeText === 'Special') {
                badge.classList.add('special-badge');
            } else if (badgeText === 'On Offer') {
                badge.classList.add('on-offer-badge');
            } else if (badgeText === 'New') {
                badge.classList.add('new-badge');
            }
            badge.textContent = badgeText;
            card.appendChild(badge);
        }

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;
        card.appendChild(productImage);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const productName = document.createElement('span');
        productName.textContent = product.title;
        cardContent.appendChild(productName);

        const vendorName = document.createElement('p');
        vendorName.textContent = 'Vendor: ' + getRandomVendor();
        cardContent.appendChild(vendorName);

        const originalPrice = document.createElement('p');
        originalPrice.classList.add('original-price');
        originalPrice.textContent = 'Compare at: $' + product.price;
        cardContent.appendChild(originalPrice);

        const discountedPrice = document.createElement('p');
        discountedPrice.classList.add('discounted-price');
        discountedPrice.textContent = 'Now: $' + product.price;
        cardContent.appendChild(discountedPrice);

        card.appendChild(cardContent);
        mainCard.appendChild(card);

        // Add 'Add to Cart' button
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart-button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.onclick = function() {
            // Add your logic here to handle adding to cart
            alert('Added to cart: ' + product.title);
        };
        mainCard.appendChild(addToCartButton);

        return mainCard;
    }

    // Function to display products for a given category
    async function displayProducts(category) {
        productCardsContainer.innerHTML = ''; // Clear existing products
        const products = await fetchProducts();
        let startIndex;

        switch (category) {
            case 'men':
                startIndex = 0;
                break;
            case 'women':
                startIndex = 4;
                break;
            case 'kids':
                startIndex = 8;
                break;
            default:
                startIndex = 0;
        }

        products.slice(startIndex, startIndex + 4).forEach(product => {
            productCardsContainer.appendChild(createProductCard(product));
        });
    }

    // Event listener for category selection
    categoryContainers.forEach(container => {
        container.addEventListener('click', function() {
            // Add 'selected' class to the clicked category
            categoryContainers.forEach(container => {
                container.classList.remove('selected');
            });
            this.classList.add('selected');

            // Display products for the selected category
            const category = this.id;
            displayProducts(category);
        });
    });

    // Initially display products for the 'men' category
    displayProducts('men');
});
