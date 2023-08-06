import React, { createContext,  useState } from 'react';
import './index.css';
import './App.css';
import Login from './pages/Login';
import Forgot_password from './pages/Forgot_password';
import Authenticate from './Authenticate';
import Authenticate_code from './Authenticate_code';
import Verification_code from './Verification_code';


import { Routes ,Route,Navigate ,Outlet } from 'react-router-dom';

import Mainpage from './pages/Mainpage';


import Dashboard from './pages/Components/Dashboard';
import Stocks from './pages/Components/Stocks';
import Products from './pages/Components/products/Products';
import Add_item from './pages/Components/products/Add_item';
import Show_archive from './pages/Components/products/Show_archive';
import Salesreport from './pages/Components/Salesreport';
import Invoice from './pages/Components/invoice/Invoice';
import Add_data from './pages/Components/invoice/Add_data';
import Show_draft from './pages/Components/invoice/Show_draft';
import Edit_data from './pages/Components/invoice/Edit_data';
import Edit_draft from './pages/Components/invoice/Edit_draft';


// import Message_dialog from './pages/Components/Message_dialog';

import Edit_profile from './pages/Components/Edit_profile';

export const UserContext = createContext({});
export const UserContext_code = createContext({});


const SidebarLayout = () => (
  <>
    <Mainpage />
    <Outlet />
  </>
);



function App(){

  const [user, setUser] = useState({ loggedIn: false });
  const [user_code, setUser_code] = useState({ loggedIn_code: false });

  return (
    <>

  <UserContext.Provider value={{ user, setUser , user_code, setUser_code}}>

    <Routes>
    
          <Route path="High-Resolution-Cognate-I" element={<Login/>}/>
          <Route path="High-Resolution-Cognate-I/Forgotpassword" element={<Forgot_password/>}/>
          <Route path="*" element={<Navigate to="High-Resolution-Cognate-I"/>}/>
 
 {/* send verification code */}
          <Route element={<Authenticate_code />}>
            <Route path="High-Resolution-Cognate-I/Authentication" element={<Verification_code/> } /> 
          </Route>

{/* route to mainpage */}
          <Route element={<Authenticate />}>
                <Route element={<SidebarLayout /> } >

                  <Route path="/Mainpage" element={<Dashboard/> } /> 
                  <Route path="/Mainpage/Stocks" element={<Stocks/> } /> 
                  <Route path="/Mainpage/Products" element={<Products/> } />
                    <Route path = "/Mainpage/Products/AddItem" element={<Add_item/>}/>
                    <Route path = "/Mainpage/Products/ArchiveList" element={<Show_archive/>}/>

                  <Route path="Mainpage/Invoice" element={<Invoice/> } />
                    <Route path = "/Mainpage/Invoice/AddData" element={<Add_data/>}/>
                    <Route path = "/Mainpage/Invoice/EditData" element={<Edit_data/>}/>
                    <Route path = "/Mainpage/Invoice/DraftList" element={<Show_draft/>}/>
                    <Route path = "/Mainpage/Invoice/EditDraft" element={<Edit_draft/>}/>
                  <Route path="/Mainpage/EditProfile" element={<Edit_profile/> } /> 
                 
                </Route>
          </Route>
         
   </Routes>
       
  </UserContext.Provider>     
     
   
        </>
    
  );
}

export default App;
