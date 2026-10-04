import { MdDashboard } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { MdCollectionsBookmark } from "react-icons/md";
import { IconType } from "react-icons";

interface IDashboardNavLink {
    id: number;

    name: {
        en: string;
        fa: string;
    };

    href: string;

    icon: IconType;
}

export const dashboardNavLinks:
    IDashboardNavLink[] = [
        {
            id: 1,
            name: {
                en: "Dashboard",
                fa: "داشبورد",
            },
            href: "",
            icon: MdDashboard,
        },
        {
            id: 2,
            name: {
                en: "Edit Profile",
                fa: "ویرایش پروفایل",
            },
            href: "/edit-profile",
            icon: FiUser,
        },
        {
            id: 3,
            name: {
                en: "Purchased Products",
                fa: "محصولات خریداری شده",
            },
            href: "/purchased-products",
            icon: BsCartCheck,
        },
        {
            id: 4,
            name: {
                en: "Ticket Purchased",
                fa: "بلیط‌های خریداری شده",
            },
            href: "/ticket-purchased",
            icon: IoTicketOutline,
        },
        {
            id: 5,
            name: {
                en: "Collections",
                fa: "مجموعه‌ها",
            },
            href: "/collections",
            icon: MdCollectionsBookmark,
        },
    ];