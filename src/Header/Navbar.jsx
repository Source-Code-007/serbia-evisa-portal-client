import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isServiceSubmenuOpen, setIsServiceSubmenuOpen] = useState(false);
  const serviceDropdownRef = useRef(null);
  const serviceDropdownBtnRef = useRef(null);




    // service dropdown
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          serviceDropdownRef.current &&
          !serviceDropdownRef.current.contains(event.target) && serviceDropdownBtnRef.current && !serviceDropdownBtnRef.current.contains(event.target)
        ) {
          setIsServiceSubmenuOpen(false);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);


  const menuItems = [
    "Services",
    "ABOUT KYRGYZSTAN",
    "INFORMATION",
    "CONTACT US",
    "KG",
    "RU",
    "EN",
    "Log in to personal account",
  ];





  return (
    <div className="topBar_1975">
      <table cellPadding="0" cellSpacing="0" width="1100" className=" mx-auto">
        <tbody>
          <tr>
            <td align="left">
              <Link to="/" className="inline-block !w-[100px] md:!w-[160px] !mt-[8px]">
              {/* <Link to="https://evisa.e-gov.kg/index.php" className="inline-block !w-[100px] md:!w-[160px] !mt-[8px]"> */}
                <img src="https://evisa.e-gov.kg/images/img/logo.png" className="logo_6999" />
              </Link>
            </td>
            <td align="right">
              <nav role="navigation" className="nav !font-bold">
                <ul className="nav-items">
                  <li className="nav-item dropdown" onClick={()=> setIsServiceSubmenuOpen(!isServiceSubmenuOpen)} ref={serviceDropdownBtnRef}>
                    <a href="#" className="nav-link">
                      <span>SERVICES</span>
                    </a>
                    <nav className={`submenu !absolute -left-16 top-8 bg-white w-[200px] rounded ${isServiceSubmenuOpen ? 'block' : 'hidden'}`} ref={serviceDropdownRef}>
                      <ul className="submenu-items relative">
                        <li className="submenu-item">
                          <a className="submenu-link">Apply for a visa</a>
                        </li>
                        <li className="submenu-item">
                          <a className="submenu-link">
                            Continue your application
                          </a>
                        </li>
                        <li className="submenu-item">
                          <Link className="submenu-link" to={"#check-status"}>
                            Check status
                          </Link>
                        </li>
                        <li className="submenu-item">
                          <a className="submenu-link">
                            Visa transfer to new passport
                          </a>
                        </li>
                      </ul>
                      <div className="triangle"></div>
                    </nav>
                  </li>
                  <li className="nav-item">
                    <a href="https://evisa.e-gov.kg/about_kyrgyzstan.php?lng=en" className="nav-link">
                      <span>ABOUT KYRGYZSTAN</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="https://evisa.e-gov.kg/get_information.php?lng=en" className="nav-link">
                      <span>INFORMATION</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="https://evisa.e-gov.kg/contact_us.php?lng=en" className="nav-link">
                      <span>CONTACT US</span>
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    style={{marginLeft:'25px', marginRight:'7px'}}
                  >
                    <a href="https://evisa.e-gov.kg/check_status.php?lng=ky" className="nav-link">
                      <span alt="ky" className="Name">
                        KG
                      </span>
                    </a>
                  </li>
                  <li className="nav-item" style={{marginRight:'7px'}}>
                    <a href="https://evisa.e-gov.kg/check_status.php?lng=ru" className="nav-link">
                      <span alt="ru" className="Name">
                        RU
                      </span>
                    </a>
                  </li>
                  <li className="nav-item" style={{marginRight:'20px'}}>
                    <a href="https://evisa.e-gov.kg/check_status.php?lng=en" className="nav-link">
                      <span alt="en" className="actLang text-primary-1">
                        EN
                      </span>
                    </a>
                  </li>
                  <li className="nav-item" style={{marginRight:'7px'}}>
                    <a   href="https://evisa.e-gov.kg/login.php?lng=en" className="nav-link">
                      <span alt="en" className="actLang">
                        Log in to personal account
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Navbar;

{
  /* <div className="py-2">
<div className="my-container">
  <div className="flex justify-between gap-4 text-white">
    <div>

    <figure className="flex items-center !w-24 md:!w-32 whitespace-nowrap">
      <img
        src={"https://evisa.e-gov.kg/images/img/logo.png"}
        className="!w-24 md:!w-32"
        alt="e-VISA"
        />
    </figure>
        </div>
    <div>
      <ul className="flex items-center gap-4 text-[14px] md:text-base">
        {menuItems.map((item, index) => (
          <li key={index} className={`text-nowrap ${item=== 'EN' && 'text-primary-1'}`}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
</div>
</div> */
}
