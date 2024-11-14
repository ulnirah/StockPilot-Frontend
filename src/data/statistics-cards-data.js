import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "indigo",
    icon: BanknotesIcon,
    title: "Total Products",
    value: "53",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "indigo",
    icon: UsersIcon,
    title: "Total Categories",
    value: "21",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "indigo",
    icon: UserPlusIcon,
    title: "Total Supplier",
    value: "32",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "indigo",
    icon: ChartBarIcon,
    title: "Total Retailers",
    value: "212",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
