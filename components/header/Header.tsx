import { PhoneSection } from "./PhoneSection";
import { LogoSection } from "./LogoSection";
import { AdressSection } from "./AdressSection";
export const Header = () => {
    return(
        <div className="max-w-[1500px] mx-auto py-2 flex justify-start items-center">
            <PhoneSection/>
            <LogoSection/>
            <AdressSection/>
        </div>
    );
}