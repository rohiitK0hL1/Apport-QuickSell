import React from 'react';
// import './NavBar.css'; // Assuming you will create a CSS file for styling

const NavBar = () => {
    return (
        <nav className="navbar" style={{marginLeft:"10px", height:"50px",width:"100%",backgroundColor:"#eceff1",display:"flex",alignItems:"center"}}>
            {/* <div>
                Grouping
            </div> */}
                <select>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
        </nav>
    );
};

export default NavBar;