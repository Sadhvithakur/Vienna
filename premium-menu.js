// Vienna Bakehouse & Kitchen - Premium Menu System

const menuData = {
    breakfast: [
        {
            name: "Sunrise Power Platter ",
            description: "A Hearty Mix Of Veggies, Smoked Paprika Chicken, Two Eggs, Sourdough, Mushrooms, Cherry Tomatoes, And Baked Beans.",
            price: "450",
            image: "/media/22.png",
            popular: true
        },
        {
            name: "Morning Harvest Platter",
            description: "A Veggie-Packed Breakfast With Sauteed Greens, Tabbouleh, Hash Browns, Scrambled Tofu, Sourdough,  Mushrooms, Cherry Tomatoes, And Baked Beans.",
            price: "430",
            image: "/media/morning.png",
            popular: false
        },
        {
            name: "Turkish Eggs Platter ",
            description: "A Mediterranean-inspired breakfast featuring soft-boiled eggs, Greek yogurt, sautéed broccoli, cherry tomatoes, warm pita with hummus, chicken sausage, and spicy scrambled chicken.",
            price: "485",
            image: "/media/brekfast.png",
            popular: false
        },
        {
            name: "Golden French Toast",
            description: " House baked Brioche bread stuffed with Cream Cheese and topped with fruits and cream.",
            price: "320",
            image: "/media/golden.png",
            popular: true
        },
        {
            name: "Fruit Pancakes ",
            description: "Pancakes Topped With Seasonal Fruits, Honey, Whipped Cream, And Sugar Dust.",
            price: "340",
            image: "/media/pancake.png",
            popular: false
        },
        {
            name: "Benedict Bliss ",
            description: "Poached eggs on toasted house made bun, silky hollandaise & fresh salad.",
            price: "250",
            image: "/media/bliss.png",
            popular: true
        }
    ],
    lunch: [
        {
            name: "Cilantro Parsley & Jalapeño Hummus",
            description: "Creamy hummus infused with fresh cilantro, parsley, and a spicy jalapeño kick.",
            price: "380",
            image: "/media/humus.png",
            popular: true
        },
        {
            name: "Fiery Peri Peri Chicken Pizza",
            description: "Spicy Peri Peri Chicken With Melted Mozzarella And Fresh Cilantro On Our Crisp, House-Made Sourdough.",
            price: "545",
            image: "/media/pizza.png",
            popular: false
        },
        {
            name: "Spaghetti Aglio Olio",
            description: "Simple, bold flavors of garlic-infused olive oil and fresh herbs.",
            price: "Veg    435  Chicken   450",
            image: "/media/pasta.png",
            popular: true
        },
        {
            name: "Malabar Ghee Roast Croissant Sandwich",
            description: "South Indian soul in a French bite. Buttery croissant stuffed with rich Malabar ghee roast paneer, layered with caramelized onions and spices. ",
            price: "430",
            image: "/media/malabar.png",
            popular: true
        },
        {
            name: "Casa Mexicana Bowl",
            description: "FresA Tex-Mex Bowl With Mexican Rice, Spicy Fajita Veggies, Sour Cream, Nachos, Salsa, And A Fresh House Salad. Big On Flavour And Texture.",
            price: "395",
            image: "/media/mex.png",
            popular: false
        },
        {
            name: "Bbq Chicken Wings",
            description: "Tender, juicy wings glazed in smoky, sweet-and-spicy BBQ sauce, grilled to perfection for that caramelized finish — bold, messy, and absolutely finger-licking good.",
            price: "380",
            image: "/media/bbq.png",
            popular: true
        }
    ],
    desserts: [
{
    name: "Basque Cheesecake",
    description: "Cheesecake with a beautifully caramelized top and a soft, creamy center rich, rustic, and irresistibly smooth in every bite.",
            price: "350",
            image: "/media/b.png",
            popular: true
        },
        {
            name: "Tiramisu",
            description: "Layers of espresso-soaked ladyfingers and velvety mascarpone cream, finished with a dusting of rich cocoa for the perfect balance of bold and sweet.",
            price: "340",           
            image: "/media/t.jpeg",
            popular: true
        },
        {
            name: "Almond Croissant",
            description: "Buttery, flaky croissant filled with rich almond cream, topped with toasted almond flakes and a light dusting of sugar perfectly crisp on the outside, soft and nutty inside. ",
            price: "320 ",
            image: "/media/crow.png",
            popular: true
        },
        {
            name: "Chocolate Muffin",
            description: "A soft, moist muffin baked with rich cocoa and generous chocolate chunks, perfectly balanced for a deep, indulgent flavor in every bite. ",
            price: "220",
            image: "/media/cupcake.png",
            popular: false
        },
        {
            name: "Eggless Strawberry Fraisier ",
            description: "Light vanilla sponge layered with fresh strawberries and silky cream a delicate, eggless delight bursting with berry freshness.",
            price: "420",
            image: "/media/straw.png",
            popular: false
        },
        {
            name: "Pineapple Delight Cake",
            description: "Moist pineapple-infused cake layered with tangy pineapple filling and topped with a light, fluffy frosting a tropical treat that’s sweet, tangy, and utterly delicious.",
            price: "380",
            image: "/media/25.png",
            popular: false
        }
    ],
    drinks: [
        {
            name: "Hazelnut Latte",
            description: "Smooth espresso blended with creamy milk and rich hazelnut syrup warm, nutty, and beautifully aromatic.",
            price: "350",
            image: "/media/hazel.png",
            popular: true
        },
        {
            name: "Orange Zest Mocha Latte",
            description: "Rich espresso blended with velvety chocolate and a bright hint of orange zest — a bold, citrusy twist on your classic mocha",
            price: "420",
            image: "/media/orange.png",
            popular: true
        },
        {
            name: "Affogato",
            description: "A scoop of creamy vanilla ice cream drowned in a hot shot of espresso — simple, indulgent, and perfectly bittersweet.",
            price: "300",
            image: "/media/affogato.png",
            popular: false
        },
        {
            name: "Strawberry Matcha",
            description: "Earthy matcha layered with sweet strawberry purée and creamy milk — vibrant, refreshing, and perfectly balanced.",
            price: "380",
            image: "/media/matcha.png",
            popular: false
        },
        {
            name: "Pistachio Affogato",
            description: "Creamy pistachio ice cream finished with a hot shot of espresso nutty, bold, and irresistibly indulgent.",
            price: "380",
            image: "/media/23.png",
            popular: true
        },
        {
            name: "Avo Shot Iced Latte",
            description: "Chilled espresso blended with creamy avocado and milk — smooth, refreshing, and uniquely energizing.",
            price: "360",
            image: "/media/avo.png",
            popular: false
        }
    ]
};

class PremiumMenu {
    constructor() {
        this.currentCategory = 'breakfast';
        this.menuGrid = document.getElementById('menuGrid');
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.init();
    }

    init() {
        this.setupTabListeners();
        this.renderMenuItems('breakfast');
        this.observeSection();
    }

    setupTabListeners() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.currentTarget.dataset.category;
                this.switchCategory(category);
            });

            // Add keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const category = e.currentTarget.dataset.category;
                    this.switchCategory(category);
                }
            });
        });
    }

    switchCategory(category) {
        // Update active tab
        this.tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        const activeButton = document.querySelector(`[data-category="${category}"]`);
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');

        // Fade out current items
        this.menuGrid.classList.add('fade-out');

        // Wait for fade out, then switch items
        setTimeout(() => {
            this.renderMenuItems(category);
            this.menuGrid.classList.remove('fade-out');
        }, 300);

        this.currentCategory = category;

        // Announce category change to screen readers
        const categoryLabel = {
            'breakfast': 'Breakfast items',
            'lunch': 'Main course items',
            'desserts': 'Dessert items',
            'drinks': 'Drink items'
        }[category] || category;

        // Create and announce live region update
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.setAttribute('class', 'sr-only');
        announcement.textContent = `${categoryLabel} loaded`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    renderMenuItems(category) {
        const items = menuData[category] || [];

        this.menuGrid.innerHTML = items.map((item, index) => `
      <div class="menu-card" style="animation-delay: ${index * 50}ms">
        <div class="card-image-wrapper">
          <img 
            src="${item.image}" 
            alt="${item.name} - Vienna Bakehouse & Kitchen"
            class="card-image"
            loading="lazy"
          >
          ${item.popular ? '<span class="popular-badge">Popular</span>' : ''}
        </div>
        <div class="card-content">
          <h3 class="card-name">${item.name}</h3>
          <p class="card-description">${item.description}</p>
          <div class="card-footer">
            <span class="card-price">${item.price}</span>
          </div>
        </div>
      </div>
    `).join('');
    }

    observeSection() {
        const menuSection = document.querySelector('.menu-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    menuSection.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(menuSection);
    }
}

// Initialize menu when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PremiumMenu();
});
