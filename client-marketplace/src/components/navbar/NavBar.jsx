import React from "react";
import { Avatar, Navbar } from "flowbite-react";
import SearchInput from "../../features/searchInput/SearchInput";
import { ImLocation } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import NavBarUserIsConnected from "./navBarUserIsConnected/NavBarUserIsConnected";
import NavBarUserIsNotConnected from "./navBarUserIsNotConnected/NavBarUserIsNotConnected";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-white">
      <Navbar
        fluid={true}
        rounded={true}
        className="md:w-3/4 w-full mx-4 md:mx-0"
      >
        <Navbar.Brand className="w-[25%] " onClick={() => navigate("/")}>
          <img
            src={"https://i.postimg.cc/dtp2yysC/logo-removebg-preview.png"}
            className="mr-3 w-full h-14  sm:h-20"
            alt="Flowbite Logo"
          />
        </Navbar.Brand>
        <NavBarUserIsConnected/>
        {/* <NavBarUserIsNotConnected/> */}
      </Navbar>
    </div>
  );
}
