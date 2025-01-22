import { Logo } from "./Logo.jsx";
import { SearchInput } from "./SearchInput.jsx";

export function MailHeader() {

    return <div className="header">
        <Logo />
        <SearchInput />
    </div>
}