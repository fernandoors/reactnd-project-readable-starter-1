import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({categories}) => {
    return (
        <header>
            <section className="head">
                <section>
                    <Link to='/'>  <img src="../assets/image/Fdoors.png" alt="logo" className="logo" /> </Link>
                </section>
                <section>
                    <Link className='menuCategory' to='/'>Home</Link>
                    {Object.values(categories).map(category =>(
                        <Link className='menuCategory' key={category.path} to={`/${category.name}`}>{category.name}</Link>
                    ))}
                </section>
            </section>
        </header>
    )
}

export default Header
