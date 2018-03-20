import React from 'react';
import { Link } from 'react-router';

const Layout = (props) => {
 return(
   <div>
     <div className="right">
         <Link className="button secondary small" to='/teams'> Teams </Link>
     </div>
     {props.children}
   </div>
 )
}

export default Layout;
