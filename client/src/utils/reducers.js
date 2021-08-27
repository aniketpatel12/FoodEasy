import { secureStorage } from "./context"

export const reducer = (state,action) => {
    let cart = []
    const exist = state.cartItems ? state?.cartItems?.find((x) => x.id === action.item?.id) : undefined
    switch(action.type){
        case "ADD_CART": 
            if (exist !== undefined)
                cart = state?.cartItems && state?.cartItems?.map((x) => x.id === action.item.id ? { ...exist, qty: exist.qty + 1 } : x)
            else
                cart = [...state?.cartItems, { ...action.item, qty: 1 }]

            secureStorage.setItem('cartItems',cart)
            return { ...state , cartItems:cart} 

        case "REMOVE_CART":
            if (exist.qty === 1)
                cart = state?.cartItems && state.cartItems?.filter((x) => x.id !== action.item.id)
            else
                cart = state?.cartItems && state.cartItems?.map((x) => x.id === action.item.id ? { ...exist, qty: exist.qty - 1 } : x)

            secureStorage.setItem('cartItems',cart)
            return { ...state , cartItems:cart}

        case "SET_USER":
            secureStorage.setItem('user', action.user)
            secureStorage.setItem('token', action.token)
            return { ...state , user:action.user }

        case "UNSET_USER":
            secureStorage.removeItem('user')
            return {...state , user:{} }

        case "SET_PRICE":
            secureStorage.setItem('priceDetails', action.priceDetails)
            return {...state , priceDetails:action.priceDetails }
        
        case "EMPTY_CART":
            secureStorage.removeItem('cartItems')
            return {...state , cartItems:{} }

        default:
            return state
    }
}