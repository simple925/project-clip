"use client";
import { Button, ScrollArea, rem } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import MenuCss from './Menu.module.css';

export function MenuBar() {
 //console.log('aaaaaaaaaaaaa '+MenuCss)
 const m = "menu-open"
  return (
    <>
      <nav className={MenuCss}>
	   <input type="checkbox" className={m} name={m} id={m} />
	   <label className={"MenuCss.menu-open-button"} htmlFor={m}>
		<span className={"MenuCss.lines line-1"}></span>
		<span className={"MenuCss.lines line-2"}></span>
		<span className={"MenuCss.lines line-3"}></span>
	  </label>

	   <a href="#" className={"MenuCss.menu-item blue"}> <i className={"fa fa-anchor"}></i> </a>
	   <a href="#" className={"MenuCss.menu-item green"}> <i className={"fa fa-coffee"}></i> </a>
	   <a href="#" className={"MenuCss.menu-item red"}> <i className={"fa fa-heart"}></i> </a>
	   <a href="#" className={"MenuCss.menu-item purple"}> <i className={"fa fa-microphone"}></i> </a>
	   <a href="#" className={"MenuCss.menu-item orange"}> <i className={"fa fa-star"}></i> </a>
	   <a href="#" className={"MenuCss.menu-item lightblue"}> <i className={"fa fa-diamond"}></i> </a>
	</nav>
    </>
  );
}
