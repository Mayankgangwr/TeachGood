import {
  LayoutGrid,
  Users,
  ClipboardList,
  CalendarCheck,
  BookOpen,
  Settings,
  Calendar,
  GraduationCap,
  BarChart3,
  PlusCircle,
  ListChecks,
  FileText,
  Send
} from 'lucide-react';

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
}

export const teacherSidebarItems: IMenuItem[] = [
  {
    icon: LayoutGrid,
    label: 'Dashboard',
    path: '/',
  },
  {
    icon: Users,
    label: 'My Students',
    path: '/students',
    // links: [
    //   { label: 'Student List', link: '/teacher/students', icon: GraduationCap },
    //   { label: 'Performance', link: '/teacher/students/performance', icon: BarChart3 }
    // ]
  },
  {
    icon: CalendarCheck,
    label: 'Attendance',
    path: '/attendance'
  },
  {
    icon: ClipboardList,
    label: 'Assignments',
    path: '/assignments',
    // links: [
    //   { label: 'All Assignments', link: '/teacher/assignments', icon: ListChecks },
    //   { label: 'Create Assignment', link: '/teacher/assignments/create', icon: PlusCircle }
    // ]
  },
  {
    icon: BookOpen,
    label: 'Courses',
    path: '/courses',
    // links: [
    //   { label: 'My Courses', link: '/teacher/courses', icon: BookOpen },
    //   { label: 'Add Course', link: '/teacher/courses/add', icon: PlusCircle }
    // ]
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings'
  },
];

export const studentSidebarItems: IMenuItem[] = [
  {
    icon: LayoutGrid,
    label: 'Dashboard',
    path: '/'
  },
  {
    icon: BookOpen,
    label: 'My Courses',
    path: '/courses'
  },
  {
    icon: ClipboardList,
    label: 'Assignments',
    path: '/assignments',
    // links: [
    //   { label: 'View Assignments', link: '/student/assignments', icon: FileText },
    //   { label: 'Submit Assignment', link: '/student/assignments/submit', icon: Send }
    // ]
  },
  {
    icon: Calendar,
    label: 'Schedule',
    path: '/schedule'
  },
  {
    icon: Users,
    label: 'Classmates',
    path: '/classmates'
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings'
  },
];
