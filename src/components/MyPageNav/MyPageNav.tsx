'use client';
import { useEffect, useState, useCallback } from 'react';
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
import Link from 'next/link';

export function MyPageNav(props: { id: number; }) {
  /**
   * TODO
   * 1. navbar active 현재 링크와 match
   */
  // type 추가
  const [info, setInfo] = useState<any>([])
  // 사용자 정보 조회
  // useEffect(() => {
  //   fetch(`http://localhost:9990/board/1`)
  //     .then(res => res.json())
  //     .then(info => {
  //       setInfo(info)
  //     })
  // }, []);
  // navbar 메뉴 추가 시 변경 될 데이터
  const data = [
    { link: '/MyPages/Vacation', label: '휴가계', icon: IconCalendarUp, value: 'Vacation'},
    { link: '/MyPages/Payment', label: '지출결의서', icon: IconCash, value: 'Payment'},
    { link: '/MyPages/Alram', label: '알람', icon: IconBellRinging, value: 'Alram'},
    { link: 'https://mail.cluedin.co.kr/', label: '이메일', icon: IconMail, target: '_blank', value: 'Mail'},
    { link: '/MyPages/Setting', label: 'Settings', icon: IconSettings, value: 'Setting'},
    { link: '/MyPages/Employee', label: '사원관리', icon: IconUsers, value: 'Employee'},
  ];

  const [active, setActive] = useState('');
  const handleRoute = useCallback(() => setActive(window.location.pathname.split('/').pop() || ''), [])

  useEffect(()=> {
    window.addEventListener("popstate", handleRoute)
    return (()=> {
      window.removeEventListener("popstate", handleRoute)
    })
  }, [handleRoute])


  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.value === active || undefined}
      href={item.link}
      target={item.target}
      key={item.label}
      onClick={() => {
        setActive(item.value);
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