import {
  BusinessSvg,
  EmployeeSvg,
  SettingSvg,
  SupportIconSvg,
} from "@/svgicon";

export const menuItems = [
  {
    id: 1,
    name: "Business Travel",
    icon: <BusinessSvg />,
    sub: [
      {
        name: "Get started",
        path: "/",
      },
      {
        name: "Rides dashboard",
        path: "/rides",
      },
      {
        name: "Delivery dashboard",
        path: "",
      },
    ],
  },

  {
    id: 2,
    name: "Employees",
    icon: <EmployeeSvg />,
    sub: [
      {
        name: "Add new member",
        path: "/employees/add-new-employee",
      },
      {
        name: "All employees",
        path: "/employees",
      },
      {
        name: "Manage admins",
        path: "/employees/admin",
      },
    ],
  },
  {
    id: 3,
    name: "Settings",

    icon: <SettingSvg />,
    sub: [
      {
        name: "Company",
        path: "/company",
      },
      {
        name: "Payment",
        path: "/settings/payment",
      },

      {
        name: "Transaction history",
        path: "/transaction-history",
      },
    ],
  },
  {
    id: 3,
    name: "Support",
    path: "/support",
    icon: <SupportIconSvg />,
  },
];
