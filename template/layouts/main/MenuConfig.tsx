import { PATH_DASHBOARD } from 'routes';
import fileFill from '@iconify/icons-eva/file-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import { Icon } from '@iconify/react';
import { SideBarConfigItemsProps } from '../dashboard/SidebarConfig';

// ----------------------------------------------------------------------

const ICON_SIZE = {
   width: 22,
   height: 22
};

const menuConfig: SideBarConfigItemsProps[] = [
   {
      title: 'Home',
      path: '/',
      icon: <Icon icon={homeFill} {...ICON_SIZE} />
   },
   { title: 'Dashboard', path: PATH_DASHBOARD.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> }
];

export default menuConfig;
