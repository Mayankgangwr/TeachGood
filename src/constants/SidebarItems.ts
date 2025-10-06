import {
  ClipboardList,
  BookOpen,
  BookMarked, // ✅ Add this
  Settings,
  Calendar,
  GraduationCap,
  School,
  CheckSquare,
  Layers,
  User,
  LayoutDashboard,
  ClipboardCheck
} from 'lucide-react';

import { UserRoles, type Role } from '.';

interface Link {
  label: string;
  link: string;
  icon: React.FC; // <-- This is required!
}

export interface IMenuItem {
  label: string;
  icon: React.FC;
  initiallyOpened?: boolean;
  path: string;
  links?: Link[];
  access?: Role[];
}

export const sidebarMenuItems: IMenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Departments",
    icon: School,
    path: "/departments",
    access: [UserRoles.Admin],
  },
  {
    label: "Courses",
    icon: BookOpen,
    path: "/courses",
    access: [UserRoles.Admin],
    initiallyOpened: true,
    // links: [
    //   {
    //     label: "All Courses",
    //     link: "/courses/all",
    //     icon: List,
    //   },
    //   {
    //     label: "Add Course",
    //     link: "/courses/add",
    //     icon: PlusCircle,
    //   },
    // ],
  },
  {
    label: "Subjects",
    icon: BookMarked, 
    path: "/subjects",
    access: [UserRoles.Admin, UserRoles.Teacher],
  },
  {
    label: "Batches",
    icon: Layers,
    path: "/batches",
  },
  {
    label: "Enrollments",
    icon: ClipboardCheck,
    path: "/enrollments",
  },
  {
    label: "Students",
    icon: GraduationCap,
    path: "/students",
    access: [UserRoles.Admin, UserRoles.Teacher],
  },
  {
    label: "Teachers",
    icon: User,
    path: "/teachers",
    access: [UserRoles.Admin],
  },
  {
    label: "Classes",
    icon: Calendar,
    path: "/classes",
  },
  {
    label: "Assignments",
    icon: ClipboardList,
    path: "/assignments",
  },
  {
    label: "Attendance",
    icon: CheckSquare,
    path: "/attendance",
    access: [UserRoles.Admin, UserRoles.Teacher],
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
    access: [UserRoles.Admin],
  },
];
