import { HomeIcon } from "../ui/HomeIcon";
import { SettingsIcon } from "../ui/SettingsIcon";
import "./FooterMobile.css"

export const FooterMobile = () => {
  return (
    <footer className="footer-mobile">
      <HomeIcon/>
      <SettingsIcon/>
    </footer>
  )
}