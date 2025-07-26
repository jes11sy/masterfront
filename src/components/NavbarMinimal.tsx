import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  IconClipboardList,
  IconChartBar,
  IconCreditCard,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import { Stack, Tooltip } from '@mantine/core';
import classes from './NavbarMinimal.module.css';

interface NavbarLinkProps {
  icon: React.ComponentType<{ size?: number; stroke?: number }>;
  label: string;
  to: string;
}

function NavbarLink({ icon: Icon, label, to }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(classes.link, {
            [classes.active]: isActive,
          })
        }
      >
        <Icon size={20} stroke={1.5} />
      </NavLink>
    </Tooltip>
  );
}

const navItems: NavbarLinkProps[] = [
  { icon: IconClipboardList, label: 'Заявки', to: '/requests' },
  { icon: IconChartBar, label: 'Статистика', to: '/stats' },
  { icon: IconCreditCard, label: 'Платежи', to: '/pay' },
];

export default function NavbarMinimal() {
  const links = navItems.map((link) => <NavbarLink key={link.label} {...link} />);

  return (
    <nav className={classes.navbar}>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSettings} label="Settings" to="/setting" />
        <NavbarLink icon={IconLogout} label="Logout" to="/logout" />
      </Stack>
    </nav>
  );
} 