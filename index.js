import menuArray from './data.js'

let cartArray = []

// Event listener
document.addEventListener('click', event => {
    if (event.target.dataset.card) {
        handleAddToCartBtn(event.target.dataset.card)
    }
    else if (event.target.dataset.remove) {
        handleRemoveBtn(event.target.dataset.remove)
    }
    else if (event.target.id === 'complete-order') {
        handleCompleteOrderBtn()
    }
})

const paymentForm = document.getElementById('payment-form')

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loadingPayment = document.getElementById('loading-payment')
    const paymentSuccessSection = document.getElementById('payment-success-section')
    const paymentSuccess = document.getElementById('payment-success')

    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('name')

    paymentForm.classList.toggle('hide')
    loadingPayment.classList.toggle('hide')

    setTimeout(() => {
        loadingPayment.classList.toggle('hide')
        paymentModal.classList.toggle('hide')
        cartArray = []
        toggleOrderDetail()
        paymentSuccessSection.classList.toggle('hide')
        paymentSuccess.innerText = `Thanks, ${name}! Your order is on its way!`
    }, 2000);
    setTimeout(() => {
        paymentSuccessSection.classList.toggle('hide')
        paymentForm.classList.toggle('hide')
    }, 4000);
})

const handleAddToCartBtn = (selectedId) => {
    const selectedMenu = menuArray[selectedId]
    if (cartArray.length === 0) {
        toggleOrderDetail()
    }

    if (!cartArray.includes(selectedMenu)) {
        cartArray.push(selectedMenu)
        renderOrders()
    }
    renderTotalPrice(calculatePrice())
}

const handleRemoveBtn = (selectedId) => {
    const selectedMenu = menuArray[selectedId]
    const indexMenu = cartArray.indexOf(selectedMenu)

    cartArray.splice(indexMenu, 1)

    if (cartArray.length === 0) {
        toggleOrderDetail()
    } else {
        renderOrders()
    }
}

const paymentModal = document.getElementById('payment-modal')
const handleCompleteOrderBtn = () => {
    paymentModal.classList.toggle('hide')
}

// Utilities
const toggleOrderDetail = () => {
    document.getElementById('order-detail').classList.toggle('hide')
}

const calculatePrice = () => {
    const priceArray = cartArray.map(cart => cart.price)

    return priceArray.reduce((accumulator, current) => {
        return accumulator + current
    }, 0)
}

// Renders
const renderOrders = () => {
    const orderList = document.getElementById('order-list')

    let orderHtml = cartArray.map((cart) => {
        const {
            name,
            price,
            id
        } = cart
        return `
        <div class="order">
            <p class="medium-font">${name}</p>
            <btn id="remove" class="remove" data-remove="${id}">remove</btn>
            <p class="price">$${price}</p>
        </div>
        `
    }).join('')
    orderList.innerHTML = orderHtml
}

const renderTotalPrice = (totalPrice) => {
    document.getElementById('total-price').textContent = '$' + totalPrice
}

const renderMenuCards = () => {
    const mainHtml = document.getElementById('main')

    let cardHtml = menuArray.map((menu) => {
        const {
            name,
            ingredients,
            id,
            price,
            emoji
        } = menu
        let ingredientsString = ingredients.map((ingredient) => ingredient).join(', ')
        return `
            <container class="card">
                <p class="card-img">${emoji}</p>
                <div class="card-info">
                    <p class="medium-font">${name}</p>
                    <p class="ingredients">${ingredientsString}</p>
                    <p class="price">$${price}</p>
                </div>
                <btn class="add-to-cart" id="add-to-cart" data-card="${id}">
                    <i class="fa-solid fa-plus" data-card="${id}"></i>
                </btn>
            </container>
        `
    })

    mainHtml.innerHTML = cardHtml
}

renderMenuCards()