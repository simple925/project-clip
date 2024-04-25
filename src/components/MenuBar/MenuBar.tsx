"use client";
import styles from './Menu.module.css';
import Link from "next/link";
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
  IconHome,
  IconWritingSign
} from '@tabler/icons-react';

export function MenuBar() {
 // 스타일을 object 형태로 만들었기 때문에
 // key : value 형태의 접근이 가능함
 // styles 객체로 들어 있는 스타일 값을 키로 접근해서 적용
 return (
	 <>
		<nav className={styles.menu}>
	 {/* 
	 	스타일 이름에 -(하이픈) 이 들어가면 
	    ex) obj.menu-open-button(x) 체이닝으로 못가져옴 그래서
	    ex) obj["menu-open-button"](o) key : value 를 다른 형식으로 가져오는 방식으로 적용 
	 */}
			<input type="checkbox" className={styles["menu-open"]} name="menu-open" id="menu-open" />
			<label className={styles["menu-open-button"]} htmlFor="menu-open">
				{/*
					className={String} 이런 구조인데
					스타일에 띄어쓰기가 있어서 공백을 추가함
					ex) styles.lines + ' ' + styles["line-1"](o)
				*/}
				<span className={styles.lines + ' ' + styles["line-1"]}></span>
				<span className={styles.lines + ' ' + styles["line-2"]}></span>
				<span className={styles.lines + ' ' + styles["line-3"]}></span>
			</label>
				{/*
					<a /> 태그를 react router 사용을 위해 <Link /> 태그로 변경
				*/}
			<Link href="#" className={styles["menu-item"] + ' ' + styles.blue}><i className="fa fa-anchor"><IconMail/></i></Link>
			<Link href="#" className={styles["menu-item"] + ' ' + styles.green}><i className="fa fa-coffee"><IconCalendarUp/></i></Link>
			<Link href="#" className={styles["menu-item"] + ' ' + styles.red}><i className="fa fa-heart"><IconHome/></i></Link>
			<Link href="#" className={styles["menu-item"] + ' ' + styles.purple}><i className="fa fa-microphone"><IconUsers/></i></Link>
			<Link href="#" className={styles["menu-item"] + ' ' + styles.orange}><i className="fa fa-star"><IconWritingSign/></i></Link>
			<Link href="#" className={styles["menu-item"] + ' ' + styles.lightblue}><i className="fa fa-diamond"><IconBellRinging/></i></Link>
		</nav>
	</>
  );
}
