import { HomeIcon } from "../ui/HomeIcon";
import { SettingsIcon } from "../ui/SettingsIcon";
import "./FooterMobile.css"

export const FooterMobile = ({toggleMenu}) => {
  return (
    <footer className="footer-mobile">
      <HomeIcon/>
      <SettingsIcon toggleMenu={toggleMenu}/>
    </footer>
  )
}