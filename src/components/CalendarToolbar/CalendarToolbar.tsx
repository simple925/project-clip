'use client';
import React, { useCallback, useEffect, useState } from "react";
import { Button } from '@mantine/core';
import style from './CalendarToolbar.module.css';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { rem } from "@mantine/core";

// 이번달, 이전 <-> 다음 월별 이동 툴바
// TODO 추가 스타일링 필요 ==> mantine 버튼 스타일 참고하여 수정

export function CalendarToolbar({ date, onNavigate, currentAction }:any) {
  
  // const navigate = (action: string) => {
  //   onNavigate(action);
  //   // onActionChange(action)
  // };

  const navigate = useCallback((action: string) => {
    onNavigate(action);
  }, [onNavigate]);

  useEffect(() => {
    console.log('액션 받아옴 ', currentAction)
    if (currentAction) {
      navigate(currentAction)
    }
  }, [currentAction, navigate])

  // useEffect(() => {
  //   console.log('액션 받아옴 ', currentAction) // 1) console에 calendarState값 로깅
  //   navigate(currentAction) // 2) calendarView에 불러온 값 담기
  // }, [currentAction]) // calendarState가 변경될 때 동작

  // const navigate = (action:any) => {
  //   onNavigate(action);
  // };

  return (
    <div className={style.toolbar}>
    <Button.Group >
      <Button variant="default" onClick={() => navigate('TODAY')}> 이번달</Button>
      <Button variant="default" onClick={() => navigate('PREV')}>
          <IconArrowLeft />
      </Button>
        <span className={style.toolbarLabel}>
          {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
        </span>
      <Button variant="default" onClick={() => navigate('NEXT')}>
          <IconArrowRight />
      </Button >
    </Button.Group>
    </div>
  );
}