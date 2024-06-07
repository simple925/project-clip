'use client';
import React, { useCallback, useEffect, useState } from "react";
import style from './MainCalendarTitle.module.css';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { rem, Button, Title, Group } from "@mantine/core";

// 이번달, 이전 <-> 다음 월별 이동 툴바
// TODO 추가 스타일링 필요 ==> mantine 버튼 스타일 참고하여 수정

export function MainCalendarTitle({ date, onNavigate, currentAction }: any) {

  const navigate = useCallback((action: string) => {
    onNavigate(action);
  }, [onNavigate]);

  useEffect(() => {
    console.log('액션 받아옴 ', currentAction)
    if (currentAction) {
      navigate(currentAction)
    }
  }, [currentAction, navigate])


  return (
    <div className={style.toolbar}>
      <Group>
        <IconArrowLeft className={style.arrowIcon} onClick={() => navigate('PREV')} />
        <div className={style.dateTitle}>
          <span className={style.year}>{`${date.getFullYear()}년`}</span>
          <span className={style.month}>{`${date.getMonth() + 1}월`}</span>
        </div>
        <IconArrowRight className={style.arrowIcon} onClick={() => navigate('NEXT')} />
        <Button variant="default" className={style.todayButton} onClick={() => navigate('TODAY')}>이번달</Button>
      </Group>
    </div>
  );
}