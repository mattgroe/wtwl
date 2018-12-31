import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

const Navbar = () => {

    let navWrapper = css({
        boxShadow: '0px 4px 4px -5px black'
    })
    
    let navLink = css({
        ':hover': {
            opacity: '0.5'
        }
    })

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" {...navWrapper}>
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to='/' className='nav-item nav-link active' {...navLink}>Home</Link>
                    <Link to='/about' className='nav-item nav-link active' {...navLink}>About</Link>
                    <Link to='/users' className='nav-item nav-link active' {...navLink}>Users</Link>
                {/* <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="#">Features</a>
                <a class="nav-item nav-link" href="#">Pricing</a>
                <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;