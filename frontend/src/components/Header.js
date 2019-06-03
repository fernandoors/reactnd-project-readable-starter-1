import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../services/utils';

const Header = ({categories}) => {
    return (
        <header>
            <section className="head">
                <section>
                    <Link to='/'>  <img src="../assets/image/Fdoors.png" alt="logo" className="logo" /> </Link>
                </section>
                <section>
                    <Link className='menuCategory' to='/'>Home</Link>
                    {categories.map(category =>(
                        <Link className='menuCategory' 
                          key={category.path} 
                          to={`/${category.name}`}>
                            {capitalize(category.name)}
                        </Link>
                    ))}
                </section>
            </section>
        </header>
    )
}

export default Header
