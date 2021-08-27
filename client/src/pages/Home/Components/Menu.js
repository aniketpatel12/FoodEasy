import React from 'react'
import { data } from '../../../utils/data'
import MenuItemCard from './MenuItemCard'

const Menu = () => {
    const items = data.Items
    
    return (
        <section className="menu">
            <div className="text-center text-gray-800 text-4xl font-bold my-5">Our Menu</div>
            <div className=" my-12 px-4 md:px-28">
                <div className="flex flex-wrap menu-ipad justify-center -mx-1 lg:-mx-4">
                    {
                        items?.map((item) => <MenuItemCard key={item.id} item = {item} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default React.memo(Menu)
