"use client";
import styles from './Menu.module.css';
import Link from "next/link";
import { Badge } from '@mantine/core';
import {
IconBellRinging,
IconCalendarUp,
IconUsers,
IconMail,
IconHome,
IconWritingSign
} from '@tabler/icons-react';

export function MenuBar(prop: any) {

 // 스타일을 object 형태로 만들었기 때문에
 // key : value 형태의 접근이 가능함
 // styles 객체로 들어 있는 스타일 값을 키로 접근해서 적용

	// navbar 메뉴 추가 시 변경 될 데이터 



const handleClick = () => {
	prop.onValue(prop.isOpen)
}
const data = [
	{ link: 'https://mail.cluedin.co.kr/', styleName: styles.blue, icon: IconMail, onClick: ()=>console.log('클루드인메일 click!!!') }, //메일
	{ link: '/Calendar/MainCalendar', styleName: styles.green, icon: IconCalendarUp, onClick: ()=>console.log('캘린더 click!!!') }, //캘린더
	{ link: '/MyPages/Vacation', styleName: styles.red, icon: IconHome, onClick: ()=>console.log('홈 click!!!') }, //홈
	{ link: '/MyPages/Employee', styleName: styles.purple, icon: IconUsers, onClick: ()=>console.log('메일 click!!!')}, //사원관리
	{ link: '/Write', styleName: styles.orange, icon: IconWritingSign, onClick: ()=>console.log('작성 click!!!') }, //작성
	{ link: '', styleName: styles.lightblue, icon: IconBellRinging, onClick: handleClick }, //알림
	];

const links = data.map((item,i) => (
	<Link key={i} href={item.link} className={styles["menu-item"] + ' ' + item.styleName} onClick={item.onClick}>
		<i className="fa fa-anchor"><item.icon/></i>
	</Link>
	));
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
		{/* <Link href="#" className={styles["menu-item"] + ' ' + styles.blue}><i className="fa fa-anchor"><IconMail/></i></Link>
		<Link href="#" className={styles["menu-item"] + ' ' + styles.green}><i className="fa fa-coffee"><IconCalendarUp/></i></Link>
		<Link href="#" className={styles["menu-item"] + ' ' + styles.red}><i className="fa fa-heart"><IconHome/></i></Link>
		<Link href="#" className={styles["menu-item"] + ' ' + styles.purple}><i className="fa fa-microphone"><IconUsers/></i></Link>
		<Link href="#" className={styles["menu-item"] + ' ' + styles.orange}><i className="fa fa-star"><IconWritingSign/></i></Link>
		<Link href="#" className={styles["menu-item"] + ' ' + styles.lightblue} onClick={handleClick}><i className="fa fa-diamond"><IconBellRinging/></i>
		</Link> */}
		{/* 링크 리스트 가져오기 */}
		{ links }
		{/* 알림에 들어가는 뱃지 설정 */}
		<span className={styles.alramBadge}>
			<Badge
				size="xs" circle
				color="red"
				pos="relative" top="-20px" right="385px"
				>1</Badge>
		</span>
	</nav>
</>
);
}
