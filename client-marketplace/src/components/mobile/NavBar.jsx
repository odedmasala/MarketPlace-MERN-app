
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { CgMenuRightAlt } from "react-icons/cg";
import NavBarSlider from "../navbar/navBarslider/NavBarSlider";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import SlideMenu from "../mobile/SlideMenu"

export default function NavigationBar() {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate()
  const handelNav = ()=>{
    setNav(!nav)
  }
  return (
    <div className="bg-white fixed bottom-0 inset-x-0 px-4 py-3 md:hidden flex items-center justify-around">
      <div
        onClick={() => navigate('/profile')}
        className="flex flex-col cursor-pointer text-[30px] items-center justify-center"
      >
        <BsShop />
        <p className="text-[15px]">אזור אישי</p>
      </div>
      <div onClick={handelNav}  className="flex flex-col cursor-pointer text-[30px] items-center justify-center">
        <AiOutlineShoppingCart />
        <p className="text-[15px]">
          העגלה שלי
        </p>
      </div>
      <div className="flex flex-col cursor-pointer text-[30px] items-center justify-center">
        <BiSearchAlt />
        <p className="text-[15px]">חיפוש</p>
      </div>
      <div className="flex flex-col cursor-pointer text-[30px] items-center justify-center">
        <CgMenuRightAlt />
        <p className="text-[15px]">תפריט</p>
        <NavBarSlider handelNav={handelNav} nav={nav} />
      </div>
      <SlideMenu />
    </div>
  );
}
