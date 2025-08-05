import { ChevronRight, ChevronDown } from "lucide-react";
import cssStyles from "./GroupLinks.module.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface Link {
    label: string;
    link: string;
}

interface GroupLinkItem {
    label: string;
    icon: React.FC;
    path?: string;
    initiallyOpened?: boolean;
    links?: Link[];
}
interface IGroupLinksProps {
    onClick?: () => void;
    linkItem: GroupLinkItem;
}
const GroupLinks: React.FC<IGroupLinksProps> = ({ linkItem, onClick = undefined }) => {
    const [openNestedLink, setOpenNestedLink] = useState<string>("");
    const navigate = useNavigate();
    const handleOpenNestedLinks = (label: string) => {
        setOpenNestedLink((prevState) => {
            if (prevState === label) {
                return "";
            }
            return label;
        })
    }

    return linkItem.links ? (
        <div className={cssStyles.NestedNavItem}>
            <button className={cssStyles.NavItem} onClick={() => handleOpenNestedLinks(linkItem.label)}>
                <div className={cssStyles.Content}>
                    <span className={cssStyles.Icons}><linkItem.icon /></span>
                    <span className={cssStyles.Label}>{linkItem.label}</span>
                </div>
                {openNestedLink ? <ChevronDown size={20} strokeWidth={1.6} /> : <ChevronRight size={20} strokeWidth={1.6} />}
            </button>
            {openNestedLink === linkItem.label && (
                <div className={cssStyles.NestedLinks}>
                    {linkItem.links.map((link) => (
                        <Link to={link.link} className={cssStyles.Link}>{link.label}</Link>
                    ))}
                </div>
            )}
        </div>
    ) : (
        <button className={cssStyles.NavItem}
            onClick={() => {
                if (onClick) {
                    onClick();
                } else {
                    linkItem.path && navigate(linkItem.path)
                }
            }}>
            <div className={cssStyles.Content}>
                <span className={cssStyles.Icons}><linkItem.icon /></span>
                <span className={cssStyles.Label}>{linkItem.label}</span>
            </div>
        </button>
    )

}

export default GroupLinks;