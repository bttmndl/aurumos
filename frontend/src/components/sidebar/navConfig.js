import {
  LayoutDashboard,
  Building2,
  Workflow,
  Scale,
  Truck,
  Lock,
  Inbox,
  Zap,
  Users,
  PackageOpen,
} from "lucide-react";

export const NAV = [
  { id: "refinery-layout", label: "Refinery Layout", icon: LayoutDashboard, path: "/refinery-layout" },
  {
    id: "department",
    label: "Department",
    icon: Building2,
    children: [
      { id: "dept-admin",      label: "Administration",   path: "/department/administration"    },
      { id: "dept-minting",    label: "Minting",           path: "/department/minting"            },
      { id: "dept-lab",        label: "Lab",               path: "/department/lab"                },
      { id: "dept-gold",       label: "Gold Refinery",     path: "/department/gold-refinery"      },
      { id: "dept-silver",     label: "Silver Refinery",   path: "/department/silver-refinery"    },
      { id: "dept-melting",    label: "Melting",           path: "/department/melting"            },
      { id: "dept-casting",    label: "Casting",           path: "/department/casting"            },
      { id: "dept-vault",      label: "Vault",             path: "/department/vault"              },
      { id: "dept-collection", label: "Collection Center", path: "/department/collection-center"  },
      { id: "dept-kitchen",    label: "Kitchen",           path: "/department/kitchen"            },
    ],
  },
  { id: "processing",  label: "Metal Processing",      icon: Workflow, path: "/metal-processing"      },
  {
    id: "accounting",
    label: "Metal Accounting",
    icon: Scale,
    children: [
      { id: "acc-lab",        label: "Lab",        path: "/metal-accounting/lab"        },
      { id: "acc-production", label: "Production", path: "/metal-accounting/production" },
    ],
  },
  { id: "dispatch",    label: "Metal Dispatch",        icon: Truck,    path: "/metal-dispatch"         },
  {
    id: "vault",
    label: "Vault",
    icon: Lock,
    children: [
      { id: "vault-production", label: "Production", path: "/vault/production" },
      { id: "vault-lab",        label: "Lab",        path: "/vault/lab"        },
    ],
  },
  { id: "collection-center", label: "Collection Center", icon: Inbox, path: "/collection-center" },
  { id: "electricity", label: "Electricity Consumption", icon: Zap,  path: "/electricity-consumption" },
  {
    id: "hr",
    label: "Human Resource",
    icon: Users,
    children: [
      { id: "hr-employees",  label: "Employee Details", path: "/hr/employees"   },
      { id: "hr-leave",      label: "Leave",            path: "/hr/leave"       },
      { id: "hr-attendance", label: "Attendance",       path: "/hr/attendance"  },
      { id: "hr-policy",     label: "HR Policy",        path: "/hr/policy"      },
      { id: "hr-salary",     label: "Salary Slip",      path: "/hr/salary-slip" },
    ],
  },
  { id: "consumables", label: "Inventory", icon: PackageOpen, path: "/inventory" },
];
