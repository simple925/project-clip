'use client';
import { useEffect, useState } from 'react';
import { Group } from '@mantine/core';
import {
  IconBellRinging,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconPaperclip,
  IconCalendarUp,
  IconCash,
  IconUsers,
  IconMail,

} from '@tabler/icons-react';
import classes from './MyPageNav.module.css';
import { Badge } from '@mantine/core';
import MyPages from '@/app/MyPages/page';
import { MyContent } from '../MyContent/MyContent';
import Link from 'next/link';

export function MyPageNav(props: { id: number; }) {
  // type 추가
  const [info, setInfo] = useState<any>([])
  // 사용자 정보 조회
  useEffect(() => {
    fetch(`http://localhost:9999/board/1`)
    .then(res => res.json())
    .then(info => {
      setInfo(info)
    })
  }, []);
  // navbar 메뉴 추가 시 변경 될 데이터 
  const data = [
    { link: '/MyPages/Vacation', label: '휴가계', icon: IconCalendarUp },
    { link: '/MyPages/Payment', label: '지출결의서', icon: IconCash },
    { link: '/MyPages/alarm', label: '알람', icon: IconBellRinging },
    { link: '/MyPages/email', label: '이메일', icon: IconMail },
    { link: '/MyPages/setting', label: 'Settings', icon: IconSettings },
    { link: '/MyPages/employee', label: '사원관리', icon: IconUsers },
  ];

  const [active, setActive] = useState('휴가계');
  const [activeLink, setActiveLink] = useState('/vacation')

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        // event.preventDefault();
        setActive(item.label);
        setActiveLink(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <IconPaperclip size={25} />
          <span>newspring</span>
          <Badge color="gray">CLIP</Badge>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Link href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link>

        <Link href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}