'use client';
import React, { useState } from "react";

// 이번달, 이전 <-> 다음 월별 이동 툴바
// TODO 추가 스타일링 필요
export function CalendarToolbar({ date, onNavigate }:any) {
  const navigate = (action:any) => {
    onNavigate(action);
  };
  
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => navigate('TODAY')}>
          이번달
        </button>
        <button type="button" onClick={() => navigate('PREV')}>
          이전
        </button>
        <span className="rbc-toolbar-label">
          {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
        </span>
        <button type="button" onClick={() => navigate('NEXT')}>
          다음
        </button>
      </span>
    </div>
  );
}