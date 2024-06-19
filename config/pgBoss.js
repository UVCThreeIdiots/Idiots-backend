import PgBoss from 'pg-boss';
import dotenv from 'dotenv';
import { sendEmail } from './email.js';
import TCapsuleService from '../services/timeCapsuleService.js'
import userDao from '../dao/userDao.js';
dotenv.config();

const boss = new PgBoss({
    connectionString: `postgres://${process.env.DB_ID}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_DATABASE}`,
    schema: 'pgboss',  // 사용할 스키마 이름, 기본값은 'public'
    migrate: true,      // pgBoss가 필요한 테이블을 자동으로 생성하도록 설정
    ssl: {
      rejectUnauthorized: false
    },
});

boss.on('error', error => console.error('pgBoss error:', error));

// 작업 정의
boss.work('time-capsule', async (job) => {
  console.log('start - 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
  const { 
    userId,
    title,
    body,
    expired,
    status,
    capsuleId,
    otherId,
    otherEmail,
  } = job.data;

  let user = null;
  let subUser = null;
  let userMail = null; // timeCapsule 받아야하는 사람
  let subUserMail = null; // timeCapsule을 보낸 사람
  let to = null;
  let subTo = null;
  let subject = null;
  let html = null;

  if (!otherId && !otherEmail.length) {
    console.log("🚀 ~ boss.work ~ !otherId && !otherEmail.length:")
    user = await userDao.selectUser({id : userId});
    userMail = user.email;
    to = userMail;
  } else if (otherId){
    console.log("🚀 ~ boss.work ~ otherId:", otherId)
    user = await userDao.selectUser({id : otherId});
    subUser = await userDao.selectUser({id: userId })
    userMail = user.email;
    subUserMail = subUser.email;
    to = userMail;
    subTo = subUserMail;
  } else {
    console.log("🚀 ~ boss.work ~ else:")
    subUser = await userDao.selectUser({id: userId })
    subUserMail = subUser.email;
    userMail = otherEmail;
    to = userMail;
    subTo = subUserMail;
  }
  
  console.log("🚀 ~ createCapsule ~ userMail:", userMail)
  console.log("🚀 ~ createCapsule ~ subUserMail:", subUserMail)
  
  if (subTo === null) {
    console.log("🚀 ~ boss.work ~ subTo === null:")
    subject = `📅 타임캡슐이 열렸습니다: 과거의 내가 보낸 메시지를 확인하세요!`;
    html = `
            <div style="text-align: center; padding: 20px;">
                <h2>타임캡슐이 열릴 준비가 되었습니다!</h2>
                <p>과거의 내가 지금의 나에게 보낸 특별한 메시지를 열어볼 시간입니다. 지금 바로 홈페이지에 접속하여 과거의 나와 소중한 대화를 나눠보세요.</p>
                <a href="http://13.125.169.9:5173/" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">타임캡슐 열기</a>
            </div>
          `;
  } else {
    console.log("🚀 ~ boss.work ~ 2 else:")
    subject = `⏳ 과거의 ${user.name}가 보낸 타임캡슐 메시지가 도착했습니다!`;
    html = `
            <div style="text-align: center; padding: 20px;">
              <h2>타임캡슐이 열릴 준비가 되었습니다!</h2>
              <p>${user.name}가 지금의 ${subUser.name}에게 보낸 특별한 메시지를 열어볼 시간입니다. 지금 바로 홈페이지에 접속하여 그들의 진심을 확인해보세요.</p>
              <a href="http://13.125.169.9:5173/" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">타임캡슐 열기</a>
            </div>
          `;
  }

  try {
    await sendEmail(to, subject, html);
    if (subTo !== null) {
      console.log("🚀 ~ boss.work ~ if (subTo !== null) {:")
      await sendEmail(subTo, subject, html);
    }
    await TCapsuleService.updateTCapsuleByIdFromPgBoss({id: capsuleId, status: true})
    console.log('Email sent successfully - 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
  } catch (error) {
    console.log('Error sending email: ', error);
  }

});




export default boss;





// ## `updateStartAfterDate(id, newDate, options)`

// Edits the ``startafter`` value of a job

// ```js

//     const originalDate = new Date()

//     const jobId = await boss.send('start_after_date_should_change', null, { startAfter: originalDate })

//     const newDate = new Date(originalDate.setMonth(originalDate.getMonth() + 1))

//     await boss.updateStartAfterDate(jobId, newDate)

//     const job = await boss.getJobById(jobId)

//     console.log(job.startafter) // should now resemble newDate 

// ```


// pg-boss 개요:

// pg-boss는 Node.js로 작성된 작업 큐이며 Postgres를 백엔드로 사용합니다.
// 여러 인스턴스를 사용하여 동일한 Postgres 데이터베이스에 연결할 수 있습니다.
// 작업 큐에 대한 다양한 사용 사례를 지원하며 분산 및 로드 밸런싱을 위해 여러 인스턴스를 사용할 수 있습니다.
// 작업 상태 (Job States):

// 작업은 created, active, completed, failed, retry, expired, cancelled, archive 상태를 가집니다.
// 각 상태는 작업이 생성된 후 완료, 실패, 만료, 취소 등의 상태로 전환됩니다.
// 데이터베이스 설치 및 제거:

// pg-boss는 데이터베이스 설치 시 자동으로 필요한 스키마를 생성합니다.
// pgcrypto 확장이 필요하며, 필요한 권한을 부여해야 합니다.
// 데이터베이스에서 pg-boss를 제거하려면 스키마와 테이블을 삭제해야 합니다.
// 이벤트:

// pg-boss는 EventEmitter를 사용하여 다양한 이벤트를 발생시킵니다.
// 주요 이벤트: error, monitor-states, wip, stopped.
// 정적 함수 (Static Functions):

// 스키마 생성 및 마이그레이션을 위한 SQL 명령을 반환하는 함수들.
// getConstructionPlans, getMigrationPlans, getRollbackPlans.
// 주요 함수:

// new(connectionString): PostgreSQL 연결 문자열을 사용하여 pg-boss 인스턴스를 생성합니다.
// start(): 데이터베이스를 준비하고 작업 모니터링을 시작합니다.
// stop(options): 작업 모니터링을 중지하고 인스턴스의 모든 작업을 완료합니다.
// send(): 새로운 작업을 생성하고 고유 식별자를 반환합니다.
// work(): 작업을 가져오고 핸들러를 실행합니다.
// schedule(): cron 표현식을 기반으로 작업을 예약합니다.
// 작업 전송 옵션 (send options):

// 작업 우선순위, 재시도 제한, 재시도 지연, 만료 시간, 보관 시간 등의 옵션을 설정할 수 있습니다.
// startAfter: 특정 시간 이후에 작업을 시작하도록 설정합니다.
// singletonKey: 고유 키를 사용하여 하나의 작업만 대기열 또는 활성 상태로 유지합니다.
// 예약 및 작업 관리:

// 작업을 cron 표현식을 사용하여 예약할 수 있습니다.
// 예약된 작업을 조회하고 취소할 수 있습니다.
// 특정 작업 ID를 사용하여 작업을 완료, 실패 또는 취소할 수 있습니다.
