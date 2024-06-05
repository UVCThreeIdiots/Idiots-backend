# Idiots-backend

expired - created = 남은 일수
goal_count - now_count = 남은 횟수

1. 매일 자정 함수
  (1) daily_check false로 바꿔주기

  (2) 실패 여부
    - 실패 일때
      남은 일수 < 남은 횟수 -> is_failed -> true -> 메일 알림
1. 수시로 동작하는 함수
  (1) 성공 여부 
    - 성공 일때
      남은 횟수 === 0 -> is_success -> true -> 응답
       